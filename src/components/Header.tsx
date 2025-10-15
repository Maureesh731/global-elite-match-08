
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FullApplicationModal } from "@/components/FullApplicationModal";
import { PhotoAccessRequests } from "@/components/PhotoAccessRequests";
import { useAuth } from "@/contexts/AuthContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showAppModal, setShowAppModal] = useState(false);
  const [isFreeApplication, setIsFreeApplication] = useState(false);
  const [showPhotoRequests, setShowPhotoRequests] = useState(false);

  const handleSignIn = () => {
    // Navigate to login page instead of demo
    navigate('/login');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out");
      navigate('/');
    } catch (error) {
      toast.error("Error signing out");
    }
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

        {user ? (
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
              to="/favorites"
              className="text-white/90 hover:text-red-400 transition-all duration-300 font-semibold text-sm tracking-wide uppercase hover:scale-105 relative group"
            >
              <span className="relative z-10">My Favorites</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-purple-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></div>
            </Link>
            <Link
              to="/messages"
              className="text-white/90 hover:text-purple-400 transition-all duration-300 font-semibold text-sm tracking-wide uppercase hover:scale-105 relative group"
            >
              <span className="relative z-10">Messages</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-red-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></div>
            </Link>
            <Link
              to="/lab-partner"
              className="text-white/90 hover:text-white transition-all duration-300 font-semibold text-sm tracking-wide uppercase hover:scale-105 relative group"
            >
              <span className="relative z-10">Lab Partner</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 to-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></div>
            </Link>
            <Link
              to="/donation-auctions"
              className="text-white/90 hover:text-green-400 transition-all duration-300 font-semibold text-sm tracking-wide uppercase hover:scale-105 relative group"
            >
              <span className="relative z-10">Donation Auctions</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></div>
            </Link>
            <Link
              to="/contact"
              className="text-white/90 hover:text-blue-400 transition-all duration-300 font-semibold text-sm tracking-wide uppercase hover:scale-105 relative group"
            >
              <span className="relative z-10">Contact Us</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></div>
            </Link>
            <Link
              to="/profile-photos"
              className="text-white/90 hover:text-pink-400 transition-all duration-300 font-semibold text-sm tracking-wide uppercase hover:scale-105 relative group"
            >
              <span className="relative z-10">My Photos</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 to-purple-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></div>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPhotoRequests(true)}
              className="text-white/90 hover:text-yellow-400 transition-all duration-300 font-semibold text-sm tracking-wide uppercase hover:scale-105 relative group"
            >
              <Bell className="w-4 h-4 mr-1" />
              <span className="relative z-10">Photo Requests</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-orange-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></div>
            </Button>
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
          <LanguageSwitcher />
          {user ? (
            <Button 
              variant="outline" 
              className="bg-gradient-to-r from-red-600/20 to-purple-600/20 border-red-400/40 text-white hover:from-red-600/40 hover:to-purple-600/40 hover:border-red-400/60 font-bold tracking-wide uppercase text-sm shadow-lg shadow-red-600/20" 
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
                isFreeProfile={isFreeApplication}
              />
            </>
          )}
        </div>
      </div>

      <PhotoAccessRequests
        isOpen={showPhotoRequests}
        onClose={() => setShowPhotoRequests(false)}
      />
    </header>
  );
};
