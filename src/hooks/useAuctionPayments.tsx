import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { AuctionPayment } from './useDonationAuctions';
import { toast } from 'sonner';

export const useAuctionPayments = (auctionId?: string) => {
  const [payments, setPayments] = useState<AuctionPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchPayments = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('auction_payments')
        .select('*')
        .order('created_at', { ascending: false });

      if (auctionId) {
        query = query.eq('auction_id', auctionId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setPayments((data || []) as AuctionPayment[]);
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast.error('Failed to fetch payment information');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPayments();
    }
  }, [auctionId, user]);

  return {
    payments,
    loading,
    refetchPayments: fetchPayments
  };
};