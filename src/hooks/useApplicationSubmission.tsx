import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ApplicationFormState } from "./useApplicationForm";
import { z } from 'zod';
import { toast } from 'sonner';

const applicationSchema = z.object({
  firstName: z.string().trim().min(1, 'First name required').max(50),
  lastName: z.string().trim().min(1, 'Last name required').max(50),
  age: z.string().regex(/^\d{2,3}$/, 'Age must be a valid number').refine(val => {
    const age = parseInt(val);
    return age >= 18 && age <= 120;
  }, 'Age must be between 18 and 120'),
  phone: z.string().min(7, 'Invalid phone number').max(20),
  email: z.string().email('Invalid email address').max(255),
  bio: z.string().trim().max(2500, 'Bio must be less than 2500 characters'),
  linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  username: z.string().regex(/^[a-zA-Z0-9_]{3,30}$/, 'Username must be 3-30 characters (letters, numbers, underscore only)')
});

export const useApplicationSubmission = () => {
  const navigate = useNavigate();

  const submitApplication = async (
    form: ApplicationFormState,
    isFreeApplication: boolean,
    onSuccess: () => void
  ) => {
    try {
      console.log("Starting application submission...", { isFreeApplication });

      // Client-side validation
      const validation = applicationSchema.safeParse({
        firstName: form.firstName,
        lastName: form.lastName,
        age: form.age,
        phone: form.phone,
        email: form.email,
        bio: form.bio,
        linkedin: form.linkedin,
        username: form.username
      });

      if (!validation.success) {
        const errorMessage = validation.error.errors[0].message;
        console.error("Validation error:", errorMessage);
        toast.error(errorMessage);
        return;
      }

      if (form.password !== form.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      if (form.password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }

      // Submit everything via edge function (uses service role to bypass RLS)
      const { data, error } = await supabase.functions.invoke('submit-application', {
        body: {
          formData: form,
          isFreeApplication
        }
      });

      if (error) {
        console.error("Edge function error:", error);
        toast.error(error.message || "Submission failed. Please try again.");
        return;
      }

      if (data?.error) {
        console.error("Application submission error:", data.error);
        toast.error(data.error);
        return;
      }

      console.log("Application submitted successfully:", data);

      toast.success("Application submitted! Check your email to confirm your account, then sign in after approval.", {
        duration: 5000,
      });

      onSuccess();

      setTimeout(() => {
        navigate('/welcome');
      }, 2500);

    } catch (error) {
      console.error("Application submission error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return { submitApplication };
};
