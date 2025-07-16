import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useUserSubscription } from '@/hooks/useUserSubscription';
import { CreditCard, Calendar, DollarSign, RefreshCw } from 'lucide-react';

export const SubscriptionManagement = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { 
    subscribed, 
    subscription_tier, 
    subscription_end, 
    is_first_month,
    referral_credits,
    refreshSubscription 
  } = useUserSubscription();

  const handleCreateCheckout = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout');
      
      if (error) {
        toast({
          title: "Payment Error",
          description: error.message || "Failed to create checkout session",
          variant: "destructive"
        });
        return;
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) {
        toast({
          title: "Portal Error",
          description: error.message || "Failed to open customer portal",
          variant: "destructive"
        });
        return;
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Portal error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const getCurrentPrice = () => {
    return is_first_month ? '$24.99' : '$49.99';
  };

  const getNextPrice = () => {
    return is_first_month ? '$49.99' : '$49.99';
  };

  return (
    <div className="space-y-6">
      {/* Subscription Status Card */}
      <Card className="bg-gradient-to-br from-purple-900/30 to-red-900/30 border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white">
            <span className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Subscription Status
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshSubscription}
              className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Status:</span>
            <Badge variant={subscribed ? "default" : "secondary"} className={
              subscribed 
                ? "bg-green-600 text-white" 
                : "bg-gray-600 text-gray-300"
            }>
              {subscribed ? 'Active' : 'Inactive'}
            </Badge>
          </div>

          {subscribed && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Plan:</span>
                <span className="text-white font-medium">{subscription_tier}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-300">Current Billing:</span>
                <span className="text-white font-medium">{getCurrentPrice()}/month</span>
              </div>

              {is_first_month && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Next Billing:</span>
                  <span className="text-white font-medium">{getNextPrice()}/month</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-gray-300">Next Payment:</span>
                <span className="text-white font-medium">{formatDate(subscription_end)}</span>
              </div>

              {referral_credits > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Free Months Available:</span>
                  <Badge className="bg-green-600 text-white">
                    {referral_credits} month{referral_credits > 1 ? 's' : ''}
                  </Badge>
                </div>
              )}
            </>
          )}

          <div className="pt-4 space-y-2">
            {!subscribed ? (
              <Button 
                onClick={handleCreateCheckout}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                {loading ? 'Processing...' : `Subscribe Now - ${getCurrentPrice()}/month`}
              </Button>
            ) : (
              <Button 
                onClick={handleManageSubscription}
                disabled={loading}
                variant="outline"
                className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
              >
                <Calendar className="w-4 h-4 mr-2" />
                {loading ? 'Loading...' : 'Manage Subscription'}
              </Button>
            )}
          </div>

          {is_first_month && subscribed && (
            <div className="text-xs text-gray-400 bg-purple-900/20 p-3 rounded border border-purple-500/20">
              <p className="font-medium text-purple-300">50% Off First Month Active!</p>
              <p>You're currently paying {getCurrentPrice()}/month. Starting next billing cycle, your subscription will be {getNextPrice()}/month.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};