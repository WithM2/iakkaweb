import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE;

if (!supabaseUrl) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL environment variable. Please add it to your .env.local file."
  );
}

if (!serviceRoleKey) {
  throw new Error(
    "Missing SUPABASE_SERVICE_ROLE environment variable. Please add it to your .env.local file."
  );
}

export const supabaseAdminClient = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
  },
});
