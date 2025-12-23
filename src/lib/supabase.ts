import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type InquiryRow = {
  id: string;
  inquiry_action: string;
  student_name: string;
  student_grade: string;
  interest_level: string;
  guardian_name: string;
  guardian_email: string;
  guardian_phone: string;
  guardian_contact_preference: string;
  inquiry_type: string;
  inquiry_title: string;
  inquiry_body: string;
  privacy_consent: boolean;
  is_completed?: boolean | null;
  created_at: string;
};

type PartnershipInquiryRow = {
  id: string;
  organization_name: string;
  contact_name: string;
  contact_email: string;
  inquiry_type: string;
  inquiry_title: string;
  inquiry_body: string;
  privacy_consent: boolean;
  created_at: string;
};

type PaymentRow = {
  id: string;
  order_id: string;
  plan_id: "standard" | "plus";
  amount: number;
  item_name: string;
  user_id: string;
  user_name: string;
  user_phone: string;
  user_email: string | null;
  user_agent: "PC" | "MW" | "MA" | "MI";
  bypass_value: string | null;
  danal_start_url: string;
  danal_start_params: string;
  created_at: string;
};

type Database = {
  public: {
    Tables: {
      inquiries: {
        Row: InquiryRow;
        Insert: Omit<InquiryRow, "id" | "created_at" | "is_completed"> & {
          id?: string;
          created_at?: string;
          is_completed?: boolean;
        };
        Update: Partial<InquiryRow>;
        Relationships: [];
      };
      partnership_inquiries: {
        Row: PartnershipInquiryRow;
        Insert: Omit<PartnershipInquiryRow, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<PartnershipInquiryRow>;
        Relationships: [];
      };
      payments: {
        Row: PaymentRow;
        Insert: Omit<PaymentRow, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<PaymentRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: never;
  };
};

function getSupabaseUrl() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "";
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL environment variable must be set"
    );
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
