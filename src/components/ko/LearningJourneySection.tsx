"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface JourneyStage {
  id: string;
  stepTitle: string;
  subtitle: string;
  sections: Array<{
    title: string;
    items: string[];
  }>;
}

interface LearningMode {
  id: string;
  label: string;
  title: string;
  description: string;
  highlights: string[];
  imageSrc: string;
  imageAlt: string;
  galleryImages: { src: string; alt: string }[];
}

const journeyStages: JourneyStage[] = [
  {
    id: "discovery",
    stepTitle: "Alpha Leader",
    subtitle: "창업가, 글로벌 리더 양성",
    sections: [
      {
        title: "주요 과제",
        items: [
          "스타트업 CEO, 대기업 임원, 명문대 교수, 실리콘밸리 창업가의 1:1 멘토링",
          "해외 현지 학생과 글로벌 공동 프로젝트 수행",
          "창업 프레젠테이션 대회 출전",
        ],
      },
      {
        title: "학습 내용",
        items: [
          "창업교육, IR deck 프레젠테이션, 투자 유치 라운딩, 제품서비스 기획 출시",
        ],
      },
      {
        title: "성과",
        items: [
          "글로벌리더 멘토",
          "국내 및 해외 엘리트 학생과의 협업 포트폴리오 및 네트워크 확보",
        ],
      },
    ],
  },
  {
    id: "design",
    stepTitle: "Alpha Member",
    subtitle: "심화 팀 프로젝트 수행",
    sections: [
      {
        title: "주요 과제",
        items: [
          "팀을 구성하여 문제해결 심화 협업 프로젝트 수행",
          "결과를 기반으로 한 제품 & 서비스 출시",
        ],
      },
      {
        title: "학습 내용",
        items: [
          "구글, 애플 등 글로벌 대기업들의 업무방식과 유사한 프로젝트 수행",
          "협업과 팀워크, 리더십, 책임감에 대해 실제로 경험하며 습득",
        ],
      },
      {
        title: "성과",
        items: [
          "본인만의 제품 & 서비스 출시",
          "성공적인 사회생활을 위한 커뮤니케이션 스킬, 리더십, 문제해결능력 함양",
        ],
      },
    ],
  },
  {
    id: "build",
    stepTitle: "Alpha Scout",
    subtitle: "전문지식 학습 & 실무 개발 프로젝트",
    sections: [
      {
        title: "주요 과제",
        items: [
          "앱으로 조종하는 RC 탱크, 드론, 보트 만들기",
          "나만의 앱, 웹사이트, 게임 만들기",
        ],
      },
      {
        title: "학습 내용",
        items: ["파이썬, 아두이노, 회로, 3D 프린팅, unity"],
      },
      {
        title: "성과",
        items: [
          "실무에서 사용되는 전문지식 실습",
          "더욱 고도화된 개발 포트폴리오 축적",
          "대회 수상",
          "취업시장 경쟁력 확보",
        ],
      },
    ],
  },
  {
    id: "launch",
    stepTitle: "Dream Maker",
    subtitle: "흥미초점 체험형 교육",
    sections: [
      {
        title: "주요 과제",
        items: [
          "생성형 AI 활용한 창작물 포트폴리오 제작",
          "RC탱크 키트 활용 블록코딩",
          "하드웨어 체험교육",
          "VR기기 활용 증강현실, 가상현실, 3D 모델링 교육",
        ],
      },
      {
        title: "학습 내용",
        items: [
          "AI 인공지능, 블록코딩, 하드웨어, VR 가상현실, AR 증강현실, 3D 디자인 모델링",
        ],
      },
      {
        title: "성과",
        items: [
          "본인만의 포트폴리오 홈페이지 개발",
          "대회 수상",
          "개발 포트폴리오 쌓기",
          "미래를 선도할 신기술에 대한 이해, 활용 경험 축적",
        ],
      },
    ],
  },
];

