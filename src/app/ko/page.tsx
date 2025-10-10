import Header from "@/components/common/Header";
import LearningJourneySection from "@/components/ko/LearningJourneySection";
import Image from "next/image";
import Link from "next/link";

const problemSolutionRows = [
  {
    problem: "“내 아이가 진짜 좋아하고 잘하는 게 무엇일까?”",
    problemDescription:
      "입시 중심 교육 속에서 아이의 흥미와 적성을 잘 모르겠어요.",
    solutionTitle: "IAKKA는 아이의 아이디어에서 시작합니다",
    solutionDescription:
      "직접 기획하고 만들며, 스스로의 흥미와 강점을 발견하게 합니다.",
  },
  {
    problem: "“이 불확실한 시대, 공부만 잘하면 될까?”",
    problemDescription:
      "AI, 변화하는 세상 속에서 어떤 역량이 진짜 필요한지 잘 모르겠어요.",
    solutionTitle: "실제 세상과 연결된 교육을 제공합니다",
    solutionDescription:
      "기획·개발·협업을 경험하며 미래 사회에 필요한 실전형 문제 해결력을 기릅니다.",
  },
  {
    problem: "“성적이 전부가 아닌 건 알지만, 대체 뭐가 중요한 걸까?”",
    problemDescription:
      "인성, 협업, 창의력이 중요하다지만, 구체적으로 어떻게 길러야 할지 막막해요.",
    solutionTitle: "IAKKA는 팀 프로젝트를 통해 ‘함께 만드는 배움’을 제공합니다",
    solutionDescription: "기획 · 소통 · 책임감을 자연스럽게 체득합니다.",
  },
  {
    problem: "“우리 아이, 자신감이 없고 도전을 두려워해요”",
    problemDescription:
      "실패가 두려워서 새로운 시도도 꺼려해요.",
    solutionTitle: "‘만들고, 출시하는 경험’이 자신감을 만듭니다",
    solutionDescription:
      "작은 성장을 직접 경험하며 ‘나도 할 수 있다’는 자기 효능감을 키웁니다.",
  },
];

export default function PageKO() {
  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative isolate h-[70vh] md:h-[80vh] w-full">
        {/* 배경 이미지 */}
        <Image
          src="/images/hero.png"
          alt="아이들이 포스트잇 보드에서 협업하는 모습"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* 어두운 오버레이 (캡처 느낌) */}
        <div className="absolute inset-0 bg-black/45 md:bg-black/50" />

        {/* 콘텐츠 (왼쪽 정렬, 세로 가운데) */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1200px] items-center px-5 md:px-6">
          <div className="max-w-[720px] text-white">
            <h1 className="font-bold tracking-[-0.02em] text-[28px] leading-[36px] md:text-[48px] md:leading-[58px]">
              세상을 바꾸는 진짜 배움
            </h1>
            <p className="mt-4 text-white/85 text-[14px] leading-[22px] md:text-[18px] md:leading-[28px]">
              아이들은 점수를 위해 공부하는 대신, 스스로 세상에 가치를 만들어
              내는 법을 배웁니다.
            </p>

            <div className="mt-6 flex gap-3">
              {/* 파란 필드 버튼 */}
              <Link
                href="/mentoring/apply"
                className="inline-flex items-center rounded-[12px] bg-main-600 px-4 py-2 text-[14px] font-semibold text-white hover:bg-main-600/90"
              >
                멘토링 신청
              </Link>

              {/* 파란 아웃라인 버튼 */}
              <Link
                href="/contact"
                className="inline-flex items-center rounded-[12px] border border-main-600 px-4 py-2 text-[14px] font-semibold text-main-600 hover:bg-main-600/10"
              >
                상담 예약
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="pt-[160px] pb-[80px]">
        <div className="mx-auto w-full max-w-none px-5 text-center">
          <h2
            className="
              md:whitespace-nowrap              /* 데스크톱: 줄바꿈 없음 */
              text-[24px] md:text-[48px]        /* 모바일/데스크톱 글자 크기 */
              leading-[42px] md:leading-[58px]  /* 모바일/데스크톱 줄간격 */
              font-bold text-main-600
            "
          >
            <span className="block md:inline">“미래를 바꾸는 사람들,</span>
            <span className="block md:inline md:mt-0">
              아이들의 미래를 위해 함께합니다.”
            </span>
          </h2>

          <p
            className="
              mt-[48px]
              text-[14px] md:text-[24px]
              leading-[22px] md:leading-[32px]
              text-gray-600
            "
          >
            <span className="block md:inline">
              “실리콘밸리 창업자, 개발자와 스타트업 CEO,
            </span>
            <span className="block md:inline mt-[10px] md:mt-0">
              대기업 임원진들이 아이들의 미래를 위해 모였습니다.”
            </span>
          </p>
        </div>
      </section>

      {/* Problem → Solution Section */}
      <section className="pt-[120px] pb-[120px]">
        <div className="mx-auto w-full max-w-[1200px] px-5">
          {/* Title & Subtitle */}
          <h3 className="text-[28px] md:text-[32px] font-bold text-gray-900">
            아이들 교육, 어떤 게 좋은 방법일까?
          </h3>
          <p className="mt-3 text-[14px] md:text-[16px] text-gray-500">
            아이의 적성과 흥미부터 세상과 소통하는 법까지, IAKKA의 교육은 해답을
            제시합니다.
          </p>

          {/* Rows */}
          <div className="mt-10 space-y-8">
            {problemSolutionRows.map(
              ({
                problem,
                problemDescription,
                solutionTitle,
                solutionDescription,
              }) => (
                <div
                  key={problem}
                  className="grid gap-4 md:grid-cols-[1fr_64px_1fr] md:items-center"
                >
                  {/* Left bubble (Problem) */}
                  <div className="rounded-[24px] bg-main-100 border border-main-300 px-6 py-6 md:px-8 md:py-8">
                    <h4 className="text-[18px] md:text-[20px] font-semibold text-main-600">
                      {problem}
                    </h4>
                    <p className="mt-2 text-[14px] md:text-[16px] text-ink-900">
                      {problemDescription}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center md:justify-center">
                    <svg
                      className="hidden md:block h-8 w-8 text-main-600"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <svg
                      className="md:hidden h-8 w-8 text-main-600"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 5v14M6 13l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {/* Right bubble (Solution) */}
                  <div className="rounded-[24px] bg-main-100 border border-main-300 px-6 py-6 md:px-8 md:py-8">
                    <h4 className="text-[18px] md:text-[20px] font-semibold text-main-600">
                      {solutionTitle}
                    </h4>
                    <p className="mt-2 text-[14px] md:text-[16px] text-ink-900">
                      {solutionDescription}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <LearningJourneySection />

      {/* 아래부터 다음 섹션들… */}
      <main className="mx-auto max-w-[1200px] px-5 md:px-6 py-16">
        {/* 예시 영역 */}
        <h2 className="text-xl font-semibold">섹션 자리</h2>
      </main>
    </>
  );
}
