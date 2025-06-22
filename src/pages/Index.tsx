
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
    <div className="min-h-screen" style={{backgroundColor: '#121212'}}>
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
            <Button variant="secondary" className="text-white border-2" style={{backgroundColor: '#4B1248', borderColor: '#D4AF37', '&:hover': {backgroundColor: '#3B1F4F'}}}>Create Gentleman's Profile</Button>
          </Link>
          <Link to="/ladies-profile">
            <Button variant="secondary" className="text-white border-2" style={{backgroundColor: '#4B1248', borderColor: '#D4AF37', '&:hover': {backgroundColor: '#3B1F4F'}}}>Create Lady's Profile</Button>
          </Link>
          <Link to="/profile-search">
            <Button className="text-white border-0" style={{backgroundColor: '#C8102E', '&:hover': {backgroundColor: '#8B0000'}}}>Search Profiles</Button>
          </Link>
          <Link to="/donate-compensation">
            <Button className="text-black border-0" style={{backgroundColor: '#D4AF37', '&:hover': {backgroundColor: '#CBA135'}}}>
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
