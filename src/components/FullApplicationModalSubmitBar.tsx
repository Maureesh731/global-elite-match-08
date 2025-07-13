import React, { useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CryptoPaymentModal } from "@/components/CryptoPaymentModal";

type Props = {
  agreed: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  isFormValid: boolean;
};

// Subscription application payment button logic
export const FullApplicationModalSubmitBar: React.FC<Props> = ({
  agreed,
  handleSubmit,
  isFormValid,
}) => {
  const [loading, setLoading] = useState(false);
  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const { toast } = useToast();

  // Handles paid application logic
  const onPaidApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || !isFormValid) return;
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
  const onCryptoPaymentSuccess = () => {
    toast({
      title: "Payment Successful!",
      description: "Your crypto payment has been confirmed. Welcome to the platform!",
    });
    setShowCryptoModal(false);
    // Submit the application form after successful crypto payment
    handleSubmit(new Event('submit') as any);
  };

  return (
    <DialogFooter className="pt-4 space-y-3">
      <div className="w-full text-center mb-4">
        <p className="text-sm text-gray-600 mb-2">Choose your payment method:</p>
      </div>
      
      <Button
        type="button"
        variant="outline"
        className="w-full text-lg border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
        disabled={!agreed || loading || !isFormValid}
        onClick={() => setShowCryptoModal(true)}
      >
        Pay with USDC or Cryptocurrency ($24.50)
      </Button>
      
      <Button
        type="button"
        className="w-full text-lg bg-blue-900 hover:bg-blue-800"
        disabled={!agreed || loading || !isFormValid}
        onClick={onPaidApplication}
      >
        {loading ? "Redirecting to Payment..." : "Pay via Stripe ($24.50)"}
      </Button>
      
      <CryptoPaymentModal
        isOpen={showCryptoModal}
        onClose={() => setShowCryptoModal(false)}
        amount={24.50}
        currency="USD"
        onSuccess={onCryptoPaymentSuccess}
      />
    </DialogFooter>
  );
};