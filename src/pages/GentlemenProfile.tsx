
import React from "react";
import { ProfileForm } from "@/components/ProfileForm";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BackToHomeButton } from "@/components/BackToHomeButton";
import { MemberCounter } from "@/components/MemberCounter";

const GentlemenProfilePage = () => {
  const navigate = useNavigate();

  function handleSave(data: any) {
    // TODO: Save profile data to backend
    toast.success("Gentleman's profile saved!");
    setTimeout(() => navigate("/profile-search"), 1000);
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
      <ProfileForm gender="Gentleman" onSave={handleSave} />
    </div>
  );
};

export default GentlemenProfilePage;
