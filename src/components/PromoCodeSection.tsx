import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PromoCodeSectionProps = {
  showPromoInput: boolean;
  setShowPromoInput: (show: boolean) => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  onFreeApplication: (e: React.FormEvent) => void;
  agreed: boolean;
  loading: boolean;
  isFormValid: boolean;
};

export const PromoCodeSection: React.FC<PromoCodeSectionProps> = ({
  showPromoInput,
  setShowPromoInput,
  promoCode,
  setPromoCode,
  onFreeApplication,
  agreed,
  loading,
  isFormValid,
}) => {
  return (
    <>
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
    </>
  );
};