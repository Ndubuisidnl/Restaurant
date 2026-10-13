-- Publicly readable menu photos; only admins may upload files.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'menu-images',
  'menu-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "public can read menu images" on storage.objects;
create policy "public can read menu images" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'menu-images');

drop policy if exists "staff can upload menu images" on storage.objects;
create policy "staff can upload menu images" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'menu-images' and public.is_staff());



