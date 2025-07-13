import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BackToHomeButton } from "@/components/BackToHomeButton";
import { ArrowLeft, Lock, Unlock, Camera } from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";

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
    photoPrivacy: [false, false, true, true, false, false, true, false, false, false]
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
    photoPrivacy: [false, true, true, false, false, false, false, false, false, false]
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
  const [unlockedPhotos, setUnlockedPhotos] = useState<number[]>([]);
  const [requestedPhotos, setRequestedPhotos] = useState<number[]>([]);

  const profile = mockProfiles.find(p => p.id === id);

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

  const handlePhotoUnlockRequest = (photoIndex: number) => {
    if (!requestedPhotos.includes(photoIndex)) {
      setRequestedPhotos(prev => [...prev, photoIndex]);
      // Simulate approval after 2 seconds
      setTimeout(() => {
        setUnlockedPhotos(prev => [...prev, photoIndex]);
        setRequestedPhotos(prev => prev.filter(i => i !== photoIndex));
      }, 2000);
    }
  };

  const isPhotoVisible = (photoIndex: number) => {
    return !profile.photoPrivacy[photoIndex] || unlockedPhotos.includes(photoIndex);
  };

  const isPhotoRequested = (photoIndex: number) => {
    return requestedPhotos.includes(photoIndex);
  };

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
            <h1 className="text-3xl font-bold mb-2">{profile.fullName}</h1>
            <p className="text-xl text-gray-600">Age {profile.age} • {profile.gender}</p>
          </div>

          {/* Photos Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Camera className="w-6 h-6" />
              Photos
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {profile.photos.map((photo, index) => (
                <div key={index} className="relative aspect-square">
                  {isPhotoVisible(index) ? (
                    <img
                      src={photo}
                      alt={`${profile.fullName} - Photo ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-lg flex flex-col items-center justify-center">
                      <Lock className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-xs text-gray-500 text-center mb-2">Private Photo</p>
                      {isPhotoRequested(index) ? (
                        <div className="text-xs text-blue-600 text-center">
                          Request Sent...
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePhotoUnlockRequest(index)}
                          className="text-xs px-2 py-1"
                        >
                          <Unlock className="w-3 h-3 mr-1" />
                          Request
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bio & Story */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">About</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Bio</h3>
                <p className="text-gray-700">{profile.bio}</p>
              </div>
              {profile.story && (
                <div>
                  <h3 className="text-lg font-medium mb-2">My Story</h3>
                  <p className="text-gray-700 leading-relaxed">{profile.story}</p>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Details</h2>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Health Status:</span>
                  <span className="ml-2 text-gray-700">{profile.healthStatus}</span>
                </div>
                <div>
                  <span className="font-medium">Covid-19 Vaccination:</span>
                  <span className={`ml-2 ${profile.covidVaccinated === "no" ? "text-green-600 font-bold" : "text-red-600"}`}>
                    {profile.covidVaccinated === "no" ? "Unvaccinated" : "Vaccinated"}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Diet:</span>
                  <span className="ml-2 text-gray-700">
                    {dietOptions.find(opt => opt.value === profile.diet)?.label || profile.diet}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Smoking:</span>
                  <span className="ml-2 text-gray-700">
                    {smokingOptions.find(opt => opt.value === profile.smoking)?.label || profile.smoking}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Marijuana Use:</span>
                  <span className="ml-2 text-gray-700">{profile.marijuana ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Preferences</h2>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Sexual Orientation:</span>
                  <span className="ml-2 text-gray-700">
                    {orientationOptions.find(opt => opt.value === profile.orientation)?.label || profile.orientation}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Relationship Style:</span>
                  <span className="ml-2 text-gray-700">
                    {relationshipOptions.find(opt => opt.value === profile.relationship)?.label || profile.relationship}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Ethnicity:</span>
                  <span className="ml-2 text-gray-700">
                    {profile.ethnicity.map(e =>
                      ethnicityOptions.find(opt => opt.value === e)?.label || e
                    ).join(", ")}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Pet Owner:</span>
                  <span className="ml-2 text-gray-700">{profile.petOwner ? "Yes" : "No"}</span>
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
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Send Message
              </Button>
              <FavoriteButton 
                profileId={profile.id}
                profileName={profile.fullName}
                size="lg"
              />
              <Button size="lg" variant="outline">
                Report Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}