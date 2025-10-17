import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BackToHomeButton } from "@/components/BackToHomeButton";
import { ArrowLeft, Lock, Unlock, Camera } from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { VerificationBadge } from "@/components/VerificationBadge";
import { MessagingModal } from "@/components/MessagingModal";
import { PhotoRequestModal } from "@/components/PhotoRequestModal";
import { HealthDisclosure } from "@/components/HealthDisclosure";
import { usePhotoAccess } from "@/hooks/usePhotoAccess";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Mock data - in a real app this would come from an API
const mockProfiles = [
  {
    id: "1",
    gender: "Gentleman",
    fullName: "John Smith",
    age: 32,
    bio: "Software Engineer, loves travel & healthy lifestyle.",
    story: "I'm a passionate software engineer who believes in living life to the fullest. When I'm not coding, you'll find me exploring new hiking trails, trying out new restaurants, or planning my next adventure. I value authenticity, kindness, and intellectual curiosity. I'm looking for someone who shares my love for adventure and isn't afraid to be themselves. I believe in building a partnership based on mutual respect, shared values, and lots of laughter. If you're someone who enjoys deep conversations as much as spontaneous road trips, I'd love to get to know you better.",
    linkedin: "https://linkedin.com/in/johnsmith",
    healthStatus: "Yes, I am drug and disease free.",
    covidVaccinated: "no",
    diet: "vegan",
    smoking: "non_smoker",
    marijuana: false,
    orientation: "straight",
    relationship: "monogamous",
    ethnicity: ["white", "european"],
    petOwner: true,
    photos: [
      "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
     ],
     photoPrivacy: [false, false, true, true, false, false, true, false, false, false],
     hasBloodTest: true
  },
  {
    id: "2", 
    gender: "Lady",
    fullName: "Jane Doe",
    age: 27,
    bio: "Marketing Lead, passionate about wellness and literature.",
    story: "As a marketing professional, I've learned the importance of authentic storytelling - both in work and in life. I'm passionate about wellness, literature, and creating meaningful connections. My ideal weekend involves a good book, a yoga class, and exploring local farmers markets. I'm seeking someone who values personal growth, has a strong sense of empathy, and isn't afraid to be vulnerable. I believe the best relationships are built on friendship first, with shared values and complementary strengths. If you're someone who appreciates both quiet moments and exciting adventures, let's connect!",
    linkedin: "https://linkedin.com/in/janedoe",
    healthStatus: "Yes, I am drug and disease free.",
    covidVaccinated: "no",
    diet: "vegetarian",
    smoking: "non_smoker", 
    marijuana: true,
    orientation: "bisexual",
    relationship: "polyamorous",
    ethnicity: ["latin", "white"],
    petOwner: false,
    photos: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      "https://images.unsplash.com/photo-1494790108755-2616b612b786",
       "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
     ],
     photoPrivacy: [false, true, true, false, false, false, false, false, false, false],
     hasBloodTest: false
  }
];

const dietOptions = [
  { value: "vegan", label: "Vegan" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "pescatarian", label: "Pescatarian" }
];

const smokingOptions = [
  { value: "non_smoker", label: "Non Smoker" },
  { value: "smoker", label: "Smoker" }
];

const orientationOptions = [
  { value: "gay", label: "Gay" },
  { value: "bisexual", label: "Bisexual" },
  { value: "straight", label: "Straight" }
];

const relationshipOptions = [
  { value: "monogamous", label: "Monogamous" },
  { value: "polyamorous", label: "Polyamorous" },
  { value: "polygamy", label: "Polygamy" }
];

const ethnicityOptions = [
  { value: "white", label: "White" },
  { value: "indigenous", label: "Indigenous" },
  { value: "native_american", label: "Native American" },
  { value: "latin", label: "Latin" },
  { value: "latino", label: "Latino" },
  { value: "black", label: "Black" },
  { value: "african", label: "African" },
  { value: "african_american", label: "African American" },
  { value: "european", label: "European" },
  { value: "asian", label: "Asian" },
  { value: "jewish", label: "Jewish" }
];

