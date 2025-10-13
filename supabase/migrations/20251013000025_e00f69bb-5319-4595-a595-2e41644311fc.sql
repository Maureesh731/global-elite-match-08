-- Create applications table
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  member_profile_name TEXT NOT NULL,
  age TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  linkedin TEXT,
  bio TEXT,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  has_herpes TEXT NOT NULL,
  has_hiv TEXT NOT NULL,
  has_hpv TEXT NOT NULL,
  has_other_stds TEXT NOT NULL,
  has_chronic_diseases TEXT NOT NULL,
  covid_vaccinated TEXT NOT NULL,
  uses_alcohol TEXT NOT NULL,
  uses_drugs TEXT NOT NULL,
  uses_marijuana TEXT NOT NULL,
  smokes_cigarettes TEXT NOT NULL,
  uses_prescription_drugs TEXT NOT NULL,
  disclosure_authorization TEXT NOT NULL,
  wants_optional_testing TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  review_notes TEXT,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create referrals table
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL,
  referrer_email TEXT NOT NULL,
  referred_email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  favorited_profile_id TEXT NOT NULL,
  favorited_profile_name TEXT NOT NULL,
  favorited_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, favorited_profile_id)
);

-- Create messages table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL,
  recipient_id UUID NOT NULL,
  sender_name TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  content TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create donation_auctions table
CREATE TABLE IF NOT EXISTS public.donation_auctions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  donor_name TEXT NOT NULL,
  donation_type TEXT NOT NULL CHECK (donation_type IN ('blood', 'sperm', 'eggs')),
  bio TEXT NOT NULL,
  photo_url TEXT,
  starting_bid_amount NUMERIC NOT NULL,
  current_highest_bid NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- Create auction_bids table
CREATE TABLE IF NOT EXISTS public.auction_bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auction_id UUID NOT NULL REFERENCES public.donation_auctions(id) ON DELETE CASCADE,
  bidder_id UUID NOT NULL,
  bidder_name TEXT NOT NULL,
  bid_amount NUMERIC NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create auction_payments table
CREATE TABLE IF NOT EXISTS public.auction_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auction_id UUID NOT NULL REFERENCES public.donation_auctions(id) ON DELETE CASCADE,
  winning_bid_amount NUMERIC NOT NULL,
  platform_fee_amount NUMERIC NOT NULL,
  donor_payout_amount NUMERIC NOT NULL,
  donor_id UUID NOT NULL,
  winner_id UUID NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'processed', 'failed')),
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_auctions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auction_bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auction_payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for applications (admin access via functions)
CREATE POLICY "Service role can manage applications"
ON public.applications
FOR ALL
USING (true)
WITH CHECK (true);

-- RLS Policies for referrals
CREATE POLICY "Users can view their own referrals"
ON public.referrals
FOR SELECT
USING (auth.uid()::text = referrer_id::text);

CREATE POLICY "Users can create referrals"
ON public.referrals
FOR INSERT
WITH CHECK (auth.uid()::text = referrer_id::text);

-- RLS Policies for favorites
CREATE POLICY "Users can view their own favorites"
ON public.favorites
FOR SELECT
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can manage their own favorites"
ON public.favorites
FOR ALL
USING (auth.uid()::text = user_id::text)
WITH CHECK (auth.uid()::text = user_id::text);

-- RLS Policies for messages
CREATE POLICY "Users can view their messages"
ON public.messages
FOR SELECT
USING (auth.uid()::text = sender_id::text OR auth.uid()::text = recipient_id::text);

CREATE POLICY "Users can send messages"
ON public.messages
FOR INSERT
WITH CHECK (auth.uid()::text = sender_id::text);

CREATE POLICY "Users can update their received messages"
ON public.messages
FOR UPDATE
USING (auth.uid()::text = recipient_id::text);

-- RLS Policies for donation_auctions
CREATE POLICY "Anyone can view active auctions"
ON public.donation_auctions
FOR SELECT
USING (status = 'active' OR auth.uid()::text = user_id::text);

CREATE POLICY "Users can create their own auctions"
ON public.donation_auctions
FOR INSERT
WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own auctions"
ON public.donation_auctions
FOR UPDATE
USING (auth.uid()::text = user_id::text);

-- RLS Policies for auction_bids
CREATE POLICY "Anyone can view bids on active auctions"
ON public.auction_bids
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can create bids"
ON public.auction_bids
FOR INSERT
WITH CHECK (auth.uid()::text = bidder_id::text);

-- RLS Policies for auction_payments
CREATE POLICY "Users can view their own payments"
ON public.auction_payments
FOR SELECT
USING (auth.uid()::text = donor_id::text OR auth.uid()::text = winner_id::text);

-- Create indexes for better performance
CREATE INDEX idx_applications_status ON public.applications(status);
CREATE INDEX idx_applications_email ON public.applications(email);
CREATE INDEX idx_applications_username ON public.applications(username);
CREATE INDEX idx_referrals_referrer ON public.referrals(referrer_id);
CREATE INDEX idx_favorites_user ON public.favorites(user_id);
CREATE INDEX idx_messages_sender ON public.messages(sender_id);
CREATE INDEX idx_messages_recipient ON public.messages(recipient_id);
CREATE INDEX idx_auctions_user ON public.donation_auctions(user_id);
CREATE INDEX idx_auctions_status ON public.donation_auctions(status);
CREATE INDEX idx_bids_auction ON public.auction_bids(auction_id);
CREATE INDEX idx_bids_bidder ON public.auction_bids(bidder_id);
CREATE INDEX idx_payments_auction ON public.auction_payments(auction_id);