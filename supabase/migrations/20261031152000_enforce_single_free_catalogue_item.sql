-- The catalogue has exactly one free item (the free guide); all other items are paid.
create unique index if not exists ebooks_single_free_item
  on public.ebooks (is_free)
  where is_free = true;
