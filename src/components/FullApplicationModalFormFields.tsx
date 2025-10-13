
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApplicationFormState } from "@/hooks/useApplicationForm";

type Props = {
  form: ApplicationFormState;
  handleInput: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export const FullApplicationModalFormFields: React.FC<Props> = ({
  form,
  handleInput
}) => (
  <>
    <div>
      <Label htmlFor="firstName" className="text-white">First Name</Label>
      <Input 
        name="firstName" 
        id="firstName" 
        value={form.firstName} 
        onChange={handleInput} 
        required 
        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
      />
    </div>
    <div>
      <Label htmlFor="lastName" className="text-white">Last Name</Label>
      <Input 
        name="lastName" 
        id="lastName" 
        value={form.lastName} 
        onChange={handleInput} 
        required 
        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
      />
    </div>
    <div>
      <Label htmlFor="memberProfileName" className="text-white">Member Profile Name</Label>
      <Input 
        name="memberProfileName" 
        id="memberProfileName" 
        value={form.memberProfileName} 
        onChange={handleInput} 
        required 
        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
      />
    </div>
    <div>
      <Label htmlFor="age" className="text-white">Age</Label>
      <Input 
        name="age" 
        id="age" 
        type="number" 
        min={18} 
        value={form.age} 
        onChange={handleInput} 
        required 
        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
      />
    </div>
    <div>
      <Label htmlFor="email" className="text-white">Email</Label>
      <Input 
        name="email" 
        id="email" 
        type="email" 
        value={form.email} 
        onChange={handleInput} 
        required 
        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
      />
    </div>
    <div>
      <Label htmlFor="phone" className="text-white">Phone Number</Label>
      <Input 
        name="phone" 
        id="phone" 
        type="tel" 
        value={form.phone} 
        onChange={handleInput} 
        required 
        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
      />
    </div>
    <div>
      <Label htmlFor="linkedin" className="text-white">LinkedIn Profile URL</Label>
      <Input
        name="linkedin"
        id="linkedin"
        type="url"
        pattern="https://(www\.)?linkedin\.com/in/[\w-]+/?"
        value={form.linkedin}
        onChange={handleInput}
        placeholder="https://linkedin.com/in/your-name"
        required
        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
      />
      <span className="text-xs text-gray-400">
        Must be a valid LinkedIn profile URL (e.g., https://linkedin.com/in/yourname)
      </span>
      {form.linkedin && !/^https:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/.test(form.linkedin.trim()) && (
        <span className="text-xs text-red-400 block mt-1">
          Invalid LinkedIn URL format
        </span>
      )}
    </div>
    <div>
      <Label htmlFor="bio" className="text-white">Short Bio (up to 2500 characters)</Label>
      <textarea
        name="bio"
        id="bio"
        maxLength={2500}
        rows={8}
        className="w-full border border-gray-600 rounded p-2 bg-gray-700 text-white placeholder-gray-400"
        value={form.bio}
        onChange={handleInput}
        placeholder="Tell us about yourself, your interests, lifestyle, and what makes you unique..."
      />
      <div className="text-sm text-gray-400 mt-1">
        {form.bio.length}/2500 characters
      </div>
    </div>

    {/* Authentication Credentials Section */}
    <div className="border-t border-gray-600 pt-4">
      <h3 className="font-semibold text-lg mb-4 text-white">Account Setup</h3>
      <p className="text-sm text-gray-300 mb-4">
        Create your login credentials for accessing the platform after approval.
      </p>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="username" className="text-white">Username</Label>
          <Input 
            name="username" 
            id="username" 
            value={form.username} 
            onChange={handleInput} 
            required 
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          />
          <span className="text-xs text-gray-400">Choose a unique username for your account.</span>
        </div>
        <div>
          <Label htmlFor="password" className="text-white">Password</Label>
          <Input 
            name="password" 
            id="password" 
            type="password" 
            value={form.password} 
            onChange={handleInput} 
            required 
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          />
          <span className="text-xs text-gray-400">Minimum 8 characters required.</span>
        </div>
        <div>
          <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
          <Input 
            name="confirmPassword" 
            id="confirmPassword" 
            type="password" 
            value={form.confirmPassword} 
            onChange={handleInput} 
            required 
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          />
          {form.password !== form.confirmPassword && form.confirmPassword && (
            <span className="text-xs text-red-400">Passwords do not match.</span>
          )}
        </div>
      </div>
    </div>
    {/* Health Disclosure Section */}
    <div className="border-t border-gray-600 pt-4">
      <h3 className="font-semibold text-lg mb-4 text-white">Health Disclosure (Required)</h3>
      <p className="text-sm text-gray-300 mb-4">
        Please answer these questions honestly. Any positive responses will be disclosed on your profile with your authorization.
      </p>
      
      <div className="space-y-4">
        <div>
          <Label className="text-white">Do you have Herpes (HSV-1 or HSV-2)?</Label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2 text-white">
              <Input
                type="radio"
                name="hasHerpes"
                value="no"
                checked={form.hasHerpes === "no"}
                onChange={handleInput}
                className="w-4 h-4"
              /> No
            </label>
            <label className="flex items-center gap-2 text-white">
              <Input
                type="radio"
                name="hasHerpes"
                value="yes"
                checked={form.hasHerpes === "yes"}
                onChange={handleInput}
                className="w-4 h-4"
              /> Yes
            </label>
          </div>
        </div>

        <div>
          <Label className="text-white">Do you have HIV?</Label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2 text-white">
              <Input
                type="radio"
                name="hasHIV"
                value="no"
                checked={form.hasHIV === "no"}
                onChange={handleInput}
                className="w-4 h-4"
              /> No
            </label>
            <label className="flex items-center gap-2 text-white">
              <Input
                type="radio"
                name="hasHIV"
                value="yes"
                checked={form.hasHIV === "yes"}
                onChange={handleInput}
                className="w-4 h-4"
              /> Yes
            </label>
          </div>
        </div>

        <div>
          <Label className="text-white">Do you have HPV?</Label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2 text-white">
              <Input
                type="radio"
                name="hasHPV"
                value="no"
                checked={form.hasHPV === "no"}
                onChange={handleInput}
                className="w-4 h-4"
              /> No
            </label>
            <label className="flex items-center gap-2 text-white">
              <Input
                type="radio"
                name="hasHPV"
                value="yes"
                checked={form.hasHPV === "yes"}
                onChange={handleInput}
                className="w-4 h-4"
              /> Yes
            </label>
          </div>
        </div>

        <div>
          <Label className="text-white">Do you have any other STDs?</Label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2 text-white">
              <Input
                type="radio"
                name="hasOtherSTDs"
                value="no"
                checked={form.hasOtherSTDs === "no"}
                onChange={handleInput}
                className="w-4 h-4"
              /> No
            </label>
            <label className="flex items-center gap-2 text-white">
              <Input
                type="radio"
                name="hasOtherSTDs"
                value="yes"
                checked={form.hasOtherSTDs === "yes"}
                onChange={handleInput}
                className="w-4 h-4"
              /> Yes
            </label>
          </div>
        </div>

        <div>
          <Label className="text-white">Do you have any chronic diseases?</Label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2 text-white">
              <Input
                type="radio"
                name="hasChronicDiseases"
                value="no"
                checked={form.hasChronicDiseases === "no"}
                onChange={handleInput}
                className="w-4 h-4"
              /> No
            </label>
            <label className="flex items-center gap-2 text-white">
              <Input
                type="radio"
                name="hasChronicDiseases"
                value="yes"
                checked={form.hasChronicDiseases === "yes"}
                onChange={handleInput}
                className="w-4 h-4"
              /> Yes
            </label>
          </div>
        </div>

        <div>
          <Label className="text-white">Are you COVID-19 vaccinated?</Label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2 text-white">
              <Input
                type="radio"
                name="covidVaccinated"
                value="no"
                checked={form.covidVaccinated === "no"}
                onChange={handleInput}
                className="w-4 h-4"
              /> No
            </label>
            <label className="flex items-center gap-2 text-white">
              <Input
                type="radio"
                name="covidVaccinated"
                value="yes"
                checked={form.covidVaccinated === "yes"}
                onChange={handleInput}
                className="w-4 h-4"
              /> Yes
            </label>
          </div>
        </div>

        <div>
          <Label className="text-white">Do you consume alcohol regularly?</Label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2 text-white">
              <Input
                type="radio"
                name="usesAlcohol"
                value="no"
                checked={form.usesAlcohol === "no"}
                onChange={handleInput}
                className="w-4 h-4"
              /> No
            </label>
            <label className="flex items-center gap-2 text-white">
              <Input
                type="radio"
                name="usesAlcohol"
                value="yes"
                checked={form.usesAlcohol === "yes"}
                onChange={handleInput}
                className="w-4 h-4"
              /> Yes
            </label>
          </div>
        </div>

        <div>
          <Label className="text-white">Do you use recreational drugs?</Label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2 text-white">
              <Input
                type="radio"
                name="usesDrugs"
                value="no"
                checked={form.usesDrugs === "no"}
                onChange={handleInput}
                className="w-4 h-4"
              /> No
            </label>
            <label className="flex items-center gap-2 text-white">
              <Input
                type="radio"
                name="usesDrugs"
                value="yes"
                checked={form.usesDrugs === "yes"}
                onChange={handleInput}
                className="w-4 h-4"
              /> Yes
            </label>
          </div>
        </div>

        <div>
          <Label className="text-white">Do you use marijuana?</Label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2 text-white">
              <Input
                type="radio"
                name="usesMarijuana"
                value="no"
                checked={form.usesMarijuana === "no"}
                onChange={handleInput}
                className="w-4 h-4"
              /> No
            </label>
            <label className="flex items-center gap-2 text-white">
              <Input
                type="radio"
                name="usesMarijuana"
                value="yes"
                checked={form.usesMarijuana === "yes"}
                onChange={handleInput}
                className="w-4 h-4"
              /> Yes
            </label>
          </div>
        </div>

        <div>
          <Label className="text-white">Do you smoke cigarettes?</Label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2 text-white">
              <Input
                type="radio"
                name="smokesCigarettes"
                value="no"
                checked={form.smokesCigarettes === "no"}
                onChange={handleInput}
                className="w-4 h-4"
              /> No
            </label>
            <label className="flex items-center gap-2 text-white">
              <Input
                type="radio"
                name="smokesCigarettes"
                value="yes"
                checked={form.smokesCigarettes === "yes"}
                onChange={handleInput}
                className="w-4 h-4"
              /> Yes
            </label>
          </div>
        </div>

        <div>
          <Label className="text-white">Do you use prescription drugs?</Label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2 text-white">
              <Input
                type="radio"
                name="usesPrescriptionDrugs"
                value="no"
                checked={form.usesPrescriptionDrugs === "no"}
                onChange={handleInput}
                className="w-4 h-4"
              /> No
            </label>
            <label className="flex items-center gap-2 text-white">
              <Input
                type="radio"
                name="usesPrescriptionDrugs"
                value="yes"
                checked={form.usesPrescriptionDrugs === "yes"}
                onChange={handleInput}
                className="w-4 h-4"
              /> Yes
            </label>
          </div>
        </div>

        <div>
          <Label className="text-white">I authorize disclosure of my positive health responses on my profile</Label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2 text-white">
              <Input
                type="radio"
                name="disclosureAuthorization"
                value="no"
                checked={form.disclosureAuthorization === "no"}
                onChange={handleInput}
                className="w-4 h-4"
              /> No
            </label>
            <label className="flex items-center gap-2 text-white">
              <Input
                type="radio"
                name="disclosureAuthorization"
                value="yes"
                checked={form.disclosureAuthorization === "yes"}
                onChange={handleInput}
                className="w-4 h-4"
              /> Yes
            </label>
          </div>
        </div>
      </div>
    </div>

    {/* Optional Testing Section */}
    <div className="border-t border-gray-600 pt-4">
      <h3 className="font-semibold text-lg mb-4 text-white">Optional Lab Testing</h3>
      <p className="text-sm text-gray-300 mb-4">
        Would you like to complete optional lab testing to receive a blue verification check on your profile? 
        This demonstrates you've submitted and passed recent medical testing.
      </p>
      
      <div>
        <Label className="text-white">I want to complete optional lab testing for verification</Label>
        <div className="flex gap-4 mt-1">
          <label className="flex items-center gap-2 text-white">
            <Input
              type="radio"
              name="wantsOptionalTesting"
              value="no"
              checked={form.wantsOptionalTesting === "no"}
              onChange={handleInput}
              className="w-4 h-4"
            /> No, skip testing
          </label>
          <label className="flex items-center gap-2 text-white">
            <Input
              type="radio"
              name="wantsOptionalTesting"
              value="yes"
              checked={form.wantsOptionalTesting === "yes"}
              onChange={handleInput}
              className="w-4 h-4"
            /> Yes, I want verification
          </label>
        </div>
      </div>
      
      {form.wantsOptionalTesting === "yes" && (
        <div className="mt-4 p-4 bg-blue-900/30 rounded-lg border border-blue-600/30">
          <p className="text-sm text-blue-300 mb-2">
            After completing your application, you'll receive information about scheduling your lab tests with our lab partner.
          </p>
        </div>
      )}
    </div>

  </>
);
