-- Check the shared profile role without depending on the older staff_members helper.
create or replace function public.can_manage_menu_images()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = (select auth.uid())
      and p.role = 'admin'
  );
$$;

revoke all on function public.can_manage_menu_images() from public;
grant execute on function public.can_manage_menu_images() to authenticated;

drop policy if exists "staff can upload menu images" on storage.objects;
drop policy if exists "admins can upload menu images" on storage.objects;
create policy "admins can upload menu images" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'menu-images' and public.can_manage_menu_images());
