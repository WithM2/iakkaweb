import crypto from "node:crypto";

import { parseNameValuePairs, urlEncodeUtf8Value } from "./encoding";

type DanalReadyRequest = {
  orderId: string;
  amount: number;
  itemName: string;
  userId: string;
  userName: string;
  userPhone: string;
  userEmail?: string;
  userAgent: "PC" | "MW" | "MA" | "MI";
  bypassValue?: string;
};

type DanalReadyResponse = {
  startUrl: string;
  startParams: string;
};

const DEFAULT_READY_ENDPOINT = "https://tx-creditcard.danalpay.com/credit/Ready";

function getEnvValue(key: string) {
  const value = process.env[key];

  if (!value) {
    throw new Error(`${key} is not configured`);
  }

  return value;
}

function buildQueryString(payload: Record<string, string>) {
  return Object.entries(payload)
    .map(([key, value]) => `${key}=${urlEncodeUtf8Value(value)}`)
    .join("&");
}

function encryptPayload(payload: Record<string, string>, cryptoKey: string, iv: string) {
  const queryString = buildQueryString(payload);
  const keyBuffer = Buffer.from(cryptoKey, "hex");
  const ivBuffer = Buffer.from(iv, "hex");

  const cipher = crypto.createCipheriv("aes-256-cbc", keyBuffer, ivBuffer);
  const encrypted = Buffer.concat([cipher.update(queryString, "utf8"), cipher.final()]);
  const base64Encoded = encrypted.toString("base64");

  return encodeURIComponent(base64Encoded);
}

function buildReadyPayload(params: DanalReadyRequest) {
  const cancelUrl = getEnvValue("DANAL_REBILL_CANCEL_URL");
  const returnUrl = getEnvValue("DANAL_REBILL_RETURN_URL");
  const cpid = getEnvValue("DANAL_REBILL_CPID");
  const cryptoKey = getEnvValue("DANAL_REBILL_CRYPTO_KEY");
  const ivKey = getEnvValue("DANAL_REBILL_CRYPTO_IV");

  const readyData = encryptPayload(
    {
      TXTYPE: "AUTH",
      SERVICETYPE: "BATCH",
      ISBILL: "Y",
      ISNOTI: "N",
      CURRENCY: "410",
      ORDERID: params.orderId,
      ITEMNAME: params.itemName,
      AMOUNT: params.amount.toString(),
      USERNAME: params.userName,
      USERPHONE: params.userPhone,
      USEREMAIL: params.userEmail ?? "",
      USERID: params.userId,
      USERAGENT: params.userAgent,
      RETURNURL: returnUrl,
      CANCELURL: cancelUrl,
      BYPASSVALUE: params.bypassValue ?? "",
    },
    cryptoKey,
    ivKey,
  );

  const body = new URLSearchParams();
  body.set("CPID", cpid);
  const subCpid = process.env.DANAL_REBILL_SUBCPID;
  if (subCpid) {
    body.set("SUBCPID", subCpid);
  }
  body.set("DATA", readyData);

  return body.toString();
}

async function parseReadyResponse(response: Response) {
  const payloadText = await response.text();
  const parsed = parseNameValuePairs(payloadText);
  const returnCode = parsed.RETURNCODE;

  if (!returnCode) {
    throw new Error("다날 응답에서 결과코드를 찾을 수 없습니다.");
  }

  if (returnCode !== "0000") {
    const message = parsed.RETURNMSG || "다날 정기결제 초기인증 준비에 실패했습니다.";
    throw new Error(`${returnCode}: ${message}`);
  }

  const startUrl = parsed.STARTURL;
  const startParams = parsed.STARTPARAMS;

  if (!startUrl || !startParams) {
    throw new Error("다날 응답에 결제창 정보가 없습니다.");
  }

  return { startUrl, startParams } satisfies DanalReadyResponse;
}

export async function requestDanalReady(params: DanalReadyRequest) {
  const readyEndpoint = process.env.DANAL_REBILL_READY_ENDPOINT ?? DEFAULT_READY_ENDPOINT;
  const requestBody = buildReadyPayload(params);

  const response = await fetch(readyEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: requestBody,
  });

  if (!response.ok) {
    throw new Error("다날 정기결제 서버 응답이 올바르지 않습니다.");
  }

  return parseReadyResponse(response);
}
