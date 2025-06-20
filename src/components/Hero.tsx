
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Users } from "lucide-react";

export const Hero = () => {
  return (
    <section className="py-24 bg-untouchable-gradient-primary text-untouchable-cream relative overflow-hidden min-h-[80vh] flex items-center">
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Badge variant="secondary" className="bg-untouchable-cream/15 text-untouchable-cream border-untouchable-cream/30 px-6 py-3 text-sm font-semibold backdrop-blur-sm">
              <Shield className="w-4 h-4 mr-2" />
              Verified Professionals Only
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Find Your
            <span className="bg-gradient-to-r from-untouchable-gold to-untouchable-bronze bg-clip-text text-transparent block mt-2"> 
              Untouchable 
            </span>
            Match
          </h1>
          
          <p className="text-xl md:text-2xl text-untouchable-cream/90 mb-12 leading-relaxed max-w-3xl mx-auto">
            The exclusive dating platform for global professionals and graduates seeking 
            authentic connections with verified, health-conscious individuals.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-untouchable-crimson rounded-full flex items-center justify-center shadow-lg">
                <Users className="w-5 h-5 text-untouchable-cream" />
              </div>
              <span className="text-untouchable-cream/90 font-medium">Elite Professionals</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-untouchable-plum rounded-full flex items-center justify-center shadow-lg">
                <Shield className="w-5 h-5 text-untouchable-cream" />
              </div>
              <span className="text-untouchable-cream/90 font-medium">100% Verified</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-untouchable-gold rounded-full flex items-center justify-center shadow-lg">
                <Star className="w-5 h-5 text-untouchable-charcoal" />
              </div>
              <span className="text-untouchable-cream/90 font-medium">Premium Quality</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-untouchable-gradient-luxury hover:shadow-xl text-untouchable-charcoal px-10 py-4 text-lg font-bold transition-all transform hover:scale-105"
            >
              Start Your Application
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-untouchable-cream/30 text-untouchable-cream hover:bg-untouchable-cream/10 backdrop-blur-sm px-10 py-4 text-lg font-semibold transition-all"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
