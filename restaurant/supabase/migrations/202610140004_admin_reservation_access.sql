-- Admin profiles must be able to see and update every restaurant-site reservation.
grant select, update on public.reservations to authenticated;

drop policy if exists "admins can read reservations" on public.reservations;
create policy "admins can read reservations" on public.reservations
  for select to authenticated
  using (public.can_manage_menu_images());

drop policy if exists "admins can update reservations" on public.reservations;
create policy "admins can update reservations" on public.reservations
  for update to authenticated
  using (public.can_manage_menu_images())
  with check (public.can_manage_menu_images());
