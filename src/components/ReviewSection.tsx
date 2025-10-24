const REVIEWS = [
  {
    name: "최*아 학부모",
    grade: "초등 6학년",
    course: "Dream Maker 수강",
    highlight:
      "우리 아이가 단순히 공부를 넘어, 스스로 문제를 해결하고 팀원과 협업하는 능력을 키웠어요.",
    detail:
      "창의력과 사고력이 함께 자라나고 있어요. 프로젝트 기반으로 즐겁게 배우는 모습이 참 보기 좋습니다.",
    accentColor: "bg-[#4F46E5]",
    initial: "최",
  },
  {
    name: "이*혁 학부모",
    grade: "초등 4학년",
    course: "Dream Maker 수강",
    highlight:
      "새로운 개념을 탐험하듯 프로젝트를 진행하며 실력을 키우고 있어요.",
    detail:
      "실생활과 연계된 주제로 문제를 해결하니 몰입도가 높아요. 창의융합형 인재로 성장하는 모습이 기대됩니다.",
    accentColor: "bg-[#0EA5E9]",
    initial: "이",
  },
  {
    name: "박*혁 학부모",
    grade: "중등 1학년",
    course: "Alpha Scout 수강",
    highlight:
      "문제를 발견하고 해결하며, 탄탄한 탐구력을 기르고 있어요.",
    detail:
      "교과와 연계해 깊이 있는 학습을 이어가니 성취감이 높아요. 앞으로의 도전도 두렵지 않을 거예요.",
    accentColor: "bg-[#F97316]",
    initial: "박",
  },
];

export function ReviewSection() {
  return (
    <section className="w-full max-w-5xl rounded-[40px] bg-[#F8FAFC] px-6 py-12 shadow-[0_24px_64px_rgba(15,23,42,0.08)]">
      <h2 className="text-center text-2xl font-semibold text-slate-900 sm:text-3xl">
        학부모가 만족하는 커리큘럼을 제공합니다
      </h2>
      <p className="mt-4 text-center text-base leading-7 text-slate-500">
        프로젝트 기반 학습으로 자녀의 창의력과 문제 해결력을 키워낸 학부모님들의 생생한 후기를 만나보세요.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {REVIEWS.map((review) => (
          <article
            key={review.name}
            className="flex h-full flex-col gap-4 rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.06)]"
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold text-white ${
                  review.accentColor
                }`}
              >
                {review.initial}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{review.grade}</p>
                <p className="text-base font-semibold text-slate-900">{review.name}</p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-blue-600">{review.course}</p>
              <p className="text-base font-semibold leading-7 text-slate-900">{review.highlight}</p>
              <p className="text-sm leading-6 text-slate-500">{review.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ReviewSection;
