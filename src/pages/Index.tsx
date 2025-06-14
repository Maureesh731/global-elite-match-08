import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Shield, Heart, Star, Globe, Briefcase, GraduationCap } from "lucide-react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Verification } from "@/components/Verification";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <Hero />
      <Features />
      <Verification />
      <Pricing />
      <Testimonials />
      <div className="container mx-auto py-12 flex flex-col items-center gap-4">
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/gentlemen-profile">
            <Button variant="secondary">Create Gentleman's Profile</Button>
          </Link>
          <Link to="/ladies-profile">
            <Button variant="secondary">Create Lady's Profile</Button>
          </Link>
          <Link to="/profile-search">
            <Button className="bg-blue-900 text-white hover:bg-blue-800">Search Profiles</Button>
          </Link>
          <Link to="/donate-compensation">
            <Button className="bg-green-700 text-white hover:bg-green-800">
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
