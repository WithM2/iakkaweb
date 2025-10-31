import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type Database = Record<string, never>;

function getSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
  }
  return url;
}

function getServiceRoleKey() {
  const key = process.env.SUPABASE_SERVICE_ROLE;
  if (!key) {
    throw new Error("SUPABASE_SERVICE_ROLE is not set");
  }
  return key;
}

export function createServiceRoleClient(): SupabaseClient<Database> {
  const supabaseUrl = getSupabaseUrl();
  const serviceRoleKey = getServiceRoleKey();

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
