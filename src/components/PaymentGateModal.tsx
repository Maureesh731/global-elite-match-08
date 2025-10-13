import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Crown, MessageCircle, Star } from 'lucide-react';

interface PaymentGateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature: 'messaging' | 'access';
}

export const PaymentGateModal: React.FC<PaymentGateModalProps> = ({
  open,
  onOpenChange,
  feature
}) => {
  const handleUpgrade = () => {
    // This will be connected to Stripe later
    window.location.href = '/#pricing';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-gray-900 to-black border-2 border-purple-500/30">
        <DialogHeader>
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-600 to-purple-700 rounded-full flex items-center justify-center mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-white">
            Upgrade to Premium
          </DialogTitle>
          <DialogDescription className="text-center text-gray-300 text-lg">
            {feature === 'messaging' 
              ? 'Unlock messaging to connect with other members'
              : 'Get full access to all premium features'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-black/40 rounded-lg p-4 border border-purple-500/20">
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              Premium Benefits
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <MessageCircle className="w-4 h-4 text-purple-400 mr-2 mt-1 flex-shrink-0" />
                <span>Send unlimited messages</span>
              </li>
              <li className="flex items-start">
                <Crown className="w-4 h-4 text-purple-400 mr-2 mt-1 flex-shrink-0" />
                <span>Connect with verified members</span>
              </li>
              <li className="flex items-start">
                <Star className="w-4 h-4 text-purple-400 mr-2 mt-1 flex-shrink-0" />
                <span>Priority profile placement</span>
              </li>
              <li className="flex items-start">
                <Star className="w-4 h-4 text-purple-400 mr-2 mt-1 flex-shrink-0" />
                <span>Access to exclusive events</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleUpgrade}
              className="w-full bg-gradient-to-r from-red-600 to-purple-700 hover:from-red-500 hover:to-purple-600 text-white font-semibold py-6 text-lg"
            >
              View Pricing Plans
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
