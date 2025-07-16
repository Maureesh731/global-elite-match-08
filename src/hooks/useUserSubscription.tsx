import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SubscriptionData {
  subscribed: boolean;
  subscription_tier?: string;
  subscription_end?: string;
  is_first_month?: boolean;
  referral_credits?: number;
}

export const useUserSubscription = () => {
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>({
    subscribed: false,
    subscription_tier: undefined,
    subscription_end: undefined,
    is_first_month: true,
    referral_credits: 0
  });
  const [loading, setLoading] = useState(true);

  const checkSubscription = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setSubscriptionData({
          subscribed: false,
          subscription_tier: undefined,
          subscription_end: undefined,
          is_first_month: true,
          referral_credits: 0
        });
        setLoading(false);
        return;
      }

      // Call the check-subscription edge function
      const { data, error } = await supabase.functions.invoke('check-subscription');

      if (error) {
        console.error('Error checking subscription:', error);
        setSubscriptionData({
          subscribed: false,
          subscription_tier: undefined,
          subscription_end: undefined,
          is_first_month: true,
          referral_credits: 0
        });
      } else {
        setSubscriptionData({
          subscribed: data.subscribed || false,
          subscription_tier: data.subscription_tier,
          subscription_end: data.subscription_end,
          is_first_month: data.is_first_month ?? true,
          referral_credits: data.referral_credits || 0
        });
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
      setSubscriptionData({
        subscribed: false,
        subscription_tier: undefined,
        subscription_end: undefined,
        is_first_month: true,
        referral_credits: 0
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSubscription();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(checkSubscription);
    return () => subscription.unsubscribe();
  }, []);

  return { 
    ...subscriptionData,
    loading,
    refreshSubscription: checkSubscription
  };
};