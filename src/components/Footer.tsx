
import { Heart, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="text-white py-16" style={{backgroundColor: '#121212'}}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand & Social */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: '#4B1248'}}>
                <Heart className="w-5 h-5" style={{color: '#D4AF37'}} />
              </div>
              <span className="text-xl font-bold">Untouchable Dating</span>
            </div>
            <p className="text-slate-300 leading-relaxed max-w-md">
              The exclusive dating platform for verified global professionals seeking 
              authentic, health-conscious connections for marriage and long-term commitment.
            </p>
            {/* Social Media Icons */}
            <div className="flex items-center space-x-4 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="transition-colors"
                style={{'&:hover': {color: '#D4AF37'}}}
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-colors"
                style={{'&:hover': {color: '#D4AF37'}}}
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-colors"
                style={{'&:hover': {color: '#D4AF37'}}}
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="transition-colors"
                style={{'&:hover': {color: '#D4AF37'}}}
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="transition-colors"
                style={{'&:hover': {color: '#C8102E'}}}
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          {/* Platform Section */}
          <div>
            <h3 className="font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="transition-colors" style={{'&:hover': {color: '#D4AF37'}}}>How It Works</a></li>
              <li><a href="#" className="transition-colors" style={{'&:hover': {color: '#D4AF37'}}}>Verification</a></li>
              <li><a href="#" className="transition-colors" style={{'&:hover': {color: '#D4AF37'}}}>Success Stories</a></li>
              <li><a href="#" className="transition-colors" style={{'&:hover': {color: '#D4AF37'}}}>FAQ</a></li>
              <li>
                <Link to="/networking" className="font-semibold transition-colors" style={{color: '#D4AF37', '&:hover': {color: '#CBA135'}}}>
                  Networking
                </Link>
              </li>
              <li>
                <Link to="/lab-partner" className="font-semibold transition-colors" style={{color: '#D4AF37', '&:hover': {color: '#CBA135'}}}>
                  Lab Partnership
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support Section */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="transition-colors" style={{'&:hover': {color: '#D4AF37'}}}>Contact Us</a></li>
              <li><a href="#" className="transition-colors" style={{'&:hover': {color: '#D4AF37'}}}>Privacy Policy</a></li>
              <li><a href="#" className="transition-colors" style={{'&:hover': {color: '#D4AF37'}}}>Terms of Service</a></li>
              <li><a href="#" className="transition-colors" style={{'&:hover': {color: '#D4AF37'}}}>Safety Guidelines</a></li>
              <li>
                <Link to="/referral-program" className="font-semibold transition-colors" style={{color: '#D4AF37', '&:hover': {color: '#CBA135'}}}>
                  Referral Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Lab Partner Section */}
          <div>
            <h3 className="font-semibold text-white mb-4">Lab Partner</h3>
            <div className="space-y-3">
              <p className="text-slate-300 text-sm">
                Find a local Quest Diagnostics lab to complete your required drug, STD, and disease screenings.
              </p>
              <a
                href="https://www.questdiagnostics.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-white px-4 py-2 rounded mt-2 font-semibold transition-all"
                style={{backgroundColor: '#4B1248', '&:hover': {backgroundColor: '#3B1F4F'}}}
                aria-label="Find Quest Diagnostics Labs"
              >
                Quest Diagnostics &rarr;
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-8 text-center" style={{borderColor: '#4B1248'}}>
          <p className="text-slate-400">
            © 2024 Untouchable Dating. All rights reserved. | Premium Dating for Verified Professionals
          </p>
        </div>
      </div>
    </footer>
  );
};
