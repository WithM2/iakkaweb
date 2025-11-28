const PARENT_TESTIMONIALS = [
  {
    name: "최*아 학부모",
    grade: "초등 6학년",
    program: "Dream Maker 수강",
    quote:
      "우리 아이가 상상했던 그림들을 하나씩 이뤄나가네요. 스스로 깨달으며 성장하는 모습을 보니 무척 뿌듯했어요. 단순히 코딩 지식뿐만 아니라, 아이 자신감을 키워주는 프로그램이라는 생각이 들었어요!",
    accentColor: "#0B8AFF",
    backgroundColor: "#ECF4FF",
  },
  {
    name: "이*현 학부모",
    grade: "초등 6학년",
    program: "Dream Maker 수강",
    quote:
      "처음에는 개발과 기획의 차이를 몰랐지만, 프로젝트를 하고 나서는 자신만의 프로젝트를 계획하고 지속적으로 실행해 보게 되더라고요. 상위권을 유지하며 AI에 관심도 높아져서, 실생활 문제를 해결하는 방법도 고민하게 되었어요!",
    accentColor: "#8E5CF5",
    backgroundColor: "#F5EDFF",
  },
  {
    name: "박*혁 학부모",
    grade: "중등 1학년",
    program: "Alpha Scout 수강",
    quote:
      "학교 밖에서 팀을 빌딩하고, 튜터님, 친구들과 함께 개발하는 경험이 우리 아이에게 큰 동기부여가 됐어요. 탄탄한 습관이 길러지면서 무엇보다도 스스로 공부하는 힘이 커지고 있어요!",
    accentColor: "#F6A500",
    backgroundColor: "#FFF7E6",
  },
];

export default function ParentTestimonialsSection() {
  return (
    <section className="w-full bg-[#F7F9FC]">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-20 md:px-6 md:py-[120px]">
        <div className="text-center">
          <h3 className="text-[26px] font-bold leading-[34px] text-gray-900 md:text-[32px] md:leading-[42px]">
            학부모가 만족하는 커리큘럼을 제공합니다
          </h3>
        </div>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-3">
          {PARENT_TESTIMONIALS.map(
            ({
              name,
              grade,
              program,
              quote,
              accentColor,
              backgroundColor,
            }) => (
              <article
                key={`${name}-${program}`}
                className="flex h-full flex-col gap-4 rounded-[24px] border border-white/70 p-6 shadow-[0_16px_48px_rgba(32,61,137,0.08)] md:p-7"
                style={{ backgroundColor }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ background: accentColor }}
                    aria-hidden
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-6 w-6 text-white"
                    >
                      <path
                        d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5Z"
                        fill="currentColor"
                        opacity="0.9"
                      />
                      <path
                        d="M4 20.5C4 16.91 7.582 14 12 14s8 2.91 8 6.5c0 .828-.672 1.5-1.5 1.5h-13C4.672 22 4 21.328 4 20.5Z"
                        fill="currentColor"
                        opacity="0.9"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[15px] font-semibold leading-[22px] text-gray-900 md:text-[16px] md:leading-[24px]">
                      {name}
                    </p>
                    <p className="text-[13px] leading-[20px] text-gray-600 md:text-[14px] md:leading-[22px]">
                      {grade} · {program}
                    </p>
                  </div>
                </div>

                <p className="text-[14px] leading-[22px] text-gray-800 md:text-[15px] md:leading-[24px]">
                  {quote}
                </p>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
