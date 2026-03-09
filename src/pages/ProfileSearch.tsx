import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BackToHomeButton } from "@/components/BackToHomeButton";
import { MemberCounter } from "@/components/MemberCounter";
import { FavoriteButton } from "@/components/FavoriteButton";
import { VerificationBadge } from "@/components/VerificationBadge";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, UserCircle, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfileSearch() {
  const navigate = useNavigate();
  const [userGender, setUserGender] = useState<"Gentleman" | "Lady" | null>(null);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredProfiles, setFilteredProfiles] = useState<any[]>([]);
  const [isApproved, setIsApproved] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingApproval, setCheckingApproval] = useState(true);

  // Filter state
  const [ageRange, setAgeRange] = useState({ min: 18, max: 80 });
  const [marijuana, setMarijuana] = useState(false);
  const [unvaccinatedOnly, setUnvaccinatedOnly] = useState(false);
  const [bloodTestOnly, setBloodTestOnly] = useState(false);

  // Check if current user is logged in and approved
  useEffect(() => {
    const checkUserApproval = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          setIsLoggedIn(false);
          setIsApproved(false);
          setCheckingApproval(false);
          return;
        }

        setIsLoggedIn(true);

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

  // Fetch approved profiles — join profiles + applications for photos + health data
  useEffect(() => {
    if (!isApproved) return;

    const fetchProfiles = async () => {
      try {
        // Fetch from profiles table (has photo_urls) joined with applications for health data
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .eq('status', 'approved');

        if (profilesError) throw profilesError;

        // Also fetch applications to get health disclosures
        const { data: appsData, error: appsError } = await supabase
          .from('applications')
          .select('user_id, has_herpes, has_hiv, has_hpv, has_other_stds, has_chronic_diseases, covid_vaccinated, uses_alcohol, uses_drugs, uses_marijuana, smokes_cigarettes, uses_prescription_drugs, disclosure_authorization, wants_optional_testing, member_profile_name, username')
          .eq('status', 'approved');

        if (appsError) throw appsError;

        // Merge profiles with application health data
        const appMap: Record<string, any> = {};
        (appsData || []).forEach(a => { appMap[a.user_id] = a; });

        const merged = (profilesData || []).map(p => ({
          ...p,
          ...(appMap[p.user_id] || {})
        }));

        setProfiles(merged);
        setFilteredProfiles(merged);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        toast.error('Failed to load profiles');
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [isApproved]);

  // Filter profiles
  useEffect(() => {
    let filtered = profiles.filter(profile => {
      const age = parseInt(profile.age);
      if (!isNaN(age)) {
        if (age < ageRange.min || age > ageRange.max) return false;
      }
      if (unvaccinatedOnly && profile.covid_vaccinated !== 'no') return false;
      if (bloodTestOnly && profile.wants_optional_testing !== 'yes') return false;
      if (marijuana && profile.uses_marijuana !== 'yes') return false;
      // Gender filter: show opposite gender
      if (userGender === 'Gentleman' && profile.gender === 'male') return false;
      if (userGender === 'Lady' && profile.gender === 'female') return false;
      return true;
    });
    setFilteredProfiles(filtered);
  }, [profiles, ageRange, unvaccinatedOnly, bloodTestOnly, marijuana, userGender]);

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

  if (checkingApproval) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Checking your access...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <Lock className="w-16 h-16 text-purple-400 mx-auto" />
          <h2 className="text-2xl font-bold text-white">Sign In Required</h2>
          <p className="text-gray-400">You need to sign in to browse member profiles.</p>
          <Button onClick={() => navigate('/login')} className="bg-gradient-to-r from-purple-600 to-red-600 text-white">
            Sign In
          </Button>
          <div className="pt-2">
            <BackToHomeButton />
          </div>
        </div>
      </div>
    );
  }

  if (!isApproved) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <BackToHomeButton />
          <h2 className="text-2xl font-bold text-white mt-6">Application Pending</h2>
          <p className="text-gray-400">Your application is currently being reviewed. You'll be able to search profiles once approved (typically 24-48 hours).</p>
        </div>
      </div>
    );
  }

  if (!userGender) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center py-20 gap-8">
        <BackToHomeButton />
        <div className="flex justify-center mb-4">
          <MemberCounter />
        </div>
        <h2 className="text-2xl font-semibold text-white">Who are you looking to meet?</h2>
        <div className="flex gap-8">
          <Button
            onClick={() => setUserGender("Gentleman")}
            className="px-10 py-6 text-lg bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-600 hover:to-purple-400"
          >
            I'm a Lady (Looking for Gentlemen)
          </Button>
          <Button
            onClick={() => setUserGender("Lady")}
            className="px-10 py-6 text-lg bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400"
          >
            I'm a Gentleman (Looking for Ladies)
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading member profiles...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="container max-w-5xl mx-auto py-12 px-4">
        <BackToHomeButton />

        <div className="flex justify-center my-6">
          <MemberCounter />
        </div>

        <h2 className="text-3xl font-extrabold mb-8 text-center text-white">
          Browse {userGender === 'Gentleman' ? 'Ladies' : 'Gentlemen'}
        </h2>

        {/* Filters */}
        <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-4 mb-8">
          <h3 className="font-semibold text-lg mb-4 text-white">Search Filters</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
              <Checkbox checked={unvaccinatedOnly} onCheckedChange={(c) => setUnvaccinatedOnly(!!c)} />
              <span className="text-sm">Unvaccinated Only</span>
            </label>
            <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
              <Checkbox checked={bloodTestOnly} onCheckedChange={(c) => setBloodTestOnly(!!c)} />
              <span className="text-sm">Lab Verified Only</span>
            </label>
            <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
              <Checkbox checked={marijuana} onCheckedChange={(c) => setMarijuana(!!c)} />
              <span className="text-sm">Marijuana Users</span>
            </label>
          </div>
        </div>

        {filteredProfiles.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            No profiles found matching your criteria. Try adjusting your filters.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((profile) => {
            const healthDisclosures = getHealthDisclosures(profile);
            const photos = profile.photo_urls || [];
            const primaryPhoto = photos[0] || null;

            return (
              <div
                key={profile.id}
                className="rounded-xl border border-gray-700 bg-gray-800/50 flex flex-col gap-3 shadow-lg hover:shadow-purple-500/20 hover:border-purple-500/50 transition-all duration-200 overflow-hidden"
              >
                {/* Photo */}
                <div className="aspect-square bg-gray-700 relative overflow-hidden">
                  {primaryPhoto ? (
                    <img
                      src={primaryPhoto}
                      alt="Profile"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <UserCircle className="w-20 h-20 text-gray-500" />
                    </div>
                  )}
                </div>

                <div className="px-4 pb-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/profile/${profile.user_id}`)}
                      className="font-bold text-lg text-purple-300 hover:text-purple-200 text-left truncate"
                    >
                      {profile.full_name} ({profile.age})
                    </button>
                    <VerificationBadge hasBloodTest={profile.wants_optional_testing === 'yes'} showText={false} size="sm" />
                  </div>

                  {profile.bio && (
                    <p className="text-gray-400 text-sm line-clamp-2">{profile.bio}</p>
                  )}

                  {healthDisclosures.length > 0 && (
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <AlertTriangle className="w-3 h-3 text-orange-400" />
                        <span className="text-xs font-medium text-orange-400">Health Disclosures:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {healthDisclosures.map((d, i) => (
                          <Badge key={i} variant="outline" className="text-xs bg-orange-950/40 text-orange-300 border-orange-700/50">
                            {d}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    <div className="text-xs text-gray-500">
                      {profile.covid_vaccinated === 'no' ? (
                        <span className="text-green-400">✓ Unvaccinated</span>
                      ) : (
                        <span className="text-gray-500">Vaccinated</span>
                      )}
                    </div>
                    <FavoriteButton
                      profileId={profile.user_id}
                      profileName={profile.full_name}
                      size="sm"
                      variant="ghost"
                    />
                  </div>

                  <Button
                    onClick={() => navigate(`/profile/${profile.user_id}`)}
                    variant="outline"
                    size="sm"
                    className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
