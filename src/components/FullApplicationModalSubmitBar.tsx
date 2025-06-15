
import React, { useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
    <DialogFooter className="pt-4">
      <Button
        type="button"
        className="w-full text-lg bg-blue-900 hover:bg-blue-800"
        disabled={!agreed || loading}
        onClick={onPaidApplication}
      >
        {loading ? "Redirecting to Payment..." : "Submit & Pay $49.95/mo"}
      </Button>
    </DialogFooter>
  );
};
