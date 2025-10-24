import Image from "next/image";

interface AchievementCard {
  title: string;
  description: string;
  imageSrc: string;
}

const achievements: AchievementCard[] = [
  {
    title: "다양한 개발 포트폴리오",
    description:
      "IAKKA의 프로젝트 수업으로 완성한 결과물을 통해 실전 감각과 자신감을 기릅니다.",
    imageSrc: "/images/test_blueming.jpg",
  },
  {
    title: "다양한 네트워크",
    description:
      "글로벌 전문가와 동료 학생과의 협업으로 넓어진 시야와 인적 네트워크를 경험합니다.",
    imageSrc: "/images/test_blueming.jpg",
  },
  {
    title: "대회 수상 및 수료 역량",
    description:
      "실제 문제 해결 경험을 바탕으로 각종 공모전과 대회에서 의미 있는 결과를 만들어 냈습니다.",
    imageSrc: "/images/test_blueming.jpg",
  },
  {
    title: "성장의 발판",
    description:
      "스스로 기획하고 만들어 본 경험은 앞으로의 진로 탐색과 도전을 위한 든든한 자산이 됩니다.",
    imageSrc: "/images/test_blueming.jpg",
  },
];

export default function AchievementHighlightsSection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-20 md:px-6 md:py-[120px]">
        <div className="text-center">
          <h3 className="text-[28px] font-semibold leading-[36px] text-gray-900">
            우리가 이루어낸 성과
          </h3>
          <p className="mt-4 text-[16px] leading-[26px] text-gray-600">
            아이들과 함께 만들어 낸 실전 경험과 성장을 한눈에 살펴보세요.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2">
          {achievements.map(({ title, description, imageSrc }) => (
            <figure
              key={title}
              className="relative min-h-[400px] overflow-hidden rounded-[28px] bg-black"
            >
              <Image
                src={imageSrc}
                alt={`${title}를 보여주는 사진`}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

              <figcaption className="relative flex h-full flex-col justify-end gap-3 p-6 md:p-8">
                <h4 className="text-[28px] font-semibold leading-[34px] text-white">
                  {title}
                </h4>
                <p className="text-[16px] leading-[26px] text-white/90">
                  {description}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
