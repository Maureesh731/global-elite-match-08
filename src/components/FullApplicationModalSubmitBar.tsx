import React, { useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

  // Check promo code validity
  const checkPromoCode = async () => {
    if (promoCode.toLowerCase() !== "imunvaxxed") {
      toast.error("Invalid promo code");
      return false;
    }

    try {
      const { data, error } = await supabase.functions.invoke("check-promo-usage");
      if (error || !data) {
        toast.error("Could not verify promo code");
        return false;
      }
      
      if (data.usageCount >= 25) {
        toast.error("Promo code limit reached (25 uses maximum)");
        return false;
      }

      return true;
    } catch (err) {
      toast.error("Error checking promo code");
      return false;
    }
  };

  // Handle free application with promo code
  const onFreeApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    
    setLoading(true);
    const isValidPromo = await checkPromoCode();
    
    if (isValidPromo) {
      try {
        const { error } = await supabase.functions.invoke("use-promo-code", {
          body: { promoCode }
        });
        
        if (error) {
          toast.error("Could not process free registration");
          setLoading(false);
          return;
        }
        
        toast.success("Free registration approved! Welcome to Untouchable Dating.");
        handleSubmit(e);
      } catch (err) {
        toast.error("Registration failed. Please try again.");
      }
    }
    setLoading(false);
  };

  // Handles paid application logic
  const onPaidApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setLoading(true);
    toast.info("Creating secure payment session...");
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout");
      if (error || !data?.url) {
        toast.error("Could not start payment session. Try again.");
        setLoading(false);
        return;
      }
      // Open Stripe checkout in a new tab (recommended for Stripe security)
      window.open(data.url, "_blank");
      toast.success("Payment page opened. Complete your subscription in Stripe.");
    } catch (err) {
      toast.error("Something went wrong. Please refresh and try again.");
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
            placeholder="Enter promo code"
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
            {loading ? "Processing..." : "Submit Free Application"}
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
          Have a promo code?
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