create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  age integer,
  height_cm numeric,
  weight_kg numeric,
  training_experience text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.goals (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles(id) on delete cascade,
  goal text not null, priority integer not null default 1, created_at timestamptz not null default now()
);

create table public.equipment (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles(id) on delete cascade,
  item text not null, available boolean not null default true
);

create table public.exercises (
  id uuid primary key default gen_random_uuid(), slug text unique not null, name text not null, category text not null,
  difficulty text, primary_muscles text[] default '{}', instructions text, safety_notes text, created_at timestamptz not null default now()
);

create table public.workout_plans (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null, goal text, active boolean not null default true, created_at timestamptz not null default now()
);

create table public.workout_sessions (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles(id) on delete cascade,
  plan_id uuid references public.workout_plans(id) on delete set null, started_at timestamptz not null default now(), completed_at timestamptz
);

create table public.workout_sets (
  id uuid primary key default gen_random_uuid(), session_id uuid not null references public.workout_sessions(id) on delete cascade,
  exercise_id uuid references public.exercises(id) on delete set null, set_number integer not null,
  target_reps integer, actual_reps integer, target_seconds integer, actual_seconds integer,
  load numeric, rpe numeric, rir numeric, completed boolean not null default false
);

create table public.skills (
  id uuid primary key default gen_random_uuid(), slug text unique not null, name text not null,
  category text not null, level integer not null default 1, requirements jsonb not null default '{}'::jsonb
);

create table public.user_skills (
  user_id uuid not null references public.profiles(id) on delete cascade, skill_id uuid not null references public.skills(id) on delete cascade,
  progress numeric not null default 0, unlocked boolean not null default false, updated_at timestamptz not null default now(),
  primary key(user_id, skill_id)
);

create table public.body_measurements (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles(id) on delete cascade,
  measured_at timestamptz not null default now(), weight_kg numeric, waist_cm numeric, notes text
);

create table public.recovery_logs (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles(id) on delete cascade,
  logged_at timestamptz not null default now(), sleep_hours numeric, energy integer, soreness integer, stress integer
);

create table public.nutrition_logs (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles(id) on delete cascade,
  logged_at timestamptz not null default now(), meal_name text, calories numeric, protein_g numeric, carbs_g numeric, fat_g numeric, water_ml numeric default 0
);

create table public.video_analyses (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles(id) on delete cascade,
  exercise_slug text not null, storage_path text, status text not null default 'queued', reps integer, form_score numeric,
  metrics jsonb not null default '{}'::jsonb, issues jsonb not null default '[]'::jsonb, created_at timestamptz not null default now()
);

create table public.ai_conversations (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles(id) on delete cascade, created_at timestamptz not null default now()
);
create table public.ai_messages (
  id uuid primary key default gen_random_uuid(), conversation_id uuid not null references public.ai_conversations(id) on delete cascade,
  role text not null check(role in ('user','assistant','system')), content text not null, created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.goals enable row level security;
alter table public.equipment enable row level security;
alter table public.workout_plans enable row level security;
alter table public.workout_sessions enable row level security;
alter table public.workout_sets enable row level security;
alter table public.user_skills enable row level security;
alter table public.body_measurements enable row level security;
alter table public.recovery_logs enable row level security;
alter table public.nutrition_logs enable row level security;
alter table public.video_analyses enable row level security;
alter table public.ai_conversations enable row level security;
alter table public.ai_messages enable row level security;

create policy "own profiles" on public.profiles for all using (auth.uid()=id) with check (auth.uid()=id);
create policy "own goals" on public.goals for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "own equipment" on public.equipment for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "own plans" on public.workout_plans for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "own sessions" on public.workout_sessions for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "own sets" on public.workout_sets for all using (exists(select 1 from public.workout_sessions s where s.id=session_id and s.user_id=auth.uid())) with check (exists(select 1 from public.workout_sessions s where s.id=session_id and s.user_id=auth.uid()));
create policy "own skills" on public.user_skills for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "own measurements" on public.body_measurements for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "own recovery" on public.recovery_logs for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "own nutrition" on public.nutrition_logs for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "own videos" on public.video_analyses for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "own conversations" on public.ai_conversations for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "own messages" on public.ai_messages for all using (exists(select 1 from public.ai_conversations c where c.id=conversation_id and c.user_id=auth.uid())) with check (exists(select 1 from public.ai_conversations c where c.id=conversation_id and c.user_id=auth.uid()));

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin insert into public.profiles(id, display_name) values(new.id, coalesce(new.raw_user_meta_data->>'display_name','')); return new; end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
