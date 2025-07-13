-- Create applications table to store submitted applications
CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  member_profile_name TEXT NOT NULL,
  age TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  linkedin TEXT,
  bio TEXT,
  -- Health disclosure fields
  has_herpes TEXT NOT NULL,
  has_hiv TEXT NOT NULL,
  has_hpv TEXT NOT NULL,
  has_other_stds TEXT NOT NULL,
  has_chronic_diseases TEXT NOT NULL,
  covid_vaccinated TEXT NOT NULL,
  uses_alcohol TEXT NOT NULL,
  uses_drugs TEXT NOT NULL,
  uses_marijuana TEXT NOT NULL,
  smokes_cigarettes TEXT NOT NULL,
  uses_prescription_drugs TEXT NOT NULL,
  disclosure_authorization TEXT NOT NULL,
  wants_optional_testing TEXT NOT NULL,
  -- Application status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied')),
  review_notes TEXT,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Create policy for public insert (applications can be submitted by anyone)
CREATE POLICY "Anyone can submit applications" 
ON public.applications 
FOR INSERT 
WITH CHECK (true);

-- Create policy for admin access (you'll need to implement admin authentication)
CREATE POLICY "Admins can view all applications" 
ON public.applications 
FOR ALL 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_applications_updated_at
BEFORE UPDATE ON public.applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();