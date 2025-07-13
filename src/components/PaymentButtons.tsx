import React from "react";
import { Button } from "@/components/ui/button";
import { CryptoPaymentModal } from "@/components/CryptoPaymentModal";

type PaymentButtonsProps = {
  agreed: boolean;
  loading: boolean;
  isFormValid: boolean;
  onPaidApplication: (e: React.FormEvent) => void;
  showCryptoModal: boolean;
  setShowCryptoModal: (show: boolean) => void;
  onCryptoPaymentSuccess: () => void;
};

export const PaymentButtons: React.FC<PaymentButtonsProps> = ({
  agreed,
  loading,
  isFormValid,
  onPaidApplication,
  showCryptoModal,
  setShowCryptoModal,
  onCryptoPaymentSuccess,
}) => {
  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="w-full text-lg border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
        disabled={!agreed || loading || !isFormValid}
        onClick={() => setShowCryptoModal(true)}
      >
        Renew your membership with USDC or Cryptocurrency
      </Button>
      
      <Button
        type="button"
        className="w-full text-lg bg-blue-900 hover:bg-blue-800"
        disabled={!agreed || loading || !isFormValid}
        onClick={onPaidApplication}
      >
        {loading ? "Redirecting to Payment..." : "Renew your membership via Stripe"}
      </Button>
      
      <CryptoPaymentModal
        isOpen={showCryptoModal}
        onClose={() => setShowCryptoModal(false)}
        amount={24.50}
        currency="USD"
        onSuccess={onCryptoPaymentSuccess}
      />
    </>
  );
};