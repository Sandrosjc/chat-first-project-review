CREATE TABLE IF NOT EXISTS public.page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL,
  country_code TEXT,
  language TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON public.page_views (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_country_created ON public.page_views (country_code, created_at DESC);
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.page_views TO service_role;

CREATE OR REPLACE FUNCTION public.record_page_view(
  p_path TEXT,
  p_country_code TEXT,
  p_language TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.page_views (path, country_code, language)
  VALUES (
    left(p_path, 300),
    CASE WHEN p_country_code ~ '^[A-Z]{2}$' THEN p_country_code ELSE NULL END,
    left(p_language, 10)
  );
END;
$$;

REVOKE ALL ON FUNCTION public.record_page_view(TEXT, TEXT, TEXT) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.record_page_view(TEXT, TEXT, TEXT) TO service_role;
