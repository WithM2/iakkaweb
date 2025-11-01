import { NextResponse } from "next/server";

import { createServiceRoleClient } from "@/lib/supabase";

type RouteContext = {
  params: {
    id: string;
  };
};

export async function PATCH(request: Request, { params }: RouteContext) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: "유효한 문의 ID가 필요합니다." },
      { status: 400 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const { isCompleted } = (payload ?? {}) as { isCompleted?: unknown };

  if (typeof isCompleted !== "boolean") {
    return NextResponse.json(
      { error: "isCompleted 필드가 필요합니다." },
      { status: 400 }
    );
  }

  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("inquiries")
    .update({ is_completed: isCompleted })
    .eq("id", id)
    .select("id, is_completed")
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { error: "문의 상태를 업데이트하지 못했습니다." },
      { status: 500 }
    );
  }

  if (!data) {
    return NextResponse.json(
      { error: "해당 문의를 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  return NextResponse.json({ id: data.id, isCompleted: data.is_completed });
}
