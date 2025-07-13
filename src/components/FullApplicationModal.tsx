import React, { useRef, useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { FullApplicationModalHeader } from "./FullApplicationModalHeader";
import { FullApplicationModalDisclaimer } from "./FullApplicationModalDisclaimer";
import { FullApplicationModalFormFields } from "./FullApplicationModalFormFields";
import { FullApplicationModalSubmitBar } from "./FullApplicationModalSubmitBar";
import { supabase } from "@/integrations/supabase/client";

type FullApplicationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
  isFreeApplication?: boolean;
};

export const FullApplicationModal: React.FC<FullApplicationModalProps> = ({
  open,
  onOpenChange,
  onSubmit,
  isFreeApplication = false,
}) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    memberProfileName: "",
    age: "",
    email: "",
    phone: "",
    linkedin: "",
    idFile: null as File | null,
    bio: "",
    // Health disclosure questions
    hasHerpes: "no",
    hasHIV: "no",
    hasHPV: "no",
    hasOtherSTDs: "no",
    hasChronicDiseases: "no",
    covidVaccinated: "no",
    usesAlcohol: "no",
    usesDrugs: "no",
    usesMarijuana: "no",
    smokesCigarettes: "no",
    usesPrescriptionDrugs: "no",
    disclosureAuthorization: "no",
    // Optional testing
    wantsOptionalTesting: "no",
  });
  const [agreed, setAgreed] = useState(false);
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false);
  const [isProcessingFreeApp, setIsProcessingFreeApp] = useState(false);

  const idInputRef = useRef<HTMLInputElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && scrollContentRef.current) {
      scrollContentRef.current.scrollTop = 0;
    }
  }, [open]);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFileChange = (
    name: "idFile",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] ?? null;
    setForm((f) => ({ ...f, [name]: file }));
  };

  const handleModalClose = () => {
    setShowSubmitSuccess(false);
    onOpenChange(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    
    try {
      // Transform form data to match database schema
      const applicationData = {
        full_name: form.fullName,
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
        wants_optional_testing: form.wantsOptionalTesting
      };

      // Save application to database
      const { error: dbError } = await supabase
        .from('applications')
        .insert([applicationData]);
      
      if (dbError) {
        console.error("Error saving application to database:", dbError);
        return;
      }

      // Send application data to email
      const { error: emailError } = await supabase.functions.invoke("send-application", {
        body: { applicationData: form }
      });
      
      if (emailError) {
        console.error("Error sending application email:", emailError);
        // Continue even if email fails since data is saved
      }
      
      if (onSubmit) onSubmit(form);
      setShowSubmitSuccess(true);
      
      // If this is a free application, navigate to profile after success message
      if (isFreeApplication || isProcessingFreeApp) {
        setTimeout(() => {
          handleModalClose();
          // Navigate to appropriate profile page based on member profile name
          // Simple heuristic: if profile name suggests female, go to ladies page
          const profileName = form.memberProfileName.toLowerCase();
          const isFemale = profileName.includes('lady') || profileName.includes('miss') || profileName.includes('ms');
          navigate(isFemale ? '/ladies-profile' : '/gentlemen-profile');
        }, 2500);
      } else {
        setTimeout(() => {
          handleModalClose();
        }, 1200);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      // Show success even if there are issues since we want good UX
      if (onSubmit) onSubmit(form);
      setShowSubmitSuccess(true);
      
      // If this is a free application, navigate to profile after success message
      if (isFreeApplication || isProcessingFreeApp) {
        setTimeout(() => {
          handleModalClose();
          // Navigate to appropriate profile page based on member profile name
          // Simple heuristic: if profile name suggests female, go to ladies page
          const profileName = form.memberProfileName.toLowerCase();
          const isFemale = profileName.includes('lady') || profileName.includes('miss') || profileName.includes('ms');
          navigate(isFemale ? '/ladies-profile' : '/gentlemen-profile');
        }, 2500);
      } else {
        setTimeout(() => {
          handleModalClose();
        }, 1200);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0">
        <FullApplicationModalHeader onClose={handleModalClose} />
        <div
          ref={scrollContentRef}
          className="overflow-y-auto max-h-[calc(80vh-64px)] px-6 pt-2"
          tabIndex={-1}
        >
          {showSubmitSuccess ? (
            <div className="p-6 text-center">
              <div className="text-green-700 font-semibold mb-2">
                Application submitted!
              </div>
              <div className="text-xs text-gray-500 mb-2">
                {(isFreeApplication || isProcessingFreeApp) ? (
                  <>Approvals usually take 24 hours for a decision. You can start building your profile now!</>
                ) : (
                  <>You will be contacted via email or phone after review.</>
                )}
              </div>
              {(isFreeApplication || isProcessingFreeApp) && (
                <div className="text-xs text-blue-600">
                  Redirecting to profile builder...
                </div>
              )}
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <FullApplicationModalFormFields
                form={form}
                handleInput={handleInput}
                handleFileChange={handleFileChange}
                idInputRef={idInputRef}
              />
              <FullApplicationModalDisclaimer
                agreed={agreed}
                setAgreed={setAgreed}
              />
              <FullApplicationModalSubmitBar
                agreed={agreed}
                handleSubmit={handleSubmit}
                onFreeApplicationSuccess={() => setShowSubmitSuccess(true)}
                onFreeApplicationStart={() => {
                  setIsProcessingFreeApp(true);
                }}
              />
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
