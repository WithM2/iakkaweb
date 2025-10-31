import { NextResponse } from "next/server";

import { createServiceRoleClient } from "@/lib/supabase";

type PartnershipInquiryPayload = {
  organizationName: string;
  contactName: string;
  contactEmail: string;
  inquiryType: string;
  inquiryTitle: string;
  inquiryBody: string;
  privacyConsent: boolean;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function parsePayload(data: Record<string, unknown>): PartnershipInquiryPayload {
  const requiredFields = [
    "organizationName",
    "contactName",
    "contactEmail",
    "inquiryType",
    "inquiryTitle",
    "inquiryBody",
  ] as const;

  for (const field of requiredFields) {
    if (!isNonEmptyString(data[field])) {
      throw new Error(`Invalid or missing field: ${field}`);
    }
  }

  if (typeof data.privacyConsent !== "boolean" || data.privacyConsent !== true) {
    throw new Error("privacyConsent must be true");
  }

  return {
    organizationName: data.organizationName.trim(),
    contactName: data.contactName.trim(),
    contactEmail: data.contactEmail.trim(),
    inquiryType: data.inquiryType.trim(),
    inquiryTitle: data.inquiryTitle.trim(),
    inquiryBody: data.inquiryBody.trim(),
    privacyConsent: data.privacyConsent,
  } satisfies PartnershipInquiryPayload;
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
    const { error } = await supabase.from("partnership_inquiries").insert({
      organization_name: payload.organizationName,
      contact_name: payload.contactName,
      contact_email: payload.contactEmail,
      inquiry_type: payload.inquiryType,
      inquiry_title: payload.inquiryTitle,
      inquiry_body: payload.inquiryBody,
      privacy_consent: payload.privacyConsent,
    });

    if (error) {
      return NextResponse.json(
        { error: "Failed to store partnership inquiry." },
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
