type DanalPaymentRequest = {
  redirectUrl?: string;
  [key: string]: unknown;
};

type DanalPayments = {
  requestPayment: (request: DanalPaymentRequest) => Promise<void> | void;
};

type LoadOptions = {
  clientKey: string;
};

declare global {
  interface Window {
    danalPayments?: DanalPayments;
    DanalPayments?: DanalPayments;
  }
}

const SDK_URL = "https://static.danalpay.com/d1/sdk/index.js";

const insertSDKScript = () => {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("다날 결제 SDK는 브라우저에서만 사용할 수 있습니다."));
  }

  const existingScript = document.querySelector<HTMLScriptElement>(
    `script[src="${SDK_URL}"]`,
  );

  if (existingScript?.dataset.loaded === "true") {
    return Promise.resolve();
  }

  if (existingScript) {
    return new Promise<void>((resolve, reject) => {
      existingScript.addEventListener("load", () => {
        existingScript.dataset.loaded = "true";
        resolve();
      });
      existingScript.addEventListener("error", () => {
        reject(new Error("다날 결제 SDK 스크립트를 불러오지 못했습니다."));
      });
    });
  }

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SDK_URL;
    script.async = true;
    script.dataset.loaded = "false";

    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };

    script.onerror = () => {
      reject(new Error("다날 결제 SDK 스크립트를 불러오지 못했습니다."));
    };

    document.head.append(script);
  });
};

let sdkPromise: Promise<DanalPayments> | null = null;

export function loadDanalPaymentsSDK(options: LoadOptions) {
  const { clientKey } = options;

  if (!clientKey) {
    return Promise.reject(new Error("다날 결제 클라이언트 키가 설정되지 않았습니다."));
  }

  if (sdkPromise) {
    return sdkPromise;
  }

  sdkPromise = (async () => {
    await insertSDKScript();

    const globalSDK = window.danalPayments || window.DanalPayments;

    if (globalSDK?.requestPayment) {
      return globalSDK;
    }

    return {
      requestPayment: async (request: DanalPaymentRequest) => {
        if (!request.redirectUrl) {
          throw new Error("redirectUrl이 없어 결제를 시작할 수 없습니다.");
        }

        window.location.href = request.redirectUrl;
      },
    } satisfies DanalPayments;
  })();

  return sdkPromise;
}
