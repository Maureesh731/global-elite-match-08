
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
    linkedin: "",
    healthStatus: "",
    covidVaccinated: "no"
  });
  const [photos, setPhotos] = useState<(string | ArrayBuffer | null)[]>([]);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToDisclaimer) return;
    onSave({ ...form, photos });
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
        <Label>Profile Photos (up to 6):</Label>
        <div className="flex gap-2 flex-wrap mt-2">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="relative w-20 h-20 rounded-md border border-slate-200 bg-slate-50 flex items-center justify-center">
              <input
                ref={el => (fileInputRefs.current[idx] = el)}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handlePhotoChange(idx, e)}
              />
              {photos[idx] ? (
                <img
                  src={photos[idx] as string}
                  alt={`Profile ${idx + 1}`}
                  className="object-cover w-full h-full rounded-md"
                  onClick={() => fileInputRefs.current[idx]?.click()}
                />
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
          ))}
        </div>
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
          <span className="text-xs text-gray-700">
            <strong>Legal Disclaimer Agreement:</strong> I acknowledge and agree that Elite Match and its Owners are not responsible for anything that happens between individuals that meet and date from this site. Elite Match bears no responsibility for interactions, relationships, or consequences thereof. If issues arise, I understand I must go to my local authorities to make a police report and take proper legal recourse against the parties involved in my dating or relationship activities. By registering, I accept full responsibility and release Elite Match and its Owners from all liability. <span className="text-red-700 font-semibold">*</span>
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

