-- Create promo_usage table for tracking promo code usage
CREATE TABLE IF NOT EXISTS public.promo_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promo_code TEXT NOT NULL,
  user_id UUID,
  user_email TEXT,
  used_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.promo_usage ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to check usage count (read-only for validation)
CREATE POLICY "Anyone can view promo usage count"
ON public.promo_usage
FOR SELECT
USING (true);

-- Create policy to allow service role to insert (via edge function)
CREATE POLICY "Service role can insert promo usage"
ON public.promo_usage
FOR INSERT
WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX idx_promo_usage_code ON public.promo_usage(promo_code);
CREATE INDEX idx_promo_usage_user_id ON public.promo_usage(user_id);