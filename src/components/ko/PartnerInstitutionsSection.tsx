import Image from "next/image";

const PARTNER_LOGOS = [
  {
    name: "아주대학교",
    src: "/partners/ajou-university.svg",
    alt: "아주대학교 로고",
  },
  {
    name: "성균관대학교",
    src: "/partners/skku.svg",
    alt: "성균관대학교 로고",
  },
  {
    name: "고려대학교",
    src: "/partners/korea-university.svg",
    alt: "고려대학교 로고",
  },
  {
    name: "홍은청소년의집",
    src: "/partners/hongeun-youth.svg",
    alt: "홍은청소년의집 로고",
  },
];

export default function PartnerInstitutionsSection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-[96px] text-center md:px-6 md:py-[120px]">
        <p className="text-sm font-semibold tracking-[0.16em] text-main-600 md:text-base">
          COLLABORATION
        </p>
        <h2 className="mt-3 text-[24px] font-bold leading-[34px] text-gray-900 md:mt-4 md:text-[36px] md:leading-[46px]">
          IAKKA와 협업합니다
        </h2>
        <p className="mt-3 text-[14px] leading-[22px] text-gray-600 md:text-[16px] md:leading-[26px]">
          교육 혁신을 함께 만들어가는 기관들과 파트너십을 맺고 있습니다.
        </p>

        <div className="relative mt-12 md:mt-14">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent" />

          <div className="group overflow-hidden rounded-[28px] border border-gray-100 bg-gray-50/60">
            <div className="flex w-max animate-review-marquee gap-4 px-6 py-6 group-hover:[animation-play-state:paused] [animation-duration:42s] md:gap-8 md:px-8 md:py-8">
              {[0, 1].map((cycle) =>
                PARTNER_LOGOS.map((partner, index) => (
                  <div
                    key={`${partner.name}-${index}-${cycle}`}
                    className="flex h-[120px] w-[220px] flex-shrink-0 items-center justify-center rounded-[24px] bg-white shadow-[0_16px_48px_rgba(17,24,39,0.08)] md:h-[140px] md:w-[240px]"
                    aria-hidden={cycle === 1}
                  >
                    <Image
                      src={partner.src}
                      alt={partner.alt}
                      width={200}
                      height={80}
                      className="h-[60px] w-auto animate-partner-rotate group-hover:[animation-play-state:paused] md:h-[70px]"
                      priority
                    />
                  </div>
                )),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
