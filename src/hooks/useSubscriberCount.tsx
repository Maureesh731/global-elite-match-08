import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useSubscriberCount = () => {
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriberCount = async () => {
      try {
        const { count, error } = await (supabase as any)
          .from('subscribers')
          .select('*', { count: 'exact', head: true })
          .eq('subscribed', true);

        if (error) {
          console.error('Error fetching subscriber count:', error);
          return;
        }

        setSubscriberCount(count || 0);
      } catch (error) {
        console.error('Error fetching subscriber count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriberCount();

    // Refresh count every 30 seconds
    const interval = setInterval(fetchSubscriberCount, 30000);
    return () => clearInterval(interval);
  }, []);

  return { subscriberCount, loading };
};