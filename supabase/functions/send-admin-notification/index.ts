import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AdminNotificationRequest {
  applicantName: string;
  applicantEmail: string;
  membershipType: string;
  applicationId: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { applicantName, applicantEmail, membershipType, applicationId }: AdminNotificationRequest = await req.json();

    console.log("Sending admin notification for application:", applicationId);

    const emailResponse = await resend.emails.send({
      from: "Untouchable Dating <onboarding@resend.dev>",
      to: ["ceo@maureesh.com"],
      subject: "New Membership Application Pending Approval",
      html: `
        <h1>New Membership Application</h1>
        <p>A new ${membershipType} membership application requires your approval.</p>
        
        <h2>Applicant Details:</h2>
        <ul>
          <li><strong>Name:</strong> ${applicantName}</li>
          <li><strong>Email:</strong> ${applicantEmail}</li>
          <li><strong>Membership Type:</strong> ${membershipType}</li>
          <li><strong>Application ID:</strong> ${applicationId}</li>
        </ul>
        
        <p>Please review and approve this application in the admin dashboard.</p>
        
        <p>Best regards,<br>Untouchable Dating System</p>
      `,
    });

    console.log("Admin notification sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-admin-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
