
import React from "react";
import { BackToHomeButton } from "@/components/BackToHomeButton";

export default function PaymentCanceled() {
  return (
    <div className="flex flex-col items-center py-24 min-h-[60vh]">
      <div className="bg-red-100 text-red-800 font-semibold rounded p-6 mb-4 shadow">
        Payment canceled or failed. No charges were made.
      </div>
      <BackToHomeButton className="mt-4" />
    </div>
  );
}
