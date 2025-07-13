-- Remove the foreign key constraint that's causing the error
-- This allows us to track promo usage without requiring authentication
ALTER TABLE public.promo_usage DROP CONSTRAINT IF EXISTS promo_usage_user_id_fkey;