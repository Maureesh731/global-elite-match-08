
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Why } from "@/components/Why";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Verification } from "@/components/Verification";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { FeaturedMembers } from "@/components/FeaturedMembers";
import { FreeProfileForm } from "@/components/FreeProfileForm";
import { MembershipApplicationForm } from "@/components/MembershipApplicationForm";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { VisitorCounter } from "@/components/VisitorCounter";
import { LiveMemberCount } from "@/components/LiveMemberCount";
import { useState } from "react";

const Index = () => {
  const [showFreeForm, setShowFreeForm] = useState(false);
  const [showMembershipForm, setShowMembershipForm] = useState(false);
  const { subscribed, loading } = useUserSubscription();
  const navigate = useNavigate();

  const handleButtonClick = (route: string) => {
    if (subscribed) {
      navigate(route);
    } else {
      setShowFreeForm(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <Header />
      <Hero />
      <Why />
      <Features />
      <Verification />
      <Pricing />
      <Testimonials />
      <FeaturedMembers />
      <div className="container mx-auto py-16 flex flex-col items-center gap-6">
        <LiveMemberCount />
        <VisitorCounter />
        <div className="flex flex-wrap gap-6 justify-center">
          <Button 
            onClick={() => setShowFreeForm(true)}
            className="bg-gradient-to-r from-purple-800 to-purple-600 hover:from-purple-700 hover:to-purple-500 text-white px-8 py-4 text-lg font-semibold border border-purple-500/30 shadow-lg shadow-purple-500/20"
            disabled={loading}
          >
            Create Free Profile
          </Button>
          <Button 
            onClick={() => setShowMembershipForm(true)}
            className="bg-gradient-to-r from-green-800 to-green-600 hover:from-green-700 hover:to-green-500 text-white px-8 py-4 text-lg font-semibold border border-green-500/30 shadow-lg shadow-green-500/20"
            disabled={loading}
          >
            Apply for Membership
          </Button>
          <Button 
            onClick={() => handleButtonClick("/profile-search")}
            className="bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white px-8 py-4 text-lg font-semibold border border-gray-600 shadow-lg"
            disabled={loading}
          >
            Search Profiles
          </Button>
          <Link to="/donate-compensation">
            <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black px-8 py-4 text-lg font-semibold shadow-lg shadow-yellow-500/30">
              Donate &amp; Get Compensated
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
      
      <FreeProfileForm
        open={showFreeForm}
        onOpenChange={setShowFreeForm}
      />
      
      <MembershipApplicationForm
        open={showMembershipForm}
        onOpenChange={setShowMembershipForm}
      />
    </div>
  );
};

export default Index;
