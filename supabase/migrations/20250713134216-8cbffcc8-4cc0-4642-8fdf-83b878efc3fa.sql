-- Create favorites table to track user favorites
CREATE TABLE public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  favorited_profile_id TEXT NOT NULL,
  favorited_profile_name TEXT NOT NULL,
  favorited_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, favorited_profile_id)
);

-- Enable Row-Level Security
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Create policies for favorites
CREATE POLICY "Users can view their own favorites" 
ON public.favorites 
FOR SELECT 
USING (user_id::text = auth.uid()::text);

CREATE POLICY "Users can add their own favorites" 
ON public.favorites 
FOR INSERT 
WITH CHECK (user_id::text = auth.uid()::text);

CREATE POLICY "Users can remove their own favorites" 
ON public.favorites 
FOR DELETE 
USING (user_id::text = auth.uid()::text);

-- Create index for better performance
CREATE INDEX idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX idx_favorites_profile_id ON public.favorites(favorited_profile_id);