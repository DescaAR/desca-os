-- Desca OS optional cloud sync schema for Supabase
-- Run this in Supabase SQL Editor. Keep RLS enabled.

create table if not exists public.desca_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.desca_state enable row level security;

drop policy if exists "Users can read own Desca state" on public.desca_state;
create policy "Users can read own Desca state"
on public.desca_state
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert own Desca state" on public.desca_state;
create policy "Users can insert own Desca state"
on public.desca_state
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update own Desca state" on public.desca_state;
create policy "Users can update own Desca state"
on public.desca_state
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
