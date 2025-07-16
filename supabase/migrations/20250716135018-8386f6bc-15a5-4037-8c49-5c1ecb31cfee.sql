-- Create donation auctions table
CREATE TABLE public.donation_auctions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  donor_name TEXT NOT NULL,
  donation_type TEXT NOT NULL CHECK (donation_type IN ('blood', 'sperm', 'eggs')),
  bio TEXT NOT NULL CHECK (length(bio) <= 1500),
  photo_url TEXT,
  starting_bid_amount INTEGER NOT NULL, -- in cents
  current_highest_bid INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- Create auction bids table
CREATE TABLE public.auction_bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auction_id UUID NOT NULL REFERENCES public.donation_auctions(id) ON DELETE CASCADE,
  bidder_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  bidder_name TEXT NOT NULL,
  bid_amount INTEGER NOT NULL, -- in cents
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.donation_auctions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auction_bids ENABLE ROW LEVEL SECURITY;

-- RLS policies for donation_auctions
CREATE POLICY "Users can view all active auctions" ON public.donation_auctions
  FOR SELECT USING (status = 'active');

CREATE POLICY "Users can create their own auctions" ON public.donation_auctions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own auctions" ON public.donation_auctions
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS policies for auction_bids
CREATE POLICY "Users can view bids on auctions they participate in" ON public.auction_bids
  FOR SELECT USING (
    bidder_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM public.donation_auctions da 
      WHERE da.id = auction_id AND da.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create bids" ON public.auction_bids
  FOR INSERT WITH CHECK (auth.uid() = bidder_id);

-- Trigger to update updated_at columns
CREATE TRIGGER update_donation_auctions_updated_at
  BEFORE UPDATE ON public.donation_auctions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_auction_bids_updated_at
  BEFORE UPDATE ON public.auction_bids
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to update highest bid when new bid is placed
CREATE OR REPLACE FUNCTION public.update_highest_bid()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.donation_auctions
  SET current_highest_bid = NEW.bid_amount,
      updated_at = now()
  WHERE id = NEW.auction_id
    AND NEW.bid_amount > current_highest_bid;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update highest bid
CREATE TRIGGER update_highest_bid_trigger
  AFTER INSERT ON public.auction_bids
  FOR EACH ROW
  EXECUTE FUNCTION public.update_highest_bid();