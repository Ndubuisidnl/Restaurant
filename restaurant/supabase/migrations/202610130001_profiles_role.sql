-- Use profiles.role as the shared staff authorization source.
-- Existing staff_members rows are migrated as staff; assign admin explicitly.

alter table public.profiles
  add column if not exists role text not null default 'customer';

alter table public.profiles
  drop constraint if exists profiles_role_check;
alter table public.profiles
  add constraint profiles_role_check
  check (role in ('customer', 'staff', 'admin'));

update public.profiles p
set role = 'staff'
from public.staff_members s
where s.user_id = p.id
  and p.role = 'customer';

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role in ('staff', 'admin')
  );
$$;

-- Users may edit their own customer profile but must not change their role.
revoke update on public.profiles from authenticated;
grant update (full_name, phone, preferences, updated_at) on public.profiles to authenticated;

comment on column public.profiles.role is
  'Authorization role: customer, staff, or admin. Change through trusted SQL or a server-side admin operation.';
