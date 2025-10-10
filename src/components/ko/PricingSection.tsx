import Link from "next/link";

interface PricingPlan {
  id: string;
  badge: string;
  titleEmphasis: string;
  titleSuffix: string;
  description: string;
  features: string[];
  price: string;
  originalPrice?: string;
  caption?: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "standard",
    badge: "6개월 과정",
    titleEmphasis: "Dream Maker",
    titleSuffix: "Standard",
    description: "정규 교육 과정과 병행할 수 있는 여유로운 커리큘럼",
    features: [
      "격주 1회 · 회당 3시간 집중 세션",
      "아이디어 발굴부터 결과물 완성까지 단계별 프로젝트",
      "1:4 소수 정예 협업 스튜디오",
    ],
    price: "월 80,000원",
    caption: "VAT 포함, 재료비 별도",
  },
  {
    id: "plus",
    badge: "3개월 집중 과정",
    titleEmphasis: "Dream Maker",
    titleSuffix: "Plus",
    description: "프로젝트 레벨업을 완료할 수 있는 커리큘럼",
    features: [
      "주 1회 · 회당 3시간 심화 세션",
      "전담 멘토의 1:1 피드백 & 데모데이 발표 코칭",
      "완성 포트폴리오 및 성과 리포트 제공",
    ],
    price: "월 140,000원",
    originalPrice: "월 160,000원",
    caption: "VAT 포함, 재료비 별도",
  },
];

function PlanCard({
  plan,
}: {
  plan: PricingPlan;
}) {
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-[32px] border border-white/15 bg-[linear-gradient(180deg,#232323_0%,#123365_100%)] p-8 text-left shadow-[0_24px_60px_rgba(9,15,30,0.45)] transition-transform duration-300 hover:-translate-y-1.5 md:p-10">
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-[28px] font-bold leading-tight md:text-[32px]">
            <span className="text-white">{plan.titleEmphasis}</span>{" "}
            <span className="text-main-600">{plan.titleSuffix}</span>
          </h3>
          <p className="mt-2 text-[15px] font-medium text-main-300 md:text-[16px]">
            {plan.badge}
          </p>
          <p className="mt-4 text-[16px] leading-[26px] text-white">
            {plan.description}
          </p>
        </div>

        <ul className="space-y-3 text-[15px] leading-[24px] text-white">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span className="mt-[3px] inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-main-600" aria-hidden />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-[26px] font-bold text-white md:text-[30px]">
            {plan.price}
          </span>
          {plan.originalPrice ? (
            <span className="text-[16px] font-medium text-white line-through">
              {plan.originalPrice}
            </span>
          ) : null}
        </div>
        {plan.caption ? (
          <p className="text-[13px] text-ink-400">{plan.caption}</p>
        ) : null}
      </div>
    </article>
  );
}

export default function PricingSection() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-gray-900">
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center px-5 py-20 text-center md:px-6 md:py-24">
        <div className="max-w-[640px]">
          <h2 className="text-[32px] font-semibold leading-tight text-white md:text-[40px]">
            합리적인 가격
          </h2>
          <p className="mt-4 text-[16px] leading-[26px] text-ink-400 md:text-[18px] md:leading-[28px]">
            우리 아이만을 위한 특별한 여정, 지금 시작하세요.
          </p>
        </div>

        <div className="mt-12 grid w-full gap-6 md:mt-16 md:grid-cols-2">
          {pricingPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <div className="mt-14">
          <Link
            href="/mentoring/apply"
            className="inline-flex items-center rounded-full border border-main-600 px-6 py-3 text-[15px] font-semibold text-main-600 transition-colors duration-200 hover:bg-main-600 hover:text-ink"
          >
            아카 신청하기
          </Link>
        </div>
      </div>
    </section>
  );
}

