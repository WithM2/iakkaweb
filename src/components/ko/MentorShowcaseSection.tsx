"use client";

interface MentorProfile {
  id: string;
  name: string;
  role: string;
  tagline: string;
  education?: string[];
  experience?: string[];
  featured?: boolean;
}

const mentors: MentorProfile[] = [
  {
    id: "james-lee",
    name: "James Lee",
    role: "Product Design",
    tagline:
      "IAKKA의 교육 철학을 설계하는 제품 디자이너이자 멘토",
    education: [
      "하버드 대학교 (Design Thinking & Innovation Executive Education)",
      "시애틀 미술대학 (Cinematography & Media Communication)",
      "홍익대학교 (광고홍보학부)",
    ],
    experience: [
      "現 IAKKA, Adviser & Consultant",
      "前 삼성전자 미국법인, Head of Product Strategy",
      "前 마이크로소프트, Lead UX",
    ],
    featured: true,
  },
  {
    id: "jun-yongwoon",
    name: "전용운",
    role: "기획자",
    tagline: "실리콘밸리 스타트업 PM으로 활동한 서비스 전략가",
    education: [
      "KAIST 산업디자인학과",
      "Stanford d.school Design Impact Program",
    ],
    experience: [
      "前 Meta, Product Manager",
      "前 실리콘밸리 스타트업 공동창업자",
    ],
  },
  {
    id: "kim-heedon",
    name: "김희돈",
    role: "개발자",
    tagline: "AI 기반 제품을 만들어온 풀스택 개발 멘토",
    education: ["University of Washington, Computer Science"],
    experience: [
      "現 IAKKA 테크 멘토",
      "前 Amazon Lab126, Senior Software Engineer",
    ],
  },
  {
    id: "hong-gildong",
    name: "홍길동",
    role: "프로그램 디렉터",
    tagline: "학생 성장을 중심으로 프로젝트를 설계하는 리더",
    education: ["서울대학교 교육학과"],
    experience: [
      "現 IAKKA 프로그램 총괄",
      "前 교육 스타트업 Program Lead",
    ],
  },
  {
    id: "geum-gyoryeon",
    name: "금교련",
    role: "운영 매니저",
    tagline: "팀 협업과 커뮤니티를 이끄는 운영 전문가",
    education: ["연세대학교 경영학과"],
    experience: [
      "現 IAKKA 커뮤니티 매니저",
      "前 글로벌 에듀테크 운영 리드",
    ],
  },
];

function MentorCard({ profile }: { profile: MentorProfile }) {
  const isFeatured = profile.featured;
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[32px] border border-white/40 bg-[linear-gradient(180deg,#dde3f6_0%,#b8c7e8_100%)] shadow-[0_24px_60px_rgba(38,68,120,0.22)] transition-transform duration-300 hover:-translate-y-1 ${
        isFeatured ? "min-h-[360px] md:min-h-[440px]" : "min-h-[220px]"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0)_65%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(24,45,84,0)_0%,rgba(24,45,84,0.3)_100%)]"
        aria-hidden
      />

      <div
        className={`relative z-10 flex flex-1 flex-col justify-end px-6 py-6 text-white transition-opacity duration-200 group-hover:opacity-0 md:px-8 ${
          isFeatured ? "md:py-8" : "md:py-6"
        }`}
      >
        <div
          className={`font-semibold ${
            isFeatured
              ? "text-[22px] leading-[30px] md:text-[28px] md:leading-[36px]"
              : "text-[18px] leading-[26px] md:text-[20px]"
          }`}
        >
          {profile.name}
        </div>
        <div
          className={`mt-1 text-white/80 ${
            isFeatured ? "text-[16px]" : "text-[14px]"
          }`}
        >
          {profile.role}
        </div>
        <p
          className={`mt-4 text-white/75 ${
            isFeatured
              ? "text-[14px] leading-[22px] md:text-[15px]"
              : "text-[13px] leading-[20px]"
          }`}
        >
          {profile.tagline}
        </p>
      </div>

      <div className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <div className="flex h-full flex-col justify-between rounded-[32px] bg-[#353C48]/90 px-6 py-6 text-white md:px-7 md:py-7">
          <div>
            <div
              className={`font-semibold ${
                isFeatured
                  ? "text-[22px] leading-[30px] md:text-[26px] md:leading-[34px]"
                  : "text-[18px] leading-[26px]"
              }`}
            >
              {profile.name}
            </div>
            <div className="mt-1 text-[13px] text-white/70 md:text-[14px]">
              {profile.role}
            </div>
          </div>

          <div
            className={`mt-5 space-y-5 text-[13px] leading-[20px] text-white/85 ${
              isFeatured ? "md:mt-8" : "md:mt-6"
            }`}
          >
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
  const [featured, ...others] = mentors;

  return (
    <section className="w-full bg-[linear-gradient(180deg,#f5f7ff_0%,#e4e9f6_100%)]">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 md:px-6 md:py-20">
        <div className="max-w-[520px]">
          <span className="inline-flex items-center rounded-full border border-main-200/60 bg-white/60 px-4 py-1.5 text-[12px] font-semibold tracking-[0.12em] text-main-600">
            멘토단 이야기
          </span>
          <h2 className="mt-5 text-[28px] font-bold leading-[36px] text-[#1C2B4B] md:text-[36px] md:leading-[46px]">
            IAKKA와 교육 프로그램 설계를 돕는 멘토들을 소개합니다.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-8">
          <MentorCard profile={featured} />

          <div className="grid gap-6 sm:grid-cols-2">
            {others.map((mentor) => (
              <MentorCard key={mentor.id} profile={mentor} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
