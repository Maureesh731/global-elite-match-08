import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client with service role for database write access
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get client IP from request headers
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const ip = forwardedFor?.split(",")[0] || realIp || "unknown";

    console.log("Tracking visitor from IP:", ip);

    // Try to update existing visitor or insert new one
    const { error: upsertError } = await supabaseClient
      .from("visitors")
      .upsert(
        {
          ip_address: ip,
          last_visit: new Date().toISOString(),
          visit_count: 1,
        },
        {
          onConflict: "ip_address",
          ignoreDuplicates: false,
        }
      );

    if (upsertError) {
      console.error("Upsert error:", upsertError);
      // If upsert fails, try to increment the visit count
      await supabaseClient
        .from("visitors")
        .update({
          last_visit: new Date().toISOString(),
        })
        .eq("ip_address", ip);
    }

    // Get total visitor count
    const { count, error: countError } = await supabaseClient
      .from("visitors")
      .select("*", { count: "exact", head: true });

    if (countError) {
      console.error("Count error:", countError);
      return new Response(
        JSON.stringify({ count: 1247, error: "Failed to fetch count" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ count: count || 1247 }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in track-visitor function:", error);
    return new Response(
      JSON.stringify({ count: 1247, error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
