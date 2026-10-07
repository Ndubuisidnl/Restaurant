# Supabase setup

## Apply the schema

Open the Supabase project's SQL Editor, paste `migrations/202610070001_initial_schema.sql`, and run it once. It creates the app tables, Row Level Security policies, profile creation trigger, and the `place_order` RPC.

The migration intentionally does not insert menu demo data. Add confirmed menu entries in **Table Editor → menu_items**. Use one of these category values: `breakfast`, `burgers`, `sandwiches`, `main-dishes`, `pasta`, `rice`, `chicken`, `snacks`, `coffee`, `drinks`, or `desserts`. Prices are whole NGN amounts.

Set the restaurant's delivery fee in the single row of `restaurant_settings`. Leave it `NULL` while staff still need to confirm the charge; set it to `0` for free delivery or to the confirmed amount in NGN.

## Data API

The app uses the publishable key and Supabase Data API. If the project's Data API configuration requires tables/functions to be exposed explicitly, expose `menu_items`, `restaurant_settings`, `profiles`, `reservations`, `orders`, `order_items`, `addresses`, `favorites`, and `contact_messages`, plus the `place_order` function. Keep RLS enabled; the policies in the migration control what each role can access.

## Staff access

Supabase dashboard users can manage records in Table Editor. If you later add staff screens to the website, add each staff user's Auth UUID to `staff_members` from the SQL Editor, for example:

```sql
insert into public.staff_members (user_id)
select id from auth.users where email = 'staff@example.com'
on conflict (user_id) do nothing;
```

The customer-facing app currently lets staff review/update reservations and orders from Supabase Table Editor; it does not include a staff dashboard yet.
