-- Wood House Cafe initial schema. Apply once in Supabase SQL Editor.
-- Menu prices and products are deliberately not seeded: enter confirmed data.

create extension if not exists pgcrypto;

create table if not exists public.staff_members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.staff_members where user_id = (select auth.uid())
  );
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  phone text not null default '',
  preferences jsonb not null default '{"order_updates":true,"reservation_reminders":true,"promotions":false}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'phone', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
  after insert on auth.users
  for each row execute function public.create_profile_for_new_user();

insert into public.profiles (id, full_name, phone)
select
  id,
  coalesce(raw_user_meta_data ->> 'full_name', ''),
  coalesce(raw_user_meta_data ->> 'phone', '')
from auth.users
on conflict (id) do nothing;

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  price integer not null check (price >= 0),
  category text not null check (category in (
    'breakfast','burgers','sandwiches','main-dishes','pasta','rice',
    'chicken','snacks','coffee','drinks','desserts'
  )),
  image text,
  image_label text not null default '',
  available boolean not null default true,
  featured boolean not null default false,
  tags text[] not null default '{}',
  preparation_time integer check (preparation_time is null or preparation_time > 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.restaurant_settings (
  id boolean primary key default true check (id = true),
  delivery_fee integer check (delivery_fee is null or delivery_fee >= 0),
  updated_at timestamptz not null default now()
);
insert into public.restaurant_settings (id, delivery_fee) values (true, null) on conflict (id) do nothing;

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text not null,
  whatsapp text,
  reservation_date date not null,
  reservation_time time not null,
  guest_count integer not null check (guest_count between 1 and 50),
  occasion text not null default 'none' check (occasion in (
    'birthday','anniversary','date','business-meeting','family-gathering','other','none'
  )),
  special_requests text not null default '',
  status text not null default 'pending' check (status in ('pending','confirmed','completed','cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid references auth.users(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text not null,
  order_type text not null check (order_type in ('delivery','pickup')),
  delivery_address text,
  delivery_landmark text,
  general_note text not null default '',
  payment_method text not null check (payment_method in ('pay-on-delivery','pay-on-pickup','pay-at-restaurant')),
  subtotal integer not null check (subtotal >= 0),
  delivery_fee integer check (delivery_fee is null or delivery_fee >= 0),
  total integer not null check (total = subtotal + coalesce(delivery_fee, 0)),
  status text not null default 'received' check (status in (
    'received','preparing','ready','ready-for-pickup','out-for-delivery','collected','delivered','cancelled'
  )),
  created_at timestamptz not null default now(),
  constraint delivery_address_required check (order_type <> 'delivery' or nullif(trim(delivery_address), '') is not null)
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  menu_item_id uuid references public.menu_items(id) on delete set null,
  item_name text not null,
  unit_price integer not null check (unit_price >= 0),
  quantity integer not null check (quantity between 1 and 20),
  special_instructions text not null default '',
  line_total integer generated always as (unit_price * quantity) stored
);

create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null check (label in ('Home','Work','Other')),
  address text not null,
  landmark text not null default '',
  city text not null,
  phone text not null default '',
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create unique index if not exists addresses_one_default_per_user
  on public.addresses (user_id) where is_default;

create table if not exists public.favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  menu_item_id uuid not null references public.menu_items(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, menu_item_id)
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  phone text not null default '',
  subject text not null check (subject in ('reservation','order','feedback','partnership','general-inquiry','other')),
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists reservations_user_date_idx on public.reservations (user_id, reservation_date desc);
create index if not exists orders_user_created_idx on public.orders (user_id, created_at desc);
create index if not exists order_items_order_idx on public.order_items (order_id);
create index if not exists menu_items_category_active_idx on public.menu_items (category, is_active, available);

alter table public.staff_members enable row level security;
alter table public.profiles enable row level security;
alter table public.menu_items enable row level security;
alter table public.restaurant_settings enable row level security;
alter table public.reservations enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.addresses enable row level security;
alter table public.favorites enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "staff can read staff list" on public.staff_members;
create policy "staff can read staff list" on public.staff_members
  for select to authenticated using (public.is_staff());

drop policy if exists "users can read own profile" on public.profiles;
create policy "users can read own profile" on public.profiles
  for select to authenticated using ((select auth.uid()) = id or public.is_staff());
drop policy if exists "users can update own profile" on public.profiles;
create policy "users can update own profile" on public.profiles
  for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
drop policy if exists "staff can manage profiles" on public.profiles;
create policy "staff can manage profiles" on public.profiles
  for all to authenticated using (public.is_staff()) with check (public.is_staff());

drop policy if exists "public can read active menu" on public.menu_items;
create policy "public can read active menu" on public.menu_items
  for select to anon, authenticated using (is_active = true or public.is_staff());
drop policy if exists "staff can manage menu" on public.menu_items;
create policy "staff can manage menu" on public.menu_items
  for all to authenticated using (public.is_staff()) with check (public.is_staff());

drop policy if exists "public can read restaurant settings" on public.restaurant_settings;
create policy "public can read restaurant settings" on public.restaurant_settings
  for select to anon, authenticated using (true);
drop policy if exists "staff can manage restaurant settings" on public.restaurant_settings;
create policy "staff can manage restaurant settings" on public.restaurant_settings
  for update to authenticated using (public.is_staff()) with check (public.is_staff());

drop policy if exists "public can request reservations" on public.reservations;
create policy "public can request reservations" on public.reservations
  for insert to anon, authenticated
  with check (status = 'pending' and (user_id is null or user_id = (select auth.uid())));
drop policy if exists "customers and staff can read reservations" on public.reservations;
create policy "customers and staff can read reservations" on public.reservations
  for select to authenticated using (user_id = (select auth.uid()) or public.is_staff());
drop policy if exists "staff can manage reservations" on public.reservations;
create policy "staff can manage reservations" on public.reservations
  for update to authenticated using (public.is_staff()) with check (public.is_staff());

drop policy if exists "customers and staff can read orders" on public.orders;
create policy "customers and staff can read orders" on public.orders
  for select to authenticated using (user_id = (select auth.uid()) or public.is_staff());
drop policy if exists "staff can manage orders" on public.orders;
create policy "staff can manage orders" on public.orders
  for update to authenticated using (public.is_staff()) with check (public.is_staff());
drop policy if exists "customers and staff can read order items" on public.order_items;
create policy "customers and staff can read order items" on public.order_items
  for select to authenticated using (
    exists (select 1 from public.orders o where o.id = order_id and o.user_id = (select auth.uid()))
    or public.is_staff()
  );

drop policy if exists "users manage own addresses" on public.addresses;
create policy "users manage own addresses" on public.addresses
  for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

drop policy if exists "users manage own favorites" on public.favorites;
create policy "users manage own favorites" on public.favorites
  for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

drop policy if exists "public can send contact messages" on public.contact_messages;
create policy "public can send contact messages" on public.contact_messages
  for insert to anon, authenticated
  with check (user_id is null or user_id = (select auth.uid()));
drop policy if exists "staff can read contact messages" on public.contact_messages;
create policy "staff can read contact messages" on public.contact_messages
  for select to authenticated using (public.is_staff());
drop policy if exists "staff can update contact messages" on public.contact_messages;
create policy "staff can update contact messages" on public.contact_messages
  for update to authenticated using (public.is_staff()) with check (public.is_staff());

grant usage on schema public to anon, authenticated;
grant select on public.menu_items to anon, authenticated;
grant select on public.restaurant_settings to anon, authenticated;
grant update on public.restaurant_settings to authenticated;
grant select, update on public.profiles to authenticated;
grant select, insert, update on public.reservations to authenticated;
grant insert on public.reservations to anon;
grant select, update on public.orders to authenticated;
grant select on public.order_items to authenticated;
grant select, insert, update, delete on public.addresses, public.favorites to authenticated;
grant insert on public.contact_messages to anon, authenticated;
grant select, update on public.contact_messages to authenticated;
grant select on public.staff_members to authenticated;

create or replace function public.place_order(
  p_full_name text,
  p_email text,
  p_phone text,
  p_order_type text,
  p_delivery_address text,
  p_delivery_landmark text,
  p_payment_method text,
  p_general_note text,
  p_items jsonb
)
returns table (order_id uuid, order_number text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order_id uuid := gen_random_uuid();
  v_order_number text := 'WH-' || to_char(now(), 'YYMMDD') || '-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8));
  v_subtotal integer := 0;
  v_delivery_fee integer := 0;
  v_item jsonb;
  v_menu_item public.menu_items%rowtype;
  v_quantity integer;
begin
  if nullif(trim(p_full_name), '') is null or nullif(trim(p_email), '') is null or nullif(trim(p_phone), '') is null then
    raise exception 'Name, email, and phone are required';
  end if;
  if length(p_full_name) > 120 or length(p_email) > 254 or length(p_phone) > 32 or length(coalesce(p_general_note, '')) > 300 then
    raise exception 'One or more order details are too long';
  end if;
  if p_order_type not in ('delivery','pickup') then raise exception 'Invalid order type'; end if;
  if p_payment_method not in ('pay-on-delivery','pay-on-pickup','pay-at-restaurant') then raise exception 'Invalid payment method'; end if;
  if p_order_type = 'delivery' and nullif(trim(p_delivery_address), '') is null then raise exception 'Delivery address is required'; end if;
  if p_items is null or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 or jsonb_array_length(p_items) > 25 then
    raise exception 'Your cart is empty or contains too many items';
  end if;

  for v_item in select value from jsonb_array_elements(p_items) loop
    v_quantity := (v_item ->> 'quantity')::integer;
    if v_quantity < 1 or v_quantity > 20 then raise exception 'Invalid item quantity'; end if;
    select * into v_menu_item from public.menu_items
      where id = (v_item ->> 'menu_item_id')::uuid and is_active and available;
    if not found then raise exception 'A menu item is no longer available'; end if;
    v_subtotal := v_subtotal + v_menu_item.price * v_quantity;
  end loop;

  if p_order_type = 'delivery' then
    select delivery_fee into v_delivery_fee from public.restaurant_settings where id = true;
  end if;

  insert into public.orders (
    id, order_number, user_id, full_name, email, phone, order_type,
    delivery_address, delivery_landmark, general_note, payment_method,
    subtotal, delivery_fee, total
  ) values (
    v_order_id, v_order_number, auth.uid(), trim(p_full_name), trim(p_email), trim(p_phone), p_order_type,
    nullif(trim(p_delivery_address), ''), nullif(trim(p_delivery_landmark), ''), coalesce(p_general_note, ''), p_payment_method,
    v_subtotal,
    case when p_order_type = 'delivery' then v_delivery_fee else 0 end,
    v_subtotal + coalesce(case when p_order_type = 'delivery' then v_delivery_fee else 0 end, 0)
  );

  for v_item in select value from jsonb_array_elements(p_items) loop
    v_quantity := (v_item ->> 'quantity')::integer;
    select * into v_menu_item from public.menu_items
      where id = (v_item ->> 'menu_item_id')::uuid and is_active and available;
    insert into public.order_items (order_id, menu_item_id, item_name, unit_price, quantity, special_instructions)
    values (
      v_order_id, v_menu_item.id, v_menu_item.name, v_menu_item.price, v_quantity,
      left(coalesce(v_item ->> 'special_instructions', ''), 500)
    );
  end loop;

  return query select v_order_id, v_order_number;
end;
$$;

revoke all on function public.place_order(text,text,text,text,text,text,text,text,jsonb) from public;
grant execute on function public.place_order(text,text,text,text,text,text,text,text,jsonb) to anon, authenticated;
