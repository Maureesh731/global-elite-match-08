
import React, { useRef, useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FullApplicationModalHeader } from "./FullApplicationModalHeader";
import { FullApplicationModalDisclaimer } from "./FullApplicationModalDisclaimer";
import { FullApplicationModalFormFields } from "./FullApplicationModalFormFields";
import { FullApplicationModalSubmitBar } from "./FullApplicationModalSubmitBar";

type FullApplicationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
};

export const FullApplicationModal: React.FC<FullApplicationModalProps> = ({
  open,
  onOpenChange,
  onSubmit,
}) => {
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    email: "",
    phone: "",
    linkedin: "",
    idFile: null as File | null,
    medicalFile: null as File | null,
    bio: "",
    healthStatus: "",
    covidVaccinated: "no",
  });
  const [agreed, setAgreed] = useState(false);
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false);

  const idInputRef = useRef<HTMLInputElement>(null);
  const medicalInputRef = useRef<HTMLInputElement>(null);
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
    name: "idFile" | "medicalFile",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] ?? null;
    setForm((f) => ({ ...f, [name]: file }));
  };

  const handleModalClose = () => {
    setShowSubmitSuccess(false);
    onOpenChange(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    if (onSubmit) onSubmit(form);
    setShowSubmitSuccess(true);
    setTimeout(() => {
      handleModalClose();
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0">
        <FullApplicationModalHeader onClose={handleModalClose} />
        <div
          ref={scrollContentRef}
          className="overflow-y-auto max-h-[calc(80vh-64px)] px-6 pb-28 pt-2"
          tabIndex={-1}
        >
          {showSubmitSuccess ? (
            <div className="p-6 text-center">
              <div className="text-green-700 font-semibold mb-2">
                Application submitted!
              </div>
              <div className="text-xs text-gray-500">
                You will be contacted via email or phone after review.
              </div>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <FullApplicationModalFormFields
                form={form}
                handleInput={handleInput}
                handleFileChange={handleFileChange}
                idInputRef={idInputRef}
                medicalInputRef={medicalInputRef}
              />
              <FullApplicationModalDisclaimer
                agreed={agreed}
                setAgreed={setAgreed}
              />
            </form>
          )}
        </div>
        {!showSubmitSuccess && (
          <FullApplicationModalSubmitBar
            agreed={agreed}
            handleSubmit={handleSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
