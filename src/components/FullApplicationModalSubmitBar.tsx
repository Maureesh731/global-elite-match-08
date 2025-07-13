import React, { useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CryptoPaymentModal } from "@/components/CryptoPaymentModal";

type Props = {
  agreed: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  onFreeApplicationSuccess?: () => void;
  onFreeApplicationStart?: () => void;
  isFormValid: boolean;
};

// Subscription application payment button logic
export const FullApplicationModalSubmitBar: React.FC<Props> = ({
  agreed,
  handleSubmit,
  onFreeApplicationSuccess,
  onFreeApplicationStart,
  isFormValid,
}) => {
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const { toast } = useToast();

  // Check promo code validity
  const checkPromoCode = async () => {
    if (promoCode.toLowerCase() !== "imunvaxxed") {
      toast({
        title: "Invalid promo code",
        description: "Please check your promo code and try again",
        variant: "destructive",
      });
      return false;
    }

    try {
      console.log("Checking promo code usage directly from database...");
      
      // Check current usage count directly from database
      const { count, error } = await supabase
        .from("promo_usage")
        .select("*", { count: "exact", head: true })
        .eq("promo_code", "ImUnvaxxed");

      console.log("Promo usage check result:", { count, error });

      if (error) {
        console.error("Database error:", error);
        toast({
          title: "Could not verify promo code",
          description: "Database error occurred",
          variant: "destructive",
        });
        return false;
      }

      const usageCount = count || 0;
      console.log(`Current promo usage count: ${usageCount}`);

      if (usageCount >= 25) {
        toast({
          title: "Promo code limit reached",
          description: "This promo code has reached its 25 use maximum",
          variant: "destructive",
        });
        return false;
      }

      return true;
    } catch (err) {
      console.error("Promo check exception:", err);
      toast({
        title: "Error checking promo code",
        description: "Please try again",
        variant: "destructive",
      });
      return false;
    }
  };

  // Handle free application with promo code
  const onFreeApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || !isFormValid) return;
    
    setLoading(true);
    console.log("Checking promo code:", promoCode);
    
    const isValidPromo = await checkPromoCode();
    
    if (isValidPromo) {
      try {
        console.log("Promo code valid, recording usage directly...");
        
        // Notify parent this is a free application
        if (onFreeApplicationStart) {
          onFreeApplicationStart();
        }
        
        // Record promo code usage directly in database
        const tempUserId = crypto.randomUUID();
        const tempEmail = `temp-${Date.now()}@temp.com`;

        const { error } = await supabase
          .from("promo_usage")
          .insert({
            promo_code: "ImUnvaxxed",
            user_id: tempUserId,
            user_email: tempEmail,
            used_at: new Date().toISOString(),
          });

        if (error) {
          console.error("Database insert error:", error);
          toast({
            title: "Could not process free registration",
            description: "Database error occurred",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        
        console.log("Promo code usage recorded successfully");
        toast({
          title: "Success!",
          description: "Free registration approved! You now have 1 year of free access.",
        });
        
        // Trigger success state and submit the application form
        if (onFreeApplicationSuccess) {
          onFreeApplicationSuccess();
        }
        handleSubmit(e);
      } catch (err) {
        console.error("Registration error:", err);
        toast({
          title: "Registration failed",
          description: "Please try again",
          variant: "destructive",
        });
      }
    }
    setLoading(false);
  };

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
      {showPromoInput && (
        <div className="w-full">
          <Input
            type="text"
            placeholder="Enter promo code (ImUnvaxxed)"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="mb-2"
          />
          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={!agreed || loading || !promoCode || !isFormValid}
            onClick={onFreeApplication}
          >
            {loading ? "Processing..." : "Submit Free Application (1 Year)"}
          </Button>
        </div>
      )}
      
      {!showPromoInput && (
        <Button
          type="button"
          variant="ghost"
          className="w-full text-sm"
          onClick={() => setShowPromoInput(true)}
        >
          Have a promo code for 1 year free?
        </Button>
      )}
      
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