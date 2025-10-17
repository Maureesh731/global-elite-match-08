-- Fix promo_usage RLS policy to prevent unauthorized inserts
-- Only the service role (via edge functions) should be able to insert promo usage records

-- Drop the overly permissive INSERT policy
DROP POLICY IF EXISTS "Service role can insert promo usage" ON public.promo_usage;

-- Create a more restrictive policy that only allows service role
-- Note: Service role bypasses RLS, so this effectively blocks all client-side inserts
CREATE POLICY "Block client-side promo usage inserts"
ON public.promo_usage
FOR INSERT
TO authenticated
WITH CHECK (false);

-- Ensure the profiles table doesn't store sensitive health data
-- Add a comment to document this critical security requirement
COMMENT ON COLUMN public.profiles.health_status IS 'SECURITY: Must NEVER contain detailed health information (STDs, HIV, herpes, drug use). Only general status allowed. Detailed health data stays in applications table with strict RLS.';

-- Add RLS policy to ensure users cannot read other users' application health data
-- This reinforces the existing policies
CREATE POLICY "Users cannot read others health data"
ON public.applications
FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id 
  OR has_role(auth.uid(), 'admin'::app_role)
);