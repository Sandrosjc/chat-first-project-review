-- Public ebook cover images; only authenticated administrators may upload or change files.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('ebook-covers', 'ebook-covers', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can view ebook covers" on storage.objects;
create policy "Public can view ebook covers"
on storage.objects for select
to public
using (bucket_id = 'ebook-covers');

drop policy if exists "Admins upload ebook covers" on storage.objects;
create policy "Admins upload ebook covers"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'ebook-covers'
  and public.has_role(auth.uid(), 'admin'::public.app_role)
);

drop policy if exists "Admins update ebook covers" on storage.objects;
create policy "Admins update ebook covers"
on storage.objects for update
to authenticated
using (
  bucket_id = 'ebook-covers'
  and public.has_role(auth.uid(), 'admin'::public.app_role)
)
with check (
  bucket_id = 'ebook-covers'
  and public.has_role(auth.uid(), 'admin'::public.app_role)
);

drop policy if exists "Admins delete ebook covers" on storage.objects;
create policy "Admins delete ebook covers"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'ebook-covers'
  and public.has_role(auth.uid(), 'admin'::public.app_role)
);
