import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BackToHomeButton } from "@/components/BackToHomeButton";
import { MemberCounter } from "@/components/MemberCounter";
import { FavoriteButton } from "@/components/FavoriteButton";
import { VerificationBadge } from "@/components/VerificationBadge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

// Extended demoProfiles to cover new fields for realistic filtering.
const demoProfiles = [
  {
    id: "1",
    gender: "Gentleman",
    fullName: "John Smith",
    age: 32,
    bio: "Software Engineer, loves travel & healthy lifestyle.",
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
       "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
     ],
     hasBloodTest: true
  },
  {
    id: "2",
    gender: "Lady",
    fullName: "Jane Doe",
    age: 27,
    bio: "Marketing Lead, passionate about wellness and literature.",
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
       "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
     ],
     hasBloodTest: false
  },
  {
    id: "3",
    gender: "Gentleman",
    fullName: "Mike Lee",
    age: 29,
    bio: "Pet lover, pescatarian, and community activist.",
    linkedin: "https://linkedin.com/in/mikelee",
    healthStatus: "Yes, I am drug and disease free.",
    covidVaccinated: "yes",
    diet: "pescatarian",
    smoking: "smoker",
    marijuana: true,
    orientation: "gay",
    relationship: "monogamous",
    ethnicity: ["asian"],
    petOwner: true,
     photos: [
       "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
     ],
     hasBloodTest: true
  },
  {
    id: "4",
    gender: "Lady",
    fullName: "Lila Black",
    age: 35,
    bio: "Jewish heritage, proud pet owner, passionate about books.",
    linkedin: "https://linkedin.com/in/lilablack",
    healthStatus: "Yes, I am drug and disease free.",
    covidVaccinated: "yes",
    diet: "vegan",
    smoking: "non_smoker",
    marijuana: false,
    orientation: "straight",
    relationship: "polygamy",
    ethnicity: ["black", "african", "jewish"],
    petOwner: true,
     photos: [
       "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
     ],
     hasBloodTest: false
  }
];

