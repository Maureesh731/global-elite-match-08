import { useState } from "react";

export type ApplicationFormState = {
  firstName: string;
  lastName: string;
  memberProfileName: string;
  age: string;
  email: string;
  phone: string;
  linkedin: string;
  bio: string;
  // Photo
  photoUrl: string;
  // Authentication credentials
  username: string;
  password: string;
  confirmPassword: string;
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

const initialFormState: ApplicationFormState = {
  firstName: "",
  lastName: "",
  memberProfileName: "",
  age: "",
  email: "",
  phone: "",
  linkedin: "",
  bio: "",
  photoUrl: "",
  // Authentication credentials
  username: "",
  password: "",
  confirmPassword: "",
  // Health disclosure questions
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
  // Optional testing
  wantsOptionalTesting: "no",
};

export const useApplicationForm = () => {
  const [form, setForm] = useState<ApplicationFormState>(initialFormState);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const setPhotoUrl = (url: string) => {
    setForm((f) => ({ ...f, photoUrl: url }));
  };

  const isFormValid = (agreed: boolean) => {
    const requiredFields = [
      form.firstName.trim(),
      form.lastName.trim(),
      form.memberProfileName.trim(),
      form.age.trim(),
      form.email.trim(),
      form.phone.trim(),
      form.linkedin.trim(),
      form.bio.trim(),
      form.username.trim(),
      form.password.trim(),
      form.confirmPassword.trim()
    ];

    const healthDisclosureFields = [
      form.hasHerpes,
      form.hasHIV,
      form.hasHPV,
      form.hasOtherSTDs,
      form.hasChronicDiseases,
      form.covidVaccinated,
      form.usesAlcohol,
      form.usesDrugs,
      form.usesMarijuana,
      form.smokesCigarettes,
      form.usesPrescriptionDrugs,
      form.disclosureAuthorization,
      form.wantsOptionalTesting
    ];

    // Check if all required text fields are filled
    const allFieldsFilled = requiredFields.every(field => field !== "");
    
    // Check if all health disclosure questions are answered
    const allHealthQuestionsAnswered = healthDisclosureFields.every(field => field !== "");
    
    // Validate LinkedIn URL format (required for professional verification)
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/i;
    const linkedinValid = form.linkedin.trim() !== "" && linkedinRegex.test(form.linkedin.trim());
    
    // Check if age is at least 18
    const ageValid = parseInt(form.age) >= 18;
    
    // Check if passwords match
    const passwordsMatch = form.password === form.confirmPassword;
    
    // Check password strength (minimum 8 characters + complexity requirements)
    const passwordValid = 
      form.password.length >= 8 &&
      /[A-Z]/.test(form.password) && // At least one uppercase letter
      /[a-z]/.test(form.password) && // At least one lowercase letter
      /[0-9]/.test(form.password) && // At least one number
      /[!@#$%^&*(),.?":{}|<>]/.test(form.password); // At least one special character

    return allFieldsFilled && allHealthQuestionsAnswered && linkedinValid && ageValid && passwordsMatch && passwordValid && agreed;
  };

  const resetForm = () => {
    setForm(initialFormState);
  };

  return {
    form,
    handleInput,
    setPhotoUrl,
    isFormValid,
    resetForm
  };
};