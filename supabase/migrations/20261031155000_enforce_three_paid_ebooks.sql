-- Enforce the three paid-ebook catalogue limit inside PostgreSQL as well as in the admin UI.
-- This closes the race where two simultaneous admin requests could both pass a count check.
create or replace function public.enforce_three_paid_ebooks()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  paid_count integer;
begin
  if new.is_free = false then
    select count(*)
      into paid_count
      from public.ebooks
      where is_free = false
        and (tg_op = 'INSERT' or id <> new.id);

    if paid_count >= 3 then
      raise exception 'O catálogo permite somente três e-books pagos.';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists ebooks_max_three_paid on public.ebooks;
create trigger ebooks_max_three_paid
before insert or update of is_free on public.ebooks
for each row
execute function public.enforce_three_paid_ebooks();
