import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const usePromoCode = () => {
  const [promoCode, setPromoCode] = useState("");
  const [loading, setLoading] = useState(false);
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
  const processFreeApplication = async (
    onFreeApplicationStart?: () => void,
    onFreeApplicationSuccess?: () => void,
    handleSubmit?: (e: React.FormEvent) => void
  ) => {
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
        if (handleSubmit) {
          handleSubmit(new Event('submit') as any);
        }
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

  return {
    promoCode,
    setPromoCode,
    loading,
    processFreeApplication,
  };
};