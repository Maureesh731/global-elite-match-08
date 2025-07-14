import React from "react";
import { X, TrendingUp, Shield, Globe, Clock, Star, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CryptoEducationModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-black border-purple-500/30">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-gray-700 hover:bg-gray-600 border border-gray-600 p-2 shadow transition-all"
          type="button"
        >
          <X className="w-5 h-5 text-gray-300" />
        </button>
        
        <DialogHeader className="pt-4 pb-6">
          <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
            The Future Is Here: Cryptocurrency Revolution
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 text-white">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-purple-300">
              Don't Get Left Behind in the Digital Economy
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
              While traditional investments struggle with inflation and economic uncertainty, 
              cryptocurrency has emerged as the most revolutionary wealth-building opportunity of our lifetime.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-purple-500/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">160,000%</div>
                <div className="text-gray-300">Bitcoin's growth since 2010</div>
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-blue-500/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">$2.3T</div>
                <div className="text-gray-300">Global crypto market cap</div>
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-purple-500/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">420M+</div>
                <div className="text-gray-300">Global crypto users</div>
              </div>
            </div>
          </div>

          {/* Why Crypto Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center text-white">
              Why Cryptocurrency Is The Future of Wealth
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-green-400 mb-2">Hedge Against Inflation</h4>
                    <p className="text-gray-300">While fiat currency loses purchasing power, Bitcoin and select cryptocurrencies have historically outpaced inflation significantly.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-400 mb-2">Global Accessibility</h4>
                    <p className="text-gray-300">24/7 global markets with no geographical restrictions. Your money works around the clock, worldwide.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-purple-400 mb-2">Early Adoption Advantage</h4>
                    <p className="text-gray-300">We're still in the early stages. Major institutions like Tesla, MicroStrategy, and BlackRock are just beginning to adopt crypto.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-yellow-400 mb-2">Exponential Growth Potential</h4>
                    <p className="text-gray-300">Unlike traditional assets, crypto offers the potential for life-changing returns through strategic investment and timing.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STARTFF Section */}
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl p-8 border border-purple-500/30">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <Star className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white">
                START Your Financial Freedom Journey Today
              </h3>
              
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Don't let this opportunity pass you by. Join thousands of smart investors who are already building wealth with cryptocurrency through proven strategies and expert guidance.
              </p>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-purple-300">
                  What STARTFF.com Offers:
                </h4>
                
                <div className="grid md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300">Comprehensive Crypto Education</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-300">Professional Trading Strategies</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-gray-300">Risk Management Training</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-gray-300">One-on-One Advisory Services</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-gray-300">Portfolio Optimization Tools</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                      <span className="text-gray-300">Market Analysis & Insights</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-4 text-lg font-semibold border border-purple-500/30 shadow-lg shadow-purple-500/20 transition-all hover:scale-105"
                >
                  <a
                    href="https://startff.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2"
                  >
                    <span>Start Your Journey</span>
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </Button>
                
                <Button
                  variant="outline"
                  asChild
                  className="border-purple-500 text-purple-300 hover:bg-purple-500/10 px-8 py-4 text-lg font-semibold"
                >
                  <a
                    href="https://startff.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2"
                  >
                    <span>Learn More</span>
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Urgency Section */}
          <div className="text-center space-y-4 bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h4 className="text-xl font-bold text-red-400">
              ⚠️ Time Is Running Out
            </h4>
            <p className="text-gray-300">
              Every day you wait is a day of potential gains lost. The crypto market doesn't wait for anyone. 
              <span className="text-red-400 font-semibold"> Take action now</span> and secure your financial future.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};