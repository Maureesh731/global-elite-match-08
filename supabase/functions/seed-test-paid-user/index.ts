import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { email, password, username, role } = await req.json();
    if (!email || !password || !username) {
      return new Response(JSON.stringify({ error: "email, password, username required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Find or create auth user
    let userId: string | null = null;
    const { data: list } = await admin.auth.admin.listUsers();
    const existing = list?.users?.find((u) => u.email?.toLowerCase() === email.toLowerCase());

    if (existing) {
      userId = existing.id;
      await admin.auth.admin.updateUserById(userId, { password, email_confirm: true });
    } else {
      const { data: created, error: cErr } = await admin.auth.admin.createUser({
        email, password, email_confirm: true,
      });
      if (cErr) throw cErr;
      userId = created.user!.id;
    }

    const isLady = role === "lady";
    const gender = isLady ? "female" : "male";
    const profileName = isLady ? "Lady Test" : "Gentleman Test";

    // Upsert application
    const { data: existingApp } = await admin
      .from("applications").select("id").eq("user_id", userId).maybeSingle();

    if (existingApp) {
      await admin.from("applications").update({
        status: "approved", membership_type: "paid", username, email,
      }).eq("id", existingApp.id);
    } else {
      await admin.from("applications").insert({
        user_id: userId, email, username,
        first_name: isLady ? "Lady" : "Maurice", last_name: "Test",
        member_profile_name: profileName, age: "35", phone: "0000000000",
        membership_type: "paid", status: "approved",
        wants_optional_testing: "no", disclosure_authorization: "yes",
        uses_prescription_drugs: "no", smokes_cigarettes: "no",
        uses_marijuana: "no", uses_drugs: "no", uses_alcohol: "no",
        covid_vaccinated: "yes", has_chronic_diseases: "no",
        has_other_stds: "no", has_hpv: "no", has_hiv: "no", has_herpes: "no",
      });
    }

    // Upsert profile
    const { data: existingProfile } = await admin
      .from("profiles").select("id").eq("user_id", userId).maybeSingle();

    if (existingProfile) {
      await admin.from("profiles").update({
        status: "approved", membership_type: "paid", gender,
        full_name: profileName, age: "35",
      }).eq("id", existingProfile.id);
    } else {
      await admin.from("profiles").insert({
        user_id: userId, full_name: profileName, age: "35",
        gender, membership_type: "paid", status: "approved",
      });
    }

    // Enable messaging
    await admin.from("message_restrictions").upsert(
      { user_id: userId, can_send_messages: true },
      { onConflict: "user_id" },
    );

    return new Response(JSON.stringify({ ok: true, userId, username }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
