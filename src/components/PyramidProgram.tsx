"use client";

import { useMemo, useState } from "react";

type PyramidSection = {
  title: string;
  items: string[];
};

type PyramidLevel = {
  id: string;
  label: string;
  maxWidth: string;
  height: string;
  clipPath: string;
  headline: string;
  description: string;
  sections: PyramidSection[];
};

const pyramidLevels: PyramidLevel[] = [
  {
    id: "alphaLeader",
    label: "Alpha Leader",
    maxWidth: "220px",
    height: "88px",
    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
    headline: "Alpha Leader 글로벌 리더십 스튜디오",
    description:
      "미래 사회를 이끌 리더를 위한 고도화된 프로젝트 설계와 멘토링으로, 글로벌 임팩트를 만들어내는 전략을 익힙니다.",
    sections: [
      {
        title: "주요 주제",
        items: [
          "사회문제 발굴과 임팩트 설계",
          "글로벌 파트너십 플랜 수립",
          "고급 프레젠테이션 및 스토리텔링",
        ],
      },
      {
        title: "학습 내용",
        items: [
          "국제 이슈 리서치와 정책 제안",
          "VC 및 사회적 투자자 피칭 실습",
          "글로벌 자원 연계 로드맵 수립",
        ],
      },
      {
        title: "성과",
        items: [
          "글로벌 임팩트 챌린지 참가 자격",
          "전문가 피드백 기반 프로젝트 고도화",
          "차별화된 리더십 포트폴리오 완성",
        ],
      },
    ],
  },
  {
    id: "alphaMember",
    label: "Alpha Member",
    maxWidth: "280px",
    height: "92px",
    clipPath: "polygon(12% 0%, 88% 0%, 100% 100%, 0% 100%)",
    headline: "Alpha Member 실전 창업 트랙",
    description:
      "팀빌딩부터 프로토타입 검증까지, 실전 스타트업 과정을 경험하며 전략적 사고와 협업 역량을 키웁니다.",
    sections: [
      {
        title: "주요 주제",
        items: [
          "비즈니스 모델 설계",
          "UX 리서치와 고객 검증",
          "제품 로드맵 수립",
        ],
      },
      {
        title: "학습 내용",
        items: [
          "스타트업 린 캔버스 워크숍",
          "프로토타입 제작과 테스트",
          "데이터 기반 의사결정 실습",
        ],
      },
      {
        title: "성과",
        items: [
          "스타트업 데모데이 발표",
          "멘토 피드백 리포트 수령",
          "협업 중심 프로젝트 레포트 완성",
        ],
      },
    ],
  },
  {
    id: "alphaScout",
    label: "Alpha Scout",
    maxWidth: "320px",
    height: "96px",
    clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
    headline: "Alpha Scout 미래 역량 탐험 과정",
    description:
      "다양한 신기술과 산업 트렌드를 탐구하며, 아이디어를 실제 솔루션으로 발전시키는 기초 체력을 기릅니다.",
    sections: [
      {
        title: "주요 주제",
        items: [
          "AI · 데이터 이해",
          "디자인 씽킹 프로세스",
          "팀 기반 프로젝트 협업",
        ],
      },
      {
        title: "학습 내용",
        items: [
          "문제 정의와 아이디어 발산",
          "기초 프로토타입 제작",
          "사용자 인터뷰 및 피드백 반영",
        ],
      },
      {
        title: "성과",
        items: [
          "팀 프로젝트 기획서 완성",
          "중간 점검 피드백 리포트",
          "학습 저널 및 회고 자료",
        ],
      },
    ],
  },
  {
    id: "dreamMaker",
    label: "Dream Maker",
    maxWidth: "360px",
    height: "104px",
    clipPath: "polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)",
    headline: "Dream Maker 창의 창업 체험형 교육",
    description:
      "미래 직업과 직결된 메이킹 경험을 통해, 아이디어를 실행 가능한 제품과 서비스로 발전시킵니다.",
    sections: [
      {
        title: "주요 주제",
        items: [
          "실전형 창업 프로젝트 설계",
          "디지털 메이킹과 프로토타이핑",
          "VR/AR 융합 공정과 3D 콘텐츠 제작",
        ],
      },
      {
        title: "학습 내용",
        items: [
          "사용자 조사, 브랜딩, 패키징",
          "메타버스 전시관 제작",
          "AR 적용 제품, 3D 디지털 패브릭",
        ],
      },
      {
        title: "성과",
        items: [
          "맞춤형 포트폴리오와 학위 커버",
          "디지털 작품 전시 경험",
          "미래 직무 설계와 역량 체계 확립",
        ],
      },
    ],
  },
];

export default function PyramidProgram() {
  const [activeId, setActiveId] = useState<string>(pyramidLevels[pyramidLevels.length - 1]?.id ?? "");

  const activeLevel = useMemo(
    () => pyramidLevels.find((level) => level.id === activeId) ?? pyramidLevels[0],
    [activeId],
  );

  return (
    <section className="py-[120px]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-6">
        <div className="rounded-[32px] bg-[linear-gradient(180deg,#232323_0%,#143263_50%,#232323_100%)] p-[1px] shadow-[0px_40px_80px_rgba(11,28,64,0.35)]">
          <div className="rounded-[32px] bg-black/30 px-6 py-10 md:px-12 md:py-16">
            <div className="grid gap-12 text-white md:grid-cols-[minmax(0,420px)_1fr]">
              <div className="flex flex-col items-center gap-4">
                <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-white/60">
                  Alpha Journey
                </p>

                <div className="flex w-full flex-col items-center gap-3">
                  {pyramidLevels.map((level) => {
                    const isActive = level.id === activeLevel.id;

                    return (
                      <div key={level.id} className="flex w-full justify-center">
                        <button
                          type="button"
                          onClick={() => setActiveId(level.id)}
                          className={`relative flex h-full w-full items-center justify-center border text-[16px] font-semibold uppercase tracking-[0.08em] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main-300 md:text-[18px]
                            ${
                              isActive
                                ? "border-main-300/70 bg-main-600 text-white shadow-[0px_18px_40px_rgba(0,121,234,0.35)]"
                                : "border-white/10 bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                            }
                          `}
                          style={{
                            clipPath: level.clipPath,
                            maxWidth: level.maxWidth,
                            minHeight: level.height,
                          }}
                        >
                          {level.label}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-8 rounded-[24px] border border-white/10 bg-white/5 p-8 backdrop-blur">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-main-300">
                    Program Detail
                  </p>
                  <h4 className="mt-3 text-[26px] font-bold leading-[1.2] md:text-[32px]">
                    {activeLevel.headline}
                  </h4>
                  <p className="mt-4 text-[15px] leading-[26px] text-white/80 md:text-[16px] md:leading-[28px]">
                    {activeLevel.description}
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {activeLevel.sections.map((section) => (
                    <div key={section.title}>
                      <h5 className="text-[16px] font-semibold text-main-300 md:text-[18px]">
                        {section.title}
                      </h5>
                      <ul className="mt-3 space-y-2 text-[14px] leading-[22px] text-white/80 md:text-[15px] md:leading-[24px]">
                        {section.items.map((item) => (
                          <li key={item} className="list-disc pl-5 text-left marker:text-main-300">
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
        </div>
      </div>
    </section>
  );
}
