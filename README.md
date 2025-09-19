## Techspark – Event Registration (Next.js + Supabase)

Modern event registration app built with Next.js App Router, Tailwind CSS 4, and Supabase for data and realtime updates. Includes a public landing and a styled Admin Dashboard for viewing registrations with Excel/PDF export.

### Requirements
- Node 18+
- npm
- Supabase project (free tier is fine)

### 1) Install dependencies
```bash
npm install
```

### 2) Environment variables
Create a file named `.env.local` in the project root:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Restart the dev server after changes to `.env.local`.

### 3) Database schema (Supabase SQL)
Run in Supabase SQL Editor:
```sql
create extension if not exists pgcrypto;

create table if not exists public.participants (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text unique not null,
  phone text unique not null,
  college text not null,
  year int not null,
  department text not null,
  usn text not null,
  created_at timestamptz default now()
);

alter table public.participants enable row level security;

-- Dev policies (allow public read + insert). Harden for production.
do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='participants' and policyname='Anyone can register') then
    create policy "Anyone can register" on public.participants for insert with check (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='participants' and policyname='Public can view participants') then
    create policy "Public can view participants" on public.participants for select to anon using (true);
  end if;
end $$;

-- Realtime publication
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname='supabase_realtime' and schemaname='public' and tablename='participants'
  ) then
    alter publication supabase_realtime add table public.participants;
  end if;
end $$;

alter table public.participants replica identity full;
```

Then in Supabase Dashboard → Realtime:
- Enable Realtime for schema `public` (or the `participants` table)
- Ensure “Postgres Changes” is ON and includes INSERT

### 4) Run locally
```bash
npm run dev
```
Open http://localhost:3000

### 5) Admin Dashboard
- URL: `/admin/login`
- Demo credentials in the UI (change for production)
- Features: dark themed UI, live table updates, search, Excel/PDF export

### Troubleshooting
- Dashboard shows 0 values:
  - Ensure `.env.local` is set and the server restarted
  - Verify policies allow anon SELECT and INSERT (for dev)
  - Realtime: table is in `supabase_realtime` publication and enabled in Dashboard
  - Insert a test row in SQL editor to confirm
- Missing envs warning in console means the app is using a temporary mock client; add env vars.

### Security notes
- The provided RLS policies are permissive for development. For production, restrict INSERT to authenticated users or admin roles and remove anon broad access.

### License
MIT
