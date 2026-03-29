-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS TABLE
create table public.users (
  id uuid references auth.users not null primary key,
  email text not null,
  role text not null default 'subscriber' check (role in ('admin', 'subscriber')),
  charity_id uuid,
  contribution_pct integer default 10 check (contribution_pct >= 10 and contribution_pct <= 100),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- CHARITIES TABLE
create table public.charities (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text not null,
  image_url text,
  events_info text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add foreign key reference to users
alter table public.users add constraint fk_charity foreign key (charity_id) references public.charities;

-- SUBSCRIPTIONS TABLE
create table public.subscriptions (
  user_id uuid references public.users(id) on delete cascade primary key,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text not null default 'inactive' check (status in ('active', 'inactive', 'cancelled', 'expired')),
  plan text check (plan in ('monthly', 'yearly')),
  period_end timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SCORES TABLE
create table public.scores (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  score integer not null check (score >= 1 and score <= 45),
  date timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- DRAWS TABLE
create table public.draws (
  id uuid default uuid_generate_v4() primary key,
  month text not null, -- e.g., '2023-10'
  mode text not null check (mode in ('random', 'algorithmic')),
  total_pool numeric(10,2) not null default 0,
  status text not null default 'pending' check (status in ('pending', 'simulated', 'published')),
  winning_numbers integer[] not null default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- DRAW RESULTS TABLE
create table public.draw_results (
  id uuid default uuid_generate_v4() primary key,
  draw_id uuid references public.draws(id) on delete cascade not null,
  user_id uuid references public.users(id) on delete cascade not null,
  match_type integer not null check (match_type in (3, 4, 5)),
  prize_amount numeric(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- WINNERS (PROOF) TABLE
create table public.winners (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  draw_result_id uuid references public.draw_results(id) on delete cascade not null,
  proof_url text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'paid')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PAYMENTS TABLE
create table public.payments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  amount numeric(10,2) not null,
  status text not null default 'pending' check (status in ('pending', 'paid')),
  processing_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES (Row Level Security)
-- Allow read access to charities for everyone
alter table public.charities enable row level security;
create policy "Allow public read access to charities" on public.charities for select using (true);

-- Allow users to read their own data
alter table public.users enable row level security;
create policy "Users can view own profile" on public.users for select using (auth.uid() = id);
create policy "Users can update own profile" on public.users for update using (auth.uid() = id);

alter table public.subscriptions enable row level security;
create policy "Users can view own subscription" on public.subscriptions for select using (auth.uid() = user_id);

alter table public.scores enable row level security;
create policy "Users can view own scores" on public.scores for select using (auth.uid() = user_id);
create policy "Users can insert own scores" on public.scores for insert with check (auth.uid() = user_id);
create policy "Users can update own scores" on public.scores for update using (auth.uid() = user_id);
create policy "Users can delete own scores" on public.scores for delete using (auth.uid() = user_id);

-- Admins should have access to bypass RLS or specifically added policies
-- (Assuming Supabase service_role key is used by backend which bypasses RLS)

-- TRIGGER FOR NEW USER CREATION (Auth -> Public Users)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
