import { Heart, Facebook, Instagram, Linkedin, Twitter, Youtube, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { MemberCounter } from "@/components/MemberCounter";
import { FeedbackModal } from "@/components/FeedbackModal";
import { useState } from "react";

export const Footer = () => {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  return (
    <footer className="bg-black border-t border-purple-900/30 text-white py-20">
      <div className="container mx-auto px-4">
        {/* Live Member Counter Section */}
        <div className="flex justify-center mb-16">
          <MemberCounter />
        </div>

        <div className="grid md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-red-200 bg-clip-text text-transparent">
                Untouchable Dating
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md mb-8">
              The most exclusive dating platform for verified global professionals seeking 
              authentic, health-conscious connections for marriage and long-term commitment.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-10 h-10 bg-gray-800 hover:bg-sky-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-6 text-lg">Platform</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-purple-400 transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Verification</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">FAQ</a></li>
              <li>
                <Link to="/networking" className="hover:text-red-400 text-purple-300 transition-colors font-semibold">
                  Networking
                </Link>
              </li>
              <li>
                <Link to="/lab-partner" className="hover:text-red-400 text-purple-300 transition-colors font-semibold">
                  Lab Partnership
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-6 text-lg">Support</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Safety Guidelines</a></li>
              <li>
                <Link to="/referral-program" className="hover:text-red-400 text-purple-300 transition-colors font-semibold">
                  Referral Program
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsFeedbackModalOpen(true)}
                  className="flex items-center gap-2 hover:text-red-400 text-purple-300 transition-colors font-semibold"
                >
                  <MessageSquare className="w-4 h-4" />
                  Send Feedback
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6 text-lg">Lab Partner</h3>
            <div className="space-y-4">
              <p className="text-gray-400 text-sm leading-relaxed">
                Find a local Quest Diagnostics lab to complete your required drug, STD, and disease screenings.
              </p>
              <a
                href="https://www.questdiagnostics.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:scale-105"
                aria-label="Find Quest Diagnostics Labs"
              >
                Quest Diagnostics →
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500">
            © 2024 Untouchable Dating. All rights reserved. | Premium Dating for Verified Professionals
          </p>
        </div>
      </div>

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />
    </footer>
  );
};
