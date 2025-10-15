import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { z } from 'zod';

const bidSchema = z.object({
  bidAmount: z.number()
    .positive('Bid must be positive')
    .min(0.01, 'Minimum bid is $0.01')
    .max(10000000, 'Maximum bid is $10,000,000')
    .multipleOf(0.01, 'Bid must be in cents')
});

export interface DonationAuction {
  id: string;
  user_id: string;
  donor_name: string;
  donation_type: 'blood' | 'sperm' | 'eggs';
  bio: string;
  photo_url?: string;
  starting_bid_amount: number;
  current_highest_bid: number;
  status: 'active' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export interface AuctionBid {
  id: string;
  auction_id: string;
  bidder_id: string;
  bidder_name: string;
  bid_amount: number;
  message?: string;
  created_at: string;
}

export interface AuctionPayment {
  id: string;
  auction_id: string;
  winning_bid_amount: number;
  platform_fee_amount: number;
  donor_payout_amount: number;
  donor_id: string;
  winner_id: string;
  payment_status: 'pending' | 'processed' | 'failed';
  processed_at?: string;
  created_at: string;
}

export const useDonationAuctions = () => {
  const [auctions, setAuctions] = useState<DonationAuction[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchAuctions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('donation_auctions')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAuctions((data || []) as DonationAuction[]);
    } catch (error) {
      console.error('Error fetching auctions:', error);
      toast.error('Failed to fetch donation auctions');
    } finally {
      setLoading(false);
    }
  };

  const createAuction = async (auctionData: Omit<DonationAuction, 'id' | 'user_id' | 'current_highest_bid' | 'status' | 'created_at' | 'updated_at' | 'completed_at'>) => {
    if (!user) {
      toast.error('You must be logged in to create an auction');
      return false;
    }

    try {
      const { data, error } = await supabase
        .from('donation_auctions')
        .insert([{
          ...auctionData,
          user_id: user.id,
          current_highest_bid: auctionData.starting_bid_amount
        }])
        .select()
        .single();

      if (error) throw error;
      
      toast.success('Donation auction created successfully');
      await fetchAuctions();
      return true;
    } catch (error) {
      console.error('Error creating auction:', error);
      toast.error('Failed to create donation auction');
      return false;
    }
  };

  const completeAuction = async (auctionId: string, winningBidId: string) => {
    try {
      const { data, error } = await supabase.rpc('complete_auction_with_fees', {
        _auction_id: auctionId,
        _winning_bid_id: winningBidId
      });

      if (error) throw error;
      
      const result = (data && data.length > 0 ? data[0] : null) as { success: boolean; error?: string; payment_id?: string; winning_bid_amount?: number; platform_fee?: number; donor_payout?: number } | null;
      
      if (!result || !result.success) {
        throw new Error(result?.error || 'Failed to complete auction');
      }
      
      toast.success(`Auction completed! You'll receive ${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format((result.donor_payout || 0) / 100)} (after 10% platform fee)`);
      
      await fetchAuctions();
      return result;
    } catch (error) {
      console.error('Error completing auction:', error);
      toast.error('Failed to complete auction');
      return null;
    }
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  return {
    auctions,
    loading,
    createAuction,
    completeAuction,
    refetchAuctions: fetchAuctions
  };
};

export const useAuctionBids = (auctionId: string) => {
  const [bids, setBids] = useState<AuctionBid[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchBids = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('auction_bids')
        .select('*')
        .eq('auction_id', auctionId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBids((data || []) as AuctionBid[]);
    } catch (error) {
      console.error('Error fetching bids:', error);
      toast.error('Failed to fetch bids');
    } finally {
      setLoading(false);
    }
  };

  const placeBid = async (bidAmount: number, message?: string) => {
    if (!user) {
      toast.error('You must be logged in to place a bid');
      return false;
    }

    // Validate bid amount
    const bidInDollars = bidAmount / 100;
    const validation = bidSchema.safeParse({ bidAmount: bidInDollars });
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return false;
    }

    try {
      // Fetch current auction to validate bid exceeds current highest
      const { data: auction, error: fetchError } = await supabase
        .from('donation_auctions')
        .select('current_highest_bid')
        .eq('id', auctionId)
        .single();

      if (fetchError) throw fetchError;

      if (bidAmount <= auction.current_highest_bid) {
        toast.error('Bid must exceed current highest bid');
        return false;
      }

      const { error } = await supabase
        .from('auction_bids')
        .insert([{
          auction_id: auctionId,
          bidder_id: user.id,
          bidder_name: user.user_metadata?.full_name || user.email || 'Anonymous',
          bid_amount: bidAmount,
          message: message
        }]);

      if (error) throw error;
      
      toast.success('Bid placed successfully');
      await fetchBids();
      return true;
    } catch (error) {
      console.error('Error placing bid:', error);
      toast.error('Failed to place bid');
      return false;
    }
  };

  useEffect(() => {
    if (auctionId) {
      fetchBids();
    }
  }, [auctionId]);

  return {
    bids,
    loading,
    placeBid,
    refetchBids: fetchBids
  };
};