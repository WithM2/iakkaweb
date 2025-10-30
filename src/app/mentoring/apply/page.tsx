import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Link from "next/link";

type MentoringPlan = {
  id: "standard" | "plus";
  titleEmphasis: string;
  tier: string;
  description: string;
  tags: readonly {
    label: string;
    variant: "soft" | "solid";
  }[];
  features: readonly string[];
  price: string;
  originalPrice?: string;
  ctaLabel: string;
};

const mentoringPlans: MentoringPlan[] = [
  {
    id: "standard",
    titleEmphasis: "Dream Maker",
    tier: "Standard",
    description: "정규 교육 과정과 병행할 수 있는 여유로운 커리큘럼",
    tags: [
      {
        label: "6개월 과정",
        variant: "soft",
      },
    ],
    features: ["주 1회 60분 수업 (월 4회 총 240분)", "1:3 멘토링"],
    price: "월 99,000원",
    ctaLabel: "Standard 구독하기",
  },
  {
    id: "plus",
    titleEmphasis: "Dream Maker",
    tier: "Plus",
    description: "빠르게 레벨을 완료할 수 있는 커리큘럼",
    tags: [
      {
        label: "추천",
        variant: "solid",
      },
      {
        label: "3개월 과정",
        variant: "solid",
      },
    ],
    features: ["주 2회 60분 수업 (월 8회 총 480분)", "1:3 멘토링"],
    price: "월 180,000원",
    originalPrice: "월 250,000원",
    ctaLabel: "Plus 구독하기",
  },
] as const;

export default function MentoringApplyPage() {
  return (
    <>
      <Header />

      <main className="bg-white">
        <section className="mx-auto w-full max-w-[1200px] px-5 py-16 md:px-6 md:py-24">
          <div className="space-y-12 md:space-y-16">
            <header className="space-y-4">
              <div className="space-y-3">
                <h1 className="text-[32px] font-bold tracking-[-0.01em] text-ink-900 md:text-[44px]">
                  멘토링 신청
                </h1>
              </div>
            </header>

            <div className="grid gap-6 md:grid-cols-2">
              {mentoringPlans.map((plan) => (
                <article
                  key={plan.id}
                  className={`flex h-full flex-col rounded-[32px] border p-8 shadow-[0_24px_80px_rgba(9,30,66,0.08)] transition-transform duration-200 hover:-translate-y-1 md:p-10 ${
                    plan.id === "plus"
                      ? "border-main-300 bg-main-100"
                      : "border-gray-100 bg-white"
                  }`}
                >
                  <div className="flex flex-1 flex-col gap-6">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-[28px] font-bold text-ink-900 md:text-[32px]">
                          {plan.titleEmphasis}
                        </h2>
                        <span className="inline-flex items-center rounded-full bg-main-100 px-3 py-1 text-[13px] font-semibold text-main-600">
                          {plan.tier}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 md:gap-3">
                        {plan.tags.map((tag) => (
                          <span
                            key={tag.label}
                            className={`inline-flex flex-shrink-0 items-center rounded-md px-2 py-1 text-[12px] font-semibold ${
                              tag.variant === "soft"
                                ? "bg-main-100 text-main-600"
                                : "bg-main-600 text-white"
                            }`}
                          >
                            {tag.label}
                          </span>
                        ))}
                        <p
                          className={
                            "text-[16px] font-bold leading-[24px] text-ink-900 md:ml-2 md:flex-1 md:text-[18px] md:leading-[28px]"
                          }
                        >
                          {plan.description}
                        </p>
                      </div>
                    </div>

                    <ul className="space-y-3 text-[14px] leading-[22px] text-ink-900/80 md:text-[15px] md:leading-[24px]">
                      {plan.features.map((feature) => (
                        <li key={feature} className="text-left">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 border-t border-gray-100 pt-6">
                    <div className="flex flex-wrap items-baseline gap-3">
                      <span className="text-[26px] font-bold text-ink-900 md:text-[30px]">
                        {plan.price}
                      </span>
                      {plan.originalPrice ? (
                        <span className="text-[15px] font-medium text-ink-900/40 line-through md:text-[16px]">
                          {plan.originalPrice}
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-6">
                      <Link
                        href={{
                          pathname: "/mentoring/apply/subscribe",
                          query: { plan: plan.id },
                        }}
                        className={`inline-flex w-full items-center justify-center rounded-[14px] px-4 py-3 text-[15px] font-semibold transition-colors duration-200 ${
                          plan.id === "standard"
                            ? "border border-main-600 bg-white text-main-600 hover:bg-main-100"
                            : "bg-main-600 text-white hover:bg-main-600/90"
                        }`}
                      >
                        {plan.ctaLabel}
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="space-y-4">
              <ul className="list-disc space-y-2 pl-5 text-[13px] leading-[22px] text-ink-900/70 md:text-[14px] md:leading-[24px]">
                <li>
                  커리큘럼 완료에 소요되는 시간은 학생의 학습 상황에 따라 상이할
                  수 있습니다.
                </li>
                <li>
                  상황에 따라 1:3 멘토링이 아닌, 1:2 혹은 1:1 멘토링으로 진행될
                  수 있습니다.
                </li>
                <li>학생의 레벨 상승에 따라 구독 요금이 변경됩니다.</li>
                <li>
                  Dream Maker 이후 단계부터 학습을 원하시는 경우,
                  <span className="px-1 font-semibold text-main-600">
                    <Link href="/support">고객지원 &gt; 문의하기</Link>
                  </span>
                  를 이용해 주세요.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
