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
      console.log("Starting application submission...", { isFreeApplication });
      
      // Validate that photo is uploaded
      if (!form.photoUrl || form.photoUrl.trim() === "") {
        toast.error("Please upload a profile photo before submitting");
        return;
      }
      
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
          emailRedirectTo: `${window.location.origin}/welcome`,
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

      console.log("User created successfully:", authData.user.id);

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
        photo_url: form.photoUrl,
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

      // Create initial profile with photo
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{
          user_id: authData.user.id,
          full_name: `${form.firstName} ${form.lastName}`,
          age: form.age,
          bio: form.bio,
          gender: form.memberProfileName.toLowerCase().includes('lady') || 
                 form.memberProfileName.toLowerCase().includes('miss') ? 'female' : 'male',
          membership_type: isFreeApplication ? 'free' : 'paid',
          status: 'pending',
          photo_urls: form.photoUrl ? [form.photoUrl] : []
        }]);

      if (profileError) {
        console.error('Profile creation error:', profileError);
        // Don't fail the whole process if profile creation fails
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
      console.log("Sending application email...");
      const { data: emailData, error: emailError } = await supabase.functions.invoke("send-application", {
        body: { applicationData }
      });
      
      if (emailError) {
        console.error('Application email error:', emailError);
        toast.error("Failed to send application email");
      } else {
        console.log("Application email sent:", emailData);
      }

      // Send admin notification email
      console.log("Sending admin notification email...");
      const { data: adminEmailData, error: adminEmailError } = await supabase.functions.invoke("send-admin-notification", {
        body: { 
          applicantName: `${form.firstName} ${form.lastName}`,
          applicantEmail: form.email,
          membershipType: isFreeApplication ? 'Free' : 'Paid',
          applicationId: authData.user.id
        }
      });
      
      if (adminEmailError) {
        console.error('Admin notification error:', adminEmailError);
        toast.error("Failed to send admin notification");
      } else {
        console.log("Admin notification sent:", adminEmailData);
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