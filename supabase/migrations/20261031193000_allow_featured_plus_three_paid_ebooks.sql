-- The homepage now has one featured paid ebook plus three complementary paid ebooks.
-- Allow four paid products in the catalogue while retaining the database-level concurrency guard.
create or replace function public.enforce_three_paid_ebooks()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  paid_count integer;
begin
  if new.is_free = false then
    perform pg_advisory_xact_lock(hashtext('public.ebooks_paid_limit'));
    select count(*)
      into paid_count
      from public.ebooks
      where is_free = false
        and (tg_op = 'INSERT' or id <> new.id);

    if paid_count >= 4 then
      raise exception 'O catálogo permite no máximo quatro e-books pagos: um principal e três complementares.';
    end if;
  end if;

  return new;
end;
$$;
