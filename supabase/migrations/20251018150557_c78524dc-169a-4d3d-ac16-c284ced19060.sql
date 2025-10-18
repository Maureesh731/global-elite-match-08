-- Fix overly permissive RLS policies on visitors table
-- Remove permissive INSERT and UPDATE policies that allow anyone to manipulate visitor data

DROP POLICY IF EXISTS "Allow visitor tracking" ON visitors;
DROP POLICY IF EXISTS "Allow visitor updates" ON visitors;

-- Create service role only policy for INSERT and UPDATE
-- This ensures only the edge function (using service role key) can track visitors
CREATE POLICY "Service role can manage visitors" 
ON visitors 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- Keep the SELECT policy for public viewing of count
-- This is safe as it only allows counting, not manipulation