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
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
  email: z.string().email('Invalid email address').max(255),
  bio: z.string().trim().max(2000, 'Bio must be less than 2000 characters'),
  linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  username: z.string().regex(/^[a-zA-Z0-9_]{3,20}$/, 'Username must be 3-20 characters (letters, numbers, underscore only)')
});

export const useApplicationSubmission = () => {
  const navigate = useNavigate();

  const submitApplication = async (
    form: ApplicationFormState,
    isFreeApplication: boolean,
    onSuccess: () => void
  ) => {
    try {
      // Validate application data
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


      // Create Supabase auth user first
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            first_name: form.firstName,
            last_name: form.lastName
          }
        }
      });

      if (authError) {
        console.error("Auth signup error:", authError);
        toast.error(`Registration failed: ${authError.message}`);
        return;
      }

      if (!authData.user) {
        console.error("No user returned from signup");
        toast.error("Registration failed: No user created");
        return;
      }

      // Transform form data to match database schema (no password storage)
      const applicationData = {
        user_id: authData.user.id,
        first_name: form.firstName,
        last_name: form.lastName,
        member_profile_name: form.memberProfileName,
        age: form.age,
        email: form.email,
        phone: form.phone,
        linkedin: form.linkedin,
        bio: form.bio,
        username: form.username,
        has_herpes: form.hasHerpes,
        has_hiv: form.hasHIV,
        has_hpv: form.hasHPV,
        has_other_stds: form.hasOtherSTDs,
        has_chronic_diseases: form.hasChronicDiseases,
        covid_vaccinated: form.covidVaccinated,
        uses_alcohol: form.usesAlcohol,
        uses_drugs: form.usesDrugs,
        uses_marijuana: form.usesMarijuana,
        smokes_cigarettes: form.smokesCigarettes,
        uses_prescription_drugs: form.usesPrescriptionDrugs,
        disclosure_authorization: form.disclosureAuthorization,
        wants_optional_testing: form.wantsOptionalTesting,
        membership_type: isFreeApplication ? 'free' : 'paid'
      };

      // Save application to database
      const { error: dbError } = await supabase
        .from('applications')
        .insert([applicationData]);
      
      if (dbError) {
        console.error("Database insert error:", dbError);
        toast.error(`Application save failed: ${dbError.message}`);
        return;
      }

      // Create message restriction record for free users
      if (isFreeApplication && authData.user) {
        await supabase
          .from('message_restrictions')
          .insert([{
            user_id: authData.user.id,
            can_send_messages: false
          }]);
      }

      // Send application data to email
      const { error: emailError } = await supabase.functions.invoke("send-application", {
        body: { applicationData: form }
      });
      
      if (emailError) {
        // Continue even if email fails since data is saved
      }
      
      onSuccess();
      
      // Navigate to welcome page after success message
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