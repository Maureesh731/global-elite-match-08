
import { Heart, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-untouchable-charcoal text-untouchable-cream py-20 border-t border-untouchable-midnight">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          {/* Brand & Social */}
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-untouchable-gradient-accent rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-untouchable-cream" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-untouchable-cream to-untouchable-pearl bg-clip-text text-transparent">
                Untouchable Dating
              </span>
            </div>
            <p className="text-untouchable-cream/80 leading-relaxed max-w-md mb-8 text-lg">
              The exclusive dating platform for verified global professionals seeking 
              authentic, health-conscious connections for marriage and long-term commitment.
            </p>
            {/* Social Media Icons */}
            <div className="flex items-center space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-untouchable-gold transition-colors p-2 rounded-lg hover:bg-untouchable-midnight/50"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-untouchable-rose transition-colors p-2 rounded-lg hover:bg-untouchable-midnight/50"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-untouchable-gold transition-colors p-2 rounded-lg hover:bg-untouchable-midnight/50"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-untouchable-gold transition-colors p-2 rounded-lg hover:bg-untouchable-midnight/50"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-untouchable-crimson transition-colors p-2 rounded-lg hover:bg-untouchable-midnight/50"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          {/* Platform Section */}
          <div>
            <h3 className="font-bold text-untouchable-cream mb-6 text-lg">Platform</h3>
            <ul className="space-y-3 text-untouchable-cream/80">
              <li><a href="#" className="hover:text-untouchable-gold transition-colors font-medium">How It Works</a></li>
              <li><a href="#" className="hover:text-untouchable-gold transition-colors font-medium">Verification</a></li>
              <li><a href="#" className="hover:text-untouchable-gold transition-colors font-medium">Success Stories</a></li>
              <li><a href="#" className="hover:text-untouchable-gold transition-colors font-medium">FAQ</a></li>
              <li>
                <Link to="/networking" className="hover:text-untouchable-gold text-untouchable-gold transition-colors font-semibold">
                  Networking
                </Link>
              </li>
              <li>
                <Link to="/lab-partner" className="hover:text-untouchable-gold text-untouchable-gold transition-colors font-semibold">
                  Lab Partnership
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support Section */}
          <div>
            <h3 className="font-bold text-untouchable-cream mb-6 text-lg">Support</h3>
            <ul className="space-y-3 text-untouchable-cream/80">
              <li><a href="#" className="hover:text-untouchable-gold transition-colors font-medium">Contact Us</a></li>
              <li><a href="#" className="hover:text-untouchable-gold transition-colors font-medium">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-untouchable-gold transition-colors font-medium">Terms of Service</a></li>
              <li><a href="#" className="hover:text-untouchable-gold transition-colors font-medium">Safety Guidelines</a></li>
              <li>
                <Link to="/referral-program" className="hover:text-untouchable-gold text-untouchable-gold transition-colors font-semibold">
                  Referral Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Lab Partner Section */}
          <div>
            <h3 className="font-bold text-untouchable-cream mb-6 text-lg">Lab Partner</h3>
            <div className="space-y-4">
              <p className="text-untouchable-cream/80 text-sm leading-relaxed">
                Find a local Quest Diagnostics lab to complete your required drug, STD, and disease screenings.
              </p>
              <a
                href="https://www.questdiagnostics.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-untouchable-gradient-accent hover:shadow-lg text-untouchable-cream px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                aria-label="Find Quest Diagnostics Labs"
              >
                Quest Diagnostics &rarr;
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-untouchable-midnight pt-8 text-center">
          <p className="text-untouchable-cream/70 text-lg">
            © 2024 Untouchable Dating. All rights reserved. | Premium Dating for Verified Professionals
          </p>
        </div>
      </div>
    </footer>
  );
};
