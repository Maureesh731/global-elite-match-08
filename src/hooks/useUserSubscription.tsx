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

        const { data, error } = await (supabase as any)
          .from('subscribers')
          .select('subscribed')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error checking subscription:', error);
          setIsSubscribed(false);
        } else {
          setIsSubscribed(data?.subscribed || false);
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