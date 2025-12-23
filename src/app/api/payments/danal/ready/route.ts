import { NextResponse } from "next/server";

import { requestDanalReady } from "@/lib/payments/danal/ready";
import { createServiceRoleClient } from "@/lib/supabase";
import type { MentoringPlanId } from "@/app/mentoring/apply/_config/mentoringPlans";

type ReadyPayload = {
  orderId?: string;
  amount?: number;
  itemName?: string;
  userId?: string;
  userName?: string;
  userPhone?: string;
  userEmail?: string;
  userAgent?: "PC" | "MW" | "MA" | "MI";
  bypassValue?: string;
  planId?: MentoringPlanId;
};

function resolvePlanId(planId?: string): MentoringPlanId {
  return planId === "standard" || planId === "plus" ? planId : "plus";
}

export async function POST(request: Request) {
  const body = (await request.json()) as ReadyPayload;
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const inferredOrigin = origin || (referer ? new URL(referer).origin : undefined);
  const planId = resolvePlanId(body.planId);

  const cancelUrl = inferredOrigin
    ? `${inferredOrigin}/mentoring/apply/subscribe?plan=${planId}&payment=cancel`
    : undefined;
  const returnUrl = inferredOrigin
    ? `${inferredOrigin}/mentoring/apply/subscribe?plan=${planId}&payment=success`
    : undefined;

  if (!body.orderId || !body.amount || !body.itemName) {
    return NextResponse.json(
      { error: "주문 정보가 올바르지 않습니다." },
      { status: 400 },
    );
  }

  if (!body.userId || !body.userName || !body.userPhone || !body.userAgent) {
    return NextResponse.json(
      { error: "필수 고객 정보가 누락되었습니다." },
      { status: 400 },
    );
  }

  try {
    const readyResponse = await requestDanalReady(
      {
        orderId: body.orderId,
        amount: body.amount,
        itemName: body.itemName,
        userId: body.userId,
        userName: body.userName,
        userPhone: body.userPhone,
        userEmail: body.userEmail,
        userAgent: body.userAgent,
        bypassValue: body.bypassValue,
      },
      { cancelUrl, returnUrl },
    );

    const supabase = createServiceRoleClient();
    const { error } = await supabase.from("payments").insert({
      order_id: body.orderId,
      plan_id: planId,
      amount: body.amount,
      item_name: body.itemName,
      user_id: body.userId,
      user_name: body.userName,
      user_phone: body.userPhone,
      user_email: body.userEmail ?? null,
      user_agent: body.userAgent,
      bypass_value: body.bypassValue ?? null,
      danal_start_url: readyResponse.startUrl,
      danal_start_params: readyResponse.startParams,
    });

    if (error) {
      return NextResponse.json(
        { error: "결제 정보를 저장하지 못했습니다." },
        { status: 500 },
      );
    }

    return NextResponse.json(readyResponse);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "다날 정기결제 초기인증 처리 중 오류가 발생했습니다.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
