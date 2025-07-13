import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Check, AlertCircle } from "lucide-react";

type PromoCodeSectionProps = {
  onValidPromoCode: (isValid: boolean) => void;
  onFreeApplicationSuccess?: () => void;
  onFreeApplicationStart?: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  agreed: boolean;
  isFormValid: boolean;
};

export const PromoCodeSection: React.FC<PromoCodeSectionProps> = ({
  onValidPromoCode,
  onFreeApplicationSuccess,
  onFreeApplicationStart,
  handleSubmit,
  agreed,
  isFormValid,
}) => {
  const [promoCode, setPromoCode] = useState("");
  const [isValidPromo, setIsValidPromo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const { toast } = useToast();

  const checkPromoCode = async () => {
    if (!promoCode.trim()) {
      toast({
        title: "Please enter a promo code",
        variant: "destructive",
      });
      return;
    }

    if (promoCode.toLowerCase() !== "iamunvaccinated") {
      toast({
        title: "Invalid promo code",
        description: "Please check your promo code and try again",
        variant: "destructive",
      });
      setIsValidPromo(false);
      setChecked(true);
      onValidPromoCode(false);
      return;
    }

    setLoading(true);
    try {
      console.log("Checking promo code usage...");
      
      const { count, error } = await supabase
        .from("promo_usage")
        .select("*", { count: "exact", head: true })
        .eq("promo_code", "IamUnvaccinated");

      if (error) {
        console.error("Database error:", error);
        toast({
          title: "Could not verify promo code",
          description: "Database error occurred",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const usageCount = count || 0;
      console.log(`Current promo usage count: ${usageCount}`);

      if (usageCount >= 25) {
        toast({
          title: "Promo code limit reached",
          description: "This promo code has reached its 25 use maximum",
          variant: "destructive",
        });
        setIsValidPromo(false);
        setChecked(true);
        onValidPromoCode(false);
      } else {
        toast({
          title: "Valid promo code!",
          description: "You qualify for 1 year free access",
        });
        setIsValidPromo(true);
        setChecked(true);
        onValidPromoCode(true);
      }
    } catch (err) {
      console.error("Promo check exception:", err);
      toast({
        title: "Error checking promo code",
        description: "Please try again",
        variant: "destructive",
      });
      setIsValidPromo(false);
      setChecked(true);
      onValidPromoCode(false);
    } finally {
      setLoading(false);
    }
  };

  const submitFreeApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || !isFormValid || !isValidPromo) return;
    
    setLoading(true);
    
    try {
      console.log("Recording promo code usage...");
      
      if (onFreeApplicationStart) {
        onFreeApplicationStart();
      }
      
      // Record promo code usage
      const tempUserId = crypto.randomUUID();
      const tempEmail = `temp-${Date.now()}@temp.com`;

      const { error } = await supabase
        .from("promo_usage")
        .insert({
          promo_code: "IamUnvaccinated",
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
      
      if (onFreeApplicationSuccess) {
        onFreeApplicationSuccess();
      }
      handleSubmit(e);
    } catch (err) {
      console.error("Registration error:", err);
      toast({
        title: "Registration failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-6 border-yellow-200 bg-yellow-50/80">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Have a Promo Code?</h3>
            <p className="text-sm text-gray-600">Enter your promo code to get 1 year of free access</p>
          </div>
          
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter promo code (IamUnvaccinated)"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1"
              disabled={isValidPromo}
            />
            <Button
              type="button"
              variant="outline"
              onClick={checkPromoCode}
              disabled={loading || !promoCode.trim() || isValidPromo}
            >
              {loading ? "Checking..." : "Check"}
            </Button>
          </div>

          {checked && (
            <div className={`flex items-center gap-2 text-sm ${isValidPromo ? 'text-green-600' : 'text-red-600'}`}>
              {isValidPromo ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Valid promo code! You qualify for free access.</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4" />
                  <span>Invalid or expired promo code.</span>
                </>
              )}
            </div>
          )}

          {isValidPromo && (
            <Button
              type="button"
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              disabled={!agreed || loading || !isFormValid}
              onClick={submitFreeApplication}
            >
              {loading ? "Processing..." : "Submit Free Application (1 Year)"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};