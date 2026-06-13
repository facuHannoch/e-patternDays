-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Habits table
create table public.habits (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Daily entries table
create table public.daily_entries (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  mood integer not null check (mood >= 1 and mood <= 10),
  energy integer not null check (energy >= 1 and energy <= 10),
  focus integer not null check (focus >= 1 and focus <= 10),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, date)
);

-- Habit logs table
create table public.habit_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  habit_id uuid not null references public.habits(id) on delete cascade,
  date date not null,
  completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, habit_id, date)
);

-- Create indexes for better query performance
create index idx_habits_user_id on public.habits(user_id);
create index idx_daily_entries_user_id on public.daily_entries(user_id);
create index idx_daily_entries_date on public.daily_entries(date);
create index idx_habit_logs_user_id on public.habit_logs(user_id);
create index idx_habit_logs_habit_id on public.habit_logs(habit_id);
create index idx_habit_logs_date on public.habit_logs(date);

-- Enable RLS
alter table public.habits enable row level security;
alter table public.daily_entries enable row level security;
alter table public.habit_logs enable row level security;

-- RLS policies for habits
create policy "Users can read their own habits"
  on public.habits for select
  using (auth.uid() = user_id);

create policy "Users can insert their own habits"
  on public.habits for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own habits"
  on public.habits for update
  using (auth.uid() = user_id);

-- RLS policies for daily_entries
create policy "Users can read their own entries"
  on public.daily_entries for select
  using (auth.uid() = user_id);

create policy "Users can insert their own entries"
  on public.daily_entries for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own entries"
  on public.daily_entries for update
  using (auth.uid() = user_id);

-- RLS policies for habit_logs
create policy "Users can read their own habit logs"
  on public.habit_logs for select
  using (auth.uid() = user_id);

create policy "Users can insert their own habit logs"
  on public.habit_logs for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own habit logs"
  on public.habit_logs for update
  using (auth.uid() = user_id);
