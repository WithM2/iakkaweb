import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import SubscribePageClient from "./SubscribePageClient";

export type MentoringPlanId = "standard" | "plus";

export type MentoringPlanDetails = {
  displayName: string;
  subtitle: string;
  benefits: readonly string[];
  baseAmount: number;
  discountAmount: number;
};

const mentoringPlanDetails: Record<MentoringPlanId, MentoringPlanDetails> = {
  standard: {
    displayName: "Dream Maker Standard",
    subtitle: "주 1회 60분 수업 · 1:3 멘토링",
    benefits: ["6개월 과정", "정규 교육과 병행 가능한 커리큘럼"],
    baseAmount: 150000,
    discountAmount: 51000,
  },
  plus: {
    displayName: "Dream Maker Plus",
    subtitle: "주 2회 60분 수업 · 1:3 멘토링",
    benefits: ["3개월 집중 과정", "빠르게 레벨을 완료하는 커리큘럼"],
    baseAmount: 300000,
    discountAmount: 120000,
  },
};

type MentoringSubscribePageProps = {
  searchParams?: Promise<{
    plan?: string;
  }>;
};

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
      <SubscribePageClient
        planId={planId}
        selectedPlan={selectedPlan}
        finalAmount={finalAmount}
      />
      <Footer />
    </>
  );
}

export { mentoringPlanDetails };
