-- ════════════════════════════════════════════════════════════════
-- AFRICA FOR ALL — Database Schema
-- Run this in the Supabase SQL Editor (or via `supabase db push`)
-- ════════════════════════════════════════════════════════════════

-- Enable extensions
create extension if not exists "uuid-ossp";

-- ────────────────────────────────────────────────────────────────
-- 1. ADMIN PROFILES (extends Supabase auth.users)
-- ────────────────────────────────────────────────────────────────
create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'editor' check (role in ('super_admin', 'editor')),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.admin_profiles is 'Admin dashboard users — gates access to /admin routes';

-- ────────────────────────────────────────────────────────────────
-- 2. PROGRAMS
-- ────────────────────────────────────────────────────────────────
create table if not exists public.programs (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title text not null,
  icon text not null default 'HeartHandshake',
  summary text not null,
  description text,
  cover_image_url text,
  is_published boolean not null default true,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────────
-- 3. IMPACT STATS (the animated KPI counters)
-- ────────────────────────────────────────────────────────────────
create table if not exists public.impact_stats (
  id uuid primary key default uuid_generate_v4(),
  label text not null,
  value numeric not null,
  suffix text default '+',
  icon text default 'Users',
  display_order int not null default 0,
  is_published boolean not null default true,
  updated_at timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────────
-- 4. STORIES OF CHANGE
-- ────────────────────────────────────────────────────────────────
create table if not exists public.stories (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  body text,
  cover_image_url text,
  location text,
  program_id uuid references public.programs(id) on delete set null,
  is_published boolean not null default true,
  published_at timestamptz default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────────
-- 5. PARTNERS
-- ────────────────────────────────────────────────────────────────
create table if not exists public.partners (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  logo_url text,
  category text default 'NGO' check (category in ('UN', 'NGO', 'Corporate', 'Foundation')),
  website_url text,
  display_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────────
-- 6. DONATIONS (Stripe-linked, test mode by default)
-- ────────────────────────────────────────────────────────────────
create table if not exists public.donations (
  id uuid primary key default uuid_generate_v4(),
  donor_name text,
  donor_email text not null,
  amount numeric not null,
  currency text not null default 'USD',
  frequency text not null check (frequency in ('one_time', 'monthly')),
  program_id uuid references public.programs(id) on delete set null,
  stripe_session_id text,
  stripe_payment_intent_id text,
  status text not null default 'pending' check (status in ('pending', 'completed', 'failed', 'refunded')),
  is_test_mode boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists idx_donations_status on public.donations(status);
create index if not exists idx_donations_created_at on public.donations(created_at desc);

-- ────────────────────────────────────────────────────────────────
-- 7. CONTACT MESSAGES
-- ────────────────────────────────────────────────────────────────
create table if not exists public.contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  organization text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────────
-- 8. NEWSLETTER SUBSCRIBERS
-- ────────────────────────────────────────────────────────────────
create table if not exists public.newsletter_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  subscribed_at timestamptz not null default now(),
  is_active boolean not null default true
);

-- ────────────────────────────────────────────────────────────────
-- 9. PARTNERSHIP INQUIRIES (Become a Partner CTA)
-- ────────────────────────────────────────────────────────────────
create table if not exists public.partnership_inquiries (
  id uuid primary key default uuid_generate_v4(),
  organization_name text not null,
  contact_name text not null,
  email text not null,
  category text,
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

-- ════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ════════════════════════════════════════════════════════════════

alter table public.admin_profiles enable row level security;
alter table public.programs enable row level security;
alter table public.impact_stats enable row level security;
alter table public.stories enable row level security;
alter table public.partners enable row level security;
alter table public.donations enable row level security;
alter table public.contact_messages enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.partnership_inquiries enable row level security;

-- Public read access for published content
create policy "Public can view published programs" on public.programs
  for select using (is_published = true);

create policy "Public can view published impact stats" on public.impact_stats
  for select using (is_published = true);

create policy "Public can view published stories" on public.stories
  for select using (is_published = true);

create policy "Public can view published partners" on public.partners
  for select using (is_published = true);

-- Public insert access for forms (no auth required to donate / contact / subscribe)
create policy "Anyone can submit a donation record" on public.donations
  for insert with check (true);

create policy "Anyone can send a contact message" on public.contact_messages
  for insert with check (true);

create policy "Anyone can subscribe to the newsletter" on public.newsletter_subscribers
  for insert with check (true);

create policy "Anyone can submit a partnership inquiry" on public.partnership_inquiries
  for insert with check (true);

-- Admin-only access (authenticated users present in admin_profiles)
create policy "Admins can view their own profile" on public.admin_profiles
  for select using (auth.uid() = id);

create policy "Admins can manage programs" on public.programs
  for all using (exists (select 1 from public.admin_profiles where id = auth.uid()));

create policy "Admins can manage impact stats" on public.impact_stats
  for all using (exists (select 1 from public.admin_profiles where id = auth.uid()));

create policy "Admins can manage stories" on public.stories
  for all using (exists (select 1 from public.admin_profiles where id = auth.uid()));

create policy "Admins can manage partners" on public.partners
  for all using (exists (select 1 from public.admin_profiles where id = auth.uid()));

create policy "Admins can view all donations" on public.donations
  for select using (exists (select 1 from public.admin_profiles where id = auth.uid()));

create policy "Admins can update donations" on public.donations
  for update using (exists (select 1 from public.admin_profiles where id = auth.uid()));

create policy "Admins can view contact messages" on public.contact_messages
  for all using (exists (select 1 from public.admin_profiles where id = auth.uid()));

create policy "Admins can view newsletter subscribers" on public.newsletter_subscribers
  for select using (exists (select 1 from public.admin_profiles where id = auth.uid()));

create policy "Admins can manage partnership inquiries" on public.partnership_inquiries
  for all using (exists (select 1 from public.admin_profiles where id = auth.uid()));

-- ════════════════════════════════════════════════════════════════
-- SEED DATA
-- ════════════════════════════════════════════════════════════════

insert into public.impact_stats (label, value, suffix, icon, display_order) values
  ('Lives Impacted', 150000, '+', 'Users', 1),
  ('Communities', 25, '+', 'Globe', 2),
  ('Active Programs', 12, '+', 'HeartHandshake', 3),
  ('Partner Organizations', 25, '+', 'ShieldCheck', 4)
on conflict do nothing;

insert into public.programs (slug, title, icon, summary, display_order) values
  ('education', 'Education', 'GraduationCap', 'Community learning centers, teacher training, girl child education, and adult literacy programs.', 1),
  ('healthcare', 'Healthcare', 'Stethoscope', 'Mobile clinics, maternal care, disease prevention, and mental wellness support.', 2),
  ('economic-empowerment', 'Economic Empowerment', 'BriefcaseBusiness', 'Vocational skills training, entrepreneurship support, and microfinance access.', 3),
  ('women-youth', 'Women & Youth', 'Users', 'Leadership development, gender equality advocacy, and youth empowerment.', 4),
  ('climate-action', 'Climate Action', 'Leaf', 'Renewable energy, reforestation, and community-led recycling initiatives.', 5)
on conflict (slug) do nothing;

insert into public.partners (name, category, display_order) values
  ('United Nations Development Programme', 'UN', 1),
  ('LM International', 'NGO', 2),
  ('CARE Kenya', 'NGO', 3),
  ('Gates Foundation', 'Foundation', 4)
on conflict do nothing;
