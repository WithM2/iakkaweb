import { NextResponse } from "next/server";

import { requestDanalReady } from "@/lib/payments/danal/ready";

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
};

export async function POST(request: Request) {
  const body = (await request.json()) as ReadyPayload;

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
    const readyResponse = await requestDanalReady({
      orderId: body.orderId,
      amount: body.amount,
      itemName: body.itemName,
      userId: body.userId,
      userName: body.userName,
      userPhone: body.userPhone,
      userEmail: body.userEmail,
      userAgent: body.userAgent,
      bypassValue: body.bypassValue,
    });

    return NextResponse.json(readyResponse);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "다날 정기결제 초기인증 처리 중 오류가 발생했습니다.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
