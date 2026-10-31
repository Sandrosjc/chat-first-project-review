-- The companion app is a 30-day benefit, not a free catalogue product.
drop index if exists public.ebooks_single_free_item;
update public.ebooks set is_free = false where is_free = true;
