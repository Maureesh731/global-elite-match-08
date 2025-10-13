-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table for role-based access control
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  age TEXT NOT NULL,
  gender TEXT NOT NULL,
  bio TEXT,
  health_status TEXT,
  photo_urls TEXT[],
  status TEXT DEFAULT 'pending' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles RLS policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all profiles"
  ON public.profiles FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Create photo_access_requests table
CREATE TABLE public.photo_access_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  requester_name TEXT NOT NULL,
  profile_owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  profile_owner_name TEXT NOT NULL,
  photo_index INTEGER NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  responded_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on photo_access_requests
ALTER TABLE public.photo_access_requests ENABLE ROW LEVEL SECURITY;

-- Photo access RLS policies
CREATE POLICY "Users can view requests they made"
  ON public.photo_access_requests FOR SELECT
  USING (auth.uid() = requester_id);

CREATE POLICY "Users can view requests for their photos"
  ON public.photo_access_requests FOR SELECT
  USING (auth.uid() = profile_owner_id);

CREATE POLICY "Users can create photo access requests"
  ON public.photo_access_requests FOR INSERT
  WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Profile owners can update requests"
  ON public.photo_access_requests FOR UPDATE
  USING (auth.uid() = profile_owner_id);

-- Add user_id to applications table for user-scoped access
ALTER TABLE public.applications ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Update applications RLS policies
DROP POLICY IF EXISTS "Service role can manage applications" ON public.applications;

CREATE POLICY "Users can view their own application"
  ON public.applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own application"
  ON public.applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own application"
  ON public.applications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all applications"
  ON public.applications FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all applications"
  ON public.applications FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Fix auction_bids RLS to only show bids to owner and bidder
DROP POLICY IF EXISTS "Anyone can view bids on active auctions" ON public.auction_bids;

CREATE POLICY "Owner and bidder can view bids"
  ON public.auction_bids FOR SELECT
  USING (
    auth.uid() = bidder_id OR
    auth.uid() IN (
      SELECT user_id FROM public.donation_auctions WHERE id = auction_id
    )
  );

-- Create complete_auction_with_fees function
CREATE OR REPLACE FUNCTION public.complete_auction_with_fees(
  _auction_id UUID,
  _winning_bid_id UUID
)
RETURNS TABLE (
  success BOOLEAN,
  error TEXT,
  payment_id UUID,
  winning_bid_amount NUMERIC,
  platform_fee NUMERIC,
  donor_payout NUMERIC
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _auction_record donation_auctions%ROWTYPE;
  _winning_bid auction_bids%ROWTYPE;
  _platform_fee_amount NUMERIC;
  _donor_payout_amount NUMERIC;
  _payment_id UUID;
BEGIN
  -- Get auction details
  SELECT * INTO _auction_record FROM donation_auctions WHERE id = _auction_id;
  
  IF NOT FOUND THEN
    RETURN QUERY SELECT FALSE, 'Auction not found', NULL::UUID, NULL::NUMERIC, NULL::NUMERIC, NULL::NUMERIC;
    RETURN;
  END IF;
  
  -- Get winning bid
  SELECT * INTO _winning_bid FROM auction_bids WHERE id = _winning_bid_id;
  
  IF NOT FOUND THEN
    RETURN QUERY SELECT FALSE, 'Winning bid not found', NULL::UUID, NULL::NUMERIC, NULL::NUMERIC, NULL::NUMERIC;
    RETURN;
  END IF;
  
  -- Calculate fees (10% platform fee)
  _platform_fee_amount := _winning_bid.bid_amount * 0.10;
  _donor_payout_amount := _winning_bid.bid_amount - _platform_fee_amount;
  
  -- Create payment record
  INSERT INTO auction_payments (
    auction_id,
    winning_bid_amount,
    platform_fee_amount,
    donor_payout_amount,
    donor_id,
    winner_id,
    payment_status
  ) VALUES (
    _auction_id,
    _winning_bid.bid_amount,
    _platform_fee_amount,
    _donor_payout_amount,
    _auction_record.user_id,
    _winning_bid.bidder_id,
    'completed'
  ) RETURNING id INTO _payment_id;
  
  -- Update auction status
  UPDATE donation_auctions 
  SET status = 'completed', completed_at = now()
  WHERE id = _auction_id;
  
  RETURN QUERY SELECT 
    TRUE, 
    NULL::TEXT, 
    _payment_id, 
    _winning_bid.bid_amount, 
    _platform_fee_amount, 
    _donor_payout_amount;
END;
$$;