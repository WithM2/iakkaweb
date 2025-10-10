"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface JourneyStage {
  id: string;
  label: string;
  summary: string;
  detailTitle: string;
  detailDescription: string;
  keyPoints: string[];
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
    label: "아이디어 발굴",
    summary: "아이의 흥미에서 출발해 해결하고 싶은 문제를 찾습니다.",
    detailTitle: "아이디어에서 출발하는 배움",
    detailDescription:
      "멘토와 함께 일상의 호기심을 탐색하며, 아이 스스로 의미 있다고 느끼는 문제를 정의합니다. 이 단계에서 프로젝트의 방향과 팀의 목표가 명확해집니다.",
    keyPoints: [
      "흥미와 강점을 탐색하여 프로젝트 주제를 선정해요.",
      "사용자와 환경을 조사하며 문제를 구체화합니다.",
      "목표를 세우고 프로젝트 로드맵을 설계합니다.",
    ],
  },
  {
    id: "design",
    label: "설계 & 프로토타입",
    summary: "아이디어를 구체적인 서비스 콘셉트와 설계로 발전시켜요.",
    detailTitle: "문제를 해결하는 구조를 만듭니다",
    detailDescription:
      "사용자 여정을 그려 보고, 필요한 기능과 화면을 기획합니다. 프로토타입을 만들며 아이들은 사용자 관점에서 생각하는 방법을 익힙니다.",
    keyPoints: [
      "서비스 구조와 화면 흐름을 시각화합니다.",
      "프로토타입을 만들며 빠르게 피드백을 받아요.",
      "팀 내 역할을 나누고 협업하는 방법을 경험합니다.",
    ],
  },
  {
    id: "build",
    label: "개발 & 제작",
    summary: "실제 동작하는 결과물을 팀과 함께 구현해요.",
    detailTitle: "손에 잡히는 결과로 연결되는 과정",
    detailDescription:
      "멘토의 가이드를 받으며 디자인, 개발, 콘텐츠 제작을 병행합니다. 서로의 강점을 살려 역할을 맡고, 스프린트 방식으로 결과를 쌓아갑니다.",
    keyPoints: [
      "실제 코드와 디자인 도구로 완성도를 높입니다.",
      "정기적인 리뷰로 문제를 빠르게 해결합니다.",
      "협업 도구를 사용해 책임감 있게 일정을 관리합니다.",
    ],
  },
  {
    id: "launch",
    label: "출시 & 회고",
    summary: "사용자 앞에 결과물을 선보이고 성장 포인트를 찾습니다.",
    detailTitle: "실제 세상과 만나는 경험",
    detailDescription:
      "완성한 결과물을 사용자에게 공개하고 피드백을 수집합니다. 발표와 회고를 통해 내가 만든 가치와 다음 목표를 스스로 정리합니다.",
    keyPoints: [
      "사용자 테스트와 설문으로 생생한 반응을 확인해요.",
      "발표를 통해 자신 있게 결과를 설명합니다.",
      "회고를 기록하며 다음 도전을 설계합니다.",
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
      {
        src: "/images/hybrid-learning-illustration.svg",
        alt: "프로젝트 산출물을 화면으로 공유하며 토론하는 모습",
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
      {
        src: "/images/hybrid-learning-illustration.svg",
        alt: "현장에서 결과물을 시연하는 학생들",
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

          <div className="mt-10 grid gap-6 md:grid-cols-3">
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
                className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/30 shadow-[0_20px_45px_rgba(0,0,0,0.35)]"
              >
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 90vw"
                    className="object-cover"
                    priority={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
