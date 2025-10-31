create extension if not exists "pgcrypto" with schema public;

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  inquiry_action text not null check (char_length(btrim(inquiry_action)) > 0),
  student_name text not null check (char_length(btrim(student_name)) > 0),
  student_grade text not null check (char_length(btrim(student_grade)) > 0),
  interest_level text not null check (char_length(btrim(interest_level)) > 0),
  guardian_name text not null check (char_length(btrim(guardian_name)) > 0),
  guardian_email text not null check (char_length(btrim(guardian_email)) > 0),
  guardian_phone text not null check (char_length(btrim(guardian_phone)) > 0),
  guardian_contact_preference text not null check (char_length(btrim(guardian_contact_preference)) > 0),
  inquiry_type text not null check (char_length(btrim(inquiry_type)) > 0),
  inquiry_title text not null check (char_length(btrim(inquiry_title)) > 0),
  inquiry_body text not null check (char_length(btrim(inquiry_body)) > 0),
  privacy_consent boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  constraint privacy_consent_required check (privacy_consent = true)
);

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_guardian_email_idx on public.inquiries (lower(guardian_email));
