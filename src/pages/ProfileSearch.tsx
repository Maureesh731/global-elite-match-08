
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

// This demo list is static - backend filter coming in production.
const demoProfiles = [
  {
    gender: "Gentleman",
    fullName: "John Smith",
    age: 32,
    bio: "Software Engineer, loves travel & healthy lifestyle.",
    linkedin: "https://linkedin.com/in/johnsmith",
    healthStatus: "Yes, I am drug and disease free.",
    covidVaccinated: "no",
    photos: [
      "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
    ]
  },
  {
    gender: "Lady",
    fullName: "Jane Doe",
    age: 27,
    bio: "Marketing Lead, passionate about wellness and literature.",
    linkedin: "https://linkedin.com/in/janedoe",
    healthStatus: "Yes, I am drug and disease free.",
    covidVaccinated: "no",
    photos: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    ]
  },
];

export default function ProfileSearch() {
  // Demo: user picks gender and confirms "subscription"
  const [userGender, setUserGender] = useState<"Gentleman" | "Lady" | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  const filtered = demoProfiles.filter(
    (profile) =>
      (userGender === "Gentleman" && profile.gender === "Lady") ||
      (userGender === "Lady" && profile.gender === "Gentleman")
  );

  if (!userGender)
    return (
      <div className="flex flex-col items-center mx-auto py-20 gap-8">
        <h2 className="text-2xl font-semibold">Select Your Gender to Search</h2>
        <div className="flex gap-8">
          <Button onClick={() => setUserGender("Gentleman")} className="px-8 text-lg">Gentleman</Button>
          <Button onClick={() => setUserGender("Lady")} className="px-8 text-lg">Lady</Button>
        </div>
      </div>
    );

  if (!subscribed)
    return (
      <div className="flex flex-col items-center mx-auto py-20 gap-6">
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
      <h2 className="text-3xl font-extrabold mb-8 text-center">Browse Members</h2>
      {filtered.length === 0 && (
        <div className="text-center text-gray-400 py-12">
          No profiles found yet!
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filtered.map((profile, idx) => (
          <div key={idx} className="rounded-xl border p-4 bg-white flex flex-col gap-4 shadow">
            <div className="grid grid-cols-3 gap-2">
              {profile.photos.map((src, i) => (
                <img key={i} src={src} alt="Profile" className="object-cover aspect-square rounded-md border" />
              ))}
            </div>
            <div>
              <div className="font-bold text-lg">{profile.fullName} ({profile.age})</div>
              <div className="text-gray-600 mb-1">{profile.bio}</div>
              <a href={profile.linkedin} className="underline text-blue-700" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
            <div className="text-xs text-gray-500">
              Health: {profile.healthStatus}<br />
              Covid-19 Vaccinated: <span className={profile.covidVaccinated === "no" ? "text-green-600 font-bold" : "text-red-600"}>{profile.covidVaccinated === "no" ? "Unvaccinated" : "Vaccinated"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
