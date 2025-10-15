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

  // Submit application without payment (payment happens after approval)
  const onSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || !isFormValid) return;
    
    // Just submit the form - no payment needed at application stage
    handleSubmit(e);
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
    <DialogFooter className="pt-4 space-y-3 bg-gray-900">
      <div className="w-full space-y-3">
        <div className="text-center">
          <h4 className="text-white font-semibold mb-2">Submit Your Application</h4>
          <p className="text-sm text-gray-300 mb-4">Payment will be requested after admin approval</p>
        </div>
        
        <Button
          type="submit"
          className="w-full py-4 text-base font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white border-0 shadow-lg transform hover:scale-105 transition-all duration-200"
          disabled={!agreed || !isFormValid}
          onClick={onSubmitApplication}
        >
          Submit Application
        </Button>
      </div>
    </DialogFooter>
  );
};