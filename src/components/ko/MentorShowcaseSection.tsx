"use client";

import Image from "next/image";

interface MentorProfile {
  id: string;
  name: string;
  role: string;
  tagline: string;
  education?: string[];
  experience?: string[];
  /**
   * `public/images/person` 폴더에 있는 파일명을 입력하세요.
   * 예) "james-lee.jpg" → `/public/images/person/james-lee.jpg`
   */
  imageFileName?: string;
}

const mentors: MentorProfile[] = [
  {
    id: "james-lee",
    name: "James Lee",
    role: "Product Design",
    tagline: "",
    education: ["홍익대학교"],
    experience: [
      "Microsoft. UX Head",
      "Samsung. Head of Product",
      "GE.  Sr. Dir. Global Head of Design & Research",
      "FourKites. VP of Product Design & Research",
    ],
    imageFileName: "JamesLee.jpg",
  },
  {
    id: "kim-heedo",
    name: "김희도",
    role: "멘토",
    tagline: "",
    education: ["한밭대학교창의융합학과", "연세대 경영대학원 석사"],
    experience: [
      "2021~ (주) AILAB 대표이사",
      "2025.03~ 마다(주)사업본부장",
      "2025.09~ 에이닷홀딩스(주) 상무이사",
      "(주)아카 멘토",
    ],
    imageFileName: "김희도.jpg",
  },
  {
    id: "Park-Chanhyeok",
    name: "박찬혁",
    role: "개발자 출신 멘토",
    tagline: "",
    education: ["성균관대학교 소프트웨어학과"],
    experience: [
      "프로젝트 경험 다수",
      "2022~ 정보올림피아드 강사",
      "2019~ 특목고 입시 준비 강사",
    ],
    imageFileName: "human.png",
  },
  {
    id: "mentor",
    name: "멘토단 일동",
    role: "",
    tagline: "",
    education: ["고려대학교", "성균관대학교", "아주대학교"],
    experience: ["강의 경력 많은 학부생, 대학원생 및 연구원 멘토"],
    imageFileName: "human.png",
  },
];

function MentorCard({ profile }: { profile: MentorProfile }) {
  const imageSrc = profile.imageFileName
    ? `/images/person/${profile.imageFileName}`
    : undefined;
  const hasImage = Boolean(imageSrc);
  return (
    <article
      className={`group relative flex aspect-[3/4] w-full flex-col overflow-hidden rounded-[32px] border border-white/40 shadow-[0_24px_60px_rgba(38,68,120,0.22)] transition-transform duration-300 hover:-translate-y-1 ${
        hasImage
          ? "bg-[#0F1F3C]"
          : "bg-[linear-gradient(180deg,#dde3f6_0%,#b8c7e8_100%)]"
      }`}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={`${profile.name} 프로필 이미지`}
          fill
          sizes="(min-width: 1024px) 260px, (min-width: 768px) 50vw, 50vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <div
        className={`pointer-events-none absolute inset-0 ${
          hasImage
            ? "bg-[linear-gradient(180deg,rgba(9,20,40,0.45)_0%,rgba(9,20,40,0.82)_100%)]"
            : "bg-[radial-gradient(120%_120%_at_50%_0%,rgba(255,255,255,0.7)_0%,rgba(195,255,255,0)_65%)]"
        }`}
        aria-hidden
      />
      {hasImage ? null : (
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(24,45,84,0)_0%,rgba(24,45,84,0.3)_100%)]"
          aria-hidden
        />
      )}

      <div className="relative z-10 flex flex-1 flex-col justify-end gap-4 px-6 py-6 text-white transition-opacity duration-200 group-hover:opacity-0 md:gap-5 md:px-7 md:py-7">
        <div>
          <div className="text-[18px] font-semibold leading-[26px] md:text-[20px]">
            {profile.name}
          </div>
          <div className="mt-1 text-[14px] text-white/80">{profile.role}</div>
          <p className="mt-4 text-[13px] leading-[20px] text-white/75">
            {profile.tagline}
          </p>
        </div>
      </div>

      <div className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <div className="flex h-full flex-col justify-between rounded-[32px] bg-[#353C48]/90 px-6 py-6 text-white md:px-7 md:py-7">
          <div className="space-y-5">
            <div className="text-[18px] font-semibold leading-[26px] md:text-[20px]">
              {profile.name}
            </div>
            <div className="mt-1 text-[13px] text-white/70 md:text-[14px]">
              {profile.role}
            </div>
          </div>

          <div className="mt-4 space-y-5 text-[13px] leading-[20px] text-white/85 md:mt-5">
            {profile.education && profile.education.length > 0 ? (
              <div>
                <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/60">
                  학력
                </div>
                <ul className="mt-2 space-y-1.5">
                  {profile.education.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {profile.experience && profile.experience.length > 0 ? (
              <div>
                <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/60">
                  경력
                </div>
                <ul className="mt-2 space-y-1.5">
                  {profile.experience.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function MentorShowcaseSection() {
  return (
    <section className="w-full bg-[linear-gradient(180deg,#f5f7ff_0%,#e4e9f6_100%)]">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 md:px-6 md:py-20">
        <div className="max-w-none">
          <h2 className="mt-5 text-[36px] font-bold leading-[36px] text-[#1C2B4B] md:text-[36px] md:leading-[46px]">
            멘토단 이야기
          </h2>
          <h2 className="mt-5 text-[20px] font-bold leading-[36px] text-[#767676] md:text-[20px] md:leading-[46px]">
            IAKKA의 교육 프로그램 개발에 도움을 주시는 멘토단을 소개합니다.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 md:mt-14 md:grid-cols-4 md:gap-8">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.id} profile={mentor} />
          ))}
        </div>
      </div>
    </section>
  );
}
