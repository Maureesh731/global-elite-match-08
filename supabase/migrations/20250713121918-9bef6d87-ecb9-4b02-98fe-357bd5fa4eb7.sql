-- Create promo_usage table for tracking promo code usage
CREATE TABLE public.promo_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  promo_code TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.promo_usage ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to insert their own usage
CREATE POLICY "Users can insert their own promo usage" 
ON public.promo_usage 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create policy for reading (for admin purposes)
CREATE POLICY "Anyone can read promo usage counts" 
ON public.promo_usage 
FOR SELECT 
USING (true);

-- Create index for efficient queries
CREATE INDEX idx_promo_usage_code ON public.promo_usage(promo_code);
CREATE INDEX idx_promo_usage_user_code ON public.promo_usage(user_id, promo_code);