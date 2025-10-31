create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  student_name text not null,
  student_grade text not null,
  interest_level text not null,
  guardian_name text not null,
  guardian_email text not null,
  guardian_phone text not null,
  guardian_contact_preference text not null,
  inquiry_type text not null,
  inquiry_title text not null,
  inquiry_body text not null,
  privacy_consent boolean not null,
  created_at timestamptz not null default timezone('utc', now())
);
