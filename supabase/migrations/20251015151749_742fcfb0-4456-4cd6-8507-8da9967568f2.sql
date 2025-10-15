-- Create promo_codes table for managing promotional codes
CREATE TABLE IF NOT EXISTS public.promo_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  max_uses INTEGER NOT NULL DEFAULT 25,
  current_uses INTEGER NOT NULL DEFAULT 0,
  benefits_years INTEGER NOT NULL DEFAULT 1,
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on promo_codes
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read active promo codes (needed for validation)
CREATE POLICY "Anyone can view active promo codes"
ON public.promo_codes
FOR SELECT
USING (is_active = true AND (expires_at IS NULL OR expires_at > now()));

-- Only admins can manage promo codes (INSERT, UPDATE, DELETE)
CREATE POLICY "Admins can manage promo codes"
ON public.promo_codes
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Add index for faster code lookups
CREATE INDEX idx_promo_codes_code ON public.promo_codes(LOWER(code));

-- Insert the existing promo code
INSERT INTO public.promo_codes (code, max_uses, benefits_years, is_active)
VALUES ('IamUnvaccinated', 25, 1, true)
ON CONFLICT (code) DO NOTHING;

-- Update promo_usage table to reference promo_codes
ALTER TABLE public.promo_usage 
ADD COLUMN IF NOT EXISTS promo_code_id UUID REFERENCES public.promo_codes(id);

-- Create index on promo_code for better performance
CREATE INDEX IF NOT EXISTS idx_promo_usage_code ON public.promo_usage(promo_code);