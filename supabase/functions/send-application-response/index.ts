import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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
    const { applicationId, status, message, applicantName, applicantEmail } = await req.json()

    // Validate inputs
    if (!applicationId || typeof applicationId !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid applicationId' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    if (status !== 'approved' && status !== 'denied') {
      return new Response(
        JSON.stringify({ error: 'Invalid status. Must be "approved" or "denied"' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    if (!applicantEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applicantEmail)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Sanitize HTML function to prevent XSS
    const sanitizeHtml = (text: string): string => {
      if (!text) return ''
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
    }
    
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Update application status in database
    const { error: updateError } = await supabase
      .from('applications')
      .update({ 
        status: status,
        review_notes: message,
        reviewed_at: new Date().toISOString()
      })
      .eq('id', applicationId)
    
    if (updateError) {
      throw new Error(`Failed to update application: ${updateError.message}`)
    }

    // Send email using Resend API
    const emailData = {
      from: 'noreply@yourdomain.com', // Replace with your verified domain
      to: [applicantEmail],
      subject: status === 'approved' ? 'Welcome to StartFF!' : 'Application Update - StartFF',
      html: status === 'approved' ? `
        <h2>Congratulations ${sanitizeHtml(applicantName)}!</h2>
        <p>We're excited to inform you that your application has been approved!</p>
        <p><strong>Message from our team:</strong></p>
        <p>${sanitizeHtml(message)}</p>
        <p><strong>Next Step:</strong></p>
        <p>To activate your membership and start connecting with other members, please complete your subscription setup:</p>
        <p><a href="${Deno.env.get('SITE_URL') || window.location.origin}/subscription-setup" style="display: inline-block; background: linear-gradient(to right, #9333ea, #2563eb); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 16px 0;">Activate Membership</a></p>
        <p>Welcome to the StartFF community!</p>
        <p>Best regards,<br>The StartFF Team</p>
      ` : `
        <h2>Application Update</h2>
        <p>Dear ${sanitizeHtml(applicantName)},</p>
        <p>Thank you for your interest in StartFF. After careful review, we have decided not to move forward with your application at this time.</p>
        <p><strong>Feedback:</strong></p>
        <p>${sanitizeHtml(message)}</p>
        <p>We appreciate the time you took to apply and wish you the best.</p>
        <p>Best regards,<br>The StartFF Team</p>
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
      JSON.stringify({ success: true, message: 'Application response sent successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error sending application response:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})