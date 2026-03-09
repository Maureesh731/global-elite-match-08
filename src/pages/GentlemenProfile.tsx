import React, { useEffect, useState } from "react";
import { ProfileForm } from "@/components/ProfileForm";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BackToHomeButton } from "@/components/BackToHomeButton";
import { MemberCounter } from "@/components/MemberCounter";
import { supabase } from "@/integrations/supabase/client";

const GentlemenProfilePage = () => {
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/login');
          return;
        }

        // Load application data to pre-fill form
        const { data: app } = await supabase
          .from('applications')
          .select('first_name, last_name, age, bio, linkedin, status')
          .eq('user_id', user.id)
          .single();

        if (app?.status !== 'approved') {
          toast.error("Your application must be approved before creating a profile.");
          navigate('/welcome');
          return;
        }

        // Load existing profile if any
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (profile) {
          setInitialData({
            fullName: profile.full_name,
            age: profile.age,
            bio: profile.bio || '',
            linkedin: ''
          });
        } else if (app) {
          setInitialData({
            fullName: `${app.first_name} ${app.last_name}`,
            age: app.age,
            bio: app.bio || '',
            linkedin: app.linkedin || ''
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [navigate]);

  async function handleSave(data: any) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in to save your profile.");
        navigate('/login');
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          full_name: data.fullName,
          age: String(data.age),
          bio: data.bio || '',
          gender: 'male',
          membership_type: 'free',
          status: 'pending'
        }, { onConflict: 'user_id' });

      if (error) {
        console.error('Error saving profile:', error);
        toast.error(`Failed to save profile: ${error.message}`);
        return;
      }

      toast.success("Profile saved! It will be visible once approved.");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error("Error saving profile. Please try again.");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-8">
      <div className="max-w-xl mx-auto px-2">
        <BackToHomeButton />
        <div className="flex justify-center mb-8">
          <MemberCounter />
        </div>
      </div>
      <ProfileForm
        gender="Gentleman"
        onSave={handleSave}
        initialData={initialData}
      />
    </div>
  );
};

export default GentlemenProfilePage;
