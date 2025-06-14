
import React, { useRef, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

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

  // Scroll to top when modal opens
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

  const handleFileChange = (name: "idFile" | "medicalFile", e: React.ChangeEvent<HTMLInputElement>) => {
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
    // Ideally, validate medFile is from last 30d (skipped)
    if (onSubmit) onSubmit(form);
    setShowSubmitSuccess(true);
    setTimeout(() => {
      handleModalClose();
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0">
        <div className="relative">
          {/* X Close Button */}
          <button
            aria-label="Close"
            onClick={handleModalClose}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/90 hover:bg-slate-100 border border-slate-200 p-2 shadow transition-all"
            type="button"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-xl mb-2">Elite Match: Full Application</DialogTitle>
          </DialogHeader>
        </div>
        {/* Scrollable content */}
        <div
          ref={scrollContentRef}
          className="overflow-y-auto max-h-[calc(80vh-64px)] px-6 pb-28 pt-2"
          tabIndex={-1}
        >
          {showSubmitSuccess ? (
            <div className="p-6 text-center">
              <div className="text-green-700 font-semibold mb-2">Application submitted!</div>
              <div className="text-xs text-gray-500">You will be contacted via email or phone after review.</div>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input name="fullName" id="fullName" value={form.fullName} onChange={handleInput} required />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input name="age" id="age" type="number" min={18} value={form.age} onChange={handleInput} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input name="email" id="email" type="email" value={form.email} onChange={handleInput} required />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input name="phone" id="phone" type="tel" value={form.phone} onChange={handleInput} required />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
                <Input
                  name="linkedin"
                  id="linkedin"
                  type="url"
                  pattern="https://.*"
                  value={form.linkedin}
                  onChange={handleInput}
                  placeholder="https://linkedin.com/in/your-name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="bio">Short Bio</Label>
                <textarea
                  name="bio"
                  id="bio"
                  maxLength={300}
                  rows={3}
                  className="w-full border rounded p-2"
                  value={form.bio}
                  onChange={handleInput}
                />
              </div>
              <div>
                <Label htmlFor="healthStatus">Drug & Disease Free Confirmation</Label>
                <Input
                  name="healthStatus"
                  id="healthStatus"
                  type="text"
                  value={form.healthStatus}
                  onChange={handleInput}
                  placeholder="e.g. Yes, I am drug and disease free"
                  required
                />
              </div>
              <div>
                <Label>Covid-19 Vaccination Status</Label>
                <div className="flex gap-4 mt-1">
                  <label className="flex items-center gap-2">
                    <Input
                      type="radio"
                      name="covidVaccinated"
                      value="no"
                      checked={form.covidVaccinated === "no"}
                      onChange={handleInput}
                    />{" "}
                    Unvaccinated
                  </label>
                  <label className="flex items-center gap-2">
                    <Input
                      type="radio"
                      name="covidVaccinated"
                      value="yes"
                      checked={form.covidVaccinated === "yes"}
                      onChange={handleInput}
                    />{" "}
                    Vaccinated
                  </label>
                </div>
              </div>
              {/* Upload ID */}
              <div>
                <Label>ID Upload (Government-issued)</Label>
                <Input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => handleFileChange("idFile", e)}
                  ref={idInputRef}
                  required
                />
                <span className="text-xs text-gray-500">Please upload a clear photo or scan of your government-issued ID.</span>
              </div>
              {/* Upload recent STD/medical report */}
              <div>
                <Label>STD/Medical Report (Issued within last 30 days)</Label>
                <Input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => handleFileChange("medicalFile", e)}
                  ref={medicalInputRef}
                  required
                />
                <span className="text-xs text-gray-500">Upload an official medical report (must be dated in the past 30 days).</span>
              </div>
              {/* Disclaimer */}
              <div className="p-4 bg-slate-50 rounded border border-slate-200 max-h-48 overflow-y-auto">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={agreed}
                    onChange={e => setAgreed(e.target.checked)}
                    required
                  />
                  <span className="text-xs text-gray-700 space-y-1 block">
                    <strong>Legal Disclaimer and Release of Liability Agreement</strong>
                    <br /><br />
                    <strong>By accessing, registering with, or utilizing the services provided by Elite Match ("the Platform"), I, the undersigned user ("User"), acknowledge and expressly agree to the following terms:</strong>
                    <br /><br />
                    <strong>No Liability for User Interactions</strong>
                    <br />
                    I understand and agree that Elite Match, including its owners, agents, affiliates, employees, successors, and assigns (collectively, "Elite Match and its Owners"), acts solely as a facilitator of introductions between consenting adults. Elite Match and its Owners make no representations or warranties regarding the character, intentions, background, or conduct of any user or individual introduced through the Platform.
                    <br /><br />
                    <strong>Assumption of Risk</strong>
                    <br />
                    I acknowledge that all interactions, communications, meetings, and/or relationships formed through or as a result of the Platform are undertaken solely at my own risk. I understand that Elite Match does not perform criminal background checks, psychological evaluations, or personal screenings of any kind, and I accept full responsibility for conducting my own due diligence.
                    <br /><br />
                    <strong>Indemnification and Release</strong>
                    <br />
                    I hereby waive, release, and discharge Elite Match and its Owners from any and all claims, demands, causes of action, liabilities, damages, or losses—whether direct, indirect, incidental, special, or consequential—arising out of or relating to any interaction, relationship, or dispute with any individual I meet through the Platform. This includes, without limitation, claims for emotional distress, financial loss, physical injury, or other harm.
                    <br /><br />
                    <strong>Recourse Through Appropriate Authorities</strong>
                    <br />
                    In the event of any dispute, misconduct, harm, or legal issue arising from my dating or relationship activities associated with any individual met through the Platform, I agree that my sole legal recourse shall be against the individual(s) involved. I further agree to report any criminal or harmful conduct to the appropriate local law enforcement or regulatory authorities, and I shall not hold Elite Match and its Owners responsible for initiating or participating in any legal proceedings.
                    <br /><br />
                    <strong>Binding Agreement</strong>
                    <br />
                    By registering with or using Elite Match, I affirm that I have read, understood, and voluntarily agree to be bound by the terms of this Legal Disclaimer and Release of Liability. This agreement shall be governed by and construed in accordance with the laws of the state or jurisdiction in which Elite Match operates, without regard to its conflict of law principles.
                    <span className="text-red-700 font-semibold">*</span>
                  </span>
                </label>
              </div>
            </form>
          )}
        </div>
        {/* Sticky submit button at bottom */}
        {!showSubmitSuccess && (
          <div className="sticky bottom-0 bg-white pt-4 pb-4 px-6 border-t border-slate-100">
            <DialogFooter>
              <Button type="submit" className="w-full text-lg bg-blue-900 hover:bg-blue-800" disabled={!agreed} onClick={handleSubmit}>
                Submit Application
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
