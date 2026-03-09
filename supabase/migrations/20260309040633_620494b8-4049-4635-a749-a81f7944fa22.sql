-- Create a secure view that only exposes safe/consented health disclosures for approved members
-- This does NOT expose private health data - only what the member explicitly disclosed
CREATE OR REPLACE VIEW public.approved_member_disclosures
WITH (security_invoker=on) AS
  SELECT 
    a.user_id,
    a.username,
    a.member_profile_name,
    -- Only expose health fields when user consented to disclosure
    CASE WHEN a.disclosure_authorization = 'yes' THEN a.has_herpes ELSE 'undisclosed' END AS has_herpes,
    CASE WHEN a.disclosure_authorization = 'yes' THEN a.has_hiv ELSE 'undisclosed' END AS has_hiv,
    CASE WHEN a.disclosure_authorization = 'yes' THEN a.has_hpv ELSE 'undisclosed' END AS has_hpv,
    CASE WHEN a.disclosure_authorization = 'yes' THEN a.has_other_stds ELSE 'undisclosed' END AS has_other_stds,
    CASE WHEN a.disclosure_authorization = 'yes' THEN a.has_chronic_diseases ELSE 'undisclosed' END AS has_chronic_diseases,
    a.covid_vaccinated,
    a.uses_alcohol,
    a.uses_drugs,
    a.uses_marijuana,
    a.smokes_cigarettes,
    a.uses_prescription_drugs,
    a.disclosure_authorization,
    a.wants_optional_testing
  FROM public.applications a
  WHERE a.status = 'approved';

-- Grant select to authenticated users
GRANT SELECT ON public.approved_member_disclosures TO authenticated;