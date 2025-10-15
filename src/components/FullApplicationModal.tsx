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
    if (!isFormValid(agreed)) return;
    
    const currentIsFreeApplication = isFreeProfile || isProcessingFreeApp;
    
    // For promo code applications, store data and redirect to welcome page
    if (currentIsFreeApplication && isProcessingFreeApp) {
      const applicationData = {
        first_name: form.firstName,
        last_name: form.lastName,
        member_profile_name: form.memberProfileName,
        age: form.age,
        email: form.email,
        phone: form.phone,
        linkedin: form.linkedin,
        bio: form.bio,
        has_herpes: form.hasHerpes,
        has_hiv: form.hasHIV,
        has_hpv: form.hasHPV,
        has_other_stds: form.hasOtherSTDs,
        has_chronic_diseases: form.hasChronicDiseases,
        covid_vaccinated: form.covidVaccinated,
        uses_alcohol: form.usesAlcohol,
        uses_drugs: form.usesDrugs,
        uses_marijuana: form.usesMarijuana,
        smokes_cigarettes: form.smokesCigarettes,
        uses_prescription_drugs: form.usesPrescriptionDrugs,
        disclosure_authorization: form.disclosureAuthorization,
        wants_optional_testing: form.wantsOptionalTesting,
        username: form.username,
        password: form.password
      };
      
      localStorage.setItem('pendingApplication', JSON.stringify(applicationData));
      localStorage.setItem('promoCodeUsed', 'true');
      
      // Close modal and redirect to welcome page
      handleModalClose();
      setTimeout(() => {
        window.location.href = '/welcome';
      }, 100);
      return;
    }
    
    // All other applications go through normal submission (no payments during application)
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
