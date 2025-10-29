import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import type { ReactNode } from "react";

type MentoringPlanId = "standard" | "plus";

type MentoringSubscribePageProps = {
  searchParams?: Promise<{
    plan?: string;
  }>;
};

const mentoringPlanDetails: Record<
  MentoringPlanId,
  {
    displayName: string;
    subtitle: string;
    benefits: readonly string[];
    baseAmount: number;
    discountAmount: number;
  }
> = {
  standard: {
    displayName: "Dream Maker Standard",
    subtitle: "주 1회 60분 수업 · 1:3 멘토링",
    benefits: ["6개월 과정", "정규 교육과 병행 가능한 커리큘럼"],
    baseAmount: 80000,
    discountAmount: 0,
  },
  plus: {
    displayName: "Dream Maker Plus",
    subtitle: "주 2회 60분 수업 · 1:3 멘토링",
    benefits: ["3개월 집중 과정", "빠르게 레벨을 완료하는 커리큘럼"],
    baseAmount: 160000,
    discountAmount: 20000,
  },
};

const formatCurrency = (value: number) => `${value.toLocaleString("ko-KR")}원`;

export default async function MentoringSubscribePage({
  searchParams,
}: MentoringSubscribePageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const requestedPlan = resolvedSearchParams?.plan;
  const isValidPlan = requestedPlan === "standard" || requestedPlan === "plus";
  const planId: MentoringPlanId = isValidPlan ? requestedPlan : "plus";
  const selectedPlan = mentoringPlanDetails[planId];

  const finalAmount = selectedPlan.baseAmount - selectedPlan.discountAmount;

  return (
    <>
      <Header />

      <main className="bg-white">
        <section className="mx-auto w-full max-w-[1200px] px-5 py-16 md:px-6 md:py-24">
          <div className="space-y-12 md:space-y-16">
            <header className="space-y-4">
              <div className="space-y-3">
                <p className="text-[14px] font-semibold uppercase tracking-[0.18em] text-main-600">
                  결제 정보 입력
                </p>
                <h1 className="text-[32px] font-bold tracking-[-0.01em] text-ink-900 md:text-[44px]">
                  결제하기
                </h1>
                <p className="text-[14px] leading-[24px] text-ink-900/70 md:text-[16px] md:leading-[26px]">
                  구독 정보를 확인하고 결제자, 학생 정보를 입력해주세요.
                </p>
              </div>
            </header>

            <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_320px] md:items-start">
              <form className="space-y-10" noValidate>
                <section className="space-y-6 rounded-[28px] border border-gray-100 bg-white p-6 shadow-[0_18px_60px_rgba(9,30,66,0.08)] md:p-8">
                  <div className="space-y-1">
                    <h2 className="text-[18px] font-semibold text-ink-900 md:text-[20px]">
                      결제 상품 정보
                    </h2>
                    <p className="text-[13px] leading-[22px] text-ink-900/60 md:text-[14px] md:leading-[24px]">
                      구독할 멘토링 상품을 확인해주세요.
                    </p>
                  </div>

                  <div className="space-y-4 rounded-[20px] border border-gray-100 bg-main-100/60 p-5 md:p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-main-100 px-3 py-1 text-[12px] font-semibold text-main-600">
                        {planId === "plus" ? "추천" : "정규"}
                      </span>
                      <h3 className="text-[20px] font-bold text-ink-900 md:text-[22px]">
                        {selectedPlan.displayName}
                      </h3>
                    </div>
                    <p className="text-[14px] leading-[24px] text-ink-900/80 md:text-[15px] md:leading-[26px]">
                      {selectedPlan.subtitle}
                    </p>

                    <ul className="flex flex-wrap gap-2">
                      {selectedPlan.benefits.map((benefit) => (
                        <li
                          key={benefit}
                          className="rounded-full bg-white px-3 py-1 text-[12px] font-medium text-main-600 shadow-[0_4px_14px_rgba(15,23,42,0.08)]"
                        >
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                <section className="space-y-6 rounded-[28px] border border-gray-100 bg-white p-6 shadow-[0_18px_60px_rgba(9,30,66,0.08)] md:p-8">
                  <div className="space-y-1">
                    <h2 className="text-[18px] font-semibold text-ink-900 md:text-[20px]">
                      주문자 정보 입력
                    </h2>
                    <p className="text-[13px] leading-[22px] text-ink-900/60 md:text-[14px] md:leading-[24px]">
                      결제 진행을 위해 주문자 정보를 입력해주세요.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <Field label="이름" placeholder="주문하시는 분의 이름을 입력해주세요." />
                    <Field
                      label="연락처"
                      placeholder="휴대폰 번호를 입력해주세요."
                      type="tel"
                      trailing={
                        <button
                          type="button"
                          className="whitespace-nowrap rounded-[12px] bg-main-600 px-3 py-2 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-main-600/90"
                        >
                          인증번호 받기
                        </button>
                      }
                    />
                    <Field label="이메일" placeholder="영수증을 받을 이메일 주소를 입력해주세요." type="email" />
                  </div>
                </section>

                <section className="space-y-6 rounded-[28px] border border-gray-100 bg-white p-6 shadow-[0_18px_60px_rgba(9,30,66,0.08)] md:p-8">
                  <div className="space-y-1">
                    <h2 className="text-[18px] font-semibold text-ink-900 md:text-[20px]">
                      학생 정보 입력
                    </h2>
                    <p className="text-[13px] leading-[22px] text-ink-900/60 md:text-[14px] md:leading-[24px]">
                      수업을 듣는 학생의 기본 정보를 입력해주세요.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <Field label="이름" placeholder="학생 이름을 입력해주세요." />
                    <Field label="학교" placeholder="현재 재학 중인 학교를 입력해주세요." />
                    <Field label="학년" placeholder="예: 중학교 2학년" />
                    <Field label="관심 분야" placeholder="관심 있는 활동이나 분야가 있다면 입력해주세요." />
                  </div>
                </section>

                <section className="space-y-6 rounded-[28px] border border-gray-100 bg-white p-6 shadow-[0_18px_60px_rgba(9,30,66,0.08)] md:p-8">
                  <div className="space-y-1">
                    <h2 className="text-[18px] font-semibold text-ink-900 md:text-[20px]">
                      약관 동의
                    </h2>
                    <p className="text-[13px] leading-[22px] text-ink-900/60 md:text-[14px] md:leading-[24px]">
                      결제 진행을 위해 약관에 동의해주세요.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-start gap-3 rounded-[18px] border border-gray-100 px-4 py-4 text-[14px] leading-[24px] text-ink-900/80">
                      <input type="checkbox" className="mt-1 h-5 w-5 rounded border-gray-300 text-main-600 focus:ring-main-300" />
                      <span>
                        (필수) 서비스 이용약관 및 개인정보 수집·이용에 동의합니다.
                      </span>
                    </label>
                    <label className="flex items-start gap-3 rounded-[18px] border border-gray-100 px-4 py-4 text-[14px] leading-[24px] text-ink-900/80">
                      <input type="checkbox" className="mt-1 h-5 w-5 rounded border-gray-300 text-main-600 focus:ring-main-300" />
                      <span>(선택) 이벤트 및 프로그램 안내 수신에 동의합니다.</span>
                    </label>
                  </div>

                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-[16px] bg-main-600 px-6 py-4 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-main-600/90"
                  >
                    결제하기
                  </button>
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
                    className="mt-6 inline-flex w-full items-center justify-center rounded-[14px] bg-main-600 px-5 py-3 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-main-600/90"
                  >
                    결제하기
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

      <Footer />
    </>
  );
}

type FieldProps = {
  label: string;
  placeholder?: string;
  type?: string;
  trailing?: ReactNode;
};

function Field({ label, placeholder, type = "text", trailing }: FieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[14px] font-semibold text-ink-900 md:text-[15px]">{label}</span>
      <div className="flex items-center gap-3">
        <input
          type={type}
          placeholder={placeholder}
          className="w-full rounded-[12px] border border-gray-200 px-4 py-3 text-[15px] leading-[24px] text-ink-900 placeholder:text-ink-900/40 focus:border-main-400 focus:outline-none"
        />
        {trailing ? <div className="flex-shrink-0">{trailing}</div> : null}
      </div>
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

