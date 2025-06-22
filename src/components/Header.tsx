
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
    <header className="border-b border-purple-900/30 bg-black/95 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-purple-500/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
            <Heart className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-red-200 bg-clip-text text-transparent">
            Untouchable Dating
          </span>
        </Link>

        {isMember ? (
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/profile-search"
              className="text-gray-300 hover:text-purple-400 transition-all duration-300 font-medium hover:scale-105"
            >
              Search Profiles
            </Link>
            <Link
              to="/gentlemen-profile"
              className="text-gray-300 hover:text-purple-400 transition-all duration-300 font-medium hover:scale-105"
            >
              Create Gentlemen's Profile
            </Link>
            <Link
              to="/ladies-profile"
              className="text-gray-300 hover:text-red-400 transition-all duration-300 font-medium hover:scale-105"
            >
              Create Ladies Profile
            </Link>
            <Link
              to="/testimonials"
              className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105"
            >
              Testimonials
            </Link>
            <Link
              to="/lab-partner"
              className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105"
            >
              Lab Partner
            </Link>
          </nav>
        ) : (
          <nav className="hidden md:flex items-center space-x-8">
            <span className="text-gray-600 select-none cursor-not-allowed opacity-50">
              Search Profiles
            </span>
            <span className="text-gray-600 select-none cursor-not-allowed opacity-50">
              Create Gentlemen's Profile
            </span>
            <span className="text-gray-600 select-none cursor-not-allowed opacity-50">
              Create Ladies Profile
            </span>
            <Link
              to="/testimonials"
              className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105"
            >
              Testimonials
            </Link>
            <Link
              to="/lab-partner"
              className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105"
            >
              Lab Partner
            </Link>
          </nav>
        )}

        <div className="flex items-center space-x-4">
          {isMember ? (
            <Button 
              variant="ghost" 
              className="text-gray-300 hover:text-white hover:bg-gray-800/50" 
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Button 
                variant="ghost" 
                className="text-gray-300 hover:text-white hover:bg-gray-800/50" 
                onClick={handleSignIn}
              >
                Sign In
              </Button>
              <Button 
                className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white font-semibold px-6 py-2 shadow-lg shadow-red-500/20 border border-red-500/30" 
                onClick={handleApply}
              >
                Apply Now
              </Button>
              <FullApplicationModal
                open={showAppModal}
                onOpenChange={setShowAppModal}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};
