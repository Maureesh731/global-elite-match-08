import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { applicationData } = await req.json()
    
    // Send email using Resend API (you'll need to add RESEND_API_KEY to Supabase secrets)
    const emailData = {
      from: 'noreply@yourdomain.com', // Replace with your verified domain
      to: ['info@startff.com'],
      subject: 'New Application Submission',
      html: `
        <h2>New Application Received</h2>
        <p><strong>Full Name:</strong> ${applicationData.fullName}</p>
        <p><strong>Member Profile Name:</strong> ${applicationData.memberProfileName}</p>
        <p><strong>Age:</strong> ${applicationData.age}</p>
        <p><strong>Email:</strong> ${applicationData.email}</p>
        <p><strong>Phone:</strong> ${applicationData.phone}</p>
        <p><strong>LinkedIn:</strong> ${applicationData.linkedin}</p>
        <p><strong>Bio:</strong> ${applicationData.bio}</p>
        
        <h3>Health Disclosure</h3>
        <p><strong>Has Herpes:</strong> ${applicationData.hasHerpes}</p>
        <p><strong>Has HIV:</strong> ${applicationData.hasHIV}</p>
        <p><strong>Has HPV:</strong> ${applicationData.hasHPV}</p>
        <p><strong>Has Other STDs:</strong> ${applicationData.hasOtherSTDs}</p>
        <p><strong>Has Chronic Diseases:</strong> ${applicationData.hasChronicDiseases}</p>
        <p><strong>COVID Vaccinated:</strong> ${applicationData.covidVaccinated}</p>
        <p><strong>Uses Alcohol:</strong> ${applicationData.usesAlcohol}</p>
        <p><strong>Uses Drugs:</strong> ${applicationData.usesDrugs}</p>
        <p><strong>Uses Marijuana:</strong> ${applicationData.usesMarijuana}</p>
        <p><strong>Smokes Cigarettes:</strong> ${applicationData.smokesCigarettes}</p>
        <p><strong>Uses Prescription Drugs:</strong> ${applicationData.usesPrescriptionDrugs}</p>
        <p><strong>Disclosure Authorization:</strong> ${applicationData.disclosureAuthorization}</p>
        <p><strong>Wants Optional Testing:</strong> ${applicationData.wantsOptionalTesting}</p>
      `
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    })

    if (!response.ok) {
      throw new Error(`Failed to send email: ${response.statusText}`)
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Application sent successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error sending application email:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})