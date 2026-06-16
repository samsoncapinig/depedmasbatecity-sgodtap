# DepEd Masbate City – SGODTAP (Next.js + Supabase + Vercel)

This repo is a production-ready starter that recreates the public-facing structure visible from the DepEd Masbate City site (Home, Issuances, Downloadables, Articles, Citizen's Charter, Feedback, About, Directory, Log-in) and adds a Supabase-backed CMS/admin flow. It is designed to run on GitHub + Vercel + Supabase.

> Important: because the Base44 app itself was not directly inspectable from this environment, this codebase is an inferred rebuild based on the public site information and your public GitHub repository name. It is **not** guaranteed to be a pixel-perfect Base44 export; it gives you a clean, editable clone foundation.

## Stack

- Next.js 16 App Router
- React 19
- Supabase Auth + Postgres + RLS
- Vercel deployment

## 1) Create Supabase project

Create a new Supabase project, then run the SQL in:

```sql
supabase/migrations/0001_init.sql
```

You can paste it into Supabase SQL Editor.

## 2) Environment variables

Copy `.env.example` to `.env.local`.

```bash
cp .env.example .env.local
```

Fill these values:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> `SUPABASE_SERVICE_ROLE_KEY` is only used for optional future server-only jobs. The current app avoids exposing it to the browser.

## 3) Install & run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## 4) Seed demo content (optional)

Run these sample inserts after the main migration:

```sql
insert into public.quick_links (title, url, sort_order) values
('DepEd Information System', 'https://www.depedmasbatecity.com/', 1),
('Our Online Services', 'https://www.depedmasbatecity.com/', 2),
('Private School Courses Offered', 'https://www.depedmasbatecity.com/', 3);

insert into public.content_items (section, title, summary, body, published, featured, sort_order)
values
('announcements', 'Welcome to SGODTAP', 'Initial announcement entry', 'Replace this with your real content.', true, true, 1),
('issuances', 'Sample Division Memorandum', 'Example issuance summary', 'Full issuance body goes here.', true, false, 1),
('downloadables', 'Enrollment Forms', 'Download templates and forms.', 'Attach file URLs or cloud links here.', true, false, 1),
('articles', 'Division News Article', 'Example news article.', 'Article body goes here.', true, true, 1),
('citizens-charter', 'Citizen\'s Charter Overview', 'Public service charter summary', 'Add process flow, requirements, and turnaround time here.', true, false, 1),
('about', 'About SGODTAP', 'Mission, vision, and office profile.', 'Office profile content goes here.', true, false, 1);

insert into public.directory_contacts (name, position, email, phone, office, sort_order) values
('Office Contact', 'SGODTAP Coordinator', 'office@example.com', '+63 900 000 0000', 'SGODTAP', 1);
```

## 5) Create an admin user

1. In Supabase Auth, create/sign up with your email.
2. Find the user's UUID in **Authentication → Users**.
3. Insert an admin profile:

```sql
insert into public.profiles (id, email, full_name, role)
values ('YOUR_AUTH_USER_UUID', 'your@email.com', 'Your Name', 'admin')
on conflict (id) do update set role = 'admin';
```

## 6) Deploy to Vercel

1. Push this repository to GitHub.
2. Import the repo in Vercel.
3. Add the same environment variables in Vercel for **Production** and **Preview**.
4. Set `NEXT_PUBLIC_SITE_URL` to your Vercel URL (for example `https://your-app.vercel.app`).
5. In Supabase Auth URL settings, add:
   - Site URL: your Vercel production URL
   - Redirect URLs:
     - `http://localhost:3000/auth/callback`
     - `https://your-app.vercel.app/auth/callback`
     - `https://*-your-team.vercel.app/auth/callback` (optional preview pattern if you use wildcard support)

## Notes

- Public pages are readable without login.
- Feedback is open for submission.
- `/admin` requires a signed-in user whose `profiles.role = 'admin'`.
- RLS is enabled with least-privilege policies.
