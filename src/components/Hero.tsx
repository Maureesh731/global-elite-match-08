
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Users } from "lucide-react";

export const Hero = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-black via-purple-950 to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Badge variant="secondary" className="bg-yellow-400/20 text-yellow-400 border-yellow-400/40 px-4 py-2">
              <Shield className="w-4 h-4 mr-2 text-yellow-400" />
              Verified Professionals Only
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Find Your
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent"> Untouchable </span>
            Match
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
            The exclusive dating platform for global professionals and graduates seeking 
            authentic connections with verified, health-conscious individuals.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="text-slate-300">Elite Professionals</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-slate-300">100% Verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-black" />
              </div>
              <span className="text-slate-300">Premium Quality</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-700 hover:bg-red-800 text-white border-0 px-8 py-4 text-lg font-semibold">
              Start Your Application
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-yellow-400 text-white hover:bg-yellow-400 hover:text-black px-8 py-4 text-lg bg-transparent">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
