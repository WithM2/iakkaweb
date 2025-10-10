"use client";

import { useState } from "react";

interface JourneyStage {
  id: string;
  label: string;
  summary: string;
  detailTitle: string;
  detailDescription: string;
  keyPoints: string[];
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

export default function LearningJourneySection() {
  const [selectedStageId, setSelectedStageId] = useState(journeyStages[0].id);

  const activeStageIndex = Math.max(
    journeyStages.findIndex((stage) => stage.id === selectedStageId),
    0,
  );
  const activeStage = journeyStages[activeStageIndex] ?? journeyStages[0];

  return (
    <section className="w-full bg-[linear-gradient(180deg,#232323_0%,#143263_50%,#232323_100%)] text-white">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-5 py-16 md:px-6 md:py-20">
        <div className="flex flex-col items-center text-center">
          <h3 className="text-[36px] font-semibold text-white">체계적인 교육 프로세스</h3>
          <p className="mt-3 text-[20px] text-white/80">
            프로젝트가 완성으로 이어지는 과정을 단계별로 살펴보세요.
          </p>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-16">
          <div className="flex w-full max-w-[460px] flex-shrink-0 flex-col">
            <div className="mt-6 grid gap-3 lg:mt-0">
              {journeyStages.map((stage, index) => {
                const isActive = stage.id === activeStage.id;

                return (
                  <button
                  key={stage.id}
                  type="button"
                  onClick={() => setSelectedStageId(stage.id)}
                  className={`rounded-[16px] border px-5 py-4 text-left transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#143263] ${
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

          <div className="flex flex-1 flex-col rounded-[24px] border border-white/10 bg-white/5 p-6 md:p-8">
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
    </section>
  );
}
