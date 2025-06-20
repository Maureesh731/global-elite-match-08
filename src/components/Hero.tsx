

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Users } from "lucide-react";

export const Hero = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-untouchable-charcoal via-untouchable-plum to-untouchable-midnight text-untouchable-cream relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Badge variant="secondary" className="bg-untouchable-cream/10 text-untouchable-cream border-untouchable-cream/20 px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              Verified Professionals Only
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Find Your
            <span className="bg-gradient-to-r from-untouchable-gold to-untouchable-bronze bg-clip-text text-transparent"> Untouchable </span>
            Match
          </h1>
          
          <p className="text-xl md:text-2xl text-untouchable-rose mb-8 leading-relaxed">
            The exclusive dating platform for global professionals and graduates seeking 
            authentic connections with verified, health-conscious individuals.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-untouchable-crimson rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-untouchable-cream" />
              </div>
              <span className="text-untouchable-rose">Elite Professionals</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-untouchable-plum rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-untouchable-cream" />
              </div>
              <span className="text-untouchable-rose">100% Verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-untouchable-gold rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-untouchable-charcoal" />
              </div>
              <span className="text-untouchable-rose">Premium Quality</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-untouchable-gold to-untouchable-bronze hover:from-untouchable-bronze hover:to-untouchable-gold text-untouchable-charcoal px-8 py-4 text-lg font-semibold">
              Start Your Application
            </Button>
            <Button size="lg" variant="outline" className="border-untouchable-cream/20 text-untouchable-cream hover:bg-untouchable-cream/10 px-8 py-4 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

