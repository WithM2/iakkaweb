"use client";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { useState } from "react";

const inquiryActions = [
  {
    id: "consult",
    title: "상담문의",
    description: "교육 커리큘럼, 비용 등 아카 교육 시스템 전반에 대해 확인하실 수 있어요.",
  },
  {
    id: "product",
    title: "제휴문의",
    description: "기관 관계자 및 같은 가치를 지향하는 분들과 함께 협업할 수 있어요.",
  },
  {
    id: "reservation",
    title: "예약신청",
    description: "멘토링 정보와 예약 안내, 학부모 설명회 등 유익한 정보를 안내받을 수 있어요.",
  },
] as const;

type InquiryAction = (typeof inquiryActions)[number]["id"];

const gradeOptions = [
  "초등학교 저학년",
  "초등학교 고학년",
  "중학교",
  "고등학교",
  "기타",
];

const inquiryTypes = [
  "상담 예약",
  "프로그램 소개",
  "커리큘럼 문의",
  "기타",
];

const contactPreferences = ["전화 상담", "문자 상담", "이메일 상담"];

export default function ContactPage() {
  const [selectedAction, setSelectedAction] = useState<InquiryAction | null>(null);

  const showConsultForm = selectedAction === "consult";

  return (
    <>
      <Header />

      <main className="bg-white">
        <section className="mx-auto w-full max-w-[1200px] px-5 py-16 md:px-6 md:py-24">
          <div className="space-y-12 md:space-y-16">
            <header className="space-y-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div className="space-y-3">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.6em] text-main-600 md:text-sm">
                    Contact
                  </p>
                  <h1 className="text-[32px] font-bold tracking-[-0.01em] text-ink-900 md:text-[44px]">
                    문의하기
                  </h1>
                  <p className="text-[14px] leading-[22px] text-ink-900/70 md:text-[16px] md:leading-[26px]">
                    궁금하신 내용을 선택하면 가장 빠른 방법으로 도와드릴게요.
                  </p>
                </div>
                <p className="text-[13px] font-medium text-ink-900/60 md:text-[14px]">
                  * 필수항목 입니다.
                </p>
              </div>
            </header>

            <div className="grid gap-4 md:grid-cols-3">
              {inquiryActions.map((action) => {
                const isActive = selectedAction === action.id;
                return (
                  <button
                    key={action.id}
                    type="button"
                    onClick={() =>
                      setSelectedAction((prev) =>
                        prev === action.id ? null : action.id,
                      )
                    }
                    aria-pressed={isActive}
                    className={`flex h-full flex-col items-start rounded-[28px] border px-7 py-8 text-left transition-all duration-200 md:px-9 md:py-10 ${
                      isActive
                        ? "border-main-400 bg-main-100 shadow-[0_24px_60px_rgba(8,32,85,0.15)]"
                        : "border-gray-100 bg-white shadow-[0_20px_60px_rgba(8,32,85,0.08)] hover:-translate-y-1"
                    }`}
                  >
                    <span
                      className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-[14px] font-semibold md:text-[15px] ${
                        isActive ? "bg-main-600 text-white" : "bg-main-100 text-main-600"
                      }`}
                    >
                      {action.title}
                    </span>
                    <p className="mt-4 text-[14px] leading-[22px] text-ink-900/80 md:text-[15px] md:leading-[24px]">
                      {action.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {showConsultForm ? (
              <form>
                <div className="grid gap-10 rounded-[36px] border border-gray-100 bg-white px-7 py-8 shadow-[0_24px_80px_rgba(9,30,66,0.08)] md:grid-cols-[minmax(0,280px)_1fr] md:gap-16 md:px-12 md:py-14 lg:grid-cols-[minmax(0,320px)_1fr]">
                  <aside className="space-y-8">
                    <div className="space-y-3">
                      <p className="text-[13px] font-medium uppercase tracking-[0.4em] text-main-500 md:text-sm">
                        상담 예약
                      </p>
                      <h2 className="text-[32px] font-semibold leading-tight text-ink-900 md:text-[40px] md:leading-[1.1]">
                        상담 예약 입력 항목
                      </h2>
                      <p className="text-[14px] leading-[24px] text-ink-900/60 md:text-[15px]">
                        상담을 위해 필요한 항목들을 차례대로 입력해 주세요. 왼쪽 목차를 참고하면 더욱 빠르게 작성할 수 있어요.
                      </p>
                    </div>

                    <nav aria-label="상담 예약 입력 섹션" className="space-y-6 text-ink-900/40">
                      {[
                        { id: "student", label: "학생 정보", description: "학생 기본 정보 입력" },
                        { id: "guardian", label: "보호자 정보", description: "연락 가능한 보호자 정보" },
                        { id: "inquiry", label: "문의 내용", description: "상담 희망 내용 작성" },
                      ].map(({ id, label, description }) => (
                        <div key={id} className="space-y-1">
                          <p className="text-[18px] font-semibold tracking-tight text-ink-900 md:text-[20px]">{label}</p>
                          <p className="text-[13px] md:text-[14px]">{description}</p>
                        </div>
                      ))}
                    </nav>
                  </aside>

                  <section className="space-y-12">
                    <div className="space-y-6" id="student">
                      <div className="space-y-2">
                        <h3 className="text-[18px] font-semibold text-ink-900 md:text-[20px]">학생 정보</h3>
                        <p className="text-[13px] text-ink-900/60 md:text-[14px]">
                          상담을 희망하는 학생의 기본 정보를 입력해 주세요.
                        </p>
                      </div>

                      <div className="grid gap-5 md:grid-cols-2">
                        <label className="flex flex-col gap-2">
                          <span className="text-[13px] font-semibold text-ink-900 md:text-[14px]">
                            이름<span className="text-main-600">*</span>
                          </span>
                          <input
                            type="text"
                            placeholder="학생 이름을 입력해 주세요."
                            className="rounded-[18px] border border-gray-200 bg-white px-4 py-3 text-[14px] text-ink-900 placeholder:text-ink-900/40 focus:border-main-400 focus:outline-none focus:ring-2 focus:ring-main-200 md:text-[15px]"
                            required
                          />
                        </label>

                        <label className="flex flex-col gap-2">
                          <span className="text-[13px] font-semibold text-ink-900 md:text-[14px]">
                            학년<span className="text-main-600">*</span>
                          </span>
                          <select
                            defaultValue=""
                            className="rounded-[18px] border border-gray-200 bg-white px-4 py-3 text-[14px] text-ink-900 focus:border-main-400 focus:outline-none focus:ring-2 focus:ring-main-200 md:text-[15px]"
                            required
                          >
                            <option value="" disabled>
                              학년을 선택해 주세요.
                            </option>
                            {gradeOptions.map((grade) => (
                              <option key={grade} value={grade}>
                                {grade}
                              </option>
                            ))}
                          </select>
                        </label>

                        <fieldset className="space-y-2 md:col-span-2">
                          <legend className="flex items-center justify-between text-[13px] font-semibold text-ink-900 md:text-[14px]">
                            <span>
                              관심 레벨<span className="text-main-600">*</span>
                            </span>
                            <button
                              type="button"
                              className="text-[12px] font-semibold text-main-500 underline-offset-2 hover:underline md:text-[13px]"
                            >
                              레벨 설명 확인하기
                            </button>
                          </legend>
                          <p className="text-[13px] text-ink-900/60 md:text-[14px]">
                            학생의 관심 레벨을 선택해 주세요.
                          </p>
                          <div className="flex flex-wrap gap-3 pt-1">
                            {["알아보는 중", "검토 중", "바로 상담 희망"].map((level) => (
                              <label
                                key={level}
                                className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-[13px] text-ink-900/80 transition-all hover:-translate-y-[1px] hover:border-main-400 hover:shadow-sm"
                              >
                                <input
                                  type="radio"
                                  name="interestLevel"
                                  className="h-4 w-4 accent-main-500"
                                  required
                                />
                                {level}
                              </label>
                            ))}
                          </div>
                        </fieldset>
                      </div>
                    </div>

                    <div className="space-y-6" id="guardian">
                      <div className="space-y-2">
                        <h3 className="text-[18px] font-semibold text-ink-900 md:text-[20px]">보호자 정보</h3>
                        <p className="text-[13px] text-ink-900/60 md:text-[14px]">
                          상담 진행을 위한 보호자님의 연락처 정보를 입력해 주세요.
                        </p>
                      </div>

                      <div className="grid gap-5 md:grid-cols-2">
                        <label className="flex flex-col gap-2">
                          <span className="text-[13px] font-semibold text-ink-900 md:text-[14px]">
                            성함<span className="text-main-600">*</span>
                          </span>
                          <input
                            type="text"
                            placeholder="보호자 성함을 입력해 주세요."
                            className="rounded-[18px] border border-gray-200 bg-white px-4 py-3 text-[14px] text-ink-900 placeholder:text-ink-900/40 focus:border-main-400 focus:outline-none focus:ring-2 focus:ring-main-200 md:text-[15px]"
                            required
                          />
                        </label>

                        <label className="flex flex-col gap-2">
                          <span className="text-[13px] font-semibold text-ink-900 md:text-[14px]">이메일</span>
                          <input
                            type="email"
                            placeholder="상담 안내를 받을 이메일을 입력해 주세요."
                            className="rounded-[18px] border border-gray-200 bg-white px-4 py-3 text-[14px] text-ink-900 placeholder:text-ink-900/40 focus:border-main-400 focus:outline-none focus:ring-2 focus:ring-main-200 md:text-[15px]"
                            required
                          />
                        </label>

                        <label className="flex flex-col gap-2 md:col-span-2">
                          <span className="text-[13px] font-semibold text-ink-900 md:text-[14px]">
                            휴대전화<span className="text-main-600">*</span>
                          </span>
                          <input
                            type="tel"
                            placeholder="연락 가능한 휴대전화 번호를 입력해 주세요."
                            className="rounded-[18px] border border-gray-200 bg-white px-4 py-3 text-[14px] text-ink-900 placeholder:text-ink-900/40 focus:border-main-400 focus:outline-none focus:ring-2 focus:ring-main-200 md:text-[15px]"
                            required
                          />
                        </label>

                        <fieldset className="md:col-span-2">
                          <legend className="text-[13px] font-semibold text-ink-900 md:text-[14px]">
                            선호하는 상담 방식
                          </legend>
                          <div className="mt-3 flex flex-wrap gap-3">
                            {contactPreferences.map((preference) => (
                              <label
                                key={preference}
                                className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-[13px] text-ink-900/80 transition-all hover:-translate-y-[1px] hover:border-main-400 hover:shadow-sm"
                              >
                                <input
                                  type="radio"
                                  name="guardianContactPreference"
                                  className="h-4 w-4 accent-main-500"
                                />
                                {preference}
                              </label>
                            ))}
                          </div>
                        </fieldset>
                      </div>
                    </div>

                    <div className="space-y-6" id="inquiry">
                      <div className="space-y-2">
                        <h3 className="text-[18px] font-semibold text-ink-900 md:text-[20px]">문의 내용</h3>
                        <p className="text-[13px] text-ink-900/60 md:text-[14px]">
                          상담을 도와드리기 위해 자세한 내용을 알려 주세요.
                        </p>
                      </div>

                      <div className="grid gap-5 md:grid-cols-2">
                        <label className="flex flex-col gap-2 md:col-span-2">
                          <span className="text-[13px] font-semibold text-ink-900 md:text-[14px]">
                            문의 유형<span className="text-main-600">*</span>
                          </span>
                          <select
                            defaultValue=""
                            className="rounded-[18px] border border-gray-200 bg-white px-4 py-3 text-[14px] text-ink-900 focus:border-main-400 focus:outline-none focus:ring-2 focus:ring-main-200 md:text-[15px]"
                            required
                          >
                            <option value="" disabled>
                              문의 유형을 선택해 주세요.
                            </option>
                            {inquiryTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="flex flex-col gap-2 md:col-span-2">
                          <span className="text-[13px] font-semibold text-ink-900 md:text-[14px]">
                            내용<span className="text-main-600">*</span>
                          </span>
                          <textarea
                            rows={6}
                            placeholder="궁금하신 내용을 1,000자 이내로 입력해 주세요."
                            className="rounded-[18px] border border-gray-200 bg-white px-4 py-3 text-[14px] text-ink-900 placeholder:text-ink-900/40 focus:border-main-400 focus:outline-none focus:ring-2 focus:ring-main-200 md:text-[15px]"
                            required
                          />
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 md:flex-row md:items-center md:justify-between">
                      <p className="text-[13px] text-ink-900/60 md:text-[14px]">
                        접수 후 2영업일 이내에 담당자가 연락드릴 예정입니다.
                      </p>
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-[16px] bg-main-600 px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-main-600/90"
                      >
                        상담 예약 요청하기
                      </button>
                    </div>
                  </section>
                </div>
              </form>
            ) : null}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
