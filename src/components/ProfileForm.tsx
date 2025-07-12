
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ProfileFormProps = {
  gender: "Gentleman" | "Lady";
  onSave: (data: any) => void;
};

export const ProfileForm: React.FC<ProfileFormProps> = ({ gender, onSave }) => {
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    bio: "",
    story: "",
    linkedin: "",
    healthStatus: "",
    covidVaccinated: "no"
  });
  const [photos, setPhotos] = useState<(string | ArrayBuffer | null)[]>([]);
  const [photoPrivacy, setPhotoPrivacy] = useState<boolean[]>(Array(10).fill(false));
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [agreedToDisclaimer, setAgreedToDisclaimer] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos(prev => {
          const newArr = [...prev];
          newArr[idx] = reader.result;
          return newArr;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePhotoPrivacy = (idx: number) => {
    setPhotoPrivacy(prev => {
      const newArr = [...prev];
      newArr[idx] = !newArr[idx];
      return newArr;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToDisclaimer) return;
    onSave({ ...form, photos, photoPrivacy });
  };

  return (
    <form
      className="w-full max-w-xl mx-auto bg-white rounded-xl shadow p-6 space-y-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        {gender === "Gentleman" ? "Gentleman's" : "Lady's"} Profile
      </h2>
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input name="fullName" id="fullName" value={form.fullName} onChange={handleInput} required />
      </div>
      <div>
        <Label htmlFor="age">Age</Label>
        <Input name="age" id="age" type="number" min="18" value={form.age} onChange={handleInput} required />
      </div>
      <div>
        <Label htmlFor="bio">Short Bio</Label>
        <textarea
          name="bio"
          id="bio"
          className="w-full border rounded p-2"
          maxLength={300}
          rows={3}
          value={form.bio}
          onChange={handleInput}
        />
      </div>
      <div>
        <Label htmlFor="story">Member Story (Who you are & who you're seeking - up to 1500 characters)</Label>
        <textarea
          name="story"
          id="story"
          className="w-full border rounded p-2"
          maxLength={1500}
          rows={6}
          value={form.story}
          onChange={handleInput}
          placeholder="Tell your story... What makes you unique? What are you looking for in a partner? Share your values, interests, and what you hope to find in a meaningful relationship."
        />
        <div className="text-xs text-gray-500 mt-1">
          {form.story.length}/1500 characters
        </div>
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
        <Label htmlFor="healthStatus">Confirm Drug and Disease Free</Label>
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
        <Label>Profile Photos (up to 10):</Label>
        <div className="grid grid-cols-5 gap-2 mt-2">
          {[...Array(10)].map((_, idx) => (
            <div key={idx} className="relative">
              <div className="relative w-20 h-20 rounded-md border border-slate-200 bg-slate-50 flex items-center justify-center">
                <input
                  ref={el => (fileInputRefs.current[idx] = el)}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handlePhotoChange(idx, e)}
                />
                {photos[idx] ? (
                  <div className="relative w-full h-full">
                    <img
                      src={photos[idx] as string}
                      alt={`Profile ${idx + 1}`}
                      className={`object-cover w-full h-full rounded-md cursor-pointer ${photoPrivacy[idx] ? 'opacity-50' : ''}`}
                      onClick={() => fileInputRefs.current[idx]?.click()}
                    />
                    {photoPrivacy[idx] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
                        <span className="text-white text-xs font-bold">🔒</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full h-full flex items-center justify-center text-xs"
                    onClick={() => fileInputRefs.current[idx]?.click()}
                  >
                    + Photo
                  </Button>
                )}
              </div>
              {photos[idx] && (
                <button
                  type="button"
                  onClick={() => togglePhotoPrivacy(idx)}
                  className={`mt-1 text-xs px-2 py-1 rounded border w-full ${
                    photoPrivacy[idx] 
                      ? 'bg-red-100 text-red-700 border-red-300' 
                      : 'bg-green-100 text-green-700 border-green-300'
                  }`}
                >
                  {photoPrivacy[idx] ? '🔒 Private' : '👁️ Public'}
                </button>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-600 mt-2">
          Private photos can only be unlocked by request from other members (requires your approval).
        </p>
      </div>

      {/* Disclaimer agreement */}
      <div className="p-4 bg-slate-50 rounded border border-slate-200">
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1"
            checked={agreedToDisclaimer}
            onChange={(e) => setAgreedToDisclaimer(e.target.checked)}
            required
          />
          <span className="text-xs text-gray-700 space-y-1 block">
            <strong>Legal Disclaimer and Release of Liability Agreement</strong>
            <br /><br />
            <strong>By accessing, registering with, or utilizing the services provided by START Financial Freedom LLC dba Untouchable Dating ("the Platform"), I, the undersigned user ("User"), acknowledge and expressly agree to the following terms:</strong>
            <br /><br />
            <strong>No Liability for User Interactions</strong>
            <br />
            I understand and agree that START Financial Freedom LLC dba Untouchable Dating, including its owners, agents, affiliates, employees, successors, and assigns (collectively, "START Financial Freedom LLC dba Untouchable Dating and its Owners"), acts solely as a facilitator of introductions between consenting adults. START Financial Freedom LLC dba Untouchable Dating and its Owners make no representations or warranties regarding the character, intentions, background, or conduct of any user or individual introduced through the Platform.
            <br /><br />
            <strong>Assumption of Risk</strong>
            <br />
            I acknowledge that all interactions, communications, meetings, and/or relationships formed through or as a result of the Platform are undertaken solely at my own risk. I understand that START Financial Freedom LLC dba Untouchable Dating does not perform criminal background checks, psychological evaluations, or personal screenings of any kind, and I accept full responsibility for conducting my own due diligence.
            <br /><br />
            <strong>Indemnification and Release</strong>
            <br />
            I hereby waive, release, and discharge START Financial Freedom LLC dba Untouchable Dating and its Owners from any and all claims, demands, causes of action, liabilities, damages, or losses—whether direct, indirect, incidental, special, or consequential—arising out of or relating to any interaction, relationship, or dispute with any individual I meet through the Platform. This includes, without limitation, claims for emotional distress, financial loss, physical injury, or other harm.
            <br /><br />
            <strong>Recourse Through Appropriate Authorities</strong>
            <br />
            In the event of any dispute, misconduct, harm, or legal issue arising from my dating or relationship activities associated with any individual met through the Platform, I agree that my sole legal recourse shall be against the individual(s) involved. I further agree to report any criminal or harmful conduct to the appropriate local law enforcement or regulatory authorities, and I shall not hold START Financial Freedom LLC dba Untouchable Dating and its Owners responsible for initiating or participating in any legal proceedings.
            <br /><br />
            <strong>Binding Agreement</strong>
            <br />
            By registering with or using START Financial Freedom LLC dba Untouchable Dating, I affirm that I have read, understood, and voluntarily agree to be bound by the terms of this Legal Disclaimer and Release of Liability. This agreement shall be governed by and construed in accordance with the laws of the state or jurisdiction in which START Financial Freedom LLC dba Untouchable Dating operates, without regard to its conflict of law principles.
            <span className="text-red-700 font-semibold">*</span>
          </span>
        </label>
      </div>

      <Button
        type="submit"
        className="w-full text-lg bg-blue-900 hover:bg-blue-800"
        disabled={!agreedToDisclaimer}
      >
        Save Profile
      </Button>
    </form>
  );
};

