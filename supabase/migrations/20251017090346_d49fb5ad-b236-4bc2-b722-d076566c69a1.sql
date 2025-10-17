-- Fix photo upload RLS policies to allow anonymous uploads during application

-- Drop existing restrictive policies on storage.objects
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload profile photos" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to update their own photos" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to delete their own photos" ON storage.objects;

-- Allow anyone to upload to profile-photos bucket (needed for application process)
CREATE POLICY "Allow uploads to profile-photos bucket"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'profile-photos');

-- Allow public read access to profile-photos bucket
CREATE POLICY "Allow public read access to profile-photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profile-photos');

-- Allow authenticated users to update their own photos
CREATE POLICY "Allow users to update their own profile photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profile-photos' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow authenticated users to delete their own photos
CREATE POLICY "Allow users to delete their own profile photos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile-photos' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);