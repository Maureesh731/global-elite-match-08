-- Fix the application submission flow by updating the trigger and RLS policy

-- Drop the trigger CASCADE to remove dependencies
DROP TRIGGER IF EXISTS enforce_application_user_id ON applications CASCADE;
DROP FUNCTION IF EXISTS set_application_user_id() CASCADE;

-- Update RLS policy to allow new signups to insert their application
DROP POLICY IF EXISTS "Users can insert their own application" ON applications;

CREATE POLICY "Users can insert their own application"
ON applications
FOR INSERT
WITH CHECK (
  -- Allow if currently authenticated and matches
  (auth.uid() = user_id)
  OR
  -- Allow if user_id corresponds to a valid auth user (for fresh signups)
  (user_id IN (SELECT id FROM auth.users))
);