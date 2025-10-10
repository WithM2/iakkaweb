"use client";

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

export default function LearningJourneySection() {
  const [selectedStageId, setSelectedStageId] = useState(journeyStages[0].id);

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
