export type MentoringPlanId = "standard" | "plus";

export type MentoringPlan = {
  id: MentoringPlanId;
  titleEmphasis: string;
  tier: string;
  description: string;
  tags: readonly {
    label: string;
    variant: "soft" | "solid";
  }[];
  features: readonly string[];
  price: string;
  originalPrice: string;
  ctaLabel: string;
};

export const mentoringPlans: MentoringPlan[] = [
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
    originalPrice: "월 150,000원",
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
    originalPrice: "월 300,000원",
    ctaLabel: "Plus 구독하기",
  },
] as const;

export function getMentoringPlanById(id: MentoringPlanId) {
  return mentoringPlans.find((p) => p.id === id) ?? null;
}
