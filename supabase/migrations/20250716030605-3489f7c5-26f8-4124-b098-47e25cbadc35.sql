-- Create subscribers table to track subscription information
CREATE TABLE IF NOT EXISTS public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT,
  subscribed BOOLEAN NOT NULL DEFAULT false,
  subscription_tier TEXT DEFAULT 'Premium',
  subscription_end TIMESTAMPTZ,
  is_first_month BOOLEAN DEFAULT true,
  referral_credits INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own subscription info
CREATE POLICY "select_own_subscription" ON public.subscribers
FOR SELECT
USING (user_id = auth.uid() OR email = auth.email());

-- Create policy for edge functions to update subscription info
CREATE POLICY "update_own_subscription" ON public.subscribers
FOR UPDATE
USING (true);

-- Create policy for edge functions to insert subscription info
CREATE POLICY "insert_subscription" ON public.subscribers
FOR INSERT
WITH CHECK (true);

-- Create referrals table to track referral system
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL,
  referrer_email TEXT NOT NULL,
  referred_email TEXT NOT NULL,
  referred_user_id UUID,
  status TEXT DEFAULT 'pending',
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS for referrals
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Create policies for referrals
CREATE POLICY "users_can_view_own_referrals" ON public.referrals
FOR SELECT
USING (referrer_id = auth.uid());

CREATE POLICY "insert_referrals" ON public.referrals
FOR INSERT
WITH CHECK (true);

CREATE POLICY "update_referrals" ON public.referrals
FOR UPDATE
USING (true);