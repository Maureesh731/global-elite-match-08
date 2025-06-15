
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function PaymentCanceled() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center py-24 min-h-[60vh]">
      <div className="bg-red-100 text-red-800 font-semibold rounded p-6 mb-4 shadow">
        Payment canceled or failed. No charges were made.
      </div>
      <Button className="mt-4" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </div>
  );
}
