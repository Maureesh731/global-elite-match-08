import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { applicationData } = await req.json();
    
    console.log('Sending application review email for:', applicationData.email);
    
    // Create HTML email template for application review
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
            .section { background: white; margin: 20px 0; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .field { margin: 10px 0; }
            .label { font-weight: bold; color: #4f46e5; }
            .value { margin-left: 10px; }
            .health-section { border-left: 4px solid #ef4444; }
            .action-buttons { text-align: center; margin: 30px 0; }
            .btn { display: inline-block; padding: 12px 24px; margin: 10px; text-decoration: none; border-radius: 6px; font-weight: bold; }
            .btn-approve { background: #10b981; color: white; }
            .btn-deny { background: #ef4444; color: white; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔥 New Application Review Required</h1>
              <p>Untouchable Dating - Member Application</p>
            </div>
            
            <div class="content">
              <div class="section">
                <h2>👤 Personal Information</h2>
                <div class="field"><span class="label">Full Name:</span><span class="value">${applicationData.first_name} ${applicationData.last_name}</span></div>
                <div class="field"><span class="label">Member Profile Name:</span><span class="value">${applicationData.member_profile_name}</span></div>
                <div class="field"><span class="label">Username:</span><span class="value">${applicationData.username}</span></div>
                <div class="field"><span class="label">Age:</span><span class="value">${applicationData.age}</span></div>
                <div class="field"><span class="label">Email:</span><span class="value">${applicationData.email}</span></div>
                <div class="field"><span class="label">Phone:</span><span class="value">${applicationData.phone}</span></div>
                <div class="field"><span class="label">LinkedIn:</span><span class="value">${applicationData.linkedin || 'Not provided'}</span></div>
              </div>

              <div class="section">
                <h2>📝 Bio</h2>
                <p>${applicationData.bio}</p>
              </div>
              
              <div class="section health-section">
                <h2>🏥 Health Disclosure</h2>
                <div class="field"><span class="label">Has Herpes:</span><span class="value">${applicationData.has_herpes}</span></div>
                <div class="field"><span class="label">Has HIV:</span><span class="value">${applicationData.has_hiv}</span></div>
                <div class="field"><span class="label">Has HPV:</span><span class="value">${applicationData.has_hpv}</span></div>
                <div class="field"><span class="label">Has Other STDs:</span><span class="value">${applicationData.has_other_stds}</span></div>
                <div class="field"><span class="label">Has Chronic Diseases:</span><span class="value">${applicationData.has_chronic_diseases}</span></div>
                <div class="field"><span class="label">COVID Vaccinated:</span><span class="value">${applicationData.covid_vaccinated}</span></div>
                <div class="field"><span class="label">Uses Alcohol:</span><span class="value">${applicationData.uses_alcohol}</span></div>
                <div class="field"><span class="label">Uses Drugs:</span><span class="value">${applicationData.uses_drugs}</span></div>
                <div class="field"><span class="label">Uses Marijuana:</span><span class="value">${applicationData.uses_marijuana}</span></div>
                <div class="field"><span class="label">Smokes Cigarettes:</span><span class="value">${applicationData.smokes_cigarettes}</span></div>
                <div class="field"><span class="label">Uses Prescription Drugs:</span><span class="value">${applicationData.uses_prescription_drugs}</span></div>
                <div class="field"><span class="label">Disclosure Authorization:</span><span class="value">${applicationData.disclosure_authorization}</span></div>
                <div class="field"><span class="label">Wants Optional Testing:</span><span class="value">${applicationData.wants_optional_testing}</span></div>
              </div>

              <div class="section">
                <p><strong>⚠️ Action Required:</strong> Please review this application and take appropriate action through your admin panel.</p>
                <p><em>This application is pending your approval to grant the member access to the platform.</em></p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: 'Untouchable Dating <onboarding@resend.dev>',
      to: ['ceo@startff.com'],
      subject: `🔥 New Member Application: ${applicationData.first_name} ${applicationData.last_name}`,
      html: htmlContent,
    });

    console.log('Email sent successfully:', emailResponse);

    return new Response(
      JSON.stringify({ success: true, message: 'Application review email sent successfully', emailId: emailResponse.id }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error sending application email:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});