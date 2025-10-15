import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ProfilePhotoManager } from "@/components/ProfilePhotoManager";
import { BackToHomeButton } from "@/components/BackToHomeButton";
import { Loader2 } from "lucide-react";

const ProfilePhotos = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    checkApprovalStatus();
  }, []);

  const checkApprovalStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please log in to manage your photos");
        navigate('/login');
        return;
      }

      // Check if application is approved
      const { data: application } = await supabase
        .from('applications')
        .select('status')
        .eq('user_id', user.id)
        .single();

      if (!application || application.status !== 'approved') {
        toast.error("Your application must be approved before you can manage photos");
        navigate('/');
        return;
      }

      setIsApproved(true);
    } catch (error) {
      console.error('Error checking approval:', error);
      toast.error("Error checking approval status");
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!isApproved) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <BackToHomeButton />
        
        <div className="mt-8">
          <h1 className="text-4xl font-bold text-white mb-2 text-center">
            Manage Profile Photos
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Add up to 4 more photos to complete your profile (5 total)
          </p>
          
          <ProfilePhotoManager />
        </div>
      </div>
    </div>
  );
};

export default ProfilePhotos;
