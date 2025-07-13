-- Add separate first_name and last_name columns to applications table
ALTER TABLE public.applications 
ADD COLUMN first_name TEXT,
ADD COLUMN last_name TEXT;

-- Update existing records to split full_name if any exist
UPDATE public.applications 
SET 
  first_name = SPLIT_PART(full_name, ' ', 1),
  last_name = CASE 
    WHEN POSITION(' ' IN full_name) > 0 
    THEN SUBSTRING(full_name FROM POSITION(' ' IN full_name) + 1)
    ELSE ''
  END
WHERE full_name IS NOT NULL;

-- Make the new columns required after populating existing data
ALTER TABLE public.applications 
ALTER COLUMN first_name SET NOT NULL,
ALTER COLUMN last_name SET NOT NULL;

-- Drop the old full_name column
ALTER TABLE public.applications 
DROP COLUMN full_name;