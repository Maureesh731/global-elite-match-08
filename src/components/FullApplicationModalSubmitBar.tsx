import React, { useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Props = {
  agreed: boolean;
  handleSubmit: (e: React.FormEvent) => void;
};

// Subscription application payment button logic
export const FullApplicationModalSubmitBar: React.FC<Props> = ({
  agreed,
  handleSubmit,
}) => {
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [showPromoInput, setShowPromoInput] = useState(false);
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
      const { data, error } = await supabase.functions.invoke("check-promo-usage");
      if (error || !data) {
        console.error("Promo check error:", error);
        toast({
          title: "Could not verify promo code",
          description: "Please try again or contact support",
          variant: "destructive",
        });
        return false;
      }
      
      if (data.usageCount >= 25) {
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
    if (!agreed) return;
    
    setLoading(true);
    console.log("Checking promo code:", promoCode);
    
    const isValidPromo = await checkPromoCode();
    
    if (isValidPromo) {
      try {
        console.log("Promo code valid, recording usage...");
        const { error } = await supabase.functions.invoke("use-promo-code", {
          body: { promoCode: promoCode }
        });
        
        if (error) {
          console.error("Promo use error:", error);
          toast({
            title: "Could not process free registration",
            description: "Please try again or contact support",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        
        console.log("Promo code used successfully, submitting application...");
        toast({
          title: "Success!",
          description: "Free registration approved! You now have 1 year of free access.",
        });
        
        // Submit the application form
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
    if (!agreed) return;
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
            disabled={!agreed || loading || !promoCode}
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
        className="w-full text-lg bg-blue-900 hover:bg-blue-800"
        disabled={!agreed || loading}
        onClick={onPaidApplication}
      >
        {loading ? "Redirecting to Payment..." : "Submit & Pay $24.50/mo"}
      </Button>
    </DialogFooter>
  );
};