import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    const { formData, isFreeApplication } = await req.json();

    if (!formData || !formData.email || !formData.password) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 1. Create auth user via admin API (bypasses email confirmation)
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: formData.email,
      password: formData.password,
      email_confirm: false, // require email confirmation
      user_metadata: {
        first_name: formData.firstName,
        last_name: formData.lastName
      }
    });

    if (authError || !authData.user) {
      console.error('Auth user creation error:', authError);
      return new Response(
        JSON.stringify({ error: authError?.message || 'Failed to create user account' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = authData.user.id;
    console.log('Auth user created:', userId);

    // 2. Insert application using service role (bypasses RLS)
    const applicationData = {
      user_id: userId,
      first_name: formData.firstName,
      last_name: formData.lastName,
      member_profile_name: formData.memberProfileName,
      age: formData.age,
      email: formData.email,
      phone: formData.phone,
      linkedin: formData.linkedin || null,
      bio: formData.bio,
      username: formData.username,
      has_herpes: formData.hasHerpes,
      has_hiv: formData.hasHIV,
      has_hpv: formData.hasHPV,
      has_other_stds: formData.hasOtherSTDs,
      has_chronic_diseases: formData.hasChronicDiseases,
      covid_vaccinated: formData.covidVaccinated,
      uses_alcohol: formData.usesAlcohol,
      uses_drugs: formData.usesDrugs,
      uses_marijuana: formData.usesMarijuana,
      smokes_cigarettes: formData.smokesCigarettes,
      uses_prescription_drugs: formData.usesPrescriptionDrugs,
      disclosure_authorization: formData.disclosureAuthorization,
      wants_optional_testing: formData.wantsOptionalTesting,
      membership_type: isFreeApplication ? 'free' : 'paid',
      status: 'pending'
    };

    const { error: dbError } = await supabaseAdmin
      .from('applications')
      .insert([applicationData]);

    if (dbError) {
      console.error('Application insert error:', dbError);
      // Rollback: delete the auth user we just created
      await supabaseAdmin.auth.admin.deleteUser(userId);
      return new Response(
        JSON.stringify({ error: 'Failed to save application. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 3. Create initial profile record
    const gender = (formData.memberProfileName?.toLowerCase()?.includes('lady') ||
                    formData.memberProfileName?.toLowerCase()?.includes('miss') ||
                    formData.memberProfileName?.toLowerCase()?.includes('ms')) ? 'female' : 'male';

    await supabaseAdmin
      .from('profiles')
      .insert([{
        user_id: userId,
        full_name: `${formData.firstName} ${formData.lastName}`,
        age: formData.age,
        bio: formData.bio,
        gender,
        membership_type: isFreeApplication ? 'free' : 'paid',
        status: 'pending',
        photo_urls: []
      }]);

    // 4. Create message restrictions for free users
    if (isFreeApplication) {
      await supabaseAdmin
        .from('message_restrictions')
        .insert([{ user_id: userId, can_send_messages: false }]);
    }

    // 5. Send email notification via Resend
    try {
      const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
      const sanitize = (text: string) => (text || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      await resend.emails.send({
        from: 'Untouchable Dating <onboarding@resend.dev>',
        to: ['ceo@maureesh.com'],
        subject: `🔥 New Member Application: ${sanitize(formData.firstName)} ${sanitize(formData.lastName)}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
            <div style="background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;padding:30px;border-radius:10px 10px 0 0;text-align:center">
              <h1>🔥 New Application Review Required</h1>
            </div>
            <div style="background:#f8f9fa;padding:30px;border-radius:0 0 10px 10px">
              <p><strong>Name:</strong> ${sanitize(formData.firstName)} ${sanitize(formData.lastName)}</p>
              <p><strong>Email:</strong> ${sanitize(formData.email)}</p>
              <p><strong>Phone:</strong> ${sanitize(formData.phone)}</p>
              <p><strong>Age:</strong> ${sanitize(formData.age)}</p>
              <p><strong>LinkedIn:</strong> ${sanitize(formData.linkedin || 'Not provided')}</p>
              <p><strong>Membership:</strong> ${isFreeApplication ? 'Free' : 'Paid'}</p>
              <p><strong>Bio:</strong> ${sanitize(formData.bio)}</p>
              <hr/>
              <p>Please review this application in your admin dashboard.</p>
            </div>
          </div>
        `
      });
    } catch (emailErr) {
      console.error('Email notification error (non-fatal):', emailErr);
    }

    return new Response(
      JSON.stringify({ success: true, userId }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error in submit-application:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred. Please try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
