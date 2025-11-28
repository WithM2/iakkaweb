"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

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
  headline: string;
  description: string;
  linkLabel: string;
  linkHref: string;
  imageSrc: string;
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
    headline: "자체 교육 앱을 활용한 온라인 교육",
    description:
      "학기 중에도 멘토와 학습 진도를 꾸준히 점검하고, 프로젝트 결과물을 완성해요.",
    linkLabel: "앱 학습 화면 확인하기",
    linkHref: "#online-learning",
    imageSrc: "/images/onlineClass.png",
  },
  {
    id: "offline",
    label: "오프라인",
    headline: "현장에서 실습하는 캠프형 수업",
    description:
      "팀원들과 직접 만들고 체험하며 발표까지 이어지는 몰입형 교육을 진행해요.",
    linkLabel: "캠프 활동내용 확인하기",
    linkHref: "#camp-journey",
    imageSrc: "/images/offlineClass.png",
  },
];

export default function LearningJourneySection() {
  const [selectedStageId, setSelectedStageId] = useState(journeyStages[0].id);
  const [selectedModeId, setSelectedModeId] = useState(learningModes[0].id);

  const activeStage =
    journeyStages.find((stage) => stage.id === selectedStageId) ??
    journeyStages[0];
  const activeMode =
    learningModes.find((mode) => mode.id === selectedModeId) ??
    learningModes[0];

  return (
    <section className="w-full bg-[linear-gradient(180deg,#232323_0%,#143263_35%,#0f1e33_70%,#0b141f_100%)] text-white">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-16 px-5 py-16 md:px-6 md:py-20">
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

        <div className="flex flex-col gap-10 border-t border-white/10 pt-14">
          <div className="flex flex-col items-center text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-main-300">
              Hybrid Learning
            </p>
            <h3 className="mt-3 text-[32px] font-semibold text-white md:text-[36px]">
              앱과 캠프를 잇는 하이브리드 수업
            </h3>
            <p className="mt-3 text-[18px] text-white/80 md:text-[20px]">
              온라인과 오프라인의 장점을 모두 살려, 어디서든 성장할 수 있는 교육을 제공합니다.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="inline-flex w-fit items-center rounded-full bg-white/10 p-1 text-sm font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
              {learningModes.map((mode) => {
                const isActive = mode.id === activeMode.id;

                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setSelectedModeId(mode.id)}
                    className={`rounded-full px-5 py-2 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1e33] ${
                      isActive
                        ? "bg-main-400 text-slate-900"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {mode.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-between rounded-[20px] border border-white/10 bg-white/5 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.3)]">
              <div className="space-y-3">
                <h4 className="text-[24px] font-semibold text-white">
                  {activeMode.headline}
                </h4>
                <p className="text-[16px] text-white/80">
                  {activeMode.description}
                </p>
              </div>
              <Link
                href={activeMode.linkHref}
                className="mt-6 inline-flex w-fit items-center gap-2 text-[15px] font-semibold text-main-200 transition hover:text-main-100"
              >
                <span>{activeMode.linkLabel}</span>
                <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="relative h-full min-h-[280px] overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
              <div className="absolute inset-0 bg-gradient-to-br from-main-400/20 via-transparent to-transparent" />
              <Image
                src={activeMode.imageSrc}
                alt={`${activeMode.label} 수업 예시 이미지`}
                width={720}
                height={480}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
