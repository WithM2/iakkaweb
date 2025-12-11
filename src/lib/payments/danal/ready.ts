import crypto from "node:crypto";

import {
  decodePercentEncodedEucKr,
  encodeEucKrString,
  parseNameValuePairs,
  urlEncodeEucKrValue,
} from "./encoding";

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

type DanalReadyOptions = {
  cancelUrl?: string;
  returnUrl?: string;
};

const DEFAULT_READY_ENDPOINT =
  "https://tx-creditcard.danalpay.com/credit/Ready";

const readyResponseDecoder = new TextDecoder("euc-kr");

function getEnvValue(key: string) {
  const value = process.env[key];

  if (!value) {
    throw new Error(`${key} is not configured`);
  }

  return value;
}

function resolveCallbackUrl(key: string, fallback?: string) {
  const envValue = process.env[key];

  if (envValue) {
    const resolved = new URL(envValue);

    if (fallback) {
      const fallbackUrl = new URL(fallback);
      const plan = fallbackUrl.searchParams.get("plan");
      const payment = fallbackUrl.searchParams.get("payment");

      if (plan) {
        resolved.searchParams.set("plan", plan);
      }
      if (payment) {
        resolved.searchParams.set("payment", payment);
      }
    }

    return resolved.toString();
  }

  if (fallback) {
    return fallback;
  }

  throw new Error(`${key} is not configured`);
}

function buildQueryString(payload: Record<string, string>) {
  return Object.entries(payload)
    .map(([key, value]) => `${key}=${urlEncodeEucKrValue(value)}`)
    .join("&");
}

function encryptPayload(
  payload: Record<string, string>,
  cryptoKey: string,
  iv: string
) {
  const queryString = buildQueryString(payload);
  const queryStringBytes = encodeEucKrString(queryString);
  const keyBuffer = Buffer.from(cryptoKey, "hex");
  const ivBuffer = Buffer.from(iv, "hex");

  const cipher = crypto.createCipheriv("aes-256-cbc", keyBuffer, ivBuffer);
  const encrypted = Buffer.concat([
    cipher.update(queryStringBytes),
    cipher.final(),
  ]);
  const base64Encoded = encrypted.toString("base64");

  return base64Encoded;
}

function buildReadyPayload(
  params: DanalReadyRequest,
  options: DanalReadyOptions = {}
) {
  const cancelUrl = resolveCallbackUrl(
    "DANAL_REBILL_CANCEL_URL",
    options.cancelUrl
  );
  const returnUrl = resolveCallbackUrl(
    "DANAL_REBILL_RETURN_URL",
    options.returnUrl
  );
  const cpid = getEnvValue("DANAL_REBILL_CPID");
  const cryptoKey = getEnvValue("DANAL_REBILL_CRYPTO_KEY");
  const ivKey = getEnvValue("DANAL_REBILL_CRYPTO_IV");
  const cpPwd = process.env.DANAL_REBILL_CPPWD;

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
    ivKey
  );

  const body = new URLSearchParams();
  body.set("CPID", cpid);
  const subCpid = process.env.DANAL_REBILL_SUBCPID;
  if (subCpid) {
    body.set("SUBCPID", subCpid);
  }
  if (cpPwd) {
    body.set("CPPWD", cpPwd);
  }
  body.set("DATA", readyData);

  return body.toString();
}

function decryptReadyData(encryptedData: string) {
  const cryptoKey = getEnvValue("DANAL_REBILL_CRYPTO_KEY");
  const ivKey = getEnvValue("DANAL_REBILL_CRYPTO_IV");

  const decodedData = decodePercentEncodedEucKr(encryptedData);
  const encryptedBuffer = Buffer.from(decodedData, "base64");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(cryptoKey, "hex"),
    Buffer.from(ivKey, "hex")
  );
  const decrypted = Buffer.concat([
    decipher.update(encryptedBuffer),
    decipher.final(),
  ]);

  return readyResponseDecoder.decode(decrypted);
}

async function parseReadyResponse(response: Response) {
  const payloadText = await response.text();
  const parsed = parseNameValuePairs(payloadText);
  let decryptedResponse: string | undefined;
  if (parsed.DATA) {
    try {
      decryptedResponse = decryptReadyData(parsed.DATA);
    } catch (error) {
      console.warn("다날 DATA 필드 복호화 실패", error);
    }
  }

  const merged = {
    ...parsed,
    ...(decryptedResponse ? parseNameValuePairs(decryptedResponse) : {}),
  };
  const returnCode = merged.RETURNCODE;

  if (!returnCode) {
    const trimmedPayload = payloadText.trim();
    const hints = [] as string[];
    if (trimmedPayload.length > 0) {
      hints.push(`다날 응답을 확인하세요: ${trimmedPayload}`);
    }
    if (decryptedResponse) {
      const trimmedDecrypted = decryptedResponse.trim();
      if (trimmedDecrypted.length > 0) {
        hints.push(`복호화된 응답: ${trimmedDecrypted}`);
      }
    }
    const responseHint =
      hints.length > 0 ? hints.join(" | ") : "다날 응답이 비어 있습니다.";

    throw new Error(
      `다날 응답에서 결과코드를 찾을 수 없습니다. ${responseHint}`,
    );
  }

  if (returnCode !== "0000") {
    const message =
      merged.RETURNMSG || "다날 정기결제 초기인증 준비에 실패했습니다.";
    throw new Error(`${returnCode}: ${message}`);
  }

  const startUrl = merged.STARTURL;
  const startParams = merged.STARTPARAMS;

  if (!startUrl || !startParams) {
    throw new Error("다날 응답에 결제창 정보가 없습니다.");
  }

  return { startUrl, startParams } satisfies DanalReadyResponse;
}

export async function requestDanalReady(
  params: DanalReadyRequest,
  options: DanalReadyOptions = {}
) {
  const readyEndpoint =
    process.env.DANAL_REBILL_READY_ENDPOINT ?? DEFAULT_READY_ENDPOINT;
  const requestBody = buildReadyPayload(params, options);

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
