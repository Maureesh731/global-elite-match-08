import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Users, Crown, Facebook, Instagram } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FullApplicationModal } from "@/components/FullApplicationModal";
import heroHealth1 from "@/assets/hero-health-1.jpg";
import heroHealth2 from "@/assets/hero-health-2.jpg";
import heroHealth3 from "@/assets/hero-health-3.jpg";
import heroHealth4 from "@/assets/hero-health-4.jpg";
import heroHealth5 from "@/assets/hero-health-5.jpg";

export const Hero = () => {
  const { t } = useTranslation();
  
  const backgroundImages = [
    heroHealth1,
    heroHealth2,
    heroHealth3,
    heroHealth4,
    heroHealth5
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, [backgroundImages.length]);
  
  return (
    <section className="py-32 bg-gradient-to-br from-black via-gray-900 to-purple-900/20 text-white relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url('${backgroundImages[currentImageIndex]}')`
        }}
      ></div>
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139, 0, 139, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(220, 20, 60, 0.3) 0%, transparent 50%)`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="flex justify-center mb-8">
            <Badge className="bg-gradient-to-r from-purple-800/80 to-red-800/80 text-white border-purple-500/50 px-6 py-3 text-sm backdrop-blur-sm shadow-lg shadow-purple-500/20">
              <Crown className="w-4 h-4 mr-2" />
              Elite Professionals Only
            </Badge>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            {t('hero.title')} {' '}
            <span className="block bg-gradient-to-r from-red-500 via-purple-500 to-red-400 bg-clip-text text-transparent drop-shadow-lg"> 
              {t('hero.title_highlight')}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            <div className="flex items-center space-x-3 bg-black/30 backdrop-blur-sm rounded-full px-6 py-3 border border-purple-500/30">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center shadow-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-200 font-medium">Elite Professionals</span>
            </div>
            <div className="flex items-center space-x-3 bg-black/30 backdrop-blur-sm rounded-full px-6 py-3 border border-red-500/30">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-200 font-medium">100% Verified</span>
            </div>
            <div className="flex items-center space-x-3 bg-black/30 backdrop-blur-sm rounded-full px-6 py-3 border border-yellow-500/30">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                <Star className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-200 font-medium">Premium Quality</span>
            </div>
          </div>
          
          <div className="mb-12">
            <p className="text-white text-lg mb-4 font-semibold">Follow Us on Social Media</p>
            <div className="flex justify-center gap-4">
              <a
                href="https://www.facebook.com/groups/1774371110166877/?ref=share&mibextid=NSMWBT"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Facebook className="w-5 h-5" />
                <span className="font-semibold">Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/untouchabledating?igsh=MTZiNDg2MzZ0MHhrNg=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Instagram className="w-5 h-5" />
                <span className="font-semibold">Instagram</span>
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <FullApplicationModal role="gentleman">
              <Button
                size="lg"
                className="w-full bg-gradient-to-br from-blue-700 to-indigo-900 hover:from-blue-600 hover:to-indigo-800 text-white px-10 py-8 text-2xl font-bold shadow-2xl shadow-blue-500/30 border border-blue-400/40 transform hover:scale-[1.03] transition-all duration-300 rounded-2xl"
              >
                I'm a Gentleman →
              </Button>
            </FullApplicationModal>
            <FullApplicationModal role="lady" isFreeProfile={true}>
              <Button
                size="lg"
                className="w-full bg-gradient-to-br from-pink-600 to-rose-700 hover:from-pink-500 hover:to-rose-600 text-white px-10 py-8 text-2xl font-bold shadow-2xl shadow-pink-500/30 border border-pink-400/40 transform hover:scale-[1.03] transition-all duration-300 rounded-2xl"
              >
                I'm a Lady →
              </Button>
            </FullApplicationModal>
          </div>

          <p className="mt-6 text-sm text-gray-400">
            Already a member?{" "}
            <Link to="/login?role=gentleman" className="text-white underline hover:text-pink-400 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
