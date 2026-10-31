alter table public.ebooks
  add column if not exists product_url text;

comment on column public.ebooks.product_url is
  'Primary external destination for purchase or access; supports any provider URL.';
