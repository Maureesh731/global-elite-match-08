
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
    <header className="border-b backdrop-blur-sm sticky top-0 z-50" style={{backgroundColor: '#121212', borderColor: '#4B1248'}}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{backgroundColor: '#4B1248'}}>
            <Heart className="w-6 h-6" style={{color: '#D4AF37'}} />
          </div>
          <span className="text-2xl font-bold text-white">Untouchable Dating</span>
        </Link>

        {/* Navigation links - show only if member */}
        {isMember ? (
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/profile-search"
              className="text-slate-300 transition-colors"
              style={{'&:hover': {color: '#D4AF37'}}}
            >
              Search Profiles
            </Link>
            <Link
              to="/gentlemen-profile"
              className="text-slate-300 transition-colors"
              style={{'&:hover': {color: '#D4AF37'}}}
            >
              Create Gentlemen's Profile
            </Link>
            <Link
              to="/ladies-profile"
              className="text-slate-300 transition-colors"
              style={{'&:hover': {color: '#D4AF37'}}}
            >
              Create Ladies Profile
            </Link>
            <Link
              to="/testimonials"
              className="text-slate-300 transition-colors"
              style={{'&:hover': {color: '#D4AF37'}}}
            >
              Testimonials
            </Link>
            <Link
              to="/lab-partner"
              className="text-slate-300 transition-colors"
              style={{'&:hover': {color: '#D4AF37'}}}
            >
              Lab Partner
            </Link>
          </nav>
        ) : (
          <nav className="hidden md:flex items-center space-x-8">
            {/* Non-members: only show informative links */}
            <span className="text-slate-500 select-none cursor-not-allowed opacity-60">
              Search Profiles
            </span>
            <span className="text-slate-500 select-none cursor-not-allowed opacity-60">
              Create Gentlemen's Profile
            </span>
            <span className="text-slate-500 select-none cursor-not-allowed opacity-60">
              Create Ladies Profile
            </span>
            <Link
              to="/testimonials"
              className="text-slate-300 transition-colors"
              style={{'&:hover': {color: '#D4AF37'}}}
            >
              Testimonials
            </Link>
            <Link
              to="/lab-partner"
              className="text-slate-300 transition-colors"
              style={{'&:hover': {color: '#D4AF37'}}}
            >
              Lab Partner
            </Link>
          </nav>
        )}

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {isMember ? (
            <Button variant="ghost" className="text-slate-300" style={{'&:hover': {color: '#D4AF37'}}} onClick={handleSignOut}>
              Sign Out
            </Button>
          ) : (
            <>
              <Button variant="ghost" className="text-slate-300" style={{'&:hover': {color: '#D4AF37'}}} onClick={handleSignIn}>
                Sign In
              </Button>
              <Button className="text-white border-0" style={{backgroundColor: '#C8102E', '&:hover': {backgroundColor: '#8B0000'}}} onClick={handleApply}>
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
