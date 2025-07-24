
import React, { useEffect, useState } from "react";
import { ProfileForm } from "@/components/ProfileForm";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BackToHomeButton } from "@/components/BackToHomeButton";
import { MemberCounter } from "@/components/MemberCounter";
import { supabase } from "@/integrations/supabase/client";

const LadiesProfilePage = () => {
  const navigate = useNavigate();
  const [applicationData, setApplicationData] = useState<any>(null);

  useEffect(() => {
    // Get application data from localStorage if coming from Welcome page
    const storedData = localStorage.getItem('pendingApplication');
    if (storedData) {
      try {
        setApplicationData(JSON.parse(storedData));
      } catch (error) {
        console.error('Error parsing application data:', error);
      }
    }
  }, []);

  async function handleSave(data: any) {
    try {
      // For now, store profile data with the application data
      // This will be updated once the admin approves the profile
      const profileData = {
        full_name: data.fullName,
        age: parseInt(data.age),
        bio: data.bio,
        story: data.story,
        linkedin: data.linkedin,
        health_status: data.healthStatus,
        covid_vaccinated: data.covidVaccinated === 'yes',
        photos: data.photos,
        photo_privacy: data.photoPrivacy,
        gender: 'Lady',
        status: 'pending_approval'
      };

      // Store profile data in localStorage for now
      localStorage.setItem('pendingProfile', JSON.stringify(profileData));
      
      // Clear stored application data
      localStorage.removeItem('pendingApplication');
      
      toast.success("Profile submitted for approval! You'll be notified once approved.");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error("Error saving profile. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-8">
      <div className="max-w-xl mx-auto px-2">
        <BackToHomeButton />
        
        {/* Live Member Counter */}
        <div className="flex justify-center mb-8">
          <MemberCounter />
        </div>
      </div>
      <ProfileForm 
        gender="Lady" 
        onSave={handleSave} 
        initialData={applicationData ? {
          fullName: `${applicationData.firstName} ${applicationData.lastName}`,
          age: applicationData.age,
          bio: applicationData.bio,
          linkedin: applicationData.linkedin
        } : undefined}
      />
    </div>
  );
};

export default LadiesProfilePage;
