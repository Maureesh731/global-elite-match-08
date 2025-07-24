-- Create profiles table for member profiles
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID REFERENCES public.applications(id),
  full_name TEXT NOT NULL,
  age INTEGER NOT NULL,
  bio TEXT,
  story TEXT,
  linkedin TEXT,
  health_status TEXT,
  covid_vaccinated BOOLEAN DEFAULT false,
  photos JSONB,
  photo_privacy JSONB,
  gender TEXT NOT NULL CHECK (gender IN ('Gentleman', 'Lady')),
  status TEXT NOT NULL DEFAULT 'pending_approval' CHECK (status IN ('pending_approval', 'approved', 'denied')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view approved profiles" 
ON public.profiles 
FOR SELECT 
USING (status = 'approved');

CREATE POLICY "Users can create their own profiles" 
ON public.profiles 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can update profiles" 
ON public.profiles 
FOR UPDATE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();