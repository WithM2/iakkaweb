"use client";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

const gradeOptions = [
  "초등학교 저학년",
  "초등학교 고학년",
  "중학교",
  "고등학교",
  "기타",
];

const interestLevels = ["Dream Maker", "Alpha Scout", "Alpha Leader"] as const;

export default function ContactPage() {
  return (
    <>
      <Header />

      <main className="bg-white">
        <section className="mx-auto w-full max-w-[1200px] px-5 py-16 md:px-6 md:py-24">
          <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="text-[13px] font-semibold uppercase tracking-[0.6em] text-main-600 md:text-sm">
                Contact
              </p>
              <h1 className="text-[32px] font-bold tracking-[-0.01em] text-ink-900 md:text-[44px]">
                문의하기
              </h1>
              <p className="text-[14px] leading-[22px] text-ink-900/70 md:text-[16px] md:leading-[26px]">
                상담을 희망하는 학생의 정보를 입력해 주세요.
              </p>
            </div>
            <p className="text-[13px] font-medium text-ink-900/60 md:text-[14px]">
              * 필수입력항목입니다.
            </p>
          </header>

          <form className="mt-12">
            <div className="grid gap-8 rounded-[32px] border border-gray-100 bg-white px-6 py-8 shadow-[0_24px_80px_rgba(9,30,66,0.08)] md:grid-cols-[minmax(0,240px)_1fr] md:gap-14 md:px-10 md:py-12 lg:grid-cols-[minmax(0,280px)_1fr]">
              <div className="space-y-4">
                <h2 className="text-[32px] font-semibold leading-tight text-ink-900 md:text-[40px] md:leading-[1.1]">
                  학생 정보
                </h2>
                <p className="text-[14px] leading-[24px] text-ink-900/60 md:text-[15px]">
                  학생의 기본 정보를 입력하고 관심 레벨을 선택해 주세요.
                </p>
              </div>

              <div className="space-y-8">
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
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[13px] font-semibold text-ink-900 md:text-[14px]">
                      관심 레벨<span className="text-main-600">*</span>
                    </label>
                    <button
                      type="button"
                      className="text-[12px] font-semibold text-main-500 underline-offset-2 hover:underline md:text-[13px]"
                    >
                      레벨 설명 확인하기
                    </button>
                  </div>
                  <select
                    defaultValue=""
                    className="w-full rounded-[18px] border border-gray-200 bg-white px-4 py-3 text-[14px] text-ink-900 focus:border-main-400 focus:outline-none focus:ring-2 focus:ring-main-200 md:text-[15px]"
                    required
                  >
                    <option value="" disabled>
                      학생의 관심 레벨을 선택해 주세요.
                    </option>
                    {interestLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}
