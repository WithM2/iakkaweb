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

type RawPartnershipInquiry = {
  id: string;
  organization_name: string;
  contact_name: string;
  contact_email: string;
  inquiry_type: string;
  inquiry_title: string;
  inquiry_body: string;
  created_at: string;
};

async function fetchInquiries(): Promise<{
  inquiries: AdminInquiry[];
  completionAvailable: boolean;
}> {
  const supabase = createServiceRoleClient();
  const [{ data, error }, { data: partnershipData, error: partnershipError }] =
    await Promise.all([
      supabase
        .from("inquiries")
        .select<RawInquiry>("*")
        .order("created_at", { ascending: false }),
      supabase
        .from("partnership_inquiries")
        .select<RawPartnershipInquiry>("*")
        .order("created_at", { ascending: false }),
    ]);

  if (error) {
    throw new Error(`Failed to load inquiries: ${error.message}`);
  }

  if (partnershipError) {
    throw new Error(
      `Failed to load partnership inquiries: ${partnershipError.message}`
    );
  }

  const allowedActions = new Set(["consult", "product", "reservation"]);

  const generalInquiries: AdminInquiry[] = (data ?? []).map((item) => {
    const hasCompletionColumn = typeof item.is_completed === "boolean";
    const inquiryAction = allowedActions.has(item.inquiry_action)
      ? (item.inquiry_action as AdminInquiry["inquiryAction"])
      : "consult";

    return {
      kind: "general",
      id: item.id,
      inquiryAction,
      inquiryType: item.inquiry_type,
      inquiryTitle: item.inquiry_title,
      inquiryBody: item.inquiry_body,
      createdAt: item.created_at,
      isCompleted: hasCompletionColumn ? item.is_completed : false,
      canToggleCompletion: hasCompletionColumn,
      studentName: item.student_name,
      studentGrade: item.student_grade,
      interestLevel: item.interest_level,
      guardianName: item.guardian_name,
      guardianEmail: item.guardian_email,
      guardianPhone: item.guardian_phone,
      guardianContactPreference: item.guardian_contact_preference,
    } satisfies AdminInquiry;
  });

  const partnershipInquiries: AdminInquiry[] = (partnershipData ?? []).map(
    (item) => ({
      kind: "partnership",
      id: item.id,
      inquiryAction: "product",
      inquiryType: item.inquiry_type,
      inquiryTitle: item.inquiry_title,
      inquiryBody: item.inquiry_body,
      createdAt: item.created_at,
      isCompleted: false,
      canToggleCompletion: false,
      organizationName: item.organization_name,
      contactName: item.contact_name,
      contactEmail: item.contact_email,
    }) satisfies AdminInquiry
  );

  const completionAvailable = generalInquiries.some(
    (item) => item.canToggleCompletion
  );

  const combined = [...generalInquiries, ...partnershipInquiries].sort((a, b) => {
    const aDate = new Date(a.createdAt).getTime();
    const bDate = new Date(b.createdAt).getTime();
    return Number.isFinite(bDate) && Number.isFinite(aDate)
      ? bDate - aDate
      : 0;
  });

  return { inquiries: combined, completionAvailable };
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
