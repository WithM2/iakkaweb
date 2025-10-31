import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Link from "next/link";

import type { MentoringPlanId } from "../page";
import { mentoringPlanDetails } from "../page";

const formatCurrency = (value: number) => `${value.toLocaleString("ko-KR")}원`;

type BankTransferGuidePageProps = {
  searchParams?: Promise<{
    plan?: string;
  }>;
};

export default async function BankTransferGuidePage({
  searchParams,
}: BankTransferGuidePageProps) {
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
                <h1 className="text-[32px] font-bold tracking-[-0.01em] text-ink-900 md:text-[44px]">
                  계좌이체 안내
                </h1>
              </div>
              <p className="text-[14px] leading-[24px] text-ink-900/70 md:text-[16px] md:leading-[26px]">
                아래 계좌로 결제 금액을 입금해주세요. 입금 확인 후 담당 매니저가
                연락을 드리고 있습니다. 결제 완료 후 24시간 이내에 입금하지
                않으면 결제가 취소될 수 있습니다.
              </p>
            </header>

            <div className="space-y-8">
              <section className="space-y-4">
                <h2 className="text-[20px] font-semibold text-ink-900 md:text-[22px]">
                  입금 계좌 및 입금 금액
                </h2>
                <p className="text-[13px] leading-[22px] text-ink-900/60 md:text-[14px] md:leading-[24px]">
                  입금 시 주문자명과 동일한 이름으로 송금해 주시면 빠르게 확인해
                  드릴 수 있습니다.
                </p>
              </section>

              <div className="space-y-8 rounded-[32px] border border-gray-100 bg-white p-8 shadow-[0_24px_80px_rgba(9,30,66,0.08)] md:p-12">
                <div className="space-y-3">
                  <span className="text-[14px] font-semibold text-ink-900/80 md:text-[15px]">
                    입금 계좌
                  </span>
                  <div className="space-y-1">
                    <p className="text-[18px] font-bold leading-[28px] text-ink-900 md:text-[20px]">
                      국민은행 209701-04-529000
                    </p>
                    <p className="text-[13px] leading-[22px] text-ink-900/60 md:text-[14px] md:leading-[24px]">
                      (예금주: 주식회사 아카)
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[14px] font-semibold text-ink-900/80 md:text-[15px]">
                    입금 금액
                  </span>
                  <p className="text-[26px] font-bold leading-[32px] text-main-700 md:text-[30px]">
                    {formatCurrency(finalAmount)}
                  </p>
                </div>

                <Link
                  href={{
                    pathname: "/mentoring/apply/subscribe",
                    query: { plan: planId },
                  }}
                  className="inline-flex w-full items-center justify-center rounded-[18px] bg-main-600 px-6 py-4 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-main-600/90"
                >
                  확인
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
