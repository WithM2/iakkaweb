import { NextResponse } from "next/server";

import { createServiceRoleClient } from "@/lib/supabase";

type InquiryPayload = {
  inquiryAction: string;
  studentName: string;
  studentGrade: string;
  interestLevel: string;
  guardianName: string;
  guardianEmail: string;
  guardianPhone: string;
  guardianContactPreference: string;
  inquiryType: string;
  inquiryTitle: string;
  inquiryBody: string;
  privacyConsent: boolean;
};

const allowedInquiryActions = ["consult", "reservation"] as const;

function isAllowedInquiryAction(
  value: string
): value is (typeof allowedInquiryActions)[number] {
  return (allowedInquiryActions as readonly string[]).includes(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function parsePayload(data: Record<string, unknown>): InquiryPayload {
  const requiredFields = [
    "inquiryAction",
    "studentName",
    "studentGrade",
    "interestLevel",
    "guardianName",
    "guardianEmail",
    "guardianPhone",
    "guardianContactPreference",
    "inquiryType",
    "inquiryTitle",
    "inquiryBody",
  ] as const;

  for (const field of requiredFields) {
    if (!isNonEmptyString(data[field])) {
      throw new Error(`Invalid or missing field: ${field}`);
    }
  }

  const cleanedFields = Object.fromEntries(
    requiredFields.map((field) => [field, (data[field] as string).trim()])
  ) as Record<(typeof requiredFields)[number], string>;

  const inquiryAction = cleanedFields.inquiryAction;
  if (!isAllowedInquiryAction(inquiryAction)) {
    throw new Error("Invalid inquiry action.");
  }

  if (typeof data.privacyConsent !== "boolean" || data.privacyConsent !== true) {
    throw new Error("privacyConsent must be true");
  }

  return {
    inquiryAction,
    studentName: cleanedFields.studentName,
    studentGrade: cleanedFields.studentGrade,
    interestLevel: cleanedFields.interestLevel,
    guardianName: cleanedFields.guardianName,
    guardianEmail: cleanedFields.guardianEmail,
    guardianPhone: cleanedFields.guardianPhone,
    guardianContactPreference: cleanedFields.guardianContactPreference,
    inquiryType: cleanedFields.inquiryType,
    inquiryTitle: cleanedFields.inquiryTitle,
    inquiryBody: cleanedFields.inquiryBody,
    privacyConsent: data.privacyConsent,
  } satisfies InquiryPayload;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  try {
    const payload = parsePayload((body ?? {}) as Record<string, unknown>);

    const supabase = createServiceRoleClient();
    const { error } = await supabase.from("inquiries").insert({
      inquiry_action: payload.inquiryAction,
      student_name: payload.studentName,
      student_grade: payload.studentGrade,
      interest_level: payload.interestLevel,
      guardian_name: payload.guardianName,
      guardian_email: payload.guardianEmail,
      guardian_phone: payload.guardianPhone,
      guardian_contact_preference: payload.guardianContactPreference,
      inquiry_type: payload.inquiryType,
      inquiry_title: payload.inquiryTitle,
      inquiry_body: payload.inquiryBody,
      privacy_consent: payload.privacyConsent,
    });

    if (error) {
      return NextResponse.json(
        { error: "Failed to store inquiry." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid payload." },
      { status: 400 }
    );
  }
}
