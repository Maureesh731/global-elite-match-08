-- Reset test gentleman password to TestPass123!
-- This uses pgcrypto to set password for the test account
UPDATE auth.users 
SET encrypted_password = crypt('TestPass123!', gen_salt('bf'))
WHERE id = 'cb1d95d8-ee9a-43a2-ad6f-444ab76ddfaa';