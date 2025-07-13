-- Update the RLS policy for promo_usage table to allow inserts without authentication
-- This is needed for free registration flow where users don't have auth yet

-- Drop the existing restrictive insert policy
DROP POLICY IF EXISTS "Users can insert their own promo usage" ON public.promo_usage;

-- Create a new policy that allows anyone to insert promo usage records
-- This is safe because we're just tracking promo code usage for registration
CREATE POLICY "Allow promo code usage tracking" 
ON public.promo_usage 
FOR INSERT 
WITH CHECK (true);

-- Update the user_id column to be nullable since we might not have auth yet
-- This is already nullable in the schema, so we're good