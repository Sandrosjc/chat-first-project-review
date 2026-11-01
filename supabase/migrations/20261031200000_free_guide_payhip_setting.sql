create table if not exists public.site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;
drop policy if exists "Public can read free guide URL" on public.site_settings;
create policy "Public can read free guide URL" on public.site_settings
  for select to anon, authenticated using (key = 'free_guide_payhip_url');
