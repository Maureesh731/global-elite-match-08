
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Users, Crown } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Hero = () => {
  const { t } = useTranslation();
  
  const backgroundImages = [
    'https://tffxaagmecmsgiltdjzv.supabase.co/storage/v1/object/sign/untouchabledatingphotos/Untouchable%20Photo2.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81OTdlNTY1NC0yYjMyLTQxN2EtYTQ5Zi0xYWM5YThkMzc4ZTQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1bnRvdWNoYWJsZWRhdGluZ3Bob3Rvcy9VbnRvdWNoYWJsZSBQaG90bzIuanBnIiwiaWF0IjoxNzUyNjc2OTIxLCJleHAiOjE3ODQyMTI5MjF9.MY2-izQcQpkIocxNiVFUp3GnyYON4UXzMPsP63Vz51s',
    'https://tffxaagmecmsgiltdjzv.supabase.co/storage/v1/object/sign/untouchabledatingphotos/istockphotoUntouchable.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81OTdlNTY1NC0yYjMyLTQxN2EtYTQ5Zi0xYWM5YThkMzc4ZTQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1bnRvdWNoYWJsZWRhdGluZ3Bob3Rvcy9pc3RvY2twaG90b1VudG91Y2hhYmxlLmpwZyIsImlhdCI6MTc1MjY3NzQyMywiZXhwIjoxNzg0MjEzNDIzfQ.DngrH2Rv01uOit_9zt9SKXvlfDl3XOV4-IEzWlGVdY0'
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
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white px-12 py-6 text-xl font-bold shadow-2xl shadow-red-500/30 border border-red-500/50 transform hover:scale-105 transition-all duration-300">
              {t('hero.cta_button')}
            </Button>
            <Button size="lg" className="bg-gradient-to-r from-purple-800/80 to-red-800/80 hover:from-purple-700 hover:to-red-700 text-white border-2 border-purple-400/50 hover:border-red-400/60 px-12 py-6 text-xl font-semibold backdrop-blur-sm transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-purple-500/30" variant="outline">
              Discover More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
