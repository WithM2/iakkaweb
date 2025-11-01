import type { Metadata } from "next";

import { createServiceRoleClient } from "@/lib/supabase";

import AdminInquiriesClient, {
  type AdminInquiry,
} from "./AdminInquiriesClient";

export const metadata: Metadata = {
  title: "문의사항 관리자 | IAKKA",
};

export const revalidate = 0;

async function fetchInquiries(): Promise<AdminInquiry[]> {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("inquiries")
    .select(
      "id, inquiry_action, student_name, student_grade, interest_level, guardian_name, guardian_email, guardian_phone, guardian_contact_preference, inquiry_type, inquiry_title, inquiry_body, is_completed, created_at"
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to load inquiries: ${error.message}`);
  }

  return (
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
      isCompleted: item.is_completed,
      createdAt: item.created_at,
    })) ?? []
  );
}

export default async function AdminInquiriesPage() {
  const inquiries = await fetchInquiries();

  return <AdminInquiriesClient initialInquiries={inquiries} />;
}
