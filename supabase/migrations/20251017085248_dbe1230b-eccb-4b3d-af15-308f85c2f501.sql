-- Fix membership privilege escalation vulnerability
-- Drop the existing overly permissive user update policy
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create restricted update policy that excludes privileged fields
-- Users can only update safe fields like bio and photo_urls
-- They cannot modify membership_type or status which control access and privileges
CREATE POLICY "Users can update safe profile fields"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id AND
  -- Prevent modification of privileged fields by ensuring they don't change
  membership_type = (SELECT membership_type FROM profiles WHERE user_id = auth.uid()) AND
  status = (SELECT status FROM profiles WHERE user_id = auth.uid())
);