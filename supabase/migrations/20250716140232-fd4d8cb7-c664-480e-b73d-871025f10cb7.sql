-- Create auction payments table to track fees and payouts
CREATE TABLE public.auction_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auction_id UUID NOT NULL REFERENCES public.donation_auctions(id) ON DELETE CASCADE,
  winning_bid_amount INTEGER NOT NULL, -- in cents
  platform_fee_amount INTEGER NOT NULL, -- in cents (10% of winning bid)
  donor_payout_amount INTEGER NOT NULL, -- in cents (90% of winning bid)
  donor_id UUID NOT NULL REFERENCES auth.users(id),
  winner_id UUID NOT NULL REFERENCES auth.users(id),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'processed', 'failed')),
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.auction_payments ENABLE ROW LEVEL SECURITY;

-- RLS policies for auction_payments
CREATE POLICY "Users can view payments they're involved in" ON public.auction_payments
  FOR SELECT USING (
    donor_id = auth.uid() OR 
    winner_id = auth.uid()
  );

CREATE POLICY "Platform can create payments" ON public.auction_payments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Platform can update payments" ON public.auction_payments
  FOR UPDATE USING (true);

-- Add trigger for updated_at
CREATE TRIGGER update_auction_payments_updated_at
  BEFORE UPDATE ON public.auction_payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to complete auction and calculate fees
CREATE OR REPLACE FUNCTION public.complete_auction_with_fees(
  auction_id_param UUID,
  winning_bid_id_param UUID
)
RETURNS JSON AS $$
DECLARE
  auction_record public.donation_auctions%ROWTYPE;
  winning_bid_record public.auction_bids%ROWTYPE;
  platform_fee INTEGER;
  donor_payout INTEGER;
  payment_record public.auction_payments%ROWTYPE;
BEGIN
  -- Get auction details
  SELECT * INTO auction_record 
  FROM public.donation_auctions 
  WHERE id = auction_id_param AND status = 'active';
  
  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'error', 'Auction not found or not active');
  END IF;
  
  -- Get winning bid details
  SELECT * INTO winning_bid_record 
  FROM public.auction_bids 
  WHERE id = winning_bid_id_param AND auction_id = auction_id_param;
  
  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'error', 'Winning bid not found');
  END IF;
  
  -- Calculate fees (10% platform fee)
  platform_fee := ROUND(winning_bid_record.bid_amount * 0.10);
  donor_payout := winning_bid_record.bid_amount - platform_fee;
  
  -- Create payment record
  INSERT INTO public.auction_payments (
    auction_id,
    winning_bid_amount,
    platform_fee_amount,
    donor_payout_amount,
    donor_id,
    winner_id
  ) VALUES (
    auction_id_param,
    winning_bid_record.bid_amount,
    platform_fee,
    donor_payout,
    auction_record.user_id,
    winning_bid_record.bidder_id
  ) RETURNING * INTO payment_record;
  
  -- Update auction status
  UPDATE public.donation_auctions 
  SET status = 'completed',
      completed_at = now(),
      updated_at = now()
  WHERE id = auction_id_param;
  
  RETURN json_build_object(
    'success', true,
    'payment_id', payment_record.id,
    'winning_bid_amount', winning_bid_record.bid_amount,
    'platform_fee', platform_fee,
    'donor_payout', donor_payout
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;