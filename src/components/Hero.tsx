
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Users } from "lucide-react";

export const Hero = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-black text-white relative overflow-hidden" style={{backgroundColor: '#121212'}}>
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 px-4 py-2" style={{backgroundColor: 'rgba(212, 175, 55, 0.2)', borderColor: '#D4AF37'}}>
              <Shield className="w-4 h-4 mr-2" style={{color: '#D4AF37'}} />
              Verified Professionals Only
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Find Your
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent" style={{background: 'linear-gradient(to right, #D4AF37, #CBA135)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}> Untouchable </span>
            Match
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
            The exclusive dating platform for global professionals and graduates seeking 
            authentic connections with verified, health-conscious individuals.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#4B1248'}}>
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="text-slate-300">Elite Professionals</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#4B1248'}}>
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-slate-300">100% Verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#D4AF37'}}>
                <Star className="w-4 h-4 text-black" />
              </div>
              <span className="text-slate-300">Premium Quality</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-4 text-lg font-semibold text-white border-0" style={{backgroundColor: '#C8102E', '&:hover': {backgroundColor: '#8B0000'}}}>
              Start Your Application
            </Button>
            <Button size="lg" variant="outline" className="border-2 text-white hover:text-black px-8 py-4 text-lg" style={{borderColor: '#D4AF37', backgroundColor: 'transparent', '&:hover': {backgroundColor: '#D4AF37'}}}>
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
