
import { Heart, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand & Social */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-purple-900 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-yellow-400" />
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
                className="text-slate-300 hover:text-yellow-400 transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-slate-300 hover:text-yellow-400 transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-slate-300 hover:text-yellow-400 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-slate-300 hover:text-yellow-400 transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-slate-300 hover:text-red-700 transition-colors"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          {/* Platform Section */}
          <div>
            <h3 className="font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:text-yellow-400 transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Verification</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">FAQ</a></li>
              <li>
                <Link to="/networking" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
                  Networking
                </Link>
              </li>
              <li>
                <Link to="/lab-partner" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
                  Lab Partnership
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support Section */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Safety Guidelines</a></li>
              <li>
                <Link to="/referral-program" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
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
                className="inline-block bg-purple-900 hover:bg-purple-800 text-white px-4 py-2 rounded mt-2 font-semibold transition-all"
                aria-label="Find Quest Diagnostics Labs"
              >
                Quest Diagnostics &rarr;
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-purple-900 pt-8 text-center">
          <p className="text-slate-400">
            © 2024 Untouchable Dating. All rights reserved. | Premium Dating for Verified Professionals
          </p>
        </div>
      </div>
    </footer>
  );
};
