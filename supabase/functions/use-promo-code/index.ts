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

    // Validate promo code (case insensitive)
    if (promoCode.toLowerCase() !== "iamunvaccinated") {
      return new Response(JSON.stringify({ error: "Invalid promo code" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Check current usage count
    const { data: usageData, error: usageError } = await supabaseClient
      .from("promo_usage")
      .select("*")
      .eq("promo_code", "IamUnvaccinated");

    if (usageError) {
      console.error("Error checking promo usage:", usageError);
      return new Response(JSON.stringify({ error: "Database error" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const usageCount = usageData ? usageData.length : 0;
    console.log(`Current usage count: ${usageCount}`);
    
    if (usageCount >= 25) {
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
        promo_code: "IamUnvaccinated",
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
      message: "Promo code accepted! 1 year free access granted.",
      freeYears: 1 
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