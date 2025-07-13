import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const usePaymentHandlers = () => {
  const [loading, setLoading] = useState(false);
  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const { toast } = useToast();

  // Handles paid application logic
  const onPaidApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    toast({
      title: "Creating payment session...",
      description: "Please wait while we set up your payment",
    });
    
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout");
      if (error || !data?.url) {
        console.error("Checkout error:", error);
        toast({
          title: "Payment Error",
          description: "Could not start payment session. Try again.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      // Open Stripe checkout in a new tab (recommended for Stripe security)
      window.open(data.url, "_blank");
      toast({
        title: "Payment page opened",
        description: "Complete your subscription in the new tab",
      });
    } catch (err) {
      console.error("Payment exception:", err);
      toast({
        title: "Something went wrong",
        description: "Please refresh and try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle crypto payment success
  const onCryptoPaymentSuccess = (handleSubmit: (e: React.FormEvent) => void) => {
    toast({
      title: "Payment Successful!",
      description: "Your crypto payment has been confirmed. Welcome to the platform!",
    });
    setShowCryptoModal(false);
    // Submit the application form after successful crypto payment
    handleSubmit(new Event('submit') as any);
  };

  return {
    loading,
    showCryptoModal,
    setShowCryptoModal,
    onPaidApplication,
    onCryptoPaymentSuccess,
  };
};