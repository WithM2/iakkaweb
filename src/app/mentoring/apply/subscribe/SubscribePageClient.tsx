"use client";

import { useMemo, useState } from "react";
import type {
  ChangeEvent,
  FormEvent,
  InputHTMLAttributes,
  ReactNode,
} from "react";

import type { MentoringPlanDetails, MentoringPlanId } from "./page";

type DanalReadyResponse = {
  startUrl: string;
  startParams: string;
};

type SubscribePageClientProps = {
  planId: MentoringPlanId;
  selectedPlan: MentoringPlanDetails;
  finalAmount: number;
};

type TouchedState = {
  ordererName: boolean;
  contact: boolean;
  email: boolean;
};

const formatCurrency = (value: number) => `${value.toLocaleString("ko-KR")}원`;

const getNameError = (value: string) => {
  if (!value.trim()) {
    return "이름을 입력해주세요.";
  }

  return "";
};

const getContactError = (value: string) => {
  if (!value.trim()) {
    return "연락처를 입력해주세요.";
  }

  if (!/^\d{10,11}$/.test(value)) {
    return "연락처는 숫자만 포함한 10~11자리로 입력해주세요.";
  }

  return "";
};

const getEmailError = (value: string) => {
  if (!value.trim()) {
    return "이메일을 입력해주세요.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(value)) {
    return "올바른 이메일 주소를 입력해주세요.";
  }

  return "";
};

const getUserAgentType = (): "PC" | "MW" | "MA" | "MI" => {
  if (typeof navigator === "undefined") {
    return "PC";
  }

  const userAgent = navigator.userAgent;
  return /Mobi|Android/i.test(userAgent) ? "MW" : "PC";
};

const buildBypassValue = ({
  studentName,
  studentPhone,
}: {
  studentName: string;
  studentPhone: string;
}) => {
  const entries = [
    studentName ? `StudentName=${studentName}` : "",
    studentPhone ? `StudentPhone=${studentPhone}` : "",
  ].filter(Boolean);

  return entries.length > 0 ? `${entries.join(";")};` : "";
};

const openDanalPaymentWindow = (startUrl: string, startParams: string) => {
  const contentWidth = Math.min(window.innerWidth - 40, 680);
  const contentHeight = Math.min(window.innerHeight - 80, 960);
  const paymentWindow = window.open(
    "",
    "danalPaymentWindow",
    `width=${contentWidth},height=${contentHeight},resizable=yes,scrollbars=yes`,
  );
  const form = document.createElement("form");
  form.method = "POST";
  form.action = startUrl;
  form.target = "danalPaymentWindow";

  const startParamsInput = document.createElement("input");
  startParamsInput.type = "hidden";
  startParamsInput.name = "STARTPARAMS";
  startParamsInput.value = startParams;
  form.appendChild(startParamsInput);

  document.body.appendChild(form);
  paymentWindow?.focus();
  form.submit();
  form.remove();
};

