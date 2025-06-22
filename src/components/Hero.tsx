
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Users, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-charcoal-900 text-white relative overflow-hidden">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.08'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>
      
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-indigo-900/20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Badge variant="secondary" className="bg-gradient-to-r from-yellow-400/20 via-yellow-300/20 to-yellow-400/20 text-yellow-400 border border-yellow-400/50 px-6 py-3 text-base font-semibold shadow-lg shadow-yellow-400/20">
              <Shield className="w-5 h-5 mr-2 text-yellow-400" />
              Verified Professionals Only
              <Sparkles className="w-4 h-4 ml-2 text-yellow-300" />
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Find Your
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg"> Untouchable </span>
            Match
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            The exclusive dating platform for global professionals and graduates seeking 
            authentic connections with verified, health-conscious individuals.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 backdrop-blur-sm rounded-full px-6 py-3 border border-purple-700/50">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center shadow-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-200 font-medium">Elite Professionals</span>
            </div>
            <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 backdrop-blur-sm rounded-full px-6 py-3 border border-purple-700/50">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center shadow-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-200 font-medium">100% Verified</span>
            </div>
            <div className="flex items-center space-x-3 bg-gradient-to-r from-yellow-400/20 to-yellow-300/20 backdrop-blur-sm rounded-full px-6 py-3 border border-yellow-400/50">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                <Star className="w-5 h-5 text-black" />
              </div>
              <span className="text-gray-200 font-medium">Premium Quality</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-800 hover:via-red-700 hover:to-red-800 text-white border-0 px-10 py-6 text-xl font-bold shadow-xl shadow-red-900/40 hover:shadow-red-900/60 transition-all duration-300 transform hover:scale-105"
            >
              Start Your Application
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-10 py-6 text-xl font-bold bg-transparent backdrop-blur-sm shadow-xl shadow-yellow-400/20 hover:shadow-yellow-400/40 transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