const learningModes: LearningMode[] = [
  {
    id: "online",
    label: "온라인",
    title: "자체 교육 앱을 활용한 온라인 교육",
    description:
      "학기 중에는 언제 어디서나 참여할 수 있도록 IAKKA 앱을 중심으로 프로젝트를 진행합니다.",
    highlights: [
      "실시간 피드백과 과제 제출을 앱 하나로 관리해요.",
      "해외 멘토와의 화상 미팅으로 글로벌 협업을 경험합니다.",
      "주간 스탠드업과 리뷰 세션으로 성장을 기록합니다.",
    ],
    imageSrc: "/images/hybrid-learning-illustration.svg",
    imageAlt: "태블릿으로 온라인 수업을 듣는 모습을 형상화한 일러스트",
    galleryImages: [
      {
        src: "/images/hybrid-learning-illustration.svg",
        alt: "온라인 협업 툴을 활용해 프로젝트를 진행하는 모습",
      },
    ],
  },
  {
    id: "offline",
    label: "오프라인",
    title: "현장에서 체험하는 오프라인 캠프",
    description:
      "방학과 주말에는 오프라인 캠프에서 집중 실습과 팀워크를 경험하며 결과물의 완성도를 끌어올립니다.",
    highlights: [
      "전문 장비를 활용한 메이킹과 사용자 테스트를 진행합니다.",
      "팀 멘토와 페어 리뷰로 협업 역량을 키워요.",
      "데모 데이 발표로 성취감을 높이고 다음 목표를 세웁니다.",
    ],
    imageSrc: "/images/hybrid-learning-illustration.svg",
    imageAlt: "프로젝트를 발표하는 학생들의 모습을 형상화한 일러스트",
    galleryImages: [
      {
        src: "/images/hybrid-learning-illustration.svg",
        alt: "오프라인 캠프에서 팀 프로젝트를 준비하는 학생들",
      },
    ],
  },
];

