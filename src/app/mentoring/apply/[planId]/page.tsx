import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getMentoringPlanById,
  MentoringPlanId,
} from "../_config/mentoringPlans";

interface MentoringPlanDetailPageProps {
  params: Promise<{ planId: MentoringPlanId }>;
}

export default async function MentoringPlanDetailPage({
  params,
}: MentoringPlanDetailPageProps) {
  const { planId } = await params;

  const plan = getMentoringPlanById(planId);

  if (!plan) {
    notFound();
  }

  const fullTitle = `${plan.titleEmphasis} ${plan.tier} 멘토링`;

  return (
    <>
      <Header />

      <main className="bg-white">
        <section className="mx-auto w-full max-w-[1200px] px-5 py-16 md:px-6 md:py-24">
          {/* 상단 타이틀 */}
          <header className="mb-12 md:mb-16">
            <h1 className="text-[28px] font-bold tracking-[-0.02em] text-ink-900 md:text-[36px]">
              상품 정보 안내
            </h1>
          </header>

          {/* 본문 그리드 */}
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-stretch">
            {/* 왼쪽: 썸네일 이미지 (정사각형 박스) */}
            <div className="flex justify-center md:justify-start">
              <div className="relative w-full max-w-[420px] aspect-square overflow-hidden rounded-[32px]">
                <Image
                  src="/images/mentoring/subscribe.png"
                  alt={fullTitle}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* 오른쪽: 상품 카드 */}
            <article className="flex h-full flex-col rounded-[28px] border border-gray-100 bg-white p-7 shadow-[0_18px_40px_rgba(0,0,0,0.08)] md:p-9">
              {/* 플랜 정보 */}
              <div className="space-y-4 border-b border-gray-100 pb-5">
                <div className="flex items-center gap-3">
                  <span className="rounded-md bg-main-600 px-3 py-1 text-[12px] font-semibold text-white">
                    {plan.tier}
                  </span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-[22px] font-semibold text-ink-900 md:text-[26px]">
                    {fullTitle}
                  </h2>
                  <p className="text-[14px] text-ink-900/70 md:text-[15px]">
                    {plan.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {plan.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className={`inline-flex items-center rounded-md px-2.5 py-1 text-[12px] font-semibold ${
                        tag.variant === "soft"
                          ? "bg-main-100 text-main-600"
                          : "bg-main-600 text-white"
                      }`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* 가격 & 특징 */}
              <div className="mt-5 space-y-5">
                <div>
                  <div className="flex items-baseline gap-3">
                    <p className="text-[14px] font-medium text-ink-900/60">
                      월 구독료
                    </p>
                  </div>
                  <div className="mt-1 flex items-baseline gap-3">
                    <span className="text-[26px] font-bold text-ink-900 md:text-[30px]">
                      {plan.price}
                    </span>
                    {plan.originalPrice && (
                      <span className="text-[14px] font-medium text-ink-900/40 line-through">
                        {plan.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-[13px] font-medium text-ink-900/70">
                    포함 혜택
                  </p>
                  <ul className="space-y-1.5 text-[13px] leading-[20px] text-ink-900/80 md:text-[14px] md:leading-[22px]">
                    {plan.features.map((feature) => (
                      <li key={feature}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 버튼 영역 */}
              <div className="mt-7 flex flex-col gap-3 md:flex-row md:items-center">
                <Link
                  href={{
                    pathname: "/mentoring/apply/subscribe",
                    query: { plan: plan.id },
                  }}
                  className="inline-flex flex-1 items-center justify-center rounded-[14px] bg-main-600 px-4 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-main-600/90"
                >
                  상품 구독하기
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex flex-1 items-center justify-center rounded-[14px] border border-gray-200 px-4 py-3 text-[14px] font-semibold text-ink-900/80 transition-colors hover:border-main-300 hover:text-main-700"
                >
                  문의하기
                </Link>
              </div>

              {/* 하단 안내 텍스트 */}
              <p className="mt-4 text-[12px] leading-[18px] text-ink-900/60">
                구독 신청 이후 멘토 배정 및 첫 수업 일정은 담당자가 개별 연락을 통해
                조율합니다.
              </p>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
