# Supabase setup

## Apply the schema

Open the Supabase project's SQL Editor, paste `migrations/202610070001_initial_schema.sql`, and run it once. It creates the app tables, Row Level Security policies, profile creation trigger, and the `place_order` RPC.

The migration intentionally does not insert menu demo data. Add confirmed menu entries in **Table Editor â†’ menu_items**. Use one of these category values: `breakfast`, `burgers`, `sandwiches`, `main-dishes`, `pasta`, `rice`, `chicken`, `snacks`, `coffee`, `drinks`, or `desserts`. Prices are whole NGN amounts.

Set the restaurant's delivery fee in the single row of `restaurant_settings`. Leave it `NULL` while staff still need to confirm the charge; set it to `0` for free delivery or to the confirmed amount in NGN.

## Data API

The app uses the publishable key and Supabase Data API. If the project's Data API configuration requires tables/functions to be exposed explicitly, expose `menu_items`, `restaurant_settings`, `profiles`, `reservations`, `orders`, `order_items`, `addresses`, `favorites`, and `contact_messages`, plus the `place_order` function. Keep RLS enabled; the policies in the migration control what each role can access.

## Staff access

`profiles.role` is the shared authorization source for the restaurant and admin apps. The role is `customer` by default; use `staff` for staff access or `admin` for admin access. Apply `migrations/202610130001_profiles_role.sql` after the initial schema migration. It adds the role column, carries existing `staff_members` entries over as `staff`, and updates the `is_staff()` helper. Users cannot change their own role.

Assign an existing Auth user an admin role from the Supabase SQL Editor (replace the email):

```sql
update public.profiles p
set role = 'admin'
from auth.users u
where p.id = u.id and u.email = 'admin@example.com';
```

Use `role = 'staff'` for non-admin staff. The customer-facing app currently has no staff dashboard; staff authorization is used by its database policies.

## Menu image uploads

Apply `migrations/202610140001_menu_image_storage.sql` and then `migrations/202610140002_menu_image_upload_policy.sql` after the profile role migration. The first creates the public-read `menu-images` bucket. The second permits authenticated admin profiles to upload into it.

Apply `migrations/202610140003_admin_menu_item_permissions.sql` after the menu image policy migration. It grants authenticated users the table privileges required by PostgREST and uses RLS to limit menu inserts and updates to admins.

Apply `migrations/202610140004_admin_reservation_access.sql` after the admin menu permissions migration. It grants authenticated admins access to all reservations while preserving customer-specific access through the existing RLS policies.
