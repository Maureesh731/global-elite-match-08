
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
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <Header />
      <Hero />
      <Features />
      <Verification />
      <Pricing />
      <Testimonials />
      <FeaturedMembers />
      <div className="container mx-auto py-16 flex flex-col items-center gap-6">
        <div className="flex flex-wrap gap-6 justify-center">
          <Link to="/gentlemen-profile">
            <Button className="bg-gradient-to-r from-purple-800 to-purple-600 hover:from-purple-700 hover:to-purple-500 text-white px-8 py-4 text-lg font-semibold border border-purple-500/30 shadow-lg shadow-purple-500/20">
              Create Gentleman's Profile
            </Button>
          </Link>
          <Link to="/ladies-profile">
            <Button className="bg-gradient-to-r from-red-800 to-red-600 hover:from-red-700 hover:to-red-500 text-white px-8 py-4 text-lg font-semibold border border-red-500/30 shadow-lg shadow-red-500/20">
              Create Lady's Profile
            </Button>
          </Link>
          <Link to="/profile-search">
            <Button className="bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white px-8 py-4 text-lg font-semibold border border-gray-600 shadow-lg">
              Search Profiles
            </Button>
          </Link>
          <Link to="/donate-compensation">
            <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black px-8 py-4 text-lg font-semibold shadow-lg shadow-yellow-500/30">
              Donate &amp; Get Compensated
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
