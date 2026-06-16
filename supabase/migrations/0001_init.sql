-- Extensions
create extension if not exists pgcrypto;

-- Profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'viewer' check (role in ('admin', 'editor', 'viewer')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Site settings
create table if not exists public.site_settings (
  id int primary key default 1,
  site_title text not null default 'DepEd Masbate City | SGODTAP Portal',
  hero_title text,
  hero_subtitle text,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id) values (1)
on conflict (id) do nothing;

-- Content
create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  section text not null,
  title text not null,
  slug text,
  summary text,
  body text,
  file_url text,
  external_url text,
  published boolean not null default true,
  featured boolean not null default false,
  sort_order int not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references public.profiles(id) on delete set null
);

create index if not exists idx_content_items_section_published on public.content_items(section, published, sort_order);
create unique index if not exists idx_content_items_slug on public.content_items(slug) where slug is not null;

create table if not exists public.quick_links (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text not null,
  sort_order int not null default 1,
  created_at timestamptz not null default now()
);

create table if not exists public.directory_contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position text,
  email text,
  phone text,
  office text,
  sort_order int not null default 1,
  created_at timestamptz not null default now()
);

create table if not exists public.feedback_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'reviewed', 'closed')),
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute procedure public.set_updated_at();

create trigger trg_site_settings_updated_at
before update on public.site_settings
for each row execute procedure public.set_updated_at();

create trigger trg_content_items_updated_at
before update on public.content_items
for each row execute procedure public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', new.email), 'viewer')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.is_admin(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = uid and role = 'admin'
  );
$$;

-- RLS
alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.content_items enable row level security;
alter table public.quick_links enable row level security;
alter table public.directory_contacts enable row level security;
alter table public.feedback_submissions enable row level security;

-- Public read policies
create policy if not exists "public read settings" on public.site_settings for select using (true);
create policy if not exists "public read content" on public.content_items for select using (published = true or public.is_admin(auth.uid()));
create policy if not exists "public read quick links" on public.quick_links for select using (true);
create policy if not exists "public read directory" on public.directory_contacts for select using (true);

-- Feedback policies
create policy if not exists "public create feedback" on public.feedback_submissions for insert with check (true);
create policy if not exists "admin read feedback" on public.feedback_submissions for select using (public.is_admin(auth.uid()));
create policy if not exists "admin update feedback" on public.feedback_submissions for update using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- Profiles policies
create policy if not exists "read own profile" on public.profiles for select using (auth.uid() = id or public.is_admin(auth.uid()));
create policy if not exists "admin update profiles" on public.profiles for update using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
create policy if not exists "admin insert profiles" on public.profiles for insert with check (public.is_admin(auth.uid()));

-- Admin content policies
create policy if not exists "admin manage settings" on public.site_settings for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
create policy if not exists "admin manage content" on public.content_items for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
create policy if not exists "admin manage quick links" on public.quick_links for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
create policy if not exists "admin manage directory" on public.directory_contacts for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- Grants (important for new Supabase Data API defaults)
grant usage on schema public to anon, authenticated, service_role;

grant select on public.site_settings to anon, authenticated;
grant select on public.content_items to anon, authenticated;
grant select on public.quick_links to anon, authenticated;
grant select on public.directory_contacts to anon, authenticated;
grant insert on public.feedback_submissions to anon, authenticated;
grant select, update on public.feedback_submissions to authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update, delete on public.content_items to authenticated;
grant select, insert, update, delete on public.quick_links to authenticated;
grant select, insert, update, delete on public.directory_contacts to authenticated;
grant select, insert, update on public.site_settings to authenticated;
grant all on all tables in schema public to service_role;
grant usage, select on all sequences in schema public to anon, authenticated, service_role;
grant execute on function public.is_admin(uuid) to anon, authenticated, service_role;
