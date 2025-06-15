
import React from "react";
import { BackToHomeButton } from "@/components/BackToHomeButton";

export default function PaymentSuccess() {
  return (
    <div className="flex flex-col items-center py-24 min-h-[60vh]">
      <div className="bg-green-100 text-green-800 font-semibold rounded p-6 mb-4 shadow">
        Payment Successful! Thank you for subscribing.
      </div>
      <BackToHomeButton className="mt-4" />
    </div>
  );
}
