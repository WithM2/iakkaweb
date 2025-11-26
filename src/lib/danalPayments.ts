export const DANAL_TEST_CLIENT_KEY =
  "CL_TEST_I4d8FWYSSKl-42F7y3o9g_7iexSCyHbL8qthpZxPnpY=";

export const DANAL_SANDBOX_BASE_PARAMS = {
  orderName: "test_상품",
  amount: 10000,
  merchantId: "9810030930",
  successUrl: "https://developers.danalpay.com/sandbox/callback?status=success",
  failUrl: "https://developers.danalpay.com/sandbox/callback?status=fail",
  userId: "user@naver.com",
  userEmail: "user@naver.com",
  userName: "김다날",
} as const;

export type DanalPaymentsMethod =
  | "INTEGRATED"
  | "CARD"
  | "MOBILE"
  | "TRANSFER"
  | "VACCOUNT"
  | "PAYCO"
  | "KAKAOPAY"
  | "NAVERPAY"
  | "CULTURELAND"
  | "BOOK_AND_LIFE";

export type DanalPaymentRequest = {
  paymentsMethod: DanalPaymentsMethod;
  orderName: string;
  amount: number;
  merchantId: string;
  orderId: string;
  userId: string;
  successUrl: string;
  failUrl: string;
  userEmail?: string;
  userName?: string;
  [key: string]: unknown;
};

export type DanalPaymentsInstance = {
  requestPayment: (params: DanalPaymentRequest) => Promise<void>;
};

export type DanalPaymentsSDK = (clientKey: string) => DanalPaymentsInstance;

declare global {
  interface Window {
    DanalPayments?: DanalPaymentsSDK;
  }
}

export {};
