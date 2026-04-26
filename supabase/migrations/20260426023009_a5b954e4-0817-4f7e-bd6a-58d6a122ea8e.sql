
-- 1. promo_usage: remove public read, restrict to admins
DROP POLICY IF EXISTS "Anyone can view promo usage count" ON public.promo_usage;
CREATE POLICY "Admins can view promo usage"
ON public.promo_usage
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 2. storage: remove the overly-broad delete policy on profile-photos
DROP POLICY IF EXISTS "Users can delete their own photos" ON storage.objects;

-- 3. message_restrictions: remove user-facing UPDATE policy (admins still covered via service role)
DROP POLICY IF EXISTS "Users can update their own restrictions" ON public.message_restrictions;
DROP POLICY IF EXISTS "Users can insert their own restrictions" ON public.message_restrictions;
CREATE POLICY "Admins can manage message restrictions"
ON public.message_restrictions
FOR ALL
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- 4. applications: tighten INSERT WITH CHECK to only allow inserting for self
DROP POLICY IF EXISTS "Users can insert their own application" ON public.applications;
CREATE POLICY "Users can insert their own application"
ON public.applications
FOR INSERT
WITH CHECK (auth.uid() = user_id);
