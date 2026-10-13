-- Allow authenticated admins to create and edit menu items through the admin app.
grant insert, update on public.menu_items to authenticated;

alter table public.menu_items enable row level security;

drop policy if exists "admins can manage menu items" on public.menu_items;
create policy "admins can manage menu items" on public.menu_items
  for all to authenticated
  using (public.can_manage_menu_images())
  with check (public.can_manage_menu_images());
