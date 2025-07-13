import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function for enhanced debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-CRYPTO-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const nowPaymentsApiKey = Deno.env.get("NOWPAYMENTS_API_KEY");
    if (!nowPaymentsApiKey) {
      throw new Error("NOWPAYMENTS_API_KEY is not set");
    }
    logStep("NOWPayments API key verified");

    // Create Supabase client for authentication
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) {
      throw new Error(`Authentication error: ${userError.message}`);
    }
    const user = userData.user;
    if (!user?.email) {
      throw new Error("User not authenticated or email not available");
    }
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Parse request body
    const body = await req.json();
    const { payment_id } = body;

    if (!payment_id) {
      throw new Error("Payment ID is required");
    }
    logStep("Checking payment status", { payment_id });

    // Check payment status with NOWPayments API
    const response = await fetch(`https://api.nowpayments.io/v1/payment/${payment_id}`, {
      method: "GET",
      headers: {
        "x-api-key": nowPaymentsApiKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      logStep("NOWPayments API error", { status: response.status, error: errorText });
      throw new Error(`NOWPayments API error: ${response.status} - ${errorText}`);
    }

    const paymentStatus = await response.json();
    logStep("Payment status retrieved", { 
      payment_id: paymentStatus.payment_id, 
      status: paymentStatus.payment_status 
    });

    // Update payment record in Supabase
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    try {
      await supabaseService
        .from("crypto_payments")
        .update({
          payment_status: paymentStatus.payment_status,
          updated_at: new Date().toISOString(),
          ...(paymentStatus.actually_paid && { actually_paid: paymentStatus.actually_paid }),
          ...(paymentStatus.outcome_amount && { outcome_amount: paymentStatus.outcome_amount }),
        })
        .eq("payment_id", payment_id)
        .eq("user_id", user.id);
      
      logStep("Payment record updated in database");
    } catch (dbError) {
      logStep("Warning: Failed to update payment record", { error: dbError });
      // Continue execution even if DB update fails
    }

    return new Response(JSON.stringify({
      payment_id: paymentStatus.payment_id,
      payment_status: paymentStatus.payment_status,
      pay_address: paymentStatus.pay_address,
      pay_amount: paymentStatus.pay_amount,
      pay_currency: paymentStatus.pay_currency,
      price_amount: paymentStatus.price_amount,
      price_currency: paymentStatus.price_currency,
      actually_paid: paymentStatus.actually_paid,
      outcome_amount: paymentStatus.outcome_amount,
      created_at: paymentStatus.created_at,
      updated_at: paymentStatus.updated_at
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in check-crypto-payment", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});