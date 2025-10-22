import React, { useRef, useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FullApplicationModalHeader } from "./FullApplicationModalHeader";
import { FullApplicationModalDisclaimer } from "./FullApplicationModalDisclaimer";
import { FullApplicationModalFormFields } from "./FullApplicationModalFormFields";
import { FullApplicationModalSubmitBar } from "./FullApplicationModalSubmitBar";
import { PromoCodeSection } from "./PromoCodeSection";
import { ApplicationSuccessMessage } from "./ApplicationSuccessMessage";
import { useApplicationForm } from "@/hooks/useApplicationForm";
import { useApplicationSubmission } from "@/hooks/useApplicationSubmission";
import { useToast } from "@/hooks/use-toast";

type FullApplicationModalProps = {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: any) => void;
  isFreeProfile?: boolean;
};

export const FullApplicationModal: React.FC<FullApplicationModalProps> = ({
  children,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  onSubmit,
  isFreeProfile = false,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const onOpenChange = controlledOnOpenChange || setInternalOpen;

  const { form, handleInput, isFormValid, resetForm } = useApplicationForm();
  const { submitApplication } = useApplicationSubmission();
  const { toast } = useToast();
  
  const [agreed, setAgreed] = useState(false);
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false);
  const [isProcessingFreeApp, setIsProcessingFreeApp] = useState(false);
  const [hasValidPromoCode, setHasValidPromoCode] = useState(false);

  const scrollContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && scrollContentRef.current) {
      scrollContentRef.current.scrollTop = 0;
    }
  }, [open]);

  const handleModalClose = () => {
    setShowSubmitSuccess(false);
    onOpenChange(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = isFormValid(agreed);
    console.log("=== FORM SUBMISSION DEBUG ===");
    console.log("Form data:", form);
    console.log("Is valid:", isValid);
    console.log("Agreed:", agreed);
    console.log("isFreeProfile:", isFreeProfile);
    console.log("isProcessingFreeApp:", isProcessingFreeApp);
    
    // Check individual validation criteria
    console.log("Validation breakdown:");
    console.log("- firstName:", form.firstName);
    console.log("- lastName:", form.lastName);
    console.log("- memberProfileName:", form.memberProfileName);
    console.log("- age:", form.age, ">=18?", parseInt(form.age) >= 18);
    console.log("- email:", form.email);
    console.log("- phone:", form.phone);
    console.log("- linkedin:", form.linkedin);
    console.log("- bio:", form.bio);
    console.log("- username:", form.username);
    console.log("- password length:", form.password.length);
    console.log("- passwords match:", form.password === form.confirmPassword);
    console.log("- agreed to terms:", agreed);
    
    if (!isValid) {
      console.error("Form validation failed");
      toast({
        title: "Form incomplete",
        description: "Please fill all required fields and agree to the terms",
        variant: "destructive"
      });
      return;
    }
    
    console.log("Form is valid, proceeding with submission...");
    
    const currentIsFreeApplication = isFreeProfile || isProcessingFreeApp;
    
    // All applications go through normal submission
    await submitApplication(form, currentIsFreeApplication, () => {
      if (onSubmit) onSubmit(form);
      setShowSubmitSuccess(true);
      resetForm();
      
      setTimeout(() => {
        handleModalClose();
      }, 1200);
    });
  };

  const triggerButton = children ? (
    <div onClick={() => onOpenChange(true)}>{children}</div>
  ) : null;

  return (
    <>
      {triggerButton}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg p-0 bg-gray-900 border-gray-700">
          <FullApplicationModalHeader onClose={handleModalClose} />
          <div
            ref={scrollContentRef}
            className="overflow-y-auto max-h-[calc(80vh-64px)] px-6 pt-2 bg-gray-900 text-white"
            tabIndex={-1}
          >
            {showSubmitSuccess ? (
              <ApplicationSuccessMessage 
                isFreeApplication={isFreeProfile || isProcessingFreeApp}
              />
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <FullApplicationModalFormFields
                  form={form}
                  handleInput={handleInput}
                />
                <FullApplicationModalDisclaimer
                  agreed={agreed}
                  setAgreed={setAgreed}
                />
                <PromoCodeSection
                  onValidPromoCode={setHasValidPromoCode}
                  onFreeApplicationSuccess={() => setShowSubmitSuccess(true)}
                  onFreeApplicationStart={() => {
                    setIsProcessingFreeApp(true);
                  }}
                  handleSubmit={handleSubmit}
                  agreed={agreed}
                  isFormValid={isFormValid(agreed)}
                />
                {!hasValidPromoCode && !isFreeProfile && (
                  <FullApplicationModalSubmitBar
                    agreed={agreed}
                    handleSubmit={handleSubmit}
                    isFormValid={isFormValid(agreed)}
                  />
                )}
                {isFreeProfile && (
                  <Button
                    type="submit"
                    disabled={!isFormValid(agreed)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-6 text-lg"
                  >
                    Create Free Profile
                  </Button>
                )}
              </form>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