export default function LearningJourneySection() {
  const [selectedStageId, setSelectedStageId] = useState(journeyStages[0].id);
  const [selectedModeId, setSelectedModeId] = useState(learningModes[0].id);

  const activeStageIndex = Math.max(
    journeyStages.findIndex((stage) => stage.id === selectedStageId),
    0,
  );
  const activeStage = journeyStages[activeStageIndex] ?? journeyStages[0];
  const activeMode =
    learningModes.find((mode) => mode.id === selectedModeId) ??
    learningModes[0];

  return (
    <section className="w-full bg-[#060d1c] text-white">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-5 py-16 md:px-6 md:py-20">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,#232323_0%,#143263_50%,#232323_100%)] p-6 md:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            <div className="w-full max-w-[420px] flex-shrink-0">
              <div className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/10 px-5 py-2 text-[14px] font-semibold text-white/85 backdrop-blur">
                체계적인 교육 프로세스
              </div>

              <div className="mt-6 grid gap-3">
                {journeyStages.map((stage, index) => {
                  const isActive = stage.id === activeStage.id;

                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => setSelectedStageId(stage.id)}
                      className={`rounded-[16px] border px-5 py-4 text-left transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(26,48,85,0.6)] ${
                        isActive
                          ? "bg-main-600 border-main-600 text-white shadow-[0_16px_40px_rgba(0,121,234,0.35)]"
                          : "bg-white/5 border-white/10 text-white/80 hover:bg-white/15 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white/60">
                        {`Step ${index + 1}`}
                      </div>
                      <div className="mt-1 text-[18px] font-semibold text-white md:text-[20px]">
                        {stage.label}
                      </div>
                      <p className="mt-2 text-[14px] leading-[22px] text-white/70 md:text-[15px]">
                        {stage.summary}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-1 flex-col rounded-[24px] border border-white/15 bg-white/5 p-6 backdrop-blur md:p-8">
              <div>
                <span className="text-[12px] font-semibold uppercase tracking-[0.24em] text-white/60">
                  {`Step ${activeStageIndex + 1}`}
                </span>
                <h4 className="mt-2 text-[24px] font-bold md:text-[28px]">{activeStage.detailTitle}</h4>
                <p className="mt-4 text-[14px] leading-[24px] text-white/80 md:text-[16px] md:leading-[26px]">
                  {activeStage.detailDescription}
                </p>
              </div>

              <ul className="mt-8 space-y-3 text-[14px] leading-[22px] text-white md:mt-10 md:text-[15px]">
                {activeStage.keyPoints.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-main-600" aria-hidden />
                    <span className="flex-1 text-white/85">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(255,255,255,0.12)_0%,rgba(20,50,99,0.65)_45%,rgba(11,19,34,0.95)_100%)] p-6 md:p-10">
          <div className="max-w-[700px] mx-auto text-center">
            <div className="mx-auto inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1 text-[13px] font-semibold text-white/85 backdrop-blur">
              앱과 캠프를 잇는 하이브리드 수업
            </div>
            <h4 className="mt-4 text-[26px] font-bold leading-[1.2] md:text-[32px]">
              보다 탄탄한 학습을 위해, 온라인과 오프라인의 장점을 모두 담았습니다.
            </h4>
            <p className="mt-4 text-[14px] leading-[24px] text-white/75 md:text-[16px] md:leading-[26px]">
              온라인에서는 꾸준함을, 오프라인에서는 몰입과 실전을 경험하며 프로젝트가 완성됩니다.
            </p>
          </div>
          <div className="mt-6 inline-flex w-fit items-center rounded-full border border-white/10 bg-white/10 p-1 mx-auto">
            {learningModes.map((mode) => {
              const isActive = mode.id === activeMode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setSelectedModeId(mode.id)}
                  className={`rounded-full px-4 py-2 text-[14px] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(11,19,34,0.95)] ${
                    isActive
                      ? "bg-white text-main-600 shadow-[0_10px_24px_rgba(255,255,255,0.2)]"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {mode.label}
                </button>
              );
            })}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 md:items-stretch">
            <div className="flex flex-col rounded-[24px] border border-white/12 bg-black/35 p-6 text-left backdrop-blur md:p-7">
              <h5 className="text-[20px] font-semibold md:text-[22px]">
                {activeMode.title}
              </h5>
              <p className="mt-3 text-[14px] leading-[24px] text-white/80 md:text-[16px] md:leading-[26px]">
                {activeMode.description}
              </p>

              <ul className="mt-5 space-y-3 text-[14px] leading-[22px] text-white/90 md:text-[15px]">
                {activeMode.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span
                      className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-main-600"
                      aria-hidden
                    />
                    <span className="flex-1">{highlight}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/mentoring/apply"
                className="mt-8 inline-flex w-full items-center justify-center rounded-[12px] bg-main-600 px-5 py-3 text-[14px] font-semibold text-white shadow-[0_12px_24px_rgba(0,121,234,0.35)] transition-colors hover:bg-main-600/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(11,19,34,0.95)]"
              >
                멘토링 신청
              </Link>
            </div>

            {activeMode.galleryImages.map((image) => (
              <div
                key={image.alt}
                className="group relative h-full overflow-hidden rounded-[24px] border border-white/10 bg-black/30 shadow-[0_20px_45px_rgba(0,0,0,0.35)]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 45vw, 90vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  priority={false}
                />
              </div>
            ))}
  const activeStage =
    journeyStages.find((stage) => stage.id === selectedStageId) ??
    journeyStages[0];

  return (
    <section className="w-full bg-[linear-gradient(180deg,#232323_0%,#143263_50%,#232323_100%)] text-white">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-5 py-16 md:px-6 md:py-20">
        <div className="flex flex-col items-center text-center">
          <h3 className="text-[36px] font-semibold text-white">
            체계적인 교육 프로세스
          </h3>
          <p className="mt-3 text-[20px] text-white/80">
            프로젝트가 완성으로 이어지는 과정을 단계별로 살펴보세요.
          </p>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-16">
          <div className="flex w-full max-w-[460px] flex-shrink-0 flex-col">
            <div className="mt-6 grid gap-3 lg:mt-0">
              {journeyStages.map((stage) => {
                const isActive = stage.id === activeStage.id;

                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setSelectedStageId(stage.id)}
                    className={`rounded-[16px] border px-5 py-4 text-left transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#143263] ${
                      isActive
                        ? "border-main-300 bg-white text-slate-900 shadow-[0_16px_40px_rgba(0,121,234,0.35)]"
                        : "bg-white/5 border-white/10 text-white/80 hover:bg-white/15 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <div className="text-[26px] font-semibold text-main-600">
                      {stage.stepTitle}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-8 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,#1f2c4f_0%,#0f162b_100%)] p-8 md:gap-10 md:p-10">
            <div>
              <h4 className="text-[28px] font-semibold text-main-600 md:text-[30px]">
                {activeStage.stepTitle}
              </h4>
              <p className="mt-2 text-[18px] font-medium text-white md:text-[18px]">
                {activeStage.subtitle}
              </p>
            </div>

            <div className="space-y-7 md:space-y-8">
              {activeStage.sections.map((section) => (
                <div key={section.title} className="flex flex-col gap-3">
                  <h5 className="text-[18px] font-semibold text-white md:text-[18px]">
                    {section.title}
                  </h5>
                  <ul className="space-y-2 text-[14px] leading-[26px] text-white md:space-y-3">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="list-disc pl-5 marker:text-main-400"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
