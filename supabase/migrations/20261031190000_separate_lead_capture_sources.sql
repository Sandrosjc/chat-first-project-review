-- Keep one contact per email while preserving every independent signup origin.
CREATE TABLE IF NOT EXISTS public.lead_captures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  source text NOT NULL CHECK (source IN ('free_guide', 'app_access')),
  language text NOT NULL DEFAULT 'en',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (email, source)
);
ALTER TABLE public.lead_captures ENABLE ROW LEVEL SECURITY;

INSERT INTO public.lead_captures (email, source, language, created_at)
SELECT lower(trim(email)), CASE WHEN source = 'app_access' THEN 'app_access' ELSE 'free_guide' END,
       coalesce(language, 'en'), created_at
FROM public.leads
ON CONFLICT (email, source) DO NOTHING;

CREATE OR REPLACE FUNCTION public.register_site_lead(
  p_email text,
  p_language text,
  p_opted_in boolean,
  p_source text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE normalized_email text := lower(trim(p_email));
BEGIN
  IF p_source NOT IN ('free_guide', 'app_access') THEN
    RAISE EXCEPTION 'Invalid lead source';
  END IF;

  INSERT INTO public.leads (
    email, language, source, opted_in, opted_in_at, consent_version, status
  )
  VALUES (
    normalized_email, p_language, p_source, coalesce(p_opted_in, false),
    CASE WHEN coalesce(p_opted_in, false) THEN now() ELSE NULL END,
    CASE WHEN coalesce(p_opted_in, false) THEN 'marketing-consent-v1' ELSE NULL END,
    'active'
  )
  ON CONFLICT (email) DO UPDATE SET
    language = EXCLUDED.language,
    opted_in = CASE WHEN EXCLUDED.opted_in THEN true ELSE public.leads.opted_in END,
    opted_in_at = CASE WHEN EXCLUDED.opted_in THEN now() ELSE public.leads.opted_in_at END,
    consent_version = CASE WHEN EXCLUDED.opted_in THEN 'marketing-consent-v1' ELSE public.leads.consent_version END,
    status = CASE WHEN public.leads.status = 'unsubscribed' THEN 'unsubscribed' ELSE 'active' END;

  INSERT INTO public.lead_captures (email, source, language)
  VALUES (normalized_email, p_source, p_language)
  ON CONFLICT (email, source) DO UPDATE SET language = EXCLUDED.language;
END;
$$;

REVOKE ALL ON FUNCTION public.register_site_lead(text, text, boolean, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.register_site_lead(text, text, boolean, text) TO service_role;