export default function SubscribePageClient({
  planId,
  selectedPlan,
  finalAmount,
}: SubscribePageClientProps) {
  const [ordererName, setOrdererName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [agreeRequired, setAgreeRequired] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const [touched, setTouched] = useState<TouchedState>({
    ordererName: false,
    contact: false,
    email: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nameError =
    touched.ordererName || isSubmitted ? getNameError(ordererName) : "";
  const contactError =
    touched.contact || isSubmitted ? getContactError(contact) : "";
  const emailError = touched.email || isSubmitted ? getEmailError(email) : "";
  const requiredAgreementError =
    isSubmitted && !agreeRequired ? "필수 약관에 동의해주세요." : "";

  const isPaymentEnabled = useMemo(() => {
    return (
      !getNameError(ordererName) &&
      !getContactError(contact) &&
      !getEmailError(email) &&
      agreeRequired
    );
  }, [ordererName, contact, email, agreeRequired]);

  const handleBlur = (field: keyof TouchedState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleContactChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = event.target.value.replace(/[^\d]/g, "");
    setContact(digitsOnly);
    setTouched((prev) => ({ ...prev, contact: true }));
  };

  const handlePayment = async () => {
    const nameValidation = getNameError(ordererName);
    const contactValidation = getContactError(contact);
    const emailValidation = getEmailError(email);

    setIsSubmitted(true);
    setTouched({ ordererName: true, contact: true, email: true });

    if (
      nameValidation ||
      contactValidation ||
      emailValidation ||
      !agreeRequired
    ) {
      return;
    }

    setIsProcessingPayment(true);
    setPaymentError(null);

    try {
      const userAgentType = getUserAgentType();
      const response = await fetch("/api/payments/danal/ready", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: `mentoring-${planId}-${Date.now()}`,
          amount: finalAmount,
          itemName: selectedPlan.displayName,
          userId: `${planId}-${contact}`,
          userName: ordererName,
          userPhone: contact,
          userEmail: email,
          userAgent: userAgentType,
          bypassValue: buildBypassValue({ studentName, studentPhone }),
          planId,
        }),
      });

      if (!response.ok) {
        const { error } = (await response.json()) as { error?: string };
        throw new Error(error || "결제 모듈 호출에 실패했습니다.");
      }

      const readyResponse = (await response.json()) as DanalReadyResponse;
      openDanalPaymentWindow(readyResponse.startUrl, readyResponse.startParams);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "결제 모듈 호출 중 오류가 발생했습니다.";
      setPaymentError(message);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handlePayment();
  };

  return (
    <main className="bg-white">
      <section className="mx-auto w-full max-w-[1200px] px-5 py-16 md:px-6 md:py-24">
        <div className="space-y-12 md:space-y-16">
          <header className="space-y-4">
            <div className="space-y-3">
              <h1 className="text-[32px] font-bold tracking-[-0.01em] text-ink-900 md:text-[44px]">
                결제하기
              </h1>
              <p className="text-[14px] leading-[24px] text-ink-900/70 md:text-[16px] md:leading-[26px]">
                구독 정보를 확인하고 결제자, 학생 연락처 정보를 입력해주세요.
              </p>
            </div>
          </header>

          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_320px] md:items-start">
            <form className="space-y-10" noValidate onSubmit={handleSubmit}>
              <section className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-[18px] font-semibold text-ink-900 md:text-[20px]">
                    결제 상품 정보
                  </h2>
                  <p className="text-[13px] leading-[22px] text-ink-900/60 md:text-[14px] md:leading-[24px]">
                    구독할 멘토링 상품을 확인해주세요.
                  </p>
                </div>

                <div className="space-y-4 text-[14px] leading-[24px] text-ink-900/80 md:text-[15px] md:leading-[26px]">
                  <div className="flex flex-wrap items-center gap-2 text-ink-900">
                    <span className="text-[12px] font-semibold text-main-600">
                      {planId === "plus" ? "추천" : "정규"}
                    </span>
                    <h3 className="text-[20px] font-bold md:text-[22px]">
                      {selectedPlan.displayName}
                    </h3>
                  </div>
                  <p>{selectedPlan.subtitle}</p>

                  <ul className="list-disc space-y-1 pl-5 text-[13px] leading-[22px] text-ink-900/70 md:text-[14px] md:leading-[24px]">
                    {selectedPlan.benefits.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-[18px] font-semibold text-ink-900 md:text-[20px]">
                    주문자 정보 입력
                  </h2>
                  <p className="text-[13px] leading-[22px] text-ink-900/60 md:text-[14px] md:leading-[24px]">
                    결제 진행을 위해 주문자 정보를 입력해주세요.
                  </p>
                </div>

                <div className="space-y-5">
                  <Field
                    label="이름"
                    placeholder="주문하시는 분의 이름을 입력해주세요."
                    value={ordererName}
                    onChange={(event) => setOrdererName(event.target.value)}
                    onBlur={() => handleBlur("ordererName")}
                    error={nameError}
                    required
                  />
                  <Field
                    label="연락처"
                    placeholder="휴대폰 번호를 입력해주세요."
                    type="tel"
                    inputMode="numeric"
                    maxLength={11}
                    value={contact}
                    onChange={handleContactChange}
                    onBlur={() => handleBlur("contact")}
                    error={contactError}
                    required
                  />
                  <Field
                    label="이메일"
                    placeholder="영수증을 받을 이메일 주소를 입력해주세요."
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    onBlur={() => handleBlur("email")}
                    error={emailError}
                    required
                  />
                </div>
              </section>

              <section className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-[18px] font-semibold text-ink-900 md:text-[20px]">
                    학생 정보 입력
                  </h2>
                  <p className="text-[13px] leading-[22px] text-ink-900/60 md:text-[14px] md:leading-[24px]">
                    수업을 듣는 학생의 이름과 휴대전화 번호를 입력해주세요.
                  </p>
                </div>

                <div className="space-y-5">
                  <Field
                    label="이름"
                    placeholder="학생 이름을 입력해주세요."
                    value={studentName}
                    onChange={(event) => setStudentName(event.target.value)}
                  />
                  <Field
                    label="학생 휴대전화"
                    placeholder="학생의 휴대폰 번호를 입력해주세요."
                    type="tel"
                    inputMode="numeric"
                    maxLength={11}
                    value={studentPhone}
                    onChange={(event) => {
                      const digitsOnly = event.target.value.replace(
                        /[^\d]/g,
                        ""
                      );
                      setStudentPhone(digitsOnly);
                    }}
                  />
                </div>
              </section>

              <section className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-[18px] font-semibold text-ink-900 md:text-[20px]">
                    약관 동의
                  </h2>
                  <p className="text-[13px] leading-[22px] text-ink-900/60 md:text-[14px] md:leading-[24px]">
                    결제 진행을 위해 약관에 동의해주세요.
                  </p>
                </div>

                <div className="space-y-4 text-[14px] leading-[24px] text-ink-900/80">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-main-600 focus:ring-main-300"
                      checked={agreeRequired}
                      onChange={(event) =>
                        setAgreeRequired(event.target.checked)
                      }
                      required
                    />
                    <span>
                      (필수) 서비스 이용약관 및 개인정보 수집·이용에 동의합니다.
                    </span>
                  </label>
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-main-600 focus:ring-main-300"
                      checked={agreeMarketing}
                      onChange={(event) =>
                        setAgreeMarketing(event.target.checked)
                      }
                    />
                    <span>
                      (선택) 이벤트 및 프로그램 안내 수신에 동의합니다.
                    </span>
                  </label>
                  {requiredAgreementError ? (
                    <p className="text-[12px] leading-[20px] text-red-500">
                      {requiredAgreementError}
                    </p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  disabled={!isPaymentEnabled || isProcessingPayment}
                  className={`inline-flex w-full items-center justify-center rounded-[16px] px-6 py-4 text-[16px] font-semibold transition-colors duration-200 ${
                    isPaymentEnabled && !isProcessingPayment
                      ? "bg-main-600 text-white hover:bg-main-600/90"
                      : "bg-gray-200 text-ink-900/40"
                  }`}
                >
                  {isProcessingPayment ? "결제창 준비중" : "결제하기"}
                </button>
              </section>
            </form>

            <aside className="space-y-6 md:sticky md:top-32 md:h-fit md:self-start">
              <div className="rounded-[24px] border border-gray-100 bg-white p-6 shadow-[0_24px_80px_rgba(9,30,66,0.08)] md:p-7">
                <h2 className="text-[18px] font-semibold text-ink-900 md:text-[20px]">
                  결제 금액
                </h2>

                <div className="mt-6 space-y-4 text-[14px] leading-[24px] text-ink-900/80 md:text-[15px]">
                  <SummaryRow
                    label="상품 금액"
                    value={formatCurrency(selectedPlan.baseAmount)}
                  />
                  <SummaryRow
                    label="할인 금액"
                    value={
                      selectedPlan.discountAmount > 0
                        ? `-${formatCurrency(selectedPlan.discountAmount)}`
                        : formatCurrency(0)
                    }
                  />
                </div>

                <div className="mt-6 rounded-[18px] bg-main-100 px-4 py-4">
                  <div className="flex items-center justify-between text-[16px] font-semibold text-main-800 md:text-[18px]">
                    <span>총 결제 금액</span>
                    <span>{formatCurrency(finalAmount)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={!isPaymentEnabled || isProcessingPayment}
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-[14px] px-5 py-3 text-[15px] font-semibold transition-colors duration-200 ${
                    isPaymentEnabled && !isProcessingPayment
                      ? "bg-main-600 text-white hover:bg-main-600/90"
                      : "bg-gray-200 text-ink-900/40"
                  }`}
                  onClick={() => void handlePayment()}
                >
                  {isProcessingPayment ? "결제창 준비중" : "결제하기"}
                </button>
              </div>

              {paymentError ? (
                <p className="text-[12px] leading-[20px] text-red-500">
                  {paymentError}
                </p>
              ) : null}

              <p className="text-[12px] leading-[20px] text-ink-900/50 md:text-[13px]">
                결제 완료 후 담당 매니저가 안내 문자를 드립니다. 문의 사항이
                있다면 언제든지 연락해주세요.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  trailing?: ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "children">;

function Field({ label, error, trailing, ...inputProps }: FieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[14px] font-semibold text-ink-900 md:text-[15px]">
        {label}
      </span>
      <div className="flex items-center gap-3">
        <input
          {...inputProps}
          className={`w-full rounded-[12px] border px-4 py-3 text-[15px] leading-[24px] text-ink-900 placeholder:text-ink-900/40 focus:border-main-400 focus:outline-none ${
            error ? "border-red-300" : "border-gray-200"
          } ${inputProps.disabled ? "bg-gray-50" : "bg-white"}`}
        />
        {trailing ? <div className="flex-shrink-0">{trailing}</div> : null}
      </div>
      {error ? (
        <span className="text-[12px] leading-[20px] text-red-500">{error}</span>
      ) : null}
    </label>
  );
}

type SummaryRowProps = {
  label: string;
  value: string;
};

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between text-ink-900">
      <span className="text-[14px] font-medium md:text-[15px]">{label}</span>
      <span className="text-[14px] font-semibold md:text-[15px]">{value}</span>
    </div>
  );
}
