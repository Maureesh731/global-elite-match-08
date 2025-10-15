import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BackToHomeButton } from "@/components/BackToHomeButton";
import { MemberCounter } from "@/components/MemberCounter";
import { FavoriteButton } from "@/components/FavoriteButton";
import { VerificationBadge } from "@/components/VerificationBadge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

// Filter options
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

export default function ProfileSearch() {
  const [userGender, setUserGender] = useState<"Gentleman" | "Lady" | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredProfiles, setFilteredProfiles] = useState<any[]>([]);
  const [isApproved, setIsApproved] = useState(false);
  const [checkingApproval, setCheckingApproval] = useState(true);

  // Filter state
  const [ageRange, setAgeRange] = useState({ min: 18, max: 50 });
  const [diet, setDiet] = useState<string>("any");
  const [smoking, setSmoking] = useState<string>("any");
  const [marijuana, setMarijuana] = useState(false);
  const [orientation, setOrientation] = useState<string>("any");
  const [relationship, setRelationship] = useState<string>("any");
  const [ethnicities, setEthnicities] = useState<string[]>([]);
  const [petOwner, setPetOwner] = useState<string>("any");
  const [unvaccinatedOnly, setUnvaccinatedOnly] = useState(false);
  const [bloodTestOnly, setBloodTestOnly] = useState(false);

  // Check if current user is approved
  useEffect(() => {
    const checkUserApproval = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setIsApproved(false);
          setCheckingApproval(false);
          return;
        }

        const { data, error } = await supabase
          .from('applications')
          .select('status')
          .eq('user_id', user.id)
          .single();

        if (error || !data) {
          setIsApproved(false);
        } else {
          setIsApproved(data.status === 'approved');
        }
      } catch (error) {
        console.error('Error checking approval:', error);
        setIsApproved(false);
      } finally {
        setCheckingApproval(false);
      }
    };

    checkUserApproval();
  }, []);

  // Fetch approved profiles from applications table
  useEffect(() => {
    const fetchProfiles = async () => {
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
          .eq('status', 'approved');

        if (error) {
          console.error('Error fetching profiles:', error);
          toast.error('Failed to load profiles');
          return;
        }

        setProfiles(data || []);
        setFilteredProfiles(data || []);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to load profiles');
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  // Filter profiles based on selected criteria
  useEffect(() => {
    let filtered = profiles.filter(profile => {
      const age = parseInt(profile.age);
      if (age < ageRange.min || age > ageRange.max) return false;
      
      if (unvaccinatedOnly && profile.covid_vaccinated !== 'no') return false;
      if (bloodTestOnly && profile.wants_optional_testing !== 'yes') return false;
      if (marijuana && profile.uses_marijuana !== 'yes') return false;
      
      return true;
    });

    setFilteredProfiles(filtered);
  }, [profiles, ageRange, unvaccinatedOnly, bloodTestOnly, marijuana]);

  const handleEthnicityChange = (eth: string) => {
    setEthnicities((current) =>
      current.includes(eth)
        ? current.filter((e) => e !== eth)
        : [...current, eth]
    );
  };

  const getHealthDisclosures = (profile: any) => {
    if (profile.disclosure_authorization !== "yes") return [];
    
    const disclosures = [];
    if (profile.has_herpes === "yes") disclosures.push("HSV+");
    if (profile.has_hiv === "yes") disclosures.push("HIV+");
    if (profile.has_hpv === "yes") disclosures.push("HPV+");
    if (profile.has_other_stds === "yes") disclosures.push("STD+");
    if (profile.uses_alcohol === "yes") disclosures.push("Alcohol");
    if (profile.uses_drugs === "yes") disclosures.push("Drugs");
    if (profile.uses_marijuana === "yes") disclosures.push("Marijuana");
    if (profile.smokes_cigarettes === "yes") disclosures.push("Smoker");
    
    return disclosures;
  };

  // Reset filters when switching user gender
  const handleUserGender = (g: "Gentleman" | "Lady") => {
    setUserGender(g);
    setDiet("any");
    setSmoking("any");
    setMarijuana(false);
    setOrientation("any");
    setRelationship("any");
    setEthnicities([]);
    setPetOwner("any");
  };

  if (checkingApproval) {
    return (
      <div className="container max-w-3xl mx-auto py-12">
        <BackToHomeButton />
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Checking your approval status...</h2>
        </div>
      </div>
    );
  }

  if (!isApproved) {
    return (
      <div className="container max-w-3xl mx-auto py-12">
        <BackToHomeButton />
        <div className="text-center py-20 space-y-4">
          <h2 className="text-2xl font-bold mb-4">Application Pending Approval</h2>
          <p className="text-gray-600">Your application is currently being reviewed by our admin team.</p>
          <p className="text-gray-600">You'll be able to search profiles once your application is approved.</p>
          <p className="text-sm text-gray-500 mt-4">This usually takes 24-48 hours.</p>
        </div>
      </div>
    );
  }

  if (!userGender)
    return (
      <div className="flex flex-col items-center mx-auto py-20 gap-8">
        <BackToHomeButton />
        
        <div className="flex justify-center mb-8">
          <MemberCounter />
        </div>
        
        <h2 className="text-2xl font-semibold">Select Your Gender to Search</h2>
        <div className="flex gap-8">
          <Button onClick={() => handleUserGender("Gentleman")} className="px-8 text-lg">Gentleman</Button>
          <Button onClick={() => handleUserGender("Lady")} className="px-8 text-lg">Lady</Button>
        </div>
      </div>
    );

  if (!subscribed)
    return (
      <div className="flex flex-col items-center mx-auto py-20 gap-6">
        <BackToHomeButton />
        
        <div className="flex justify-center mb-8">
          <MemberCounter />
        </div>
        
        <h2 className="text-xl font-bold">Subscription Required</h2>
        <p className="text-gray-700 mb-2">Please purchase a monthly subscription to access the search.</p>
        <Button
          className="bg-blue-900 hover:bg-blue-800"
          onClick={() => setSubscribed(true)}
        >Simulate Payment (Demo)</Button>
      </div>
    );

  if (loading) {
    return (
      <div className="container max-w-3xl mx-auto py-12">
        <BackToHomeButton />
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Loading Profiles...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl mx-auto py-12">
      <BackToHomeButton />
      
      <div className="flex justify-center mb-8">
        <MemberCounter />
      </div>
      
      <h2 className="text-3xl font-extrabold mb-8 text-center">Browse Members</h2>
      
      <div className="bg-slate-50 border rounded-xl p-4 mb-8">
        <h3 className="font-semibold text-lg mb-4">Search Filters</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2">
              <Checkbox 
                checked={unvaccinatedOnly} 
                onCheckedChange={(checked) => setUnvaccinatedOnly(!!checked)} 
              />
              <span className="text-sm">Unvaccinated Only</span>
            </label>
          </div>
          <div>
            <label className="flex items-center gap-2">
              <Checkbox 
                checked={bloodTestOnly} 
                onCheckedChange={(checked) => setBloodTestOnly(!!checked)} 
              />
              <span className="text-sm">Lab Verified Only</span>
            </label>
          </div>
          <div>
            <label className="flex items-center gap-2">
              <Checkbox 
                checked={marijuana} 
                onCheckedChange={(checked) => setMarijuana(!!checked)} 
              />
              <span className="text-sm">Marijuana Users</span>
            </label>
          </div>
        </div>
      </div>

      {filteredProfiles.length === 0 && (
        <div className="text-center text-gray-400 py-12">
          No profiles found with your selected criteria.
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredProfiles.map((profile) => {
          const healthDisclosures = getHealthDisclosures(profile);
          // Mock photo for now since photos aren't stored in applications table yet
          const mockPhoto = "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952";
          
          return (
            <div key={profile.id} className="rounded-xl border p-4 bg-white flex flex-col gap-4 shadow hover:shadow-lg transition-shadow">
              <div className="grid grid-cols-1 gap-2">
                <img src={mockPhoto} alt="Profile" className="object-cover aspect-square rounded-md border w-full" />
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <button
                    onClick={() => window.open(`/profile/${profile.id}`, '_blank')}
                    className="font-bold text-lg text-blue-600 hover:text-blue-800 underline text-left"
                  >
                    {profile.first_name} {profile.last_name} ({profile.age})
                  </button>
                  <VerificationBadge hasBloodTest={profile.wants_optional_testing === 'yes'} showText={false} size="sm" />
                </div>
                
                <div className="text-gray-600 mb-3">{profile.bio}</div>
                
                {/* Health Disclosures */}
                {healthDisclosures.length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center gap-1 mb-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium text-orange-700">Health Disclosures:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {healthDisclosures.map((disclosure, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                          {disclosure}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-blue-600 text-sm font-medium">LinkedIn Verified</span>
                    </div>
                    <VerificationBadge hasBloodTest={profile.wants_optional_testing === 'yes'} size="sm" />
                  </div>
                  <FavoriteButton 
                    profileId={profile.id}
                    profileName={`${profile.first_name} ${profile.last_name}`}
                    size="sm"
                    variant="ghost"
                  />
                </div>
              </div>
              
              <div className="text-xs text-gray-500 space-y-1">
                <div>Member: @{profile.member_profile_name}</div>
                <div>
                  COVID-19 Vaccinated:{" "}
                  <span className={profile.covid_vaccinated === "no" ? "text-green-600 font-bold" : "text-red-600"}>
                    {profile.covid_vaccinated === "no" ? "Unvaccinated" : "Vaccinated"}
                  </span>
                </div>
                {profile.wants_optional_testing === 'yes' && (
                  <div className="text-blue-600 font-medium">✓ Lab Testing Completed</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}