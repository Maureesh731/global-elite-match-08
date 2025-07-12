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

    // Create Supabase client with service role key
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get authenticated user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No authorization header" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !userData.user) {
      return new Response(JSON.stringify({ error: "Invalid user" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    // Check current usage count
    const { data: usageData, error: usageError } = await supabaseClient
      .from("promo_usage")
      .select("*")
      .eq("promo_code", promoCode);

    if (usageError) {
      console.error("Error checking promo usage:", usageError);
      return new Response(JSON.stringify({ error: "Database error" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const usageCount = usageData ? usageData.length : 0;
    if (usageCount >= 25) {
      return new Response(JSON.stringify({ error: "Promo code limit reached" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Check if user already used this promo code
    const { data: existingUsage } = await supabaseClient
      .from("promo_usage")
      .select("*")
      .eq("promo_code", promoCode)
      .eq("user_id", userData.user.id);

    if (existingUsage && existingUsage.length > 0) {
      return new Response(JSON.stringify({ error: "Promo code already used by this user" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Record promo code usage
    const { error: insertError } = await supabaseClient
      .from("promo_usage")
      .insert({
        promo_code: promoCode,
        user_id: userData.user.id,
        user_email: userData.user.email,
        used_at: new Date().toISOString(),
      });

    if (insertError) {
      console.error("Error recording promo usage:", insertError);
      return new Response(JSON.stringify({ error: "Failed to record usage" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
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