import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const freeProfileSchema = z.object({
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
    .regex(/[A-Z]/, 'Need uppercase letter')
    .regex(/[a-z]/, 'Need lowercase letter')
    .regex(/[0-9]/, 'Need number')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Need special character'),
});

type FreeProfileFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const FreeProfileForm: React.FC<FreeProfileFormProps> = ({ open, onOpenChange }) => {
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
    confirmPassword: ""
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
      toast.error("Please agree to terms and conditions");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    const validation = freeProfileSchema.safeParse(formData);
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
          emailRedirectTo: `${window.location.origin}/welcome`,
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
          membership_type: 'free',
          has_herpes: 'no',
          has_hiv: 'no',
          has_hpv: 'no',
          has_other_stds: 'no',
          has_chronic_diseases: 'no',
          covid_vaccinated: 'no',
          uses_alcohol: 'no',
          uses_drugs: 'no',
          uses_marijuana: 'no',
          smokes_cigarettes: 'no',
          uses_prescription_drugs: 'no',
          disclosure_authorization: 'no',
          wants_optional_testing: 'no'
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
          membership_type: 'free',
          status: 'pending',
          photo_urls: []
        }]);

      // Create message restriction
      await supabase
        .from('message_restrictions')
        .insert([{
          user_id: authData.user.id,
          can_send_messages: false
        }]);

      toast.success("Free profile created! Please check your email.");
      onOpenChange(false);
      setTimeout(() => navigate('/welcome'), 2000);

    } catch (error: any) {
      console.error("Free profile error:", error);
      toast.error(error.message || "Failed to create profile");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Create Free Profile</DialogTitle>
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

          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1"
            />
            <Label htmlFor="terms" className="text-sm">
              I agree to the terms and conditions. Photos will be added after approval.
            </Label>
          </div>

          <Button
            type="submit"
            disabled={submitting || !agreed}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
          >
            {submitting ? "Creating..." : "Create Free Profile"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
