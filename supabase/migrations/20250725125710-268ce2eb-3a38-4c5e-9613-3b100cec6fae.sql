-- Fix function search path security warnings by setting search_path to 'public'

-- Update has_role function
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Update get_current_user_role function  
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT role 
  FROM public.user_roles 
  WHERE user_id = auth.uid() 
  LIMIT 1
$$;

-- Update validate_user_password function
CREATE OR REPLACE FUNCTION public.validate_user_password(
  input_username TEXT,
  input_password TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
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

-- Create edge function to hash passwords properly for new applications
CREATE OR REPLACE FUNCTION public.hash_password(password_text TEXT)
RETURNS TEXT
LANGUAGE SQL
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT crypt(password_text, gen_salt('bf'));
$$;