import React, { useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { PromoCodeSection } from "@/components/PromoCodeSection";
import { PaymentButtons } from "@/components/PaymentButtons";
import { usePromoCode } from "@/hooks/usePromoCode";
import { usePaymentHandlers } from "@/hooks/usePaymentHandlers";

type Props = {
  agreed: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  onFreeApplicationSuccess?: () => void;
  onFreeApplicationStart?: () => void;
  isFormValid: boolean;
};

export const FullApplicationModalSubmitBar: React.FC<Props> = ({
  agreed,
  handleSubmit,
  onFreeApplicationSuccess,
  onFreeApplicationStart,
  isFormValid,
}) => {
  const [showPromoInput, setShowPromoInput] = useState(false);
  
  const { promoCode, setPromoCode, loading: promoLoading, processFreeApplication } = usePromoCode();
  const { loading, showCryptoModal, setShowCryptoModal, onPaidApplication, onCryptoPaymentSuccess } = usePaymentHandlers();

  const onFreeApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || !isFormValid) return;
    
    await processFreeApplication(onFreeApplicationStart, onFreeApplicationSuccess, handleSubmit);
  };

  const handleCryptoPaymentSuccess = () => {
    onCryptoPaymentSuccess(handleSubmit);
  };

  const handlePaidApplication = async (e: React.FormEvent) => {
    if (!agreed || !isFormValid) return;
    await onPaidApplication(e);
  };

  return (
    <DialogFooter className="pt-4 space-y-3">
      <PromoCodeSection
        showPromoInput={showPromoInput}
        setShowPromoInput={setShowPromoInput}
        promoCode={promoCode}
        setPromoCode={setPromoCode}
        onFreeApplication={onFreeApplication}
        agreed={agreed}
        loading={promoLoading}
        isFormValid={isFormValid}
      />
      
      <PaymentButtons
        agreed={agreed}
        loading={loading}
        isFormValid={isFormValid}
        onPaidApplication={handlePaidApplication}
        showCryptoModal={showCryptoModal}
        setShowCryptoModal={setShowCryptoModal}
        onCryptoPaymentSuccess={handleCryptoPaymentSuccess}
      />
    </DialogFooter>
  );
};