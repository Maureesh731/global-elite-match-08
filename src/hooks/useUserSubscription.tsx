import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useUserSubscription = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setIsSubscribed(false);
          setLoading(false);
          return;
        }

        // Check if user has used the promo code (free subscription)
        const { data, error } = await supabase
          .from('promo_usage')
          .select('used_at')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error checking subscription:', error);
          setIsSubscribed(false);
        } else {
          // If user has promo usage record, they have subscription
          setIsSubscribed(!!data);
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
        setIsSubscribed(false);
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(checkSubscription);
    return () => subscription.unsubscribe();
  }, []);

  return { isSubscribed, loading };
};