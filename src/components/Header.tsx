
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FullApplicationModal } from "@/components/FullApplicationModal";

export const Header = () => {
  const [isMember, setIsMember] = useState(false);
  const navigate = useNavigate();
  const [showAppModal, setShowAppModal] = useState(false);
  const [isFreeApplication, setIsFreeApplication] = useState(false);

  const handleSignIn = () => {
    setIsMember(true);
    toast.success("Signed in (demo)");
  };

  const handleSignOut = () => {
    setIsMember(false);
    toast.success("Signed out (demo)");
  };

  const handleApply = () => {
    setShowAppModal(true);
  };

  return (
    <header className="border-b border-purple-900/40 bg-black/98 backdrop-blur-md sticky top-0 z-50 shadow-2xl shadow-purple-500/20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-red-600 via-purple-600 to-red-700 rounded-xl flex items-center justify-center shadow-xl shadow-red-500/30 border border-red-400/20">
            <Heart className="w-7 h-7 text-white drop-shadow-lg" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white via-red-200 to-purple-200 bg-clip-text text-transparent drop-shadow-sm">
            Untouchable Dating
          </span>
        </Link>

        {isMember ? (
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/profile-search"
              className="text-white/90 hover:text-red-400 transition-all duration-300 font-semibold text-sm tracking-wide uppercase hover:scale-105 relative group"
            >
              <span className="relative z-10">Search Profiles</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-purple-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></div>
            </Link>
            <Link
              to="/gentlemen-profile"
              className="text-white/90 hover:text-purple-400 transition-all duration-300 font-semibold text-sm tracking-wide uppercase hover:scale-105 relative group"
            >
              <span className="relative z-10">Gentlemen's Profile</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-red-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></div>
            </Link>
            <Link
              to="/ladies-profile"
              className="text-white/90 hover:text-red-400 transition-all duration-300 font-semibold text-sm tracking-wide uppercase hover:scale-105 relative group"
            >
              <span className="relative z-10">Ladies Profile</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-purple-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></div>
            </Link>
            <Link
              to="/testimonials"
              className="text-white/90 hover:text-white transition-all duration-300 font-semibold text-sm tracking-wide uppercase hover:scale-105 relative group"
            >
              <span className="relative z-10">Testimonials</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 to-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></div>
            </Link>
            <Link
              to="/lab-partner"
              className="text-white/90 hover:text-white transition-all duration-300 font-semibold text-sm tracking-wide uppercase hover:scale-105 relative group"
            >
              <span className="relative z-10">Lab Partner</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 to-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></div>
            </Link>
          </nav>
        ) : (
          <nav className="hidden md:flex items-center space-x-8">
            <span className="text-gray-500/60 select-none cursor-not-allowed opacity-40 font-medium text-sm tracking-wide uppercase">
              Search Profiles
            </span>
            <span className="text-gray-500/60 select-none cursor-not-allowed opacity-40 font-medium text-sm tracking-wide uppercase">
              Gentlemen's Profile
            </span>
            <span className="text-gray-500/60 select-none cursor-not-allowed opacity-40 font-medium text-sm tracking-wide uppercase">
              Ladies Profile
            </span>
            <Link
              to="/testimonials"
              className="text-white/90 hover:text-white transition-all duration-300 font-semibold text-sm tracking-wide uppercase hover:scale-105 relative group"
            >
              <span className="relative z-10">Testimonials</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 to-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></div>
            </Link>
            <Link
              to="/lab-partner"
              className="text-white/90 hover:text-white transition-all duration-300 font-semibold text-sm tracking-wide uppercase hover:scale-105 relative group"
            >
              <span className="relative z-10">Lab Partner</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 to-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></div>
            </Link>
          </nav>
        )}

        <div className="flex items-center space-x-4">
          {isMember ? (
            <Button 
              variant="ghost" 
              className="text-white/80 hover:text-white hover:bg-gray-800/60 font-medium tracking-wide" 
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Button 
                variant="ghost" 
                className="text-white/80 hover:text-white hover:bg-gray-800/60 font-medium tracking-wide" 
                onClick={handleSignIn}
              >
                Sign In
              </Button>
              <Button 
                className="bg-gradient-to-r from-red-600 via-red-700 to-purple-700 hover:from-red-500 hover:via-red-600 hover:to-purple-600 text-white font-bold px-8 py-3 shadow-2xl shadow-red-600/40 border border-red-400/30 tracking-wide uppercase text-sm" 
                onClick={handleApply}
              >
                Apply Now
              </Button>
              <FullApplicationModal
                open={showAppModal}
                onOpenChange={setShowAppModal}
                isFreeApplication={isFreeApplication}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};
