import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Bitcoin, Coins, Loader2, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CryptoPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  currency: string;
}

const supportedCryptos = [
  { symbol: 'btc', name: 'Bitcoin', icon: '₿' },
  { symbol: 'eth', name: 'Ethereum', icon: 'Ξ' },
  { symbol: 'usdt', name: 'Tether', icon: '₮' },
  { symbol: 'usdc', name: 'USD Coin', icon: '$' },
  { symbol: 'ltc', name: 'Litecoin', icon: 'Ł' },
  { symbol: 'ada', name: 'Cardano', icon: '₳' },
];

export const CryptoPaymentModal = ({ isOpen, onClose, amount, currency }: CryptoPaymentModalProps) => {
  const { t } = useTranslation();
  const [selectedCrypto, setSelectedCrypto] = useState<string>('');
  const [paymentData, setPaymentData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'selecting' | 'creating' | 'waiting' | 'completed' | 'failed'>('selecting');

  const createCryptoPayment = async (crypto: string) => {
    setLoading(true);
    setStatus('creating');
    
    try {
      const { data, error } = await supabase.functions.invoke('create-crypto-payment', {
        body: {
          price_amount: amount,
          price_currency: currency.toLowerCase(),
          pay_currency: crypto,
          order_description: `UntouchableDating Premium Membership - ${amount} ${currency}`,
          success_url: `${window.location.origin}/payment-success`,
          cancel_url: `${window.location.origin}/payment-canceled`,
        }
      });

      if (error) {
        throw error;
      }

      setPaymentData(data);
      setStatus('waiting');
      
      // Start polling for payment status
      pollPaymentStatus(data.payment_id);
      
    } catch (error) {
      console.error('Error creating crypto payment:', error);
      toast.error('Failed to create crypto payment');
      setStatus('failed');
    } finally {
      setLoading(false);
    }
  };

  const pollPaymentStatus = async (paymentId: string) => {
    const checkStatus = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('check-crypto-payment', {
          body: { payment_id: paymentId }
        });

        if (error) throw error;

        if (data.payment_status === 'finished') {
          setStatus('completed');
          toast.success('Payment completed successfully!');
          setTimeout(() => {
            onClose();
            window.location.href = '/payment-success';
          }, 2000);
        } else if (data.payment_status === 'failed' || data.payment_status === 'expired') {
          setStatus('failed');
          toast.error('Payment failed or expired');
        } else {
          // Continue polling
          setTimeout(checkStatus, 10000); // Check every 10 seconds
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
      }
    };

    checkStatus();
  };

  const resetModal = () => {
    setSelectedCrypto('');
    setPaymentData(null);
    setStatus('selecting');
    setLoading(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-yellow-500" />
            {t('pricing.pay_with_crypto')}
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Pay {amount} {currency} using cryptocurrency
          </DialogDescription>
        </DialogHeader>

        {status === 'selecting' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">Select your preferred cryptocurrency:</p>
            <div className="grid grid-cols-2 gap-3">
              {supportedCryptos.map((crypto) => (
                <Card
                  key={crypto.symbol}
                  className={`cursor-pointer border-2 transition-all hover:border-purple-500 ${
                    selectedCrypto === crypto.symbol ? 'border-purple-500 bg-purple-900/20' : 'border-gray-700 bg-gray-800'
                  }`}
                  onClick={() => setSelectedCrypto(crypto.symbol)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{crypto.icon}</div>
                    <div className="font-semibold text-sm">{crypto.name}</div>
                    <div className="text-xs text-gray-400 uppercase">{crypto.symbol}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button
              onClick={() => createCryptoPayment(selectedCrypto)}
              disabled={!selectedCrypto || loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Payment...
                </>
              ) : (
                `Pay with ${selectedCrypto.toUpperCase()}`
              )}
            </Button>
          </div>
        )}

        {status === 'creating' && (
          <div className="text-center py-8">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-500" />
            <p>Creating your crypto payment...</p>
          </div>
        )}

        {status === 'waiting' && paymentData && (
          <div className="space-y-4">
            <div className="text-center">
              <Badge className="bg-yellow-600 text-white mb-4">
                Waiting for Payment
              </Badge>
              <p className="text-sm text-gray-400 mb-4">
                Send exactly <strong>{paymentData.pay_amount} {paymentData.pay_currency.toUpperCase()}</strong> to:
              </p>
              <div className="bg-gray-800 p-4 rounded-lg break-all text-sm font-mono">
                {paymentData.pay_address}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Payment will be confirmed automatically. This may take a few minutes.
              </p>
            </div>
            <Button
              onClick={() => window.open(paymentData.invoice_url, '_blank')}
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Open Payment Page
            </Button>
          </div>
        )}

        {status === 'completed' && (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Payment Successful!</h3>
            <p className="text-gray-400">Redirecting you now...</p>
          </div>
        )}

        {status === 'failed' && (
          <div className="text-center py-8">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Payment Failed</h3>
            <p className="text-gray-400 mb-4">Please try again or contact support.</p>
            <Button onClick={resetModal} variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              Try Again
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};