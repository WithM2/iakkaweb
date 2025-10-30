"use client";

import { useMemo, useState } from "react";
import type {
  ChangeEvent,
  FormEvent,
  InputHTMLAttributes,
  ReactNode,
} from "react";

import type { MentoringPlanDetails, MentoringPlanId } from "./page";

type TossPaymentsInitializer = (clientKey: string) => TossPaymentsInstance;

type TossPaymentsInstance = {
  requestPayment: (method: "CARD" | "VIRTUAL_ACCOUNT", options: TossPaymentOptions) => Promise<void>;
};

type TossPaymentOptions = {
  amount: number;
  orderId: string;
  orderName: string;
  customerName?: string;
  customerEmail?: string;
  customerMobilePhone?: string;
  successUrl: string;
  failUrl: string;
};

declare global {
  interface Window {
    TossPayments?: TossPaymentsInitializer;
  }
}

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

export default function SubscribePageClient({
  planId,
  selectedPlan,
  finalAmount,
}: SubscribePageClientProps) {
  const [ordererName, setOrdererName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentSchool, setStudentSchool] = useState("");
  const [studentGrade, setStudentGrade] = useState("");
  const [studentInterest, setStudentInterest] = useState("");
  const [agreeRequired, setAgreeRequired] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  const [touched, setTouched] = useState<TouchedState>({
    ordererName: false,
    contact: false,
    email: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [contactVerificationError, setContactVerificationError] = useState<string>("");
  const [contactVerificationMessage, setContactVerificationMessage] = useState<string>("");
  const [isContactVerified, setIsContactVerified] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const nameError = (touched.ordererName || isSubmitted) ? getNameError(ordererName) : "";
  const contactError = (touched.contact || isSubmitted) ? getContactError(contact) : "";
  const emailError = (touched.email || isSubmitted) ? getEmailError(email) : "";
  const requiredAgreementError = isSubmitted && !agreeRequired ? "필수 약관에 동의해주세요." : "";

  const isPaymentEnabled = useMemo(() => {
    return (
      !getNameError(ordererName) &&
      !getContactError(contact) &&
      !getEmailError(email) &&
      agreeRequired &&
      isContactVerified
    );
  }, [ordererName, contact, email, agreeRequired, isContactVerified]);

  const tossClientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY ?? "";

  const handleBlur = (field: keyof TouchedState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleContactChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = event.target.value.replace(/[^\d]/g, "");
    setContact(digitsOnly);
    setTouched((prev) => ({ ...prev, contact: true }));
    if (isContactVerified) {
      setIsContactVerified(false);
    }
    setIsCodeSent(false);
    setVerificationCode("");
    setEnteredCode("");
    setContactVerificationError("");
    setContactVerificationMessage("");
    setPaymentError("");
  };

  const requestVerificationCode = () => {
    const error = getContactError(contact);
    setTouched((prev) => ({ ...prev, contact: true }));

    if (error) {
      setContactVerificationError("");
      setContactVerificationMessage("");
      setIsCodeSent(false);
      setVerificationCode("");
      return;
    }

    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(generatedCode);
    setIsCodeSent(true);
    setIsContactVerified(false);
    setContactVerificationError("");
    setContactVerificationMessage(`인증번호가 발송되었습니다. (테스트용 코드: ${generatedCode})`);
    setEnteredCode("");
    setPaymentError("");
  };

  const verifyCode = () => {
    if (!enteredCode.trim()) {
      setContactVerificationError("인증번호를 입력해주세요.");
      setContactVerificationMessage("");
      return;
    }

    if (enteredCode !== verificationCode) {
      setContactVerificationError("인증번호가 일치하지 않습니다.");
      setContactVerificationMessage("");
      return;
    }

    setIsContactVerified(true);
    setContactVerificationError("");
    setContactVerificationMessage("연락처 인증이 완료되었습니다.");
    setPaymentError("");
  };

  const validateBeforePayment = () => {
    setIsSubmitted(true);
    setTouched({ ordererName: true, contact: true, email: true });

    const contactValidation = getContactError(contact);

    if (contactValidation) {
      setContactVerificationError("");
      setContactVerificationMessage("");
      return false;
    }

    if (!isContactVerified) {
      if (isCodeSent) {
        setContactVerificationError("연락처 인증을 완료해주세요.");
      } else {
        setContactVerificationMessage("연락처 인증을 완료해주세요.");
      }
      return false;
    }

    return (
      !getNameError(ordererName) &&
      !getEmailError(email) &&
      agreeRequired &&
      isContactVerified
    );
  };

  const initializeTossPayments = async () => {
    if (!tossClientKey) {
      throw new Error("토스페이먼츠 클라이언트 키가 설정되어 있지 않습니다.");
    }

    await loadTossPaymentsScript();

    if (typeof window.TossPayments !== "function") {
      throw new Error("토스페이먼츠 결제 모듈을 불러오지 못했습니다.");
    }

    return window.TossPayments(tossClientKey);
  };

  const attemptPayment = async () => {
    const isValid = validateBeforePayment();

    if (!isValid) {
      return;
    }

    try {
      setPaymentError("");
      setIsPaymentProcessing(true);

      const tossPayments = await initializeTossPayments();
      const orderId = `MENTORING-${Date.now()}`;
      const baseUrl = window.location.origin;

      await tossPayments.requestPayment("CARD", {
        amount: finalAmount,
        orderId,
        orderName: selectedPlan.displayName,
        customerName: ordererName,
        customerEmail: email,
        customerMobilePhone: contact,
        successUrl: `${baseUrl}/mentoring/apply/subscribe/success`,
        failUrl: `${baseUrl}/mentoring/apply/subscribe/fail`,
      });
    } catch (error) {
      if (error instanceof Error) {
        setPaymentError(error.message);
      } else {
        setPaymentError("결제 창을 여는 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsPaymentProcessing(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void attemptPayment();
  };

  const canAttemptPayment = isPaymentEnabled && !isPaymentProcessing;

  return (
    <main className="bg-white">
      <section className="mx-auto w-full max-w-[1200px] px-5 py-16 md:px-6 md:py-24">
        <div className="space-y-12 md:space-y-16">
          <header className="space-y-4">
            <div className="space-y-3">
              <p className="text-[14px] font-semibold uppercase tracking-[0.18em] text-main-600">결제 정보 입력</p>
              <h1 className="text-[32px] font-bold tracking-[-0.01em] text-ink-900 md:text-[44px]">결제하기</h1>
              <p className="text-[14px] leading-[24px] text-ink-900/70 md:text-[16px] md:leading-[26px]">
                구독 정보를 확인하고 결제자, 학생 정보를 입력해주세요.
              </p>
            </div>
          </header>

          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_320px] md:items-start">
            <form className="space-y-10" noValidate onSubmit={handleSubmit}>
              <section className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-[18px] font-semibold text-ink-900 md:text-[20px]">결제 상품 정보</h2>
                  <p className="text-[13px] leading-[22px] text-ink-900/60 md:text-[14px] md:leading-[24px]">
                    구독할 멘토링 상품을 확인해주세요.
                  </p>
                </div>

                <div className="space-y-4 text-[14px] leading-[24px] text-ink-900/80 md:text-[15px] md:leading-[26px]">
                  <div className="flex flex-wrap items-center gap-2 text-ink-900">
                    <span className="text-[12px] font-semibold text-main-600">{planId === "plus" ? "추천" : "정규"}</span>
                    <h3 className="text-[20px] font-bold md:text-[22px]">{selectedPlan.displayName}</h3>
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
                  <h2 className="text-[18px] font-semibold text-ink-900 md:text-[20px]">주문자 정보 입력</h2>
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
                    disabled={isContactVerified}
                    trailing={
                      <button
                        type="button"
                        onClick={requestVerificationCode}
                        disabled={isContactVerified}
                        className={`whitespace-nowrap rounded-[12px] px-3 py-2 text-[13px] font-semibold transition-colors duration-200 ${
                          isContactVerified
                            ? "bg-gray-200 text-ink-900/40"
                            : "bg-main-600 text-white hover:bg-main-600/90"
                        }`}
                      >
                        {isContactVerified ? "인증완료" : isCodeSent ? "재전송" : "인증번호 받기"}
                      </button>
                    }
                  />
                  {isCodeSent || isContactVerified ? (
                    <Field
                      label="인증번호"
                      placeholder="수신한 6자리 인증번호를 입력해주세요."
                      inputMode="numeric"
                      maxLength={6}
                      value={enteredCode}
                      onChange={(event) => {
                        setEnteredCode(event.target.value.replace(/[^\d]/g, ""));
                        if (contactVerificationError) {
                          setContactVerificationError("");
                        }
                      }}
                      disabled={isContactVerified}
                      error={contactVerificationError}
                    trailing={
                        !isContactVerified ? (
                          <button
                            type="button"
                            onClick={verifyCode}
                            className="whitespace-nowrap rounded-[12px] bg-main-600 px-3 py-2 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-main-600/90"
                          >
                            인증하기
                          </button>
                        ) : undefined
                      }
                    />
                  ) : null}
                  {contactVerificationMessage ? (
                    <p className="text-[12px] leading-[20px] text-main-600">{contactVerificationMessage}</p>
                  ) : null}
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
                  <h2 className="text-[18px] font-semibold text-ink-900 md:text-[20px]">학생 정보 입력</h2>
                  <p className="text-[13px] leading-[22px] text-ink-900/60 md:text-[14px] md:leading-[24px]">
                    수업을 듣는 학생의 기본 정보를 입력해주세요.
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
                    label="학교"
                    placeholder="현재 재학 중인 학교를 입력해주세요."
                    value={studentSchool}
                    onChange={(event) => setStudentSchool(event.target.value)}
                  />
                  <Field
                    label="학년"
                    placeholder="예: 중학교 2학년"
                    value={studentGrade}
                    onChange={(event) => setStudentGrade(event.target.value)}
                  />
                  <Field
                    label="관심 분야"
                    placeholder="관심 있는 활동이나 분야가 있다면 입력해주세요."
                    value={studentInterest}
                    onChange={(event) => setStudentInterest(event.target.value)}
                  />
                </div>
              </section>

              <section className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-[18px] font-semibold text-ink-900 md:text-[20px]">약관 동의</h2>
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
                      onChange={(event) => setAgreeRequired(event.target.checked)}
                      required
                    />
                    <span>(필수) 서비스 이용약관 및 개인정보 수집·이용에 동의합니다.</span>
                  </label>
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-main-600 focus:ring-main-300"
                      checked={agreeMarketing}
                      onChange={(event) => setAgreeMarketing(event.target.checked)}
                    />
                    <span>(선택) 이벤트 및 프로그램 안내 수신에 동의합니다.</span>
                  </label>
                  {requiredAgreementError ? (
                    <p className="text-[12px] leading-[20px] text-red-500">{requiredAgreementError}</p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  disabled={!canAttemptPayment}
                  className={`inline-flex w-full items-center justify-center rounded-[16px] px-6 py-4 text-[16px] font-semibold transition-colors duration-200 ${
                    canAttemptPayment
                      ? "bg-main-600 text-white hover:bg-main-600/90"
                      : "bg-gray-200 text-ink-900/40"
                  }`}
                >
                  {isPaymentProcessing ? "결제 준비중..." : "결제하기"}
                </button>
                {paymentError ? (
                  <p className="text-[12px] leading-[20px] text-red-500">{paymentError}</p>
                ) : null}
              </section>
            </form>

            <aside className="space-y-6 md:sticky md:top-32 md:h-fit md:self-start">
              <div className="rounded-[24px] border border-gray-100 bg-white p-6 shadow-[0_24px_80px_rgba(9,30,66,0.08)] md:p-7">
                <h2 className="text-[18px] font-semibold text-ink-900 md:text-[20px]">결제 금액</h2>

                <div className="mt-6 space-y-4 text-[14px] leading-[24px] text-ink-900/80 md:text-[15px]">
                  <SummaryRow label="상품 금액" value={formatCurrency(selectedPlan.baseAmount)} />
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
                  disabled={!canAttemptPayment}
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-[14px] px-5 py-3 text-[15px] font-semibold transition-colors duration-200 ${
                    canAttemptPayment
                      ? "bg-main-600 text-white hover:bg-main-600/90"
                      : "bg-gray-200 text-ink-900/40"
                  }`}
                  onClick={() => {
                    void attemptPayment();
                  }}
                >
                  {isPaymentProcessing ? "결제 준비중..." : "결제하기"}
                </button>
              </div>

              <p className="text-[12px] leading-[20px] text-ink-900/50 md:text-[13px]">
                결제 완료 후 담당 매니저가 안내 문자를 드립니다. 문의 사항이 있다면 언제든지 연락해주세요.
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
      <span className="text-[14px] font-semibold text-ink-900 md:text-[15px]">{label}</span>
      <div className="flex items-center gap-3">
        <input
          {...inputProps}
          className={`w-full rounded-[12px] border px-4 py-3 text-[15px] leading-[24px] text-ink-900 placeholder:text-ink-900/40 focus:border-main-400 focus:outline-none ${
            error ? "border-red-300" : "border-gray-200"
          } ${inputProps.disabled ? "bg-gray-50" : "bg-white"}`}
        />
        {trailing ? <div className="flex-shrink-0">{trailing}</div> : null}
      </div>
      {error ? <span className="text-[12px] leading-[20px] text-red-500">{error}</span> : null}
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

const TOSS_SCRIPT_SRC = "https://js.tosspayments.com/v1/payment";

const loadTossPaymentsScript = () => {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("브라우저 환경에서만 결제를 진행할 수 있습니다."));
  }

  const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${TOSS_SCRIPT_SRC}"]`);

  if (existingScript) {
    if (typeof window.TossPayments === "function") {
      return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
      existingScript.addEventListener("load", () => resolve());
      existingScript.addEventListener("error", () => reject(new Error("토스페이먼츠 스크립트를 불러오지 못했습니다.")));
    });
  }

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = TOSS_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("토스페이먼츠 스크립트를 불러오지 못했습니다."));
    document.head.appendChild(script);
  });
};
