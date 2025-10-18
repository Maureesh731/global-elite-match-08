import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useVisitorTracking = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Call edge function to track visitor (uses service role for database access)
        const { data, error } = await supabase.functions.invoke('track-visitor');

        if (error) {
          console.error('Error tracking visitor:', error);
          setVisitorCount(1247);
        } else if (data?.count) {
          setVisitorCount(data.count);
        }
      } catch (error) {
        console.error('Error tracking visitor:', error);
        setVisitorCount(1247);
      } finally {
        setLoading(false);
      }
    };

    trackVisitor();

    // Subscribe to realtime updates for visitor count
    const channel = supabase
      .channel('visitor-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'visitors'
        },
        async () => {
          // Refetch count when visitors table changes
          const { count } = await supabase
            .from('visitors')
            .select('*', { count: 'exact', head: true });
          
          if (count !== null) {
            setVisitorCount(count);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { visitorCount, loading };
};
