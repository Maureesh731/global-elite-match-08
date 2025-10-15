-- Add RLS policies to allow approved users to browse all profiles
CREATE POLICY "Approved users can view all approved profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  status = 'approved' AND
  EXISTS (
    SELECT 1 FROM public.applications
    WHERE applications.user_id = auth.uid()
    AND applications.status = 'approved'
  )
);

-- Function to create profile when application is approved
CREATE OR REPLACE FUNCTION public.handle_application_approval()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only proceed if status changed to 'approved'
  IF NEW.status = 'approved' AND (OLD.status IS NULL OR OLD.status != 'approved') THEN
    -- Create auth user if it doesn't exist
    IF NEW.user_id IS NULL THEN
      -- Create Supabase auth user
      DECLARE
        new_user_id uuid;
      BEGIN
        -- Note: In production, you'd use Supabase admin API to create users
        -- For now, we'll assume user_id is set when application is created
        RAISE EXCEPTION 'user_id must be set before approval';
      END;
    END IF;

    -- Insert or update profile
    INSERT INTO public.profiles (
      user_id,
      full_name,
      age,
      gender,
      bio,
      membership_type,
      status
    ) VALUES (
      NEW.user_id,
      NEW.first_name || ' ' || NEW.last_name,
      NEW.age,
      CASE 
        WHEN LOWER(NEW.member_profile_name) LIKE '%lady%' 
          OR LOWER(NEW.member_profile_name) LIKE '%miss%' 
          OR LOWER(NEW.member_profile_name) LIKE '%ms%' 
        THEN 'female'
        ELSE 'male'
      END,
      NEW.bio,
      NEW.membership_type,
      'approved'
    )
    ON CONFLICT (user_id) 
    DO UPDATE SET
      full_name = EXCLUDED.full_name,
      age = EXCLUDED.age,
      bio = EXCLUDED.bio,
      membership_type = EXCLUDED.membership_type,
      status = 'approved',
      updated_at = now();

    -- Ensure message restrictions exist for free users
    IF NEW.membership_type = 'free' THEN
      INSERT INTO public.message_restrictions (
        user_id,
        can_send_messages
      ) VALUES (
        NEW.user_id,
        false
      )
      ON CONFLICT (user_id) 
      DO UPDATE SET
        can_send_messages = false;
    ELSE
      -- Paid users can send messages
      INSERT INTO public.message_restrictions (
        user_id,
        can_send_messages
      ) VALUES (
        NEW.user_id,
        true
      )
      ON CONFLICT (user_id) 
      DO UPDATE SET
        can_send_messages = true;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- Create trigger for application approval
DROP TRIGGER IF EXISTS on_application_approved ON public.applications;
CREATE TRIGGER on_application_approved
  AFTER INSERT OR UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_application_approval();

-- Update message restrictions to have unique constraint on user_id
DROP INDEX IF EXISTS idx_message_restrictions_user_id;
CREATE UNIQUE INDEX idx_message_restrictions_user_id ON public.message_restrictions(user_id);