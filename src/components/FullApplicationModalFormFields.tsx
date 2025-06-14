
import React, { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormState = {
  fullName: string;
  age: string;
  email: string;
  phone: string;
  linkedin: string;
  idFile: File | null;
  medicalFile: File | null;
  bio: string;
  healthStatus: string;
  covidVaccinated: string;
};
type Props = {
  form: FormState;
  handleInput: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFileChange: (name: "idFile" | "medicalFile", e: React.ChangeEvent<HTMLInputElement>) => void;
  idInputRef: React.RefObject<HTMLInputElement>;
  medicalInputRef: React.RefObject<HTMLInputElement>;
};

export const FullApplicationModalFormFields: React.FC<Props> = ({
  form,
  handleInput,
  handleFileChange,
  idInputRef,
  medicalInputRef
}) => (
  <>
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
  </>
);
