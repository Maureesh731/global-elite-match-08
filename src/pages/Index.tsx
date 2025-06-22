
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Verification } from "@/components/Verification";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { FeaturedMembers } from "@/components/FeaturedMembers";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Hero />
      <Features />
      <Verification />
      <Pricing />
      <Testimonials />
      <FeaturedMembers />
      <div className="container mx-auto py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="flex flex-col items-center gap-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Begin Your 
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent"> Premium </span>
              Journey?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join the most exclusive dating community for verified professionals seeking meaningful connections.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
            <Link to="/gentlemen-profile" className="group">
              <Button variant="secondary" className="w-full h-16 bg-gradient-to-r from-purple-800 to-purple-900 hover:from-purple-700 hover:to-purple-800 text-white border-2 border-yellow-400/50 hover:border-yellow-400 shadow-lg shadow-purple-900/30 hover:shadow-yellow-400/20 transition-all duration-300 transform group-hover:scale-105 text-base font-semibold">
                Create Gentleman's Profile
              </Button>
            </Link>
            <Link to="/ladies-profile" className="group">
              <Button variant="secondary" className="w-full h-16 bg-gradient-to-r from-purple-800 to-purple-900 hover:from-purple-700 hover:to-purple-800 text-white border-2 border-yellow-400/50 hover:border-yellow-400 shadow-lg shadow-purple-900/30 hover:shadow-yellow-400/20 transition-all duration-300 transform group-hover:scale-105 text-base font-semibold">
                Create Lady's Profile
              </Button>
            </Link>
            <Link to="/profile-search" className="group">
              <Button className="w-full h-16 bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-800 hover:via-red-700 hover:to-red-800 text-white border-0 shadow-lg shadow-red-900/40 hover:shadow-red-900/60 transition-all duration-300 transform group-hover:scale-105 text-base font-semibold">
                Search Profiles
              </Button>
            </Link>
            <Link to="/donate-compensation" className="group">
              <Button className="w-full h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black border-0 shadow-lg shadow-yellow-500/40 hover:shadow-yellow-500/60 transition-all duration-300 transform group-hover:scale-105 text-base font-bold">
                Donate &amp; Get Compensated
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
