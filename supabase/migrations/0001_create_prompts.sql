-- PromptStore — schema inicial
-- Ejecutar en el SQL Editor de Supabase. Es idempotente: puedes correrlo varias veces sin romper nada.

-- ─── 1. Tabla ─────────────────────────────────────────────
create table if not exists public.prompts (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  title        text not null,
  description  text not null default '',
  content      text not null default '',
  category     text not null default '',
  favorite     boolean not null default false,
  public       boolean not null default false,
  slug         text unique,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists prompts_user_id_idx on public.prompts(user_id);

-- ─── 2. Trigger para mantener updated_at ──────────────────
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists prompts_updated_at on public.prompts;
create trigger prompts_updated_at
  before update on public.prompts
  for each row
  execute function public.handle_updated_at();

-- ─── 3. Row Level Security ────────────────────────────────
alter table public.prompts enable row level security;

drop policy if exists "select_own_or_public" on public.prompts;
create policy "select_own_or_public"
  on public.prompts for select
  using (auth.uid() = user_id or public = true);

drop policy if exists "insert_own" on public.prompts;
create policy "insert_own"
  on public.prompts for insert
  with check (auth.uid() = user_id);

drop policy if exists "update_own" on public.prompts;
create policy "update_own"
  on public.prompts for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "delete_own" on public.prompts;
create policy "delete_own"
  on public.prompts for delete
  using (auth.uid() = user_id);
