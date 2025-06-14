import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const Header = () => {
  // Simulate membership state: in a real app, derive from auth context/provider
  const [isMember, setIsMember] = useState(false);
  const navigate = useNavigate();

  // Simulate sign in
  const handleSignIn = () => {
    setIsMember(true);
    toast.success("Signed in (demo)");
  };

  // Simulate sign out
  const handleSignOut = () => {
    setIsMember(false);
    toast.success("Signed out (demo)");
  };

  const handleApply = () => {
    navigate("/gentlemen-profile"); // Or route to a registration/join page
  };

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-900">EliteMatch</span>
        </div>

        {/* Navigation links - show only if member */}
        {isMember ? (
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/profile-search"
              className="text-slate-600 hover:text-blue-900 transition-colors"
            >
              Search Profiles
            </Link>
            <Link
              to="/gentlemen-profile"
              className="text-slate-600 hover:text-blue-900 transition-colors"
            >
              Create Gentlemen's Profile
            </Link>
            <Link
              to="/ladies-profile"
              className="text-slate-600 hover:text-blue-900 transition-colors"
            >
              Create Ladies Profile
            </Link>
            <Link
              to="/testimonials"
              className="text-slate-600 hover:text-blue-900 transition-colors"
            >
              Testimonials
            </Link>
          </nav>
        ) : (
          <nav className="hidden md:flex items-center space-x-8">
            {/* Non-members: only show informative links */}
            <span className="text-slate-400 select-none cursor-not-allowed opacity-60">
              Search Profiles
            </span>
            <span className="text-slate-400 select-none cursor-not-allowed opacity-60">
              Create Gentlemen's Profile
            </span>
            <span className="text-slate-400 select-none cursor-not-allowed opacity-60">
              Create Ladies Profile
            </span>
            <Link
              to="/testimonials"
              className="text-slate-600 hover:text-blue-900 transition-colors"
            >
              Testimonials
            </Link>
          </nav>
        )}

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {isMember ? (
            <Button variant="ghost" className="text-slate-600 hover:text-blue-900" onClick={handleSignOut}>
              Sign Out
            </Button>
          ) : (
            <>
              <Button variant="ghost" className="text-slate-600 hover:text-blue-900" onClick={handleSignIn}>
                Sign In
              </Button>
              <Button className="bg-blue-900 hover:bg-blue-800" onClick={handleApply}>
                Apply Now
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
