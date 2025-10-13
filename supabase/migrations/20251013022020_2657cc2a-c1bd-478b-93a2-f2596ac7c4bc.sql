-- Add membership type tracking to applications and profiles
ALTER TABLE public.applications 
ADD COLUMN membership_type TEXT DEFAULT 'free' NOT NULL CHECK (membership_type IN ('free', 'paid'));

ALTER TABLE public.profiles 
ADD COLUMN membership_type TEXT DEFAULT 'free' NOT NULL CHECK (membership_type IN ('free', 'paid'));

-- Add messaging restrictions table
CREATE TABLE public.message_restrictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  can_send_messages BOOLEAN DEFAULT false NOT NULL,
  messages_sent_count INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.message_restrictions ENABLE ROW LEVEL SECURITY;

-- RLS policies for message_restrictions
CREATE POLICY "Users can view their own restrictions"
  ON public.message_restrictions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own restrictions"
  ON public.message_restrictions FOR UPDATE
  USING (auth.uid() = user_id);

-- Function to check if user can send messages
CREATE OR REPLACE FUNCTION public.can_user_send_messages(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT can_send_messages 
     FROM public.message_restrictions 
     WHERE user_id = _user_id),
    false
  )
$$;

-- Update message policies to check payment status
DROP POLICY IF EXISTS "Users can send messages" ON public.messages;

CREATE POLICY "Paid users can send messages"
  ON public.messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id AND
    (
      -- Check if user is paid member
      EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE user_id = auth.uid() AND membership_type = 'paid'
      ) OR
      -- Or has messaging permissions
      public.can_user_send_messages(auth.uid())
    )
  );