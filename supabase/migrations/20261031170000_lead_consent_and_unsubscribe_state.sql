ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS opted_in_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS consent_version TEXT,
  ADD COLUMN IF NOT EXISTS unsubscribed_at TIMESTAMPTZ;

CREATE OR REPLACE FUNCTION public.register_guide_lead(
  p_email TEXT,
  p_language TEXT,
  p_opted_in BOOLEAN
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.leads (
    email, language, source, opted_in, opted_in_at, consent_version, status
  )
  VALUES (
    lower(trim(p_email)),
    p_language,
    'free_guide',
    coalesce(p_opted_in, false),
    CASE WHEN coalesce(p_opted_in, false) THEN now() ELSE NULL END,
    CASE WHEN coalesce(p_opted_in, false) THEN 'marketing-consent-v1' ELSE NULL END,
    'active'
  )
  ON CONFLICT (email) DO UPDATE SET
    language = EXCLUDED.language,
    source = 'free_guide',
    opted_in = CASE
      WHEN EXCLUDED.opted_in THEN true
      ELSE public.leads.opted_in
    END,
    opted_in_at = CASE
      WHEN EXCLUDED.opted_in THEN now()
      ELSE public.leads.opted_in_at
    END,
    consent_version = CASE
      WHEN EXCLUDED.opted_in THEN 'marketing-consent-v1'
      ELSE public.leads.consent_version
    END,
    status = CASE
      WHEN public.leads.status = 'unsubscribed' THEN 'unsubscribed'
      ELSE 'active'
    END;
END;
$$;

REVOKE ALL ON FUNCTION public.register_guide_lead(TEXT, TEXT, BOOLEAN) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.register_guide_lead(TEXT, TEXT, BOOLEAN) TO service_role;
