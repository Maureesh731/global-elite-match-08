import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const membershipSchema = z.object({
  firstName: z.string().trim().min(1, 'First name required').max(50),
  lastName: z.string().trim().min(1, 'Last name required').max(50),
  age: z.string().regex(/^\d{2,3}$/, 'Age must be valid').refine(val => {
    const age = parseInt(val);
    return age >= 18 && age <= 120;
  }, 'Must be 18+'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone'),
  email: z.string().email('Invalid email').max(255),
  bio: z.string().trim().max(2000, 'Bio too long'),
  linkedin: z.string().url('Invalid LinkedIn URL'),
  username: z.string().regex(/^[a-zA-Z0-9_]{3,20}$/, 'Username: 3-20 chars, letters/numbers/underscore'),
  password: z.string().min(8, 'Password must be 8+ characters')
    .regex(/[A-Z]/, 'Need uppercase')
    .regex(/[a-z]/, 'Need lowercase')
    .regex(/[0-9]/, 'Need number')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Need special char'),
});

type MembershipApplicationFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const MembershipApplicationForm: React.FC<MembershipApplicationFormProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    phone: "",
    linkedin: "",
    bio: "",
    username: "",
    password: "",
    confirmPassword: "",
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
    wantsOptionalTesting: "no"
  });
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      toast.error("Please agree to terms");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    const validation = membershipSchema.safeParse(formData);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setSubmitting(true);

    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/subscription-setup`,
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName
          }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("No user created");

      // Save application
      const { error: dbError } = await supabase
        .from('applications')
        .insert([{
          user_id: authData.user.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          member_profile_name: `${formData.firstName} ${formData.lastName}`,
          age: formData.age,
          email: formData.email,
          phone: formData.phone,
          linkedin: formData.linkedin,
          bio: formData.bio,
          username: formData.username,
          photo_url: '',
          membership_type: 'paid',
          has_herpes: formData.hasHerpes,
          has_hiv: formData.hasHIV,
          has_hpv: formData.hasHPV,
          has_other_stds: formData.hasOtherSTDs,
          has_chronic_diseases: formData.hasChronicDiseases,
          covid_vaccinated: formData.covidVaccinated,
          uses_alcohol: formData.usesAlcohol,
          uses_drugs: formData.usesDrugs,
          uses_marijuana: formData.usesMarijuana,
          smokes_cigarettes: formData.smokesCigarettes,
          uses_prescription_drugs: formData.usesPrescriptionDrugs,
          disclosure_authorization: formData.disclosureAuthorization,
          wants_optional_testing: formData.wantsOptionalTesting
        }]);

      if (dbError) throw dbError;

      // Create profile
      await supabase
        .from('profiles')
        .insert([{
          user_id: authData.user.id,
          full_name: `${formData.firstName} ${formData.lastName}`,
          age: formData.age,
          bio: formData.bio,
          gender: 'male',
          membership_type: 'paid',
          status: 'pending',
          photo_urls: []
        }]);

      // Paid users can send messages
      await supabase
        .from('message_restrictions')
        .insert([{
          user_id: authData.user.id,
          can_send_messages: true
        }]);

      toast.success("Application submitted! Proceed to payment.");
      onOpenChange(false);
      setTimeout(() => navigate('/subscription-setup'), 2000);

    } catch (error: any) {
      console.error("Membership application error:", error);
      toast.error(error.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Apply for Paid Membership</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 px-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInput}
                required
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInput}
                required
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="age">Age *</Label>
            <Input
              id="age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleInput}
              required
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInput}
              required
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInput}
              required
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>

          <div>
            <Label htmlFor="linkedin">LinkedIn Profile URL *</Label>
            <Input
              id="linkedin"
              name="linkedin"
              placeholder="https://linkedin.com/in/yourprofile"
              value={formData.linkedin}
              onChange={handleInput}
              required
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>

          <div>
            <Label htmlFor="bio">Bio *</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInput}
              required
              rows={4}
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>

          <div>
            <Label htmlFor="username">Username *</Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInput}
              required
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>

          <div>
            <Label htmlFor="password">Password *</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInput}
              required
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInput}
              required
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>

          <div className="space-y-3 border-t border-gray-700 pt-4">
            <h3 className="font-semibold">Health Disclosure</h3>
            
            {[
              { name: "hasHerpes", label: "Herpes" },
              { name: "hasHIV", label: "HIV" },
              { name: "hasHPV", label: "HPV" },
              { name: "hasOtherSTDs", label: "Other STDs" },
              { name: "hasChronicDiseases", label: "Chronic Diseases" },
              { name: "covidVaccinated", label: "COVID Vaccinated" },
              { name: "usesAlcohol", label: "Alcohol Use" },
              { name: "usesDrugs", label: "Drug Use" },
              { name: "usesMarijuana", label: "Marijuana Use" },
              { name: "smokesCigarettes", label: "Cigarettes" },
              { name: "usesPrescriptionDrugs", label: "Prescription Drugs" }
            ].map(({ name, label }) => (
              <div key={name}>
                <Label>{label}</Label>
                <RadioGroup
                  value={formData[name as keyof typeof formData] as string}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, [name]: value }))}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id={`${name}-yes`} />
                    <Label htmlFor={`${name}-yes`}>Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id={`${name}-no`} />
                    <Label htmlFor={`${name}-no`}>No</Label>
                  </div>
                </RadioGroup>
              </div>
            ))}

            <div>
              <Label>Disclosure Authorization</Label>
              <RadioGroup
                value={formData.disclosureAuthorization}
                onValueChange={(value) => setFormData(prev => ({ ...prev, disclosureAuthorization: value }))}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="auth-yes" />
                  <Label htmlFor="auth-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="auth-no" />
                  <Label htmlFor="auth-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Optional Lab Testing</Label>
              <RadioGroup
                value={formData.wantsOptionalTesting}
                onValueChange={(value) => setFormData(prev => ({ ...prev, wantsOptionalTesting: value }))}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="test-yes" />
                  <Label htmlFor="test-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="test-no" />
                  <Label htmlFor="test-no">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1"
            />
            <Label htmlFor="terms" className="text-sm">
              I agree to the terms. Photos will be added after approval & payment.
            </Label>
          </div>

          <Button
            type="submit"
            disabled={submitting || !agreed}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
          >
            {submitting ? "Submitting..." : "Submit Application & Proceed to Payment"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
