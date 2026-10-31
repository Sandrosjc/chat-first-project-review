-- Extend the catalogue so the administrator can manage paid and free digital products.
alter table public.ebooks
  add column if not exists description text not null default '',
  add column if not exists is_free boolean not null default false,
  add column if not exists download_url text;

-- Free items may use a direct guide/download URL instead of a paid checkout URL.
alter table public.ebooks
  alter column payhip_url drop not null;

-- Existing paid products keep their Payhip checkout links. New records must provide
-- either a Payhip URL or a direct download URL; validation is enforced in the admin UI.
