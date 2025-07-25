-- Create user roles enum and table for proper admin authentication
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT role 
  FROM public.user_roles 
  WHERE user_id = auth.uid() 
  LIMIT 1
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" 
ON public.user_roles 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Update applications table to use proper password hashing
-- First, let's add a new column for hashed passwords
ALTER TABLE public.applications ADD COLUMN password_hash_new TEXT;

-- Create a function to hash passwords using pgcrypto extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Hash existing passwords (if any) - in production you'd want to invalidate these and force reset
UPDATE public.applications 
SET password_hash_new = crypt(COALESCE(password_hash, 'temp_password_' || id::text), gen_salt('bf'))
WHERE password_hash_new IS NULL;

-- Make the new column NOT NULL after updating
ALTER TABLE public.applications ALTER COLUMN password_hash_new SET NOT NULL;

-- Drop the old column and rename the new one
ALTER TABLE public.applications DROP COLUMN password_hash;
ALTER TABLE public.applications RENAME COLUMN password_hash_new TO password_hash;

-- Update RLS policies for better security

-- More restrictive policy for applications - only allow reading by admins
DROP POLICY IF EXISTS "Admins can view all applications" ON public.applications;
CREATE POLICY "Admins can view all applications" 
ON public.applications 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

-- Update policy for application updates - only admins
CREATE POLICY "Admins can update applications" 
ON public.applications 
FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

-- More restrictive profiles policies
DROP POLICY IF EXISTS "Admins can update profiles" ON public.profiles;
CREATE POLICY "Admins can update profiles" 
ON public.profiles 
FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (
  (status = 'approved'::text) OR 
  public.has_role(auth.uid(), 'admin')
);

-- Function to safely validate passwords
CREATE OR REPLACE FUNCTION public.validate_user_password(
  input_username TEXT,
  input_password TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_record applications%ROWTYPE;
  password_valid BOOLEAN;
BEGIN
  -- Get user record
  SELECT * INTO user_record
  FROM applications
  WHERE username = input_username AND status = 'approved';
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('valid', false, 'message', 'Invalid username or user not approved');
  END IF;
  
  -- Check password using crypt
  password_valid := (user_record.password_hash = crypt(input_password, user_record.password_hash));
  
  IF password_valid THEN
    RETURN jsonb_build_object(
      'valid', true, 
      'user_id', user_record.id,
      'username', user_record.username,
      'email', user_record.email,
      'full_name', user_record.first_name || ' ' || user_record.last_name
    );
  ELSE
    RETURN jsonb_build_object('valid', false, 'message', 'Invalid password');
  END IF;
END;
$$;