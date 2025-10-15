-- Fix applications table RLS policy vulnerability
-- Make user_id NOT NULL to prevent bypass
ALTER TABLE public.applications 
  ALTER COLUMN user_id SET NOT NULL;

-- Create a trigger to automatically set user_id to prevent manipulation
CREATE OR REPLACE FUNCTION public.set_application_user_id()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Always override user_id with the authenticated user
  NEW.user_id := auth.uid();
  RETURN NEW;
END;
$$;

CREATE TRIGGER enforce_application_user_id
  BEFORE INSERT ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.set_application_user_id();

-- Add INSERT policy for message_restrictions to prevent race conditions
CREATE POLICY "Users can insert their own restrictions"
  ON public.message_restrictions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);