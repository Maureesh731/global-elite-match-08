
import { Heart, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-untouchable-charcoal text-untouchable-cream py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand & Social */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-untouchable-crimson to-untouchable-ruby rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-untouchable-cream" />
              </div>
              <span className="text-xl font-bold">Untouchable Dating</span>
            </div>
            <p className="text-untouchable-rose leading-relaxed max-w-md">
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
                className="hover:text-untouchable-gold transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-untouchable-rose transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-untouchable-gold transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-untouchable-gold transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-untouchable-crimson transition-colors"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          {/* Platform Section */}
          <div>
            <h3 className="font-semibold text-untouchable-cream mb-4">Platform</h3>
            <ul className="space-y-2 text-untouchable-rose">
              <li><a href="#" className="hover:text-untouchable-gold transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-untouchable-gold transition-colors">Verification</a></li>
              <li><a href="#" className="hover:text-untouchable-gold transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-untouchable-gold transition-colors">FAQ</a></li>
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
            <h3 className="font-semibold text-untouchable-cream mb-4">Support</h3>
            <ul className="space-y-2 text-untouchable-rose">
              <li><a href="#" className="hover:text-untouchable-gold transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-untouchable-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-untouchable-gold transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-untouchable-gold transition-colors">Safety Guidelines</a></li>
              <li>
                <Link to="/referral-program" className="hover:text-untouchable-gold text-untouchable-gold transition-colors font-semibold">
                  Referral Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Lab Partner Section */}
          <div>
            <h3 className="font-semibold text-untouchable-cream mb-4">Lab Partner</h3>
            <div className="space-y-3">
              <p className="text-untouchable-rose text-sm">
                Find a local Quest Diagnostics lab to complete your required drug, STD, and disease screenings.
              </p>
              <a
                href="https://www.questdiagnostics.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-untouchable-crimson hover:bg-untouchable-ruby text-untouchable-cream px-4 py-2 rounded mt-2 font-semibold transition-all"
                aria-label="Find Quest Diagnostics Labs"
              >
                Quest Diagnostics &rarr;
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-untouchable-steel pt-8 text-center">
          <p className="text-untouchable-rose">
            © 2024 Untouchable Dating. All rights reserved. | Premium Dating for Verified Professionals
          </p>
        </div>
      </div>
    </footer>
  );
};

