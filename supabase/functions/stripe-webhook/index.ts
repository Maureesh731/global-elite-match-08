import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  // Webhooks must be POST
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

  if (!stripeKey || !webhookSecret) {
    logStep("ERROR: Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET");
    return new Response(JSON.stringify({ error: "Server misconfiguration" }), { status: 500 });
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

  // Verify Stripe signature
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    logStep("ERROR: Missing stripe-signature header");
    return new Response(JSON.stringify({ error: "Missing signature" }), { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const body = await req.text();
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    logStep("ERROR: Webhook signature verification failed", { msg });
    return new Response(JSON.stringify({ error: `Webhook Error: ${msg}` }), { status: 400 });
  }

  logStep("Event received", { type: event.type, id: event.id });

  // Only handle relevant events
  const handledEvents = [
    "payment_intent.succeeded",
    "customer.subscription.updated",
    "customer.subscription.created",
    "invoice.payment_succeeded",
  ];

  if (!handledEvents.includes(event.type)) {
    logStep("Ignored event type", { type: event.type });
    return new Response(JSON.stringify({ received: true }), { status: 200 });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    let customerEmail: string | null = null;

    if (event.type === "payment_intent.succeeded") {
      const pi = event.data.object as Stripe.PaymentIntent;
      logStep("payment_intent.succeeded", { id: pi.id, amount: pi.amount });

      // Resolve email from customer
      if (pi.customer) {
        const customer = await stripe.customers.retrieve(pi.customer as string);
        if (!customer.deleted) {
          customerEmail = (customer as Stripe.Customer).email;
        }
      }
    } else if (
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.created"
    ) {
      const sub = event.data.object as Stripe.Subscription;
      logStep(`${event.type}`, { id: sub.id, status: sub.status });

      // Only activate for active subscriptions
      if (sub.status !== "active") {
        logStep("Subscription not active, skipping", { status: sub.status });
        return new Response(JSON.stringify({ received: true }), { status: 200 });
      }

      const customer = await stripe.customers.retrieve(sub.customer as string);
      if (!customer.deleted) {
        customerEmail = (customer as Stripe.Customer).email;
      }
    } else if (event.type === "invoice.payment_succeeded") {
      const invoice = event.data.object as Stripe.Invoice;
      logStep("invoice.payment_succeeded", { id: invoice.id });

      if (invoice.customer_email) {
        customerEmail = invoice.customer_email;
      } else if (invoice.customer) {
        const customer = await stripe.customers.retrieve(invoice.customer as string);
        if (!customer.deleted) {
          customerEmail = (customer as Stripe.Customer).email;
        }
      }
    }

    if (!customerEmail) {
      logStep("No customer email resolved, skipping update");
      return new Response(JSON.stringify({ received: true }), { status: 200 });
    }

    logStep("Resolved customer email", { email: customerEmail });

    // Find the Supabase user by email
    const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers();
    if (usersError) throw new Error(`Failed to list users: ${usersError.message}`);

    const matchedUser = users.find((u) => u.email === customerEmail);
    if (!matchedUser) {
      logStep("No Supabase user found for email", { email: customerEmail });
      return new Response(JSON.stringify({ received: true }), { status: 200 });
    }

    const userId = matchedUser.id;
    logStep("Matched user", { userId, email: customerEmail });

    // Update profiles table
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ membership_type: "paid" })
      .eq("user_id", userId);

    if (profileError) {
      logStep("ERROR updating profile", { error: profileError.message });
    } else {
      logStep("Profile updated to paid", { userId });
    }

    // Update applications table
    const { error: appError } = await supabase
      .from("applications")
      .update({ membership_type: "paid" })
      .eq("user_id", userId);

    if (appError) {
      logStep("ERROR updating application", { error: appError.message });
    } else {
      logStep("Application updated to paid", { userId });
    }

    // Enable messaging
    const { error: msgError } = await supabase
      .from("message_restrictions")
      .upsert({ user_id: userId, can_send_messages: true }, { onConflict: "user_id" });

    if (msgError) {
      logStep("ERROR updating message_restrictions", { error: msgError.message });
    } else {
      logStep("Message restrictions updated", { userId });
    }

    return new Response(JSON.stringify({ received: true, userId }), { status: 200 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    logStep("ERROR processing webhook", { msg });
    return new Response(JSON.stringify({ error: msg }), { status: 500 });
  }
});
