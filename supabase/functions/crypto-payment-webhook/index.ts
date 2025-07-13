import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function for enhanced debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CRYPTO-PAYMENT-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Webhook received");

    // Create Supabase service client
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Parse webhook payload
    const payload = await req.json();
    logStep("Webhook payload received", payload);

    const { 
      payment_id, 
      payment_status, 
      pay_address,
      pay_amount,
      actually_paid,
      outcome_amount 
    } = payload;

    if (!payment_id) {
      throw new Error("Payment ID is required in webhook payload");
    }

    // Update payment record in database
    const { data, error } = await supabaseService
      .from("crypto_payments")
      .update({
        payment_status: payment_status,
        updated_at: new Date().toISOString(),
        ...(actually_paid && { actually_paid: actually_paid }),
        ...(outcome_amount && { outcome_amount: outcome_amount }),
      })
      .eq("payment_id", payment_id)
      .select();

    if (error) {
      logStep("Database update error", { error: error.message });
      throw error;
    }

    logStep("Payment status updated", { payment_id, payment_status, records_updated: data?.length });

    // If payment is completed, we could trigger additional actions here
    if (payment_status === 'finished') {
      logStep("Payment completed successfully", { payment_id });
      // Here you could trigger user subscription activation, send emails, etc.
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Webhook processed successfully" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in crypto-payment-webhook", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});