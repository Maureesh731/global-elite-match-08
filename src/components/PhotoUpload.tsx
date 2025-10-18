import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type PhotoUploadProps = {
  maxPhotos?: number;
  required?: boolean;
  onPhotosChange: (urls: string[]) => void;
  initialPhotos?: string[];
  label?: string;
};

export const PhotoUpload: React.FC<PhotoUploadProps> = ({
  maxPhotos = 5,
  required = false,
  onPhotosChange,
  initialPhotos = [],
  label = "Profile Photos"
}) => {
  const [photoUrls, setPhotoUrls] = useState<string[]>(initialPhotos);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log('Photo upload started, files:', files?.length);
    if (!files || files.length === 0) {
      console.log('No files selected');
      return;
    }

    if (photoUrls.length >= maxPhotos) {
      toast.error(`Maximum ${maxPhotos} photos allowed`);
      return;
    }

    const remainingSlots = maxPhotos - photoUrls.length;
    const filesToUpload = Array.from(files).slice(0, remainingSlots);

    setUploading(true);

    try {
      const uploadedUrls: string[] = [];

      for (const file of filesToUpload) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          toast.error(`${file.name} is not an image file`);
          continue;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} is too large. Max size is 5MB`);
          continue;
        }

        const fileExt = file.name.split('.').pop();
        // Use random ID for anonymous uploads during application
        const userId = Math.random().toString(36).substring(7);
        const fileName = `${userId}/${Math.random()}.${fileExt}`;
        
        console.log('Uploading file:', file.name, 'to:', fileName);
        const { data, error } = await supabase.storage
          .from('profile-photos')
          .upload(fileName, file);

        if (error) {
          console.error('Upload error:', error);
          toast.error(`Failed to upload ${file.name}`);
          continue;
        }
        
        console.log('Upload successful:', data.path);

        const { data: { publicUrl } } = supabase.storage
          .from('profile-photos')
          .getPublicUrl(data.path);

        uploadedUrls.push(publicUrl);
      }

      if (uploadedUrls.length > 0) {
        console.log('All uploads complete. Total photos:', uploadedUrls.length);
        const newPhotoUrls = [...photoUrls, ...uploadedUrls];
        setPhotoUrls(newPhotoUrls);
        onPhotosChange(newPhotoUrls);
        setUploading(false);
        
        console.log('Showing success toast');
        // Clear, immediate success notification
        toast.success(`Photo Upload Complete!`, {
          description: `Your photo has been successfully uploaded and added to your application. You may now continue filling out the form.`,
          duration: 6000,
        });
      } else {
        setUploading(false);
        toast.error("No photos were uploaded successfully");
      }
    } catch (error) {
      console.error('Error uploading photos:', error);
      setUploading(false);
      toast.error("Error uploading photos");
    }
  };

  const removePhoto = (index: number) => {
    const newPhotoUrls = photoUrls.filter((_, i) => i !== index);
    setPhotoUrls(newPhotoUrls);
    onPhotosChange(newPhotoUrls);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-white">{label} {required && "*"}</Label>
        <p className="text-sm text-gray-400 mb-2">
          {photoUrls.length === 0 && required 
            ? "At least 1 photo required" 
            : `Upload up to ${maxPhotos} photos (${photoUrls.length}/${maxPhotos})`}
        </p>
      </div>

      {/* Photo previews */}
      {photoUrls.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {photoUrls.map((url, index) => (
            <div key={index} className="relative group">
              <img 
                src={url} 
                alt={`Photo ${index + 1}`} 
                className="w-full h-32 object-cover rounded-lg border-2 border-gray-600"
              />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                  Primary
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      {photoUrls.length < maxPhotos && (
        <div>
          <label htmlFor="photo-upload" className="cursor-pointer">
            <input
              type="file"
              id="photo-upload"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              disabled={uploading}
            />
            <div className="w-full bg-gray-700 border border-gray-600 text-white hover:bg-gray-600 rounded-md px-4 py-2 flex items-center justify-center transition-colors">
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? 'Uploading...' : 'Upload Photos'}
            </div>
          </label>
          <p className="text-xs text-gray-400 mt-2">
            Supported: JPG, PNG, WEBP • Max size: 5MB per photo
          </p>
        </div>
      )}
    </div>
  );
};
