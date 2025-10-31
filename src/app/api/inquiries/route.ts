import { NextResponse } from "next/server";

import { supabaseAdminClient } from "@/lib/supabase/admin";

type InquiryPayload = {
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

function isValidEmail(email: string) {
  return /.+@.+\..+/.test(email);
}

function normalizeString(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return "";
  return value.trim();
}

export async function POST(request: Request) {
  const body = await request.json();

  const payload: InquiryPayload = {
    studentName: normalizeString(body.studentName),
    studentGrade: normalizeString(body.studentGrade),
    interestLevel: normalizeString(body.interestLevel),
    guardianName: normalizeString(body.guardianName),
    guardianEmail: normalizeString(body.guardianEmail),
    guardianPhone: normalizeString(body.guardianPhone),
    guardianContactPreference: normalizeString(body.guardianContactPreference),
    inquiryType: normalizeString(body.inquiryType),
    inquiryTitle: normalizeString(body.inquiryTitle),
    inquiryBody: normalizeString(body.inquiryBody),
    privacyConsent: Boolean(body.privacyConsent),
  };

  const requiredFields: Array<keyof InquiryPayload> = [
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
  ];

  for (const field of requiredFields) {
    if (!payload[field]) {
      return NextResponse.json(
        { message: `필수 항목(${field})이 누락되었습니다.` },
        { status: 400 }
      );
    }
  }

  if (!payload.privacyConsent) {
    return NextResponse.json(
      { message: "개인정보 수집 동의가 필요합니다." },
      { status: 400 }
    );
  }

  if (!isValidEmail(payload.guardianEmail)) {
    return NextResponse.json(
      { message: "올바른 이메일 주소를 입력해 주세요." },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdminClient.from("inquiries").insert({
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
    console.error("Failed to insert inquiry", error);
    return NextResponse.json(
      { message: "문의 저장 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "문의가 접수되었습니다." }, { status: 201 });
}
