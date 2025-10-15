import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PhotoUpload } from "@/components/PhotoUpload";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const ProfilePhotoManager: React.FC = () => {
  const [currentPhotos, setCurrentPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCurrentPhotos();
  }, []);

  const loadCurrentPhotos = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('photo_urls')
        .eq('user_id', user.id)
        .single();

      if (profile?.photo_urls) {
        setCurrentPhotos(profile.photo_urls);
      }
    } catch (error) {
      console.error('Error loading photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotosChange = async (urls: string[]) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({ photo_urls: urls })
        .eq('user_id', user.id);

      if (error) {
        toast.error("Failed to update photos");
        console.error('Error updating photos:', error);
      } else {
        setCurrentPhotos(urls);
        toast.success("Photos updated successfully");
      }
    } catch (error) {
      console.error('Error updating photos:', error);
      toast.error("Error updating photos");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Manage Profile Photos</CardTitle>
        <p className="text-sm text-gray-400">
          You can upload up to 5 photos total. The first photo will be your primary profile photo.
        </p>
      </CardHeader>
      <CardContent>
        <PhotoUpload
          maxPhotos={5}
          required={false}
          onPhotosChange={handlePhotosChange}
          initialPhotos={currentPhotos}
          label="Profile Photos"
        />
      </CardContent>
    </Card>
  );
};
