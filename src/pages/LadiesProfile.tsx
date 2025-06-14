
import React from "react";
import { ProfileForm } from "@/components/ProfileForm";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LadiesProfilePage = () => {
  const navigate = useNavigate();

  function handleSave(data: any) {
    // Placeholder: in a real app, save to backend.
    toast.success("Lady's profile saved! (demo only, not persisted)");
    setTimeout(() => navigate("/profile-search"), 1000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-8">
      <ProfileForm gender="Lady" onSave={handleSave} />
    </div>
  );
};

export default LadiesProfilePage;
