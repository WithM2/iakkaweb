import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Link from "next/link";

const mentoringPlans = [
  {
    id: "standard",
    titleEmphasis: "Dream Maker",
    tier: "Standard",
    description: "정규 교육 과정과 병행할 수 있는 유연한 커리큘럼",
    features: [
      "격주 1회 · 회당 3시간 집중 세션",
      "아이디어 발굴부터 결과물 완성까지 단계별 프로젝트",
      "1:4 소수 정예 협업 스튜디오",
    ],
    price: "월 80,000원",
    ctaLabel: "Standard 구독하기",
  },
  {
    id: "plus",
    titleEmphasis: "Dream Maker",
    tier: "Plus",
    description: "자녀의 변화를 빠르게 확인할 수 있는 집중형 커리큘럼",
    features: [
      "주 1회 · 회당 3시간 심화 세션",
      "전담 멘토의 1:1 피드백 & 데모데이 발표 코칭",
      "완성 포트폴리오 및 성과 리포트 제공",
    ],
    price: "월 140,000원",
    originalPrice: "월 160,000원",
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
              <p className="text-[14px] font-semibold uppercase tracking-[0.54em] text-main-600 md:text-[15px]">
                교육 신청
              </p>
              <div className="space-y-3">
                <h1 className="text-[32px] font-bold tracking-[-0.01em] text-ink-900 md:text-[44px]">
                  멘토링 신청
                </h1>
                <p className="max-w-[560px] text-[14px] leading-[22px] text-ink-900/70 md:text-[16px] md:leading-[26px]">
                  아이의 성장 속도와 목표에 맞춰 설계된 두 가지 Dream Maker 멘토링 트랙 중에서 선택해 보세요.
                </p>
              </div>
            </header>

            <div className="grid gap-6 md:grid-cols-2">
              {mentoringPlans.map((plan) => (
                <article
                  key={plan.id}
                  className="flex h-full flex-col rounded-[32px] border border-gray-100 bg-white p-8 shadow-[0_24px_80px_rgba(9,30,66,0.08)] transition-transform duration-200 hover:-translate-y-1 md:p-10"
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
                      <p className="text-[14px] leading-[22px] text-ink-900/70 md:text-[16px] md:leading-[26px]">
                        {plan.description}
                      </p>
                    </div>

                    <ul className="space-y-3 text-[14px] leading-[22px] text-ink-900/80 md:text-[15px] md:leading-[24px]">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <span className="mt-[6px] inline-flex h-1.5 w-1.5 rounded-full bg-main-600" aria-hidden />
                          <span>{feature}</span>
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
                        href={{ pathname: "/contact", query: { plan: plan.id } }}
                        className="inline-flex w-full items-center justify-center rounded-[14px] bg-main-600 px-4 py-3 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-main-600/90"
                      >
                        {plan.ctaLabel}
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="rounded-[28px] border border-main-300 bg-main-100/80 px-6 py-8 text-center md:px-8 md:py-10 md:text-left">
              <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[16px] font-semibold text-main-800 md:text-[18px]">
                    상담이 필요하신가요?
                  </p>
                  <p className="mt-1 text-[14px] leading-[22px] text-ink-900/70 md:text-[15px] md:leading-[24px]">
                    프로그램과 일정에 대해 자세한 안내가 필요하면 언제든지 연락 주세요.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-3 md:flex-row md:gap-4">
                  <a
                    href="tel:01031991331"
                    className="inline-flex w-full items-center justify-center rounded-[12px] border border-main-600 px-4 py-2 text-[14px] font-semibold text-main-600 transition-colors duration-200 hover:bg-main-600/10 md:w-auto"
                  >
                    010-3199-1331
                  </a>
                  <a
                    href="mailto:iakka.kr@gmail.com"
                    className="inline-flex w-full items-center justify-center rounded-[12px] bg-main-600 px-4 py-2 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-main-600/90 md:w-auto"
                  >
                    이메일 문의
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
