-- Remove password_hash column from applications table
ALTER TABLE public.applications DROP COLUMN IF EXISTS password_hash;