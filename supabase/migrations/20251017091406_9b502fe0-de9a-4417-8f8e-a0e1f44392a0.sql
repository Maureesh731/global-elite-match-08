-- Create visitors table to track unique visitors by IP
CREATE TABLE IF NOT EXISTS public.visitors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL UNIQUE,
  first_visit timestamp with time zone NOT NULL DEFAULT now(),
  last_visit timestamp with time zone NOT NULL DEFAULT now(),
  visit_count integer NOT NULL DEFAULT 1
);

-- Enable RLS
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view visitor count
CREATE POLICY "Anyone can view visitor count"
  ON public.visitors
  FOR SELECT
  USING (true);

-- Allow anonymous inserts for tracking
CREATE POLICY "Allow visitor tracking"
  ON public.visitors
  FOR INSERT
  WITH CHECK (true);

-- Allow updates to existing visitor records
CREATE POLICY "Allow visitor updates"
  ON public.visitors
  FOR UPDATE
  USING (true);

-- Create index on ip_address for faster lookups
CREATE INDEX IF NOT EXISTS idx_visitors_ip ON public.visitors(ip_address);