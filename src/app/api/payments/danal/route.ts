import { NextResponse } from "next/server";

type DanalPaymentRequest = {
  amount: number;
  planId: string;
  planName: string;
  ordererName: string;
  contact: string;
  email: string;
  studentName?: string;
  studentPhone?: string;
  agreeMarketing?: boolean;
};

type DanalReadyResponse = {
  NextURL?: string;
  PaymentURL?: string;
  StartURL?: string;
  returnUrl?: string;
  TID?: string;
  tid?: string;
};

const requiredEnv = {
  readyEndpoint: process.env.DANAL_READY_ENDPOINT,
  merchantId: process.env.DANAL_MERCHANT_ID,
  apiKey: process.env.DANAL_API_KEY,
  returnUrl: process.env.DANAL_RETURN_URL,
};

const missingEnvKeys = Object.entries(requiredEnv)
  .filter(([, value]) => !value)
  .map(([key]) => key);

export async function POST(request: Request) {
  if (missingEnvKeys.length > 0) {
    return NextResponse.json(
      {
        message: `환경 변수(${missingEnvKeys.join(", ")}) 설정을 확인해주세요.`,
      },
      { status: 500 },
    );
  }

  let payload: DanalPaymentRequest;

  try {
    payload = (await request.json()) as DanalPaymentRequest;
  } catch (error) {
    return NextResponse.json(
      { message: "요청 본문을 읽을 수 없습니다.", detail: String(error) },
      { status: 400 },
    );
  }

  if (!payload.amount || typeof payload.amount !== "number" || payload.amount <= 0) {
    return NextResponse.json(
      { message: "결제 금액이 올바르지 않습니다." },
      { status: 400 },
    );
  }

  if (!payload.ordererName?.trim() || !payload.contact?.trim() || !payload.email?.trim()) {
    return NextResponse.json(
      { message: "주문자 정보를 모두 입력해주세요." },
      { status: 400 },
    );
  }

  const orderId = `MENTORING-${Date.now()}`;

  const readyRequestBody = {
    MID: requiredEnv.merchantId,
    Amt: payload.amount,
    BuyerName: payload.ordererName,
    BuyerTel: payload.contact,
    BuyerEmail: payload.email,
    GoodsName: payload.planName,
    ReturnURL: requiredEnv.returnUrl,
    CancelURL: process.env.DANAL_CANCEL_URL ?? requiredEnv.returnUrl,
    OrderID: orderId,
    ItemCode: payload.planId,
    UserInfo: {
      studentName: payload.studentName,
      studentPhone: payload.studentPhone,
      agreeMarketing: payload.agreeMarketing,
    },
  };

  const authorization = Buffer.from(
    `${requiredEnv.merchantId}:${requiredEnv.apiKey}`,
    "utf-8",
  ).toString("base64");

  try {
    const danalResponse = await fetch(requiredEnv.readyEndpoint as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authorization}`,
      },
      body: JSON.stringify(readyRequestBody),
    });

    const responseText = await danalResponse.text();
    let parsedResponse: DanalReadyResponse | string = responseText;

    try {
      parsedResponse = JSON.parse(responseText) as DanalReadyResponse;
    } catch {
      parsedResponse = responseText;
    }

    if (!danalResponse.ok) {
      return NextResponse.json(
        {
          message: "다날 결제 연동 중 오류가 발생했습니다.",
          detail: parsedResponse,
        },
        { status: danalResponse.status || 502 },
      );
    }

    const readyResponse = parsedResponse as DanalReadyResponse;
    const redirectUrl =
      readyResponse.NextURL ||
      readyResponse.PaymentURL ||
      readyResponse.StartURL ||
      readyResponse.returnUrl;

    if (!redirectUrl) {
      return NextResponse.json(
        { message: "결제 페이지 주소를 받아오지 못했습니다." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      redirectUrl,
      transactionId: readyResponse.TID ?? readyResponse.tid ?? orderId,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "결제 연동 중 예기치 못한 오류가 발생했습니다.",
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 502 },
    );
  }
}
