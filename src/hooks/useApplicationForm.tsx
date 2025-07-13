import { useState } from "react";

export type ApplicationFormState = {
  firstName: string;
  lastName: string;
  memberProfileName: string;
  age: string;
  email: string;
  phone: string;
  linkedin: string;
  idFile: File | null;
  bio: string;
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
  idFile: null,
  bio: "",
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

  const handleFileChange = (
    name: "idFile",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] ?? null;
    setForm((f) => ({ ...f, [name]: file }));
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
    
    // Check if all health disclosure questions are answered (not default "no")
    const allHealthQuestionsAnswered = healthDisclosureFields.every(field => field !== "");
    
    // Check if ID file is uploaded
    const idFileUploaded = form.idFile !== null;
    
    // Check if age is at least 18
    const ageValid = parseInt(form.age) >= 18;
    
    // Check if passwords match
    const passwordsMatch = form.password === form.confirmPassword;
    
    // Check password strength (minimum 8 characters)
    const passwordValid = form.password.length >= 8;

    return allFieldsFilled && allHealthQuestionsAnswered && idFileUploaded && ageValid && passwordsMatch && passwordValid && agreed;
  };

  const resetForm = () => {
    setForm(initialFormState);
  };

  return {
    form,
    handleInput,
    handleFileChange,
    isFormValid,
    resetForm
  };
};