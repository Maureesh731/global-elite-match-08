-- Add username and password fields to applications table
ALTER TABLE public.applications 
ADD COLUMN username TEXT,
ADD COLUMN password_hash TEXT;

-- Add unique constraint on username to prevent duplicates
ALTER TABLE public.applications 
ADD CONSTRAINT applications_username_unique UNIQUE (username);