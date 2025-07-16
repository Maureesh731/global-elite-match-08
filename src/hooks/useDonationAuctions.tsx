import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

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

  const completeAuction = async (auctionId: string) => {
    try {
      const { error } = await supabase
        .from('donation_auctions')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('id', auctionId)
        .eq('user_id', user?.id);

      if (error) throw error;
      
      toast.success('Auction completed successfully');
      await fetchAuctions();
      return true;
    } catch (error) {
      console.error('Error completing auction:', error);
      toast.error('Failed to complete auction');
      return false;
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

    try {
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