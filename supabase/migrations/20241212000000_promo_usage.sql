-- Create table to track promo code usage
CREATE TABLE public.promo_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promo_code TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  used_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.promo_usage ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own promo usage
CREATE POLICY "select_own_promo_usage" ON public.promo_usage
FOR SELECT
USING (user_id = auth.uid());

-- Create policy for edge functions to insert promo usage
CREATE POLICY "insert_promo_usage" ON public.promo_usage
FOR INSERT
WITH CHECK (true);

-- Create index for better performance
CREATE INDEX idx_promo_usage_code ON public.promo_usage(promo_code);
CREATE INDEX idx_promo_usage_user ON public.promo_usage(user_id);