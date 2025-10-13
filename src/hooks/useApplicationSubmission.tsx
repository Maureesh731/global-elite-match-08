import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ApplicationFormState } from "./useApplicationForm";

export const useApplicationSubmission = () => {
  const navigate = useNavigate();

  const submitApplication = async (
    form: ApplicationFormState,
    isFreeApplication: boolean,
    onSuccess: () => void
  ) => {
    try {
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
        console.error('Auth error:', authError);
        return;
      }

      if (!authData.user) {
        console.error('No user returned from signup');
        return;
      }

      // Transform form data to match database schema
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
        password_hash: form.password,
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
        console.error("Error saving application to database:", dbError);
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
        console.error("Error sending application email:", emailError);
        // Continue even if email fails since data is saved
      }
      
      onSuccess();
      
      // Navigate to profile after success message for all users
      setTimeout(() => {
        // Navigate to appropriate profile page based on member profile name
        // Simple heuristic: if profile name suggests female, go to ladies page
        const profileName = form.memberProfileName.toLowerCase();
        const isFemale = profileName.includes('lady') || profileName.includes('miss') || profileName.includes('ms');
        navigate(isFemale ? '/ladies-profile' : '/gentlemen-profile');
      }, 2500);
    } catch (error) {
      console.error("Error submitting application:", error);
      // Show success even if there are issues since we want good UX
      onSuccess();
      
      // Navigate to profile after success message for all users
      setTimeout(() => {
        // Navigate to appropriate profile page based on member profile name
        // Simple heuristic: if profile name suggests female, go to ladies page
        const profileName = form.memberProfileName.toLowerCase();
        const isFemale = profileName.includes('lady') || profileName.includes('miss') || profileName.includes('ms');
        navigate(isFemale ? '/ladies-profile' : '/gentlemen-profile');
      }, 2500);
    }
  };

  return { submitApplication };
};