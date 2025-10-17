import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackToHomeButton } from "@/components/BackToHomeButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    processPaymentCompletion();
  }, []);

  const processPaymentCompletion = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please log in to complete your application");
        navigate('/login');
        return;
      }

      // Update application to paid status
      const { error: updateError } = await supabase
        .from('applications')
        .update({ membership_type: 'paid' })
        .eq('user_id', user.id);

      if (updateError) {
        console.error('Error updating application:', updateError);
        toast.error("Error processing payment. Please contact support.");
        setProcessing(false);
        return;
      }

      // Update profile to paid status
      await supabase
        .from('profiles')
        .update({ membership_type: 'paid' })
        .eq('user_id', user.id);

      // Enable messaging for paid user
      await supabase
        .from('message_restrictions')
        .upsert({
          user_id: user.id,
          can_send_messages: true
        });

      setSuccess(true);
      toast.success("Payment successful! Your application has been upgraded to paid membership.");
      
      // Redirect to welcome page after 3 seconds
      setTimeout(() => {
        navigate('/welcome');
      }, 3000);
    } catch (error) {
      console.error('Payment processing error:', error);
      toast.error("An error occurred. Please contact support.");
    } finally {
      setProcessing(false);
    }
  };

  if (processing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-gray-800 border-gray-700">
          <CardContent className="pt-6 text-center">
            <Loader2 className="w-16 h-16 animate-spin text-purple-600 mx-auto mb-4" />
            <p className="text-white text-lg">Processing your payment...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-gray-800 border-gray-700">
        <CardHeader className="text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-white text-2xl">Payment Successful!</CardTitle>
          <CardDescription className="text-gray-300">
            Thank you for your purchase
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
            <p className="text-green-400 text-sm text-center">
              Your application has been upgraded to paid membership. You now have full access to all features!
            </p>
          </div>
          
          <p className="text-gray-400 text-center text-sm">
            Redirecting you to your account...
          </p>
          
          <BackToHomeButton className="w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