export default function ProfileDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [unlockedPhotos, setUnlockedPhotos] = useState<number[]>([]);
  const [requestedPhotos, setRequestedPhotos] = useState<number[]>([]);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [photoRequestModal, setPhotoRequestModal] = useState<{
    isOpen: boolean;
    photoIndex: number;
  }>({ isOpen: false, photoIndex: 0 });

  const { 
    fetchApprovedPhotos, 
    isPhotoApproved, 
    hasRequestedPhoto, 
    getRequestStatus 
  } = usePhotoAccess();

  // Fetch profile data from applications table (approved applications only)
  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('applications')
          .select(`
            id,
            first_name,
            last_name,
            member_profile_name,
            age,
            bio,
            linkedin,
            has_herpes,
            has_hiv,
            has_hpv,
            has_other_stds,
            has_chronic_diseases,
            covid_vaccinated,
            uses_alcohol,
            uses_drugs,
            uses_marijuana,
            smokes_cigarettes,
            uses_prescription_drugs,
            disclosure_authorization,
            wants_optional_testing,
            status
          `)
          .eq('id', id)
          .eq('status', 'approved')
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          toast.error('Profile not found');
          return;
        }

        if (data) {
          setProfile(data);
          fetchApprovedPhotos(data.id);
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, fetchApprovedPhotos]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-8">
        <div className="max-w-4xl mx-auto px-4">
          <BackToHomeButton />
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Loading Profile...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-8">
        <div className="max-w-4xl mx-auto px-4">
          <BackToHomeButton />
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Profile Not Found</h2>
            <Button onClick={() => navigate("/profile-search")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handlePhotoRequest = (photoIndex: number) => {
    setPhotoRequestModal({
      isOpen: true,
      photoIndex
    });
  };

  const isPhotoVisible = (photoIndex: number) => {
    // First photo is always visible, others are hidden unless approved
    // For now, we'll use mock photo data since photos aren't stored in applications table yet
    return photoIndex === 0 || isPhotoApproved(profile.id, photoIndex);
  };

  const getPhotoRequestStatus = (photoIndex: number) => {
    if (hasRequestedPhoto(profile.id, photoIndex)) {
      const status = getRequestStatus(profile.id, photoIndex);
      return status;
    }
    return null;
  };

  // Mock photos for now - in real implementation, photos would be stored separately
  const mockPhotos = [
    "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <BackToHomeButton />
          <Button 
            variant="outline"
            onClick={() => navigate("/profile-search")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Search
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h1 className="text-3xl font-bold">{profile.first_name} {profile.last_name}</h1>
              <VerificationBadge hasBloodTest={profile.wants_optional_testing === 'yes'} showText={false} size="lg" />
            </div>
            <p className="text-xl text-gray-600 mb-3">Age {profile.age}</p>
            <p className="text-lg text-gray-600 mb-3">@{profile.member_profile_name}</p>
            <VerificationBadge hasBloodTest={profile.wants_optional_testing === 'yes'} size="default" />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Camera className="w-6 h-6" />
              Photos
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mockPhotos.map((photo, index) => {
                const requestStatus = getPhotoRequestStatus(index);
                return (
                  <div key={index} className="relative aspect-square">
                    {isPhotoVisible(index) ? (
                      <img
                        src={photo}
                        alt={`${profile.first_name} ${profile.last_name} - Photo ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-lg flex flex-col items-center justify-center">
                        <Lock className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-xs text-gray-500 text-center mb-2">Private Photo</p>
                        {requestStatus === 'pending' ? (
                          <div className="text-xs text-yellow-600 text-center">
                            Request Pending
                          </div>
                        ) : requestStatus === 'denied' ? (
                          <div className="text-xs text-red-600 text-center">
                            Request Denied
                          </div>
                        ) : requestStatus === 'approved' ? (
                          <div className="text-xs text-green-600 text-center">
                            Access Granted
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePhotoRequest(index)}
                            className="text-xs px-2 py-1"
                          >
                            <Unlock className="w-3 h-3 mr-1" />
                            Request Access
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Health Disclosure Section */}
          <div className="mb-8">
            <HealthDisclosure healthData={profile} />
          </div>

          {/* Bio & Story */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">About</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Bio</h3>
                <p className="text-gray-700">{profile.bio}</p>
              </div>
              {profile.linkedin && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Professional</h3>
                  <a 
                    href={profile.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Health Status</h2>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">COVID-19 Vaccination:</span>
                  <span className={`ml-2 ${profile.covid_vaccinated === "no" ? "text-green-600 font-bold" : "text-red-600"}`}>
                    {profile.covid_vaccinated === "no" ? "Unvaccinated" : "Vaccinated"}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Optional Testing:</span>
                  <span className="ml-2 text-gray-700">
                    {profile.wants_optional_testing === "yes" ? "Completed Lab Testing" : "No Lab Testing"}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Contact</h2>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Member Profile:</span>
                  <span className="ml-2 text-gray-700">@{profile.member_profile_name}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Use the "Send Message" button below to contact this member securely through the platform.
                </div>
              </div>
            </div>
          </div>

          {/* Professional Verification */}
          <div className="border-t pt-6">
            <h2 className="text-2xl font-semibold mb-4">Professional</h2>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-blue-600 font-medium">LinkedIn Verified</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Professional profile verified for authenticity</p>
          </div>

          {/* Action Buttons */}
          <div className="border-t pt-6 mt-8">
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsMessagingOpen(true)}
              >
                Send Message
              </Button>
              <FavoriteButton 
                profileId={profile.id}
                profileName={`${profile.first_name} ${profile.last_name}`}
                size="lg"
              />
              <Button size="lg" variant="outline">
                Report Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <MessagingModal
        isOpen={isMessagingOpen}
        onClose={() => setIsMessagingOpen(false)}
        recipientId={profile.id}
        recipientName={`${profile.first_name} ${profile.last_name}`}
      />

      <PhotoRequestModal
        isOpen={photoRequestModal.isOpen}
        onClose={() => setPhotoRequestModal({ isOpen: false, photoIndex: 0 })}
        profileId={profile.id}
        profileName={`${profile.first_name} ${profile.last_name}`}
        photoIndex={photoRequestModal.photoIndex}
      />
    </div>
  );
}