// Defines the available filter options.
const dietOptions = [
  { value: "vegan", label: "Vegan" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "pescatarian", label: "Pescatarian" }
];
const smokingOptions = [
  { value: "non_smoker", label: "Non Smoker" },
  { value: "smoker", label: "Smoker" }
];
const marijuanaOptions = [
  { value: "marijuana", label: "Marijuana Smoker" }
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

  // Filter state -- set initial values to "any"
  const [diet, setDiet] = useState<string>("any");
  const [smoking, setSmoking] = useState<string>("any");
  const [marijuana, setMarijuana] = useState(false);
  const [orientation, setOrientation] = useState<string>("any");
  const [relationship, setRelationship] = useState<string>("any");
  const [ethnicities, setEthnicities] = useState<string[]>([]);
  const [petOwner, setPetOwner] = useState<string>("any"); // "any" | "yes" | "no"

  const handleEthnicityChange = (eth: string) => {
    setEthnicities((current) =>
      current.includes(eth)
        ? current.filter((e) => e !== eth)
        : [...current, eth]
    );
  };

  // This logic applies all filters selected by the user.
  const filtered = demoProfiles.filter(
    (profile) =>
      // gender filter (existing logic)
      ((userGender === "Gentleman" && profile.gender === "Lady") ||
        (userGender === "Lady" && profile.gender === "Gentleman")) &&
      // dietary
      (diet !== "any" ? profile.diet === diet : true) &&
      // smoking
      (smoking !== "any" ? profile.smoking === smoking : true) &&
      // marijuana
      (!marijuana || !!profile.marijuana) &&
      // orientation
      (orientation !== "any" ? profile.orientation === orientation : true) &&
      // relationship
      (relationship !== "any" ? profile.relationship === relationship : true) &&
      // ethnicities: at least one selected ethnicity must match profile's array
      (ethnicities.length > 0
        ? ethnicities.some((eth) => profile.ethnicity.includes(eth))
        : true) &&
      // pet owner
      (petOwner === "any" ? true : (petOwner === "yes" ? profile.petOwner : !profile.petOwner))
  );

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

  if (!userGender)
    return (
      <div className="flex flex-col items-center mx-auto py-20 gap-8">
        <BackToHomeButton />
        
        {/* Live Member Counter */}
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
        
        {/* Live Member Counter */}
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

  return (
    <div className="container max-w-3xl mx-auto py-12">
      <BackToHomeButton />
      
      {/* Live Member Counter */}
      <div className="flex justify-center mb-8">
        <MemberCounter />
      </div>
      
      <h2 className="text-3xl font-extrabold mb-8 text-center">Browse Members</h2>
      <div className="bg-slate-50 border rounded-xl p-4 mb-8">
        <h3 className="font-semibold text-lg mb-4">Additional Search Filters</h3>
        <div className="flex flex-col gap-4">
          {/* Dietary */}
          <div>
            <label className="font-medium mr-2">Diet:</label>
            <Select value={diet} onValueChange={v => setDiet(v)}>
              <SelectTrigger className="w-40 inline-block">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                {dietOptions.map(opt => (
                  <SelectItem value={opt.value} key={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Smoking */}
          <div>
            <label className="font-medium mr-2">Smoking:</label>
            <Select value={smoking} onValueChange={v => setSmoking(v)}>
              <SelectTrigger className="w-40 inline-block">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                {smokingOptions.map(opt => (
                  <SelectItem value={opt.value} key={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Marijuana */}
          <div>
            <label className="font-medium mr-2">Marijuana Smoker:</label>
            <Checkbox id="marijuana" checked={marijuana} onCheckedChange={val => setMarijuana(!!val)} />
            <label htmlFor="marijuana" className="ml-2 text-sm">Yes</label>
          </div>
          {/* Sexual Orientation */}
          <div>
            <label className="font-medium mr-2">Orientation:</label>
            <Select value={orientation} onValueChange={v => setOrientation(v)}>
              <SelectTrigger className="w-44 inline-block">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                {orientationOptions.map(opt => (
                  <SelectItem value={opt.value} key={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Relationship type */}
          <div>
            <label className="font-medium mr-2">Relationship:</label>
            <Select value={relationship} onValueChange={v => setRelationship(v)}>
              <SelectTrigger className="w-44 inline-block">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                {relationshipOptions.map(opt => (
                  <SelectItem value={opt.value} key={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Ethnicities */}
          <div>
            <label className="font-medium mr-2 block">Ethnicity:</label>
            <div className="flex flex-wrap gap-3">
              {ethnicityOptions.map(opt => (
                <label className="flex items-center gap-1 text-sm" key={opt.value}>
                  <Checkbox
                    checked={ethnicities.includes(opt.value)}
                    onCheckedChange={() => handleEthnicityChange(opt.value)}
                    id={"ethnicity_" + opt.value}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Pet owner */}
          <div>
            <label className="font-medium mr-2">Pet Owner:</label>
            <Select value={petOwner} onValueChange={val => setPetOwner(val)}>
              <SelectTrigger className="w-40 inline-block">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {filtered.length === 0 && (
        <div className="text-center text-gray-400 py-12">
          No profiles found with your selected criteria.
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filtered.map((profile, idx) => (
          <div key={idx} className="rounded-xl border p-4 bg-white flex flex-col gap-4 shadow hover:shadow-lg transition-shadow">
            <div className="grid grid-cols-3 gap-2">
              {profile.photos.map((src, i) => (
                <img key={i} src={src} alt="Profile" className="object-cover aspect-square rounded-md border" />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={() => window.open(`/profile/${profile.id}`, '_blank')}
                  className="font-bold text-lg text-blue-600 hover:text-blue-800 underline text-left"
                >
                  {profile.fullName} ({profile.age})
                </button>
                <VerificationBadge hasBloodTest={profile.hasBloodTest} showText={false} size="sm" />
              </div>
              <div className="text-gray-600 mb-1">{profile.bio}</div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-blue-600 text-sm font-medium">LinkedIn Verified</span>
                  </div>
                  <VerificationBadge hasBloodTest={profile.hasBloodTest} size="sm" />
                </div>
                <FavoriteButton 
                  profileId={profile.id}
                  profileName={profile.fullName}
                  size="sm"
                  variant="ghost"
                />
              </div>
            </div>
            <div className="text-xs text-gray-500">
              Health: {profile.healthStatus}<br />
              Covid-19 Vaccinated:{" "}
              <span className={profile.covidVaccinated === "no" ? "text-green-600 font-bold" : "text-red-600"}>
                {profile.covidVaccinated === "no" ? "Unvaccinated" : "Vaccinated"}
              </span>
              <br />
              Diet: {dietOptions.find(opt => opt.value === profile.diet)?.label || profile.diet}
              <br />
              Smoking: {smokingOptions.find(opt => opt.value === profile.smoking)?.label || profile.smoking}
              <br />
              Marijuana Smoker: {profile.marijuana ? "Yes" : "No"}
              <br />
              Orientation: {orientationOptions.find(opt => opt.value === profile.orientation)?.label || profile.orientation}
              <br />
              Relationship: {relationshipOptions.find(opt => opt.value === profile.relationship)?.label || profile.relationship}
              <br />
              Ethnicity: {profile.ethnicity.map(e =>
                ethnicityOptions.find(opt => opt.value === e)?.label || e
              ).join(", ")}
              <br />
              Pet Owner: {profile.petOwner ? "Yes" : "No"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
