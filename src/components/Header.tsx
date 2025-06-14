
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-900">EliteMatch</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-slate-600 hover:text-blue-900 transition-colors">Features</a>
          <a href="#verification" className="text-slate-600 hover:text-blue-900 transition-colors">Verification</a>
          <a href="#pricing" className="text-slate-600 hover:text-blue-900 transition-colors">Pricing</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-slate-600 hover:text-blue-900">Sign In</Button>
          <Button className="bg-blue-900 hover:bg-blue-800">Apply Now</Button>
        </div>
      </div>
    </header>
  );
};
