import { X, TrendingUp, Shield, PiggyBank, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

interface WealthCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WealthCreationModal = ({ isOpen, onClose }: WealthCreationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-purple-800/30 text-white">
        <DialogHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-0 top-0 p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        <div className="space-y-8 p-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Build Generational Wealth
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Secure your family's financial future with proven strategies for investment diversification, 
              retirement planning, and wealth preservation.
            </p>
          </div>

          {/* Value Proposition */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-400 mb-2">Investment Diversification</h3>
                  <p className="text-gray-300">
                    Learn how to spread risk across multiple asset classes including stocks, bonds, real estate, 
                    and alternative investments to maximize returns while minimizing risk.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <PiggyBank className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">IUL & Annuities</h3>
                  <p className="text-gray-300">
                    Discover the power of Indexed Universal Life insurance and annuities for tax-advantaged 
                    retirement income that can provide guaranteed payments for life.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-purple-400 mb-2">Life Insurance Strategy</h3>
                  <p className="text-gray-300">
                    Protect your family's future with term life insurance and permanent life insurance 
                    strategies that create tax-free wealth transfer to future generations.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-orange-400 mb-2">Generational Planning</h3>
                  <p className="text-gray-300">
                    Create a legacy that lasts for generations through strategic estate planning, 
                    trust structures, and wealth preservation techniques.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Why This Matters */}
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-6 border border-gray-600/30">
            <h3 className="text-2xl font-bold text-white mb-4">Why Traditional Investment Advice Falls Short</h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>401(k)s have contribution limits and tax penalties</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Traditional retirement accounts are subject to market volatility</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Most people don't have enough life insurance coverage</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>IUL provides tax-free growth and income</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Diversified portfolios reduce overall risk</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Proper planning creates generational wealth</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* STARTFF Recommendation */}
          <div className="text-center space-y-6">
            <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl p-8 border border-green-500/30">
              <h3 className="text-3xl font-bold text-white mb-4">
                Transform Your Financial Future with START Financial Freedom
              </h3>
              <p className="text-lg text-gray-300 mb-6 max-w-3xl mx-auto">
                Get personalized guidance on investment diversification, retirement planning with IUL and annuities, 
                and life insurance strategies from certified financial professionals who understand generational wealth building.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-green-400 mb-2">Personalized Strategies</h4>
                  <p className="text-sm text-gray-300">Custom plans based on your unique financial situation</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-400 mb-2">Expert Advisory</h4>
                  <p className="text-sm text-gray-300">Work with certified financial professionals</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-400 mb-2">Ongoing Support</h4>
                  <p className="text-sm text-gray-300">Continuous guidance as your wealth grows</p>
                </div>
              </div>

              <a
                href="https://startff.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>Start Building Generational Wealth Today</span>
                <TrendingUp className="w-5 h-5" />
              </a>
              
              <p className="text-sm text-gray-400 mt-4">
                Visit STARTFF.com for comprehensive wealth building strategies and professional advisory services
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};