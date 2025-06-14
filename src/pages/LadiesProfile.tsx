
import React from "react";
import { ProfileForm } from "@/components/ProfileForm";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const LadiesProfilePage = () => {
  const navigate = useNavigate();

  function handleSave(data: any) {
    // Placeholder: in a real app, save to backend.
    toast.success("Lady's profile saved! (demo only, not persisted)");
    setTimeout(() => navigate("/profile-search"), 1000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-8">
      <div className="max-w-xl mx-auto px-2 mb-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-600 hover:text-blue-900"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Button>
      </div>
      <ProfileForm gender="Lady" onSave={handleSave} />
    </div>
  );
};

export default LadiesProfilePage;
