-- Fix function search path security issues by setting search_path

-- Update the update_highest_bid function with proper search_path
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update the complete_auction_with_fees function with proper search_path
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update the update_updated_at_column function with proper search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;