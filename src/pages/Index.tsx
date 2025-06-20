
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
    <div className="min-h-screen bg-gradient-to-b from-untouchable-cream to-untouchable-pearl">
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
            <Button 
              variant="secondary" 
              className="bg-untouchable-gradient-primary text-untouchable-cream hover:shadow-lg font-semibold px-8 py-3 transition-all transform hover:scale-105"
            >
              Create Gentleman's Profile
            </Button>
          </Link>
          <Link to="/ladies-profile">
            <Button 
              variant="secondary" 
              className="bg-untouchable-gradient-primary text-untouchable-cream hover:shadow-lg font-semibold px-8 py-3 transition-all transform hover:scale-105"
            >
              Create Lady's Profile
            </Button>
          </Link>
          <Link to="/profile-search">
            <Button 
              className="bg-untouchable-gradient-accent text-untouchable-cream hover:shadow-lg font-semibold px-8 py-3 transition-all transform hover:scale-105"
            >
              Search Profiles
            </Button>
          </Link>
          <Link to="/donate-compensation">
            <Button 
              className="bg-untouchable-gradient-luxury text-untouchable-charcoal hover:shadow-lg font-semibold px-8 py-3 transition-all transform hover:scale-105"
            >
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
