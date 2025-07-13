
import React, { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormState = {
  fullName: string;
  memberProfileName: string;
  age: string;
  email: string;
  phone: string;
  linkedin: string;
  idFile: File | null;
  bio: string;
  // Health disclosure questions
  hasHerpes: string;
  hasHIV: string;
  hasHPV: string;
  hasOtherSTDs: string;
  hasChronicDiseases: string;
  covidVaccinated: string;
  usesAlcohol: string;
  usesDrugs: string;
  usesMarijuana: string;
  smokesCigarettes: string;
  usesPrescriptionDrugs: string;
  disclosureAuthorization: string;
  // Optional testing
  wantsOptionalTesting: string;
};
type Props = {
  form: FormState;
  handleInput: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFileChange: (name: "idFile", e: React.ChangeEvent<HTMLInputElement>) => void;
  idInputRef: React.RefObject<HTMLInputElement>;
};

export const FullApplicationModalFormFields: React.FC<Props> = ({
  form,
  handleInput,
  handleFileChange,
  idInputRef
}) => (
  <>
    <div>
      <Label htmlFor="fullName">Full Name</Label>
      <Input name="fullName" id="fullName" value={form.fullName} onChange={handleInput} required />
    </div>
    <div>
      <Label htmlFor="memberProfileName">Member Profile Name</Label>
      <Input name="memberProfileName" id="memberProfileName" value={form.memberProfileName} onChange={handleInput} required />
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
      <Label htmlFor="bio">Short Bio (up to 2500 characters)</Label>
      <textarea
        name="bio"
        id="bio"
        maxLength={2500}
        rows={8}
        className="w-full border rounded p-2"
        value={form.bio}
        onChange={handleInput}
        placeholder="Tell us about yourself, your interests, lifestyle, and what makes you unique..."
      />
      <div className="text-sm text-gray-500 mt-1">
        {form.bio.length}/2500 characters
      </div>
    </div>
    {/* Health Disclosure Section */}
    <div className="border-t pt-4">
      <h3 className="font-semibold text-lg mb-4">Health Disclosure (Required)</h3>
      <p className="text-sm text-gray-600 mb-4">
        Please answer these questions honestly. Any positive responses will be disclosed on your profile with your authorization.
      </p>
      
      <div className="space-y-4">
        <div>
          <Label>Do you have Herpes (HSV-1 or HSV-2)?</Label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2">
              <Input
                type="radio"
                name="hasHerpes"
                value="no"
                checked={form.hasHerpes === "no"}
                onChange={handleInput}
              /> No
            </label>
            <label className="flex items-center gap-2">
              <Input
                type="radio"
                name="hasHerpes"
                value="yes"
                checked={form.hasHerpes === "yes"}
                onChange={handleInput}
              /> Yes
            </label>
          </div>
        </div>

        <div>
          <Label>Do you have HIV?</Label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2">
              <Input
                type="radio"
                name="hasHIV"
                value="no"
                checked={form.hasHIV === "no"}
                onChange={handleInput}
              /> No
            </label>
            <label className="flex items-center gap-2">
              <Input
                type="radio"
                name="hasHIV"
                value="yes"
                checked={form.hasHIV === "yes"}
                onChange={handleInput}
              /> Yes
            </label>
          </div>
        </div>

        <div>
          <Label>Do you have HPV?</Label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2">
              <Input
                type="radio"
                name="hasHPV"
                value="no"
                checked={form.hasHPV === "no"}
                onChange={handleInput}
              /> No
            </label>
            <label className="flex items-center gap-2">
              <Input
                type="radio"
                name="hasHPV"
                value="yes"
                checked={form.hasHPV === "yes"}
                onChange={handleInput}
              /> Yes
            </label>
          </div>
        </div>

        <div>
          <Label>Do you have any other STDs?</Label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2">
              <Input
                type="radio"
                name="hasOtherSTDs"
                value="no"
                checked={form.hasOtherSTDs === "no"}
                onChange={handleInput}
              /> No
            </label>
            <label className="flex items-center gap-2">
              <Input
                type="radio"
                name="hasOtherSTDs"
                value="yes"
                checked={form.hasOtherSTDs === "yes"}
                onChange={handleInput}
              /> Yes
            </label>
          </div>
        </div>

        <div>
          <Label>Do you have any chronic diseases?</Label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2">
              <Input
                type="radio"
                name="hasChronicDiseases"
                value="no"
                checked={form.hasChronicDiseases === "no"}
                onChange={handleInput}
              /> No
            </label>
            <label className="flex items-center gap-2">
              <Input
                type="radio"
                name="hasChronicDiseases"
                value="yes"
                checked={form.hasChronicDiseases === "yes"}
                onChange={handleInput}
              /> Yes
            </label>
          </div>
        </div>

        <div>
          <Label>Are you COVID-19 vaccinated?</Label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2">
              <Input
                type="radio"
                name="covidVaccinated"
                value="no"
                checked={form.covidVaccinated === "no"}
                onChange={handleInput}
              /> No
            </label>
            <label className="flex items-center gap-2">
              <Input
                type="radio"
                name="covidVaccinated"
                value="yes"
                checked={form.covidVaccinated === "yes"}
                onChange={handleInput}
              /> Yes
            </label>
          </div>
        </div>

        <div>
          <Label>Do you consume alcohol regularly?</Label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2">
              <Input
                type="radio"
                name="usesAlcohol"
                value="no"
                checked={form.usesAlcohol === "no"}
                onChange={handleInput}
              /> No
            </label>
            <label className="flex items-center gap-2">
              <Input
                type="radio"
                name="usesAlcohol"
                value="yes"
                checked={form.usesAlcohol === "yes"}
                onChange={handleInput}
              /> Yes
            </label>
          </div>
        </div>

        <div>
          <Label>Do you use recreational drugs?</Label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2">
              <Input
                type="radio"
                name="usesDrugs"
                value="no"
                checked={form.usesDrugs === "no"}
                onChange={handleInput}
              /> No
            </label>
            <label className="flex items-center gap-2">
              <Input
                type="radio"
                name="usesDrugs"
                value="yes"
                checked={form.usesDrugs === "yes"}
                onChange={handleInput}
              /> Yes
            </label>
          </div>
        </div>

        <div>
          <Label>Do you use marijuana?</Label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2">
              <Input
                type="radio"
                name="usesMarijuana"
                value="no"
                checked={form.usesMarijuana === "no"}
                onChange={handleInput}
              /> No
            </label>
            <label className="flex items-center gap-2">
              <Input
                type="radio"
                name="usesMarijuana"
                value="yes"
                checked={form.usesMarijuana === "yes"}
                onChange={handleInput}
              /> Yes
            </label>
          </div>
        </div>

        <div>
          <Label>Do you smoke cigarettes?</Label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2">
              <Input
                type="radio"
                name="smokesCigarettes"
                value="no"
                checked={form.smokesCigarettes === "no"}
                onChange={handleInput}
              /> No
            </label>
            <label className="flex items-center gap-2">
              <Input
                type="radio"
                name="smokesCigarettes"
                value="yes"
                checked={form.smokesCigarettes === "yes"}
                onChange={handleInput}
              /> Yes
            </label>
          </div>
        </div>

        <div>
          <Label>Do you use prescription drugs?</Label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2">
              <Input
                type="radio"
                name="usesPrescriptionDrugs"
                value="no"
                checked={form.usesPrescriptionDrugs === "no"}
                onChange={handleInput}
              /> No
            </label>
            <label className="flex items-center gap-2">
              <Input
                type="radio"
                name="usesPrescriptionDrugs"
                value="yes"
                checked={form.usesPrescriptionDrugs === "yes"}
                onChange={handleInput}
              /> Yes
            </label>
          </div>
        </div>

        <div>
          <Label>I authorize disclosure of my positive health responses on my profile</Label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2">
              <Input
                type="radio"
                name="disclosureAuthorization"
                value="no"
                checked={form.disclosureAuthorization === "no"}
                onChange={handleInput}
              /> No
            </label>
            <label className="flex items-center gap-2">
              <Input
                type="radio"
                name="disclosureAuthorization"
                value="yes"
                checked={form.disclosureAuthorization === "yes"}
                onChange={handleInput}
              /> Yes
            </label>
          </div>
        </div>
      </div>
    </div>

    {/* Optional Testing Section */}
    <div className="border-t pt-4">
      <h3 className="font-semibold text-lg mb-4">Optional Lab Testing</h3>
      <p className="text-sm text-gray-600 mb-4">
        Would you like to complete optional lab testing to receive a blue verification check on your profile? 
        This demonstrates you've submitted and passed recent medical testing.
      </p>
      
      <div>
        <Label>I want to complete optional lab testing for verification</Label>
        <div className="flex gap-4 mt-1">
          <label className="flex items-center gap-2">
            <Input
              type="radio"
              name="wantsOptionalTesting"
              value="no"
              checked={form.wantsOptionalTesting === "no"}
              onChange={handleInput}
            /> No, skip testing
          </label>
          <label className="flex items-center gap-2">
            <Input
              type="radio"
              name="wantsOptionalTesting"
              value="yes"
              checked={form.wantsOptionalTesting === "yes"}
              onChange={handleInput}
            /> Yes, I want verification
          </label>
        </div>
      </div>
      
      {form.wantsOptionalTesting === "yes" && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 mb-2">
            After completing your application, you'll receive information about scheduling your lab tests with our lab partner.
          </p>
        </div>
      )}
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
  </>
);
