
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FullApplicationModal } from "@/components/FullApplicationModal";

export const Header = () => {
  // Simulate membership state: in a real app, derive from auth context/provider
  const [isMember, setIsMember] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="border-b backdrop-blur-sm sticky top-0 z-50 bg-gradient-to-r from-black via-gray-900 to-black border-purple-900/30 shadow-lg shadow-purple-900/20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-lg">
            <Heart className="w-7 h-7 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent group-hover:from-yellow-400 group-hover:via-yellow-300 group-hover:to-yellow-400 transition-all duration-300">
            Untouchable Dating
          </span>
        </Link>

        {/* Desktop Navigation */}
        {isMember ? (
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              to="/profile-search"
              className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-900/50 hover:to-indigo-900/50 transition-all duration-300 font-medium border border-transparent hover:border-purple-700/50"
            >
              Search Profiles
            </Link>
            <Link
              to="/gentlemen-profile"
              className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-900/50 hover:to-indigo-900/50 transition-all duration-300 font-medium border border-transparent hover:border-purple-700/50"
            >
              Gentlemen's Profile
            </Link>
            <Link
              to="/ladies-profile"
              className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-900/50 hover:to-indigo-900/50 transition-all duration-300 font-medium border border-transparent hover:border-purple-700/50"
            >
              Ladies Profile
            </Link>
            <Link
              to="/testimonials"
              className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-900/50 hover:to-indigo-900/50 transition-all duration-300 font-medium border border-transparent hover:border-purple-700/50"
            >
              Testimonials
            </Link>
            <Link
              to="/lab-partner"
              className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-900/50 hover:to-indigo-900/50 transition-all duration-300 font-medium border border-transparent hover:border-purple-700/50"
            >
              Lab Partner
            </Link>
          </nav>
        ) : (
          <nav className="hidden lg:flex items-center space-x-1">
            <span className="px-4 py-2 rounded-lg text-gray-600 cursor-not-allowed opacity-60 font-medium">
              Search Profiles
            </span>
            <span className="px-4 py-2 rounded-lg text-gray-600 cursor-not-allowed opacity-60 font-medium">
              Gentlemen's Profile
            </span>
            <span className="px-4 py-2 rounded-lg text-gray-600 cursor-not-allowed opacity-60 font-medium">
              Ladies Profile
            </span>
            <Link
              to="/testimonials"
              className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-900/50 hover:to-indigo-900/50 transition-all duration-300 font-medium border border-transparent hover:border-purple-700/50"
            >
              Testimonials
            </Link>
            <Link
              to="/lab-partner"
              className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-900/50 hover:to-indigo-900/50 transition-all duration-300 font-medium border border-transparent hover:border-purple-700/50"
            >
              Lab Partner
            </Link>
          </nav>
        )}

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          {isMember ? (
            <Button 
              variant="ghost" 
              className="text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-900/50 hover:to-indigo-900/50 border border-transparent hover:border-purple-700/50" 
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Button 
                variant="ghost" 
                className="text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-900/50 hover:to-indigo-900/50 border border-transparent hover:border-purple-700/50" 
                onClick={handleSignIn}
              >
                Sign In
              </Button>
              <Button 
                className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-800 hover:via-red-700 hover:to-red-800 text-white border-0 shadow-lg shadow-red-900/30 hover:shadow-red-900/50 transition-all duration-300 font-semibold px-6" 
                onClick={handleApply}
              >
                Apply Now
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-purple-900/50 transition-all duration-300"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-gradient-to-b from-black via-gray-900 to-black border-t border-purple-900/30 shadow-xl shadow-purple-900/20 lg:hidden">
            <div className="container mx-auto px-4 py-6">
              {isMember ? (
                <nav className="flex flex-col space-y-3 mb-6">
                  <Link
                    to="/profile-search"
                    className="px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-900/50 hover:to-indigo-900/50 transition-all duration-300 font-medium border border-transparent hover:border-purple-700/50"
                    onClick={toggleMobileMenu}
                  >
                    Search Profiles
                  </Link>
                  <Link
                    to="/gentlemen-profile"
                    className="px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-900/50 hover:to-indigo-900/50 transition-all duration-300 font-medium border border-transparent hover:border-purple-700/50"
                    onClick={toggleMobileMenu}
                  >
                    Gentlemen's Profile
                  </Link>
                  <Link
                    to="/ladies-profile"
                    className="px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-900/50 hover:to-indigo-900/50 transition-all duration-300 font-medium border border-transparent hover:border-purple-700/50"
                    onClick={toggleMobileMenu}
                  >
                    Ladies Profile
                  </Link>
                  <Link
                    to="/testimonials"
                    className="px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-900/50 hover:to-indigo-900/50 transition-all duration-300 font-medium border border-transparent hover:border-purple-700/50"
                    onClick={toggleMobileMenu}
                  >
                    Testimonials
                  </Link>
                  <Link
                    to="/lab-partner"
                    className="px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-900/50 hover:to-indigo-900/50 transition-all duration-300 font-medium border border-transparent hover:border-purple-700/50"
                    onClick={toggleMobileMenu}
                  >
                    Lab Partner
                  </Link>
                </nav>
              ) : (
                <nav className="flex flex-col space-y-3 mb-6">
                  <span className="px-4 py-3 rounded-lg text-gray-600 cursor-not-allowed opacity-60 font-medium">
                    Search Profiles
                  </span>
                  <span className="px-4 py-3 rounded-lg text-gray-600 cursor-not-allowed opacity-60 font-medium">
                    Gentlemen's Profile
                  </span>
                  <span className="px-4 py-3 rounded-lg text-gray-600 cursor-not-allowed opacity-60 font-medium">
                    Ladies Profile
                  </span>
                  <Link
                    to="/testimonials"
                    className="px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-900/50 hover:to-indigo-900/50 transition-all duration-300 font-medium border border-transparent hover:border-purple-700/50"
                    onClick={toggleMobileMenu}
                  >
                    Testimonials
                  </Link>
                  <Link
                    to="/lab-partner"
                    className="px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-900/50 hover:to-indigo-900/50 transition-all duration-300 font-medium border border-transparent hover:border-purple-700/50"
                    onClick={toggleMobileMenu}
                  >
                    Lab Partner
                  </Link>
                </nav>
              )}

              {/* Mobile Actions */}
              <div className="flex flex-col space-y-3">
                {isMember ? (
                  <Button 
                    variant="ghost" 
                    className="w-full text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-900/50 hover:to-indigo-900/50 border border-transparent hover:border-purple-700/50 justify-center" 
                    onClick={() => {
                      handleSignOut();
                      toggleMobileMenu();
                    }}
                  >
                    Sign Out
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      className="w-full text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-900/50 hover:to-indigo-900/50 border border-transparent hover:border-purple-700/50 justify-center" 
                      onClick={() => {
                        handleSignIn();
                        toggleMobileMenu();
                      }}
                    >
                      Sign In
                    </Button>
                    <Button 
                      className="w-full bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-800 hover:via-red-700 hover:to-red-800 text-white border-0 shadow-lg shadow-red-900/30 hover:shadow-red-900/50 transition-all duration-300 font-semibold justify-center" 
                      onClick={() => {
                        handleApply();
                        toggleMobileMenu();
                      }}
                    >
                      Apply Now
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <FullApplicationModal
          open={showAppModal}
          onOpenChange={setShowAppModal}
        />
      </div>
    </header>
  );
};
