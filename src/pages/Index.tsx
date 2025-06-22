
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
      <div className="container mx-auto py-12 flex flex-col items-center gap-4">
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/gentlemen-profile">
            <Button variant="secondary" className="bg-purple-900 hover:bg-purple-800 text-white border-2 border-yellow-400">
              Create Gentleman's Profile
            </Button>
          </Link>
          <Link to="/ladies-profile">
            <Button variant="secondary" className="bg-purple-900 hover:bg-purple-800 text-white border-2 border-yellow-400">
              Create Lady's Profile
            </Button>
          </Link>
          <Link to="/profile-search">
            <Button className="bg-red-700 hover:bg-red-800 text-white border-0">
              Search Profiles
            </Button>
          </Link>
          <Link to="/donate-compensation">
            <Button className="bg-yellow-400 hover:bg-yellow-300 text-black border-0">
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
