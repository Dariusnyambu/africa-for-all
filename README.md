# Africa For All — Premium NGO Platform

Dignity for Every Life. Sustainability for Every Generation.

A production-ready, donor-grade NGO website built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, and Supabase — with a full admin dashboard for managing programs, stories, partners, donations, messages, and the newsletter.

---

## Tech Stack

- **Next.js 15** (App Router, Server Components, Route Handlers)
- **TypeScript** (strict mode)
- **Tailwind CSS** — custom sage/sand/forest brand palette
- **Framer Motion** — scroll reveals, counters, micro-interactions
- **Lucide React** — icons only, per spec
- **Supabase** — Postgres database, Auth (admin login), Row Level Security
- **Stripe** — donation checkout (test mode by default)
- **Zustand, React Hook Form + Zod** — included and ready for forms/state as you expand
- **Playfair Display** (headings) + **Inter** (body)

---

## 1. Getting Started

```bash
npm install
cp .env.example .env.local
# fill in .env.local with your real keys (see below)
npm run dev
```

Visit `http://localhost:3000`.

---

## 2. Supabase Setup

1. Create a project at [supabase.com](https://supabase.com).
2. In the Supabase SQL Editor, run the migration file:
   `supabase/migrations/0001_init.sql`
   This creates all tables, Row Level Security policies, and seeds initial programs/stats/partners.
3. Copy your **Project URL**, **anon public key**, and **service_role key** into `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

⚠️ **Never expose `SUPABASE_SERVICE_ROLE_KEY` in client-side code.** It's only used in `src/lib/supabase/server.ts`'s `createAdminClient()`, in server-only contexts (API routes).

### Creating your first admin user

The `/admin` dashboard is gated by Supabase Auth + the `admin_profiles` table.

1. In the Supabase Dashboard → Authentication → Users → **Add User**, create a user with email/password.
2. In the SQL Editor, link that user as an admin:

```sql
insert into public.admin_profiles (id, full_name, role)
values ('paste-the-user-uuid-here', 'Your Name', 'super_admin');
```

3. Visit `/admin/login` and sign in.

---

## 3. Stripe Setup (Test Mode)

Donations are wired to Stripe Checkout in **test mode** by default — no real charges occur.

1. Create a [Stripe account](https://dashboard.stripe.com/register) (or use an existing one).
2. Copy your **test mode** keys from Stripe Dashboard → Developers → API Keys:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

3. For webhook-driven status updates (marking donations "completed"), set up a webhook:
   - Locally: `stripe listen --forward-to localhost:3000/api/donate/webhook`
   - In production: add an endpoint in Stripe Dashboard pointing to `https://yourdomain.com/api/donate/webhook`, subscribed to `checkout.session.completed`, `checkout.session.expired`, and `charge.refunded`.
   - Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.

**Going live:** swap `pk_test_/sk_test_` for `pk_live_/sk_live_` keys when ready. The `is_test_mode` flag on each donation record makes it easy to filter test vs. live data in the admin dashboard.

---

## 4. Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── (public pages)        # /, /about, /programs, /impact, /stories, /partners, /contact, /donate, /get-involved
│   ├── admin/
│   │   ├── login/            # Public login page (no sidebar)
│   │   └── (dashboard)/      # Auth-gated admin pages (sidebar layout)
│   └── api/donate/           # Stripe checkout + webhook route handlers
├── components/
│   ├── layout/                # Navbar, Footer
│   ├── home/                  # Homepage sections
│   ├── programs/, donate/, admin/, shared/
├── lib/
│   ├── supabase/               # client.ts (browser), server.ts (RSC + admin), middleware.ts
│   ├── constants.ts             # Nav links, fallback content, core values
│   ├── program-details.ts       # Static program copy (initiatives per program)
│   ├── icon-map.ts               # Lucide icon registry (string → component)
│   └── stripe.ts                  # Stripe client helper
├── types/database.ts               # Full DB schema types
└── middleware.ts                     # Supabase session refresh + /admin route protection

supabase/migrations/0001_init.sql      # Full schema, RLS policies, seed data
```

---

## 5. CMS-Ready Architecture

Every public-facing section (Programs, Impact Stats, Stories, Partners) fetches from Supabase first, with hardcoded fallback content if Supabase isn't configured yet or returns no rows. This means:

- The site looks complete and polished even before Supabase is connected.
- Once Supabase is live, editing content through `/admin` immediately reflects on the public site — no redeploy needed.

---

## 6. Admin Dashboard Features

| Page | Capability |
|---|---|
| `/admin` | KPI overview — total raised, donation count, unread messages, subscribers |
| `/admin/programs` | Full CRUD for the 5 programs (title, icon, summary, description, image, order, publish toggle) |
| `/admin/stories` | Full CRUD for Stories of Change |
| `/admin/partners` | Full CRUD for partner organizations, grouped by category |
| `/admin/donations` | Read-only ledger of all donations (test + live), with status and amount |
| `/admin/messages` | Contact form inbox, mark as read/unread |
| `/admin/newsletter` | View all newsletter subscribers |

---

## 7. Deployment (Vercel)

```bash
npm i -g vercel
vercel
```

Add all `.env.local` variables to your Vercel project's Environment Variables (Settings → Environment Variables) before deploying to production.

Update `NEXT_PUBLIC_SITE_URL` to your production domain — this feeds into SEO metadata, the sitemap, and Stripe checkout success/cancel URLs.

---

## 8. Design System Reference

| Token | Value |
|---|---|
| Primary (sage) | `#6E8F80` |
| Secondary (sand) | `#D9D0C3` |
| Accent (forest) | `#2E4A3E` |
| Background | `#FAFAF7` |
| Text | `#1B1B1B` |
| Highlight | `#C7B79A` |
| Headings | Playfair Display |
| Body | Inter |

Border radius scale: `28px` / `32px` / `40px` (`rounded-xl2` / `xl3` / `xl4` in Tailwind config).

---

## 9. Content Source

All mission, vision, program, and objective copy is sourced directly from the **Africa For All NGO Proposal** provided during development — ensuring messaging accuracy across the site.

---

Built for Royal Graphix.
