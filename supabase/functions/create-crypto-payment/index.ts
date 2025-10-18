import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function for enhanced debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CRYPTO-PAYMENT] ${step}${detailsStr}`);
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
    logStep("Authorization header found");

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
    const {
      price_amount,
      price_currency,
      pay_currency,
      order_description,
      success_url,
      cancel_url
    } = body;

    logStep("Payment request details", {
      price_amount,
      price_currency,
      pay_currency,
      order_description
    });

    // Create payment with NOWPayments API
    const paymentData = {
      price_amount: price_amount,
      price_currency: price_currency,
      pay_currency: pay_currency,
      order_id: `ud_${user.id}_${Date.now()}`, // Unique order ID
      order_description: order_description,
      ipn_callback_url: `${Deno.env.get("SUPABASE_URL")}/functions/v1/crypto-payment-webhook`,
      success_url: success_url,
      cancel_url: cancel_url,
      customer_email: user.email
    };

    logStep("Creating NOWPayments payment", paymentData);

    const response = await fetch("https://api.nowpayments.io/v1/payment", {
      method: "POST",
      headers: {
        "x-api-key": nowPaymentsApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      logStep("NOWPayments API error", { status: response.status, error: errorText });
      throw new Error(`NOWPayments API error: ${response.status} - ${errorText}`);
    }

    const paymentResult = await response.json();
    logStep("NOWPayments payment created successfully", { payment_id: paymentResult.payment_id });

    // Optional: Store payment record in Supabase
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    try {
      await supabaseService.from("crypto_payments").insert({
        user_id: user.id,
        payment_id: paymentResult.payment_id,
        order_id: paymentData.order_id,
        price_amount: price_amount,
        price_currency: price_currency,
        pay_currency: pay_currency,
        pay_amount: paymentResult.pay_amount,
        pay_address: paymentResult.pay_address,
        payment_status: paymentResult.payment_status || 'waiting',
        created_at: new Date().toISOString()
      });
      logStep("Payment record stored in database");
    } catch (dbError) {
      logStep("Warning: Failed to store payment record", { error: dbError });
      // Continue execution even if DB storage fails
    }

    return new Response(JSON.stringify({
      payment_id: paymentResult.payment_id,
      pay_address: paymentResult.pay_address,
      pay_amount: paymentResult.pay_amount,
      pay_currency: paymentResult.pay_currency,
      payment_status: paymentResult.payment_status,
      invoice_url: paymentResult.invoice_url,
      order_id: paymentData.order_id
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    // Log detailed error server-side only
    logStep("ERROR in create-crypto-payment", { message: errorMessage });
    
    // Return generic error to client
    return new Response(JSON.stringify({ 
      error: "Unable to process payment request. Please try again later or contact support.",
      code: "PAYMENT_CREATION_ERROR"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});