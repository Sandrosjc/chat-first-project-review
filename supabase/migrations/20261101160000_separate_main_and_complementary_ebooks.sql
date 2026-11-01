-- Separate the featured/main ebook from the three complementary ebooks.
ALTER TABLE public.ebooks
  ADD COLUMN IF NOT EXISTS is_main BOOLEAN NOT NULL DEFAULT false;

-- Preserve the existing featured 30-Day Hair Reset as the main offer when present.
UPDATE public.ebooks
SET is_main = true
WHERE id = (
  SELECT id FROM public.ebooks
  WHERE is_free = false AND title ILIKE '%30-Day Hair Reset%'
  ORDER BY created_at ASC
  LIMIT 1
);

-- There can be only one main paid ebook.
CREATE UNIQUE INDEX IF NOT EXISTS ebooks_single_main_paid
  ON public.ebooks (is_main)
  WHERE is_free = false AND is_main = true;

-- The three-book limit applies only to complementary paid ebooks.
