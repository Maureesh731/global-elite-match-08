
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FullApplicationModal } from "@/components/FullApplicationModal";

export const Header = () => {
  // Simulate membership state: in a real app, derive from auth context/provider
  const [isMember, setIsMember] = useState(false);
  const navigate = useNavigate();
  const [showAppModal, setShowAppModal] = useState(false);

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
    setShowAppModal(true);
  };

  return (
    <header className="border-b border-untouchable-shadow/20 bg-untouchable-charcoal backdrop-blur-sm sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
          <div className="w-10 h-10 bg-untouchable-gradient-accent rounded-xl flex items-center justify-center shadow-lg">
            <Heart className="w-6 h-6 text-untouchable-cream" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-untouchable-cream to-untouchable-pearl bg-clip-text text-transparent">
            Untouchable Dating
          </span>
        </Link>

        {/* Navigation links - show only if member */}
        {isMember ? (
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/profile-search"
              className="text-untouchable-cream hover:text-untouchable-gold transition-colors font-medium"
            >
              Search Profiles
            </Link>
            <Link
              to="/gentlemen-profile"
              className="text-untouchable-cream hover:text-untouchable-gold transition-colors font-medium"
            >
              Create Gentlemen's Profile
            </Link>
            <Link
              to="/ladies-profile"
              className="text-untouchable-cream hover:text-untouchable-gold transition-colors font-medium"
            >
              Create Ladies Profile
            </Link>
            <Link
              to="/testimonials"
              className="text-untouchable-cream hover:text-untouchable-gold transition-colors font-medium"
            >
              Testimonials
            </Link>
            <Link
              to="/lab-partner"
              className="text-untouchable-cream hover:text-untouchable-gold transition-colors font-medium"
            >
              Lab Partner
            </Link>
          </nav>
        ) : (
          <nav className="hidden md:flex items-center space-x-8">
            {/* Non-members: only show informative links */}
            <span className="text-untouchable-steel select-none cursor-not-allowed opacity-60 font-medium">
              Search Profiles
            </span>
            <span className="text-untouchable-steel select-none cursor-not-allowed opacity-60 font-medium">
              Create Gentlemen's Profile
            </span>
            <span className="text-untouchable-steel select-none cursor-not-allowed opacity-60 font-medium">
              Create Ladies Profile
            </span>
            <Link
              to="/testimonials"
              className="text-untouchable-cream hover:text-untouchable-gold transition-colors font-medium"
            >
              Testimonials
            </Link>
            <Link
              to="/lab-partner"
              className="text-untouchable-cream hover:text-untouchable-gold transition-colors font-medium"
            >
              Lab Partner
            </Link>
          </nav>
        )}

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {isMember ? (
            <Button 
              variant="ghost" 
              className="text-untouchable-cream hover:text-untouchable-gold hover:bg-untouchable-midnight/50 transition-all" 
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Button 
                variant="ghost" 
                className="text-untouchable-cream hover:text-untouchable-gold hover:bg-untouchable-midnight/50 transition-all" 
                onClick={handleSignIn}
              >
                Sign In
              </Button>
              <Button 
                className="bg-untouchable-gradient-accent hover:shadow-lg text-untouchable-cream font-semibold px-6 transition-all transform hover:scale-105" 
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
