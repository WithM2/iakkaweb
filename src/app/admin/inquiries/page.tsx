import type { Metadata } from "next";

import { createServiceRoleClient } from "@/lib/supabase";

import AdminInquiriesClient, {
  type AdminInquiry,
} from "./AdminInquiriesClient";

export const metadata: Metadata = {
  title: "문의사항 관리자 | IAKKA",
};

export const revalidate = 0;

type RawInquiry = {
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
  is_completed?: boolean | null;
  created_at: string;
};

async function fetchInquiries(): Promise<{
  inquiries: AdminInquiry[];
  completionAvailable: boolean;
}> {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("inquiries")
    .select<RawInquiry>("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to load inquiries: ${error.message}`);
  }

  const inquiries =
    data?.map((item) => ({
      id: item.id,
      inquiryAction: item.inquiry_action,
      studentName: item.student_name,
      studentGrade: item.student_grade,
      interestLevel: item.interest_level,
      guardianName: item.guardian_name,
      guardianEmail: item.guardian_email,
      guardianPhone: item.guardian_phone,
      guardianContactPreference: item.guardian_contact_preference,
      inquiryType: item.inquiry_type,
      inquiryTitle: item.inquiry_title,
      inquiryBody: item.inquiry_body,
      isCompleted: typeof item.is_completed === "boolean" ? item.is_completed : false,
      createdAt: item.created_at,
    })) ?? [];

  const completionAvailable = Boolean(
    data?.some((item) => typeof item.is_completed === "boolean")
  );

  return { inquiries, completionAvailable };
}

export default async function AdminInquiriesPage() {
  const { inquiries, completionAvailable } = await fetchInquiries();

  return (
    <AdminInquiriesClient
      initialInquiries={inquiries}
      completionAvailable={completionAvailable}
    />
  );
}
