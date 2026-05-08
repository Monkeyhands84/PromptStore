-- PromptStore — tabla de uso de IA para rate limiting por usuario.
-- Ejecutar en el SQL Editor de Supabase. Idempotente.

-- ─── 1. Tabla ─────────────────────────────────────────────
create table if not exists public.ai_usage (
  id          bigserial primary key,
  user_id     uuid not null references auth.users(id) on delete cascade,
  action      text not null default 'improve_prompt',
  created_at  timestamptz not null default now()
);

create index if not exists ai_usage_user_recent_idx
  on public.ai_usage (user_id, created_at desc);

-- ─── 2. Row Level Security ────────────────────────────────
alter table public.ai_usage enable row level security;

drop policy if exists "select_own_usage" on public.ai_usage;
create policy "select_own_usage"
  on public.ai_usage for select
  using (auth.uid() = user_id);

drop policy if exists "insert_own_usage" on public.ai_usage;
create policy "insert_own_usage"
  on public.ai_usage for insert
  with check (auth.uid() = user_id);
