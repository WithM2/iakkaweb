"use client";

import { useState } from "react";

interface JourneyStage {
  id: string;
  stepTitle: string;
  label: string;
  summary: string;
  subtitle: string;
  sections: Array<{
    title: string;
    items: string[];
  }>;
}

const journeyStages: JourneyStage[] = [
  {
    id: "discovery",
    stepTitle: "Alpha Leader",
    label: "아이디어 발굴",
    summary: "아이의 흥미에서 출발해 해결하고 싶은 문제를 찾습니다.",
    subtitle: "문제 정의형 교육",
    sections: [
      {
        title: "주요 과제",
        items: [
          "흥미와 강점을 탐색해 프로젝트 미션을 정리합니다.",
          "사용자 인터뷰와 관찰로 공감 지점을 찾습니다.",
          "실행 가능한 목표와 팀 운영 규칙을 설계합니다.",
        ],
      },
      {
        title: "학습 내용",
        items: [
          "디자인 씽킹으로 문제를 정의하고 우선순위를 정해요.",
          "리서치 노트를 작성하며 분석 근거를 시각화해요.",
          "멘토와 코칭 세션을 통해 아이디어를 고도화합니다.",
        ],
      },
      {
        title: "성과",
        items: [
          "나만의 프로젝트 선언문과 문제 정의서를 완성합니다.",
          "팀 협업을 위한 역할 분담과 일정표를 수립합니다.",
          "다음 단계 실행을 위한 인사이트 리포트를 도출합니다.",
        ],
      },
    ],
  },
  {
    id: "design",
    stepTitle: "Alpha Member",
    label: "설계 & 프로토타입",
    summary: "아이디어를 구체적인 서비스 콘셉트와 설계로 발전시켜요.",
    subtitle: "서비스 설계형 교육",
    sections: [
      {
        title: "주요 과제",
        items: [
          "사용자 여정과 화면 흐름을 와이어프레임으로 만듭니다.",
          "필수 기능을 정의해 서비스 구조도를 설계합니다.",
          "프로토타입 테스트로 빠르게 피드백을 모읍니다.",
        ],
      },
      {
        title: "학습 내용",
        items: [
          "UX 시나리오를 작성하며 사용자 관점을 학습합니다.",
          "디지털 제작 도구를 활용해 인터랙션을 구현해요.",
          "AB 테스트와 설문으로 가설 검증 방법을 익혀요.",
        ],
      },
      {
        title: "성과",
        items: [
          "피드백이 반영된 프로토타입과 기능 명세서를 확보합니다.",
          "사용자 중심의 설계 결정 기록을 축적합니다.",
          "팀 협업 프로세스가 반영된 스프린트 보드를 정비합니다.",
        ],
      },
    ],
  },
  {
    id: "build",
    stepTitle: "Alpha Scout",
    label: "개발 & 제작",
    summary: "실제 동작하는 결과물을 팀과 함께 구현해요.",
    subtitle: "실행 제작형 교육",
    sections: [
      {
        title: "주요 과제",
        items: [
          "디자인 시안을 기반으로 실제 서비스 화면을 제작합니다.",
          "콘텐츠와 코드 자산을 통합해 기능을 완성합니다.",
          "버그 리포트와 QA 체크리스트를 운영합니다.",
        ],
      },
      {
        title: "학습 내용",
        items: [
          "개발 도구와 협업 플랫폼 사용법을 숙달해요.",
          "버전 관리를 통해 변화 이력을 추적하는 법을 익혀요.",
          "스탠드업과 리뷰로 애자일 협업 문화를 경험합니다.",
        ],
      },
      {
        title: "성과",
        items: [
          "시연 가능한 베타 버전과 미디어 자료를 완성합니다.",
          "팀별 역할에 따른 전문 역량 포트폴리오를 구성합니다.",
          "문제 해결 사례를 정리한 테크 리포트를 남깁니다.",
        ],
      },
    ],
  },
  {
    id: "launch",
    stepTitle: "Dream Maker",
    label: "출시 & 회고",
    summary: "사용자 앞에 결과물을 선보이고 성장 포인트를 찾습니다.",
    subtitle: "홈미디어 체험형 교육",
    sections: [
      {
        title: "주요 과제",
        items: [
          "완성본을 공개 방송과 라이브 데모로 선보입니다.",
          "사용자 피드백을 수집하고 개선 액션을 도출합니다.",
          "발표 자료와 스토리텔링 스크립트를 제작합니다.",
        ],
      },
      {
        title: "학습 내용",
        items: [
          "AI 프레젠테이션과 미디어 제작 툴을 활용해요.",
          "성과 지표를 분석하며 다음 실험 계획을 세워요.",
          "회고 미팅으로 팀 경험을 기록하고 공유합니다.",
        ],
      },
      {
        title: "성과",
        items: [
          "개인 포트폴리오와 팀 전시 콘텐츠를 완성합니다.",
          "대회 출품 및 수상 도전을 위한 제안서를 준비합니다.",
          "미래 역량 로드맵과 새로운 도전 목표를 설정합니다.",
        ],
      },
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
                    <div
                      className={`mt-1 text-[18px] font-semibold md:text-[20px] ${
                        isActive ? "text-slate-900" : "text-white"
                      }`}
                    >
                      {stage.label}
                    </div>
                    <p
                      className={`mt-2 text-[14px] leading-[22px] md:text-[15px] ${
                        isActive ? "text-slate-700" : "text-white/70"
                      }`}
                    >
                      {stage.summary}
                    </p>
                  </button>
                );
              })}
          </div>
          </div>

          <div className="flex flex-1 flex-col gap-8 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,#1f2c4f_0%,#0f162b_100%)] p-8 md:gap-10 md:p-10">
            <div>
              <span className="text-[14px] font-semibold uppercase tracking-[0.18em] text-main-300">
                {`Step ${activeStageIndex + 1}`}
              </span>
              <h4 className="mt-3 text-[34px] font-semibold text-white md:text-[38px]">
                {activeStage.stepTitle}
              </h4>
              <p className="mt-2 text-[18px] font-medium text-main-100 md:text-[20px]">
                {activeStage.subtitle}
              </p>
            </div>

            <div className="grid gap-7 md:gap-8">
              {activeStage.sections.map((section) => (
                <div key={section.title} className="rounded-[20px] bg-white/10 p-5 md:p-6">
                  <h5 className="text-[18px] font-semibold text-white md:text-[20px]">
                    {section.title}
                  </h5>
                  <ul className="mt-3 space-y-2 text-[15px] leading-[24px] text-white/85 md:space-y-3 md:text-[16px] md:leading-[26px]">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="relative mt-[6px] inline-block h-[6px] w-[6px] flex-shrink-0 rounded-full bg-main-600" aria-hidden />
                        <span className="flex-1">{item}</span>
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
