const REVIEWS = [
  {
    quote: "가장 자주 쓰던 앱과 흡사하게 만들며 우리 아이의 아이디어를 제품으로까지 확장했어요.",
    author: "김*지 학부모",
    meta: "Dream Maker 수강",
  },
  {
    quote: "코딩의 어려움을 딛고 완성하니 자존감과 문제해결력까지 모두 키울 수 있었어요.",
    author: "이*우 학부모",
    meta: "Dream Maker 수강",
  },
  {
    quote: "처음에는 긴장했는데, 팀과 함께 제가 하고 싶은 일을 만들어 낼 수 있다는 자신감이 생겼어요.",
    author: "박*윤 수강생",
    meta: "Alpha Scout 수강",
  },
  {
    quote: "내가 만든 제품을 친구들에게 소개할 때 보니 너무 뿌듯했어요.",
    author: "정*현 수강생",
    meta: "Dream Maker 수강",
  },
];

export function ReviewSection() {
  return (
    <section className="w-full bg-[#030617]">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-20 md:px-6 md:py-[120px]">
        <div className="mx-auto flex max-w-[820px] flex-col items-center text-center">
          <p className="text-sm font-semibold tracking-[0.24em] text-main-300 md:text-base">
            REAL REVIEWS
          </p>
          <h2 className="mt-4 text-[26px] font-bold leading-[36px] text-white md:text-[40px] md:leading-[52px]">
            아이들이 즐거워하는 교육을 만듭니다
          </h2>
          <p className="mt-4 text-[15px] leading-[24px] text-white/60 md:text-[18px] md:leading-[30px]">
            수강생과 학부모가 직접 전하는 IAKKA의 프로젝트 경험, 즐겁게 몰입하며
            성장한 이야기를 만나보세요.
          </p>
        </div>

        <div className="relative mt-12">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#030617] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#030617] to-transparent" />

          <div className="group overflow-hidden">
            <div className="flex w-max animate-review-marquee gap-4 md:gap-6 group-hover:[animation-play-state:paused] [animation-duration:38s]">
              {[0, 1].map((cycle) =>
                REVIEWS.map((review, index) => (
                  <article
                    key={`${review.author}-${index}-${cycle}`}
                    className="flex min-h-[220px] min-w-[260px] max-w-[320px] flex-col justify-between rounded-[28px] border border-white/10 bg-white/5 px-6 py-6 text-left text-white shadow-[0_24px_64px_rgba(8,16,44,0.35)] backdrop-blur-sm md:min-h-[240px] md:min-w-[320px] md:max-w-[360px] md:px-8 md:py-7"
                    aria-hidden={cycle === 1}
                  >
                    <p className="text-[15px] font-medium leading-[24px] text-white/90 md:text-[18px] md:leading-[30px]">
                      “{review.quote}”
                    </p>
                    <div className="mt-6 flex flex-col text-[13px] leading-[20px] text-white/60 md:text-[14px] md:leading-[22px]">
                      <span className="font-semibold text-white">{review.author}</span>
                      <span>{review.meta}</span>
                    </div>
                  </article>
                )),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReviewSection;
