import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { promoCode } = await req.json();
    console.log(`Processing promo code: ${promoCode}`);

    // Create Supabase client with service role key for admin operations
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Validate promo code from database (case insensitive)
    const { data: promoCodeData, error: promoError } = await supabaseClient
      .from("promo_codes")
      .select("*")
      .ilike("code", promoCode)
      .eq("is_active", true)
      .single();

    if (promoError || !promoCodeData) {
      console.log("Invalid promo code:", promoCode);
      return new Response(JSON.stringify({ error: "Invalid promo code" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Check if code has expired
    if (promoCodeData.expires_at && new Date(promoCodeData.expires_at) < new Date()) {
      return new Response(JSON.stringify({ error: "Promo code has expired" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Check current usage count
    const { count, error: usageError } = await supabaseClient
      .from("promo_usage")
      .select("*", { count: "exact", head: true })
      .eq("promo_code", promoCodeData.code);

    if (usageError) {
      console.error("Error checking promo usage:", usageError);
      return new Response(JSON.stringify({ error: "Database error" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const usageCount = count || 0;
    console.log(`Current usage count: ${usageCount}/${promoCodeData.max_uses}`);
    
    if (usageCount >= promoCodeData.max_uses) {
      return new Response(JSON.stringify({ error: "Promo code limit reached" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // For free applications, we don't require authentication yet
    // Just record the usage with a temporary identifier
    const tempUserId = crypto.randomUUID();
    const tempEmail = `temp-${Date.now()}@temp.com`;

    // Record promo code usage
    const { error: insertError } = await supabaseClient
      .from("promo_usage")
      .insert({
        promo_code: promoCodeData.code,
        promo_code_id: promoCodeData.id,
        user_id: tempUserId, // Will be updated when user actually registers
        user_email: tempEmail,
        used_at: new Date().toISOString(),
      });

    if (insertError) {
      console.error("Error recording promo usage:", insertError);
      return new Response(JSON.stringify({ error: "Failed to record usage" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    console.log("Promo code usage recorded successfully");

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Promo code accepted! ${promoCodeData.benefits_years} year${promoCodeData.benefits_years > 1 ? 's' : ''} free access granted.`,
      freeYears: promoCodeData.benefits_years 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Function error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});