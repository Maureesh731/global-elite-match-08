import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// HTML sanitization function to prevent XSS attacks
const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[CONTACT] Processing contact form submission");
    
    const { name, email, subject, message }: ContactRequest = await req.json();

    // Validate input
    if (!name || !email || !subject || !message) {
      console.error("[CONTACT] Missing required fields");
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("[CONTACT] Invalid email format");
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("[CONTACT] Sending email notification");

    // Send email to CEO (with sanitized user input)
    const emailResponse = await resend.emails.send({
      from: "Untouchable Dating <onboarding@resend.dev>",
      to: ["ceo@maureesh.com"],
      replyTo: email,
      subject: `Contact Form: ${escapeHtml(subject)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>From:</strong> ${escapeHtml(name)}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #374151; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #7c3aed; border-radius: 4px;">
              ${escapeHtml(message).replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p>This email was sent from the Untouchable Dating contact form.</p>
            <p>Reply directly to this email to respond to ${escapeHtml(name)}.</p>
          </div>
        </div>
      `,
    });

    if (emailResponse.error) {
      console.error("[CONTACT] Resend error:", emailResponse.error);
      throw emailResponse.error;
    }

    console.log("[CONTACT] Email sent successfully:", emailResponse.data?.id);

    // Send confirmation email to user (with sanitized user input)
    await resend.emails.send({
      from: "Untouchable Dating <onboarding@resend.dev>",
      to: [email],
      subject: "We received your message!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">Thank you for contacting us, ${escapeHtml(name)}!</h2>
          
          <p style="color: #374151; line-height: 1.6;">
            We have received your message and our team will get back to you as soon as possible, 
            usually within 24 hours.
          </p>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0; color: #6b7280;"><strong>Your message:</strong></p>
            <p style="margin: 10px 0; color: #374151;">${escapeHtml(message.substring(0, 200))}${message.length > 200 ? '...' : ''}</p>
          </div>
          
          <p style="color: #374151; line-height: 1.6;">
            Best regards,<br>
            <strong>The Untouchable Dating Team</strong>
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p>This is an automated confirmation email. Please do not reply directly to this message.</p>
          </div>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("[CONTACT] Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
