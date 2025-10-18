import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Loader2 } from "lucide-react";
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
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setPhotoUrls(initialPhotos);
  }, [initialPhotos]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }

    if (photoUrls.length >= maxPhotos) {
      toast.error(`Maximum ${maxPhotos} photos allowed`);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(7);
        const fileName = `applications/${timestamp}-${randomId}.${fileExt}`;
        
        const { data, error } = await supabase.storage
          .from('profile-photos')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (error) {
          console.error('Upload error:', error);
          toast.error(`Failed to upload ${file.name}: ${error.message}`);
          continue;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('profile-photos')
          .getPublicUrl(data.path);

        uploadedUrls.push(publicUrl);
      }

      if (uploadedUrls.length > 0) {
        const newPhotoUrls = [...photoUrls, ...uploadedUrls];
        setPhotoUrls(newPhotoUrls);
        onPhotosChange(newPhotoUrls);
        toast.success(`${uploadedUrls.length} photo${uploadedUrls.length > 1 ? 's' : ''} uploaded successfully!`);
      } else {
        toast.error("No photos were uploaded successfully");
      }
    } catch (error) {
      console.error('Error uploading photos:', error);
      toast.error("Error uploading photos");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple={maxPhotos > 1}
            onChange={handleFileUpload}
            className="hidden"
            disabled={uploading}
            id="photo-upload-input"
          />
          <Button
            type="button"
            onClick={() => {
              fileInputRef.current?.click();
            }}
            disabled={uploading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                {photoUrls.length === 0 ? 'Upload Photo' : 'Upload More Photos'}
              </>
            )}
          </Button>
          <p className="text-xs text-gray-400 mt-2">
            Supported: JPG, PNG, WEBP • Max size: 5MB per photo
          </p>
        </div>
      )}
    </div>
  );
};
