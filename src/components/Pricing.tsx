
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Crown, Coins, CreditCard } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { CryptoPaymentModal } from "@/components/CryptoPaymentModal";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const Pricing = () => {
  const { t } = useTranslation();
  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const features = [
    t('pricing.features.messaging'),
    t('pricing.features.algorithm'),
    t('pricing.features.verification'),
    t('pricing.features.support'),
    t('pricing.features.events'),
    t('pricing.features.coaching')
  ];

  // Handle Stripe payment
  const handleStripePayment = async () => {
    setLoading(true);
    
    toast({
      title: "Creating payment session...",
      description: "Please wait while we set up your payment",
    });
    
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout");
      if (error || !data?.url) {
        console.error("Checkout error:", error);
        toast({
          title: "Payment Error",
          description: "Could not start payment session. Try again.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      // Open Stripe checkout in a new tab
      window.open(data.url, "_blank");
      toast({
        title: "Payment page opened",
        description: "Complete your subscription in the new tab",
      });
    } catch (err) {
      console.error("Payment exception:", err);
      toast({
        title: "Something went wrong",
        description: "Please refresh and try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle crypto payment success
  const onCryptoPaymentSuccess = () => {
    toast({
      title: "Payment Successful!",
      description: "Your crypto payment has been confirmed. Welcome to the platform!",
    });
    setShowCryptoModal(false);
  };

  return (
    <section id="pricing" className="py-32 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              {t('pricing.title')}
            </span>
            <br />
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t('pricing.subtitle')}
            </span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            {t('pricing.description')}
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gradient-to-br from-gray-900/95 to-black/95 border-2 border-yellow-500/30 backdrop-blur-sm relative overflow-hidden shadow-2xl shadow-yellow-500/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-bl-full"></div>
            <div className="absolute top-6 right-6">
              <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold px-4 py-2 shadow-lg">
                <Crown className="w-4 h-4 mr-2" />
                {t('pricing.exclusive')}
              </Badge>
            </div>
            
            <CardHeader className="text-center pb-8 pt-12">
              <CardTitle className="text-4xl font-bold text-white mb-4">
                {t('pricing.membership_title')}
              </CardTitle>
              <CardDescription className="text-lg text-gray-300 mb-8">
                {t('pricing.membership_description')}
              </CardDescription>
              
              <div className="mb-6">
                <Badge className="bg-gradient-to-r from-red-600 to-purple-600 text-white px-6 py-3 text-base font-bold shadow-lg shadow-red-500/30">
                  {t('pricing.launch_special')}
                </Badge>
              </div>
              
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="text-center">
                  <div className="flex items-baseline justify-center space-x-2">
                     <span className="text-3xl text-gray-500 line-through">$49.99</span>
                     <span className="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">$24</span>
                     <div className="text-left">
                       <div className="text-2xl font-bold text-yellow-500">.50</div>
                       <div className="text-gray-400 text-sm">{t('pricing.first_month')}</div>
                     </div>
                   </div>
                   <div className="text-center text-gray-400 mt-3 text-lg">
                     {t('pricing.then_monthly')}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="px-8 pb-8">
              <div className="space-y-4 mb-10">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-800/30 border border-purple-500/20">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span className="text-gray-200 text-lg">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button className="w-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white py-8 text-xl font-bold shadow-2xl shadow-red-500/30 border border-red-500/50 transform hover:scale-105 transition-all duration-300 mb-4">
                {t('pricing.cta_button')}
              </Button>
              
              <Button 
                onClick={() => setShowCryptoModal(true)}
                className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white py-6 text-lg font-bold shadow-2xl shadow-yellow-500/30 border border-yellow-500/50 transform hover:scale-105 transition-all duration-300 mb-4"
                disabled={loading}
              >
                <Coins className="w-5 h-5 mr-2" />
                {t('pricing.pay_with_crypto')}
              </Button>
              
              <Button 
                onClick={handleStripePayment}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white py-6 text-lg font-bold shadow-2xl shadow-blue-500/30 border border-blue-500/50 transform hover:scale-105 transition-all duration-300"
                disabled={loading}
              >
                <CreditCard className="w-5 h-5 mr-2" />
                {loading ? "Redirecting to Payment..." : t('pricing.pay_with_stripe')}
              </Button>
              
              <p className="text-center text-sm text-gray-500 mt-6">
                {t('pricing.disclaimer')}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <CryptoPaymentModal
          isOpen={showCryptoModal}
          onClose={() => setShowCryptoModal(false)}
          amount={24.50}
          currency="USD"
          onSuccess={onCryptoPaymentSuccess}
        />
      </div>
    </section>
  );
};
