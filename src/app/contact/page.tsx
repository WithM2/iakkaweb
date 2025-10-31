"use client";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { useEffect, useRef, useState } from "react";

const inquiryActions = [
  {
    id: "consult",
    title: "상담문의",
    description:
      "교육 커리큘럼, 비용 등 아카 교육 시스템 전반에 대해 확인하실 수 있어요.",
  },
  {
    id: "product",
    title: "제휴문의",
    description:
      "기관 관계자 및 같은 가치를 지향하는 분들과 함께 협업할 수 있어요.",
  },
  {
    id: "reservation",
    title: "예약신청",
    description:
      "멘토링 정보와 예약 안내, 학부모 설명회 등 유익한 정보를 안내받을 수 있어요.",
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

const inquiryTypes = ["상담 예약", "프로그램 소개", "커리큘럼 문의", "기타"];

const contactPreferences = ["전화 상담", "문자 상담", "이메일 상담"];

const interestStages = [
  { id: "Dream Maker", label: "Dream Maker" },
  { id: "Alpha Scout", label: "Alpha Scout" },
  { id: "Alpha Member", label: "Alpha Member" },
  { id: "Alpha Leader", label: "Alpha Leader" },
] as const;

type InterestLevelSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

function InterestLevelSelect({ value, onChange }: InterestLevelSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const boxRef = useRef<HTMLDivElement | null>(null);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // 키보드 조작
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (
      !open &&
      (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")
    ) {
      e.preventDefault();
      setOpen(true);
      setActiveIndex(
        value ? interestStages.findIndex((stage) => stage.id === value) : 0
      );
      return;
    }
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, interestStages.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0) {
        const item = interestStages[activeIndex];
        onChange(item.id);
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  };

  const selectedLabel =
    interestStages.find((s) => s.id === value)?.label ??
    "학생의 관심 레벨을 선택해 주세요.";

  return (
    <div ref={boxRef} className="relative" onKeyDown={onKeyDown}>
      {/* 제출용 hidden input (required) */}
      <input type="hidden" name="interestLevel" value={value} required />

      {/* 보이는 입력창 */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between rounded-[18px] border px-4 py-3 text-left text-[14px] md:text-[15px]
          ${open ? "border-main-400 ring-2 ring-main-200" : "border-gray-200"}
          bg-white text-ink-900`}
      >
        <span className={value ? "text-ink-900" : "text-ink-900/40"}>
          {selectedLabel}
        </span>
        <svg
          className={`ml-3 h-5 w-5 flex-none transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 011.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* 옵션 리스트 */}
      {open && (
        <ul
          role="listbox"
          tabIndex={-1}
          className="mt-2 max-h-64 w-full overflow-auto rounded-[16px] border border-gray-100 bg-white shadow-[0_24px_60px_rgba(9,30,66,0.12)]"
        >
          {interestStages.map((item, idx) => {
            const selected = value === item.id;
            const active = idx === activeIndex;
            return (
              <li
                key={item.id}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => {
                  onChange(item.id);
                  setOpen(false);
                }}
                className={`flex cursor-pointer items-center justify-between px-4 py-3 text-[14px] md:text-[15px]
                  ${active ? "bg-main-50" : "bg-white"}
                  ${selected ? "text-main-700" : "text-ink-900/90"}`}
              >
                <span>{item.label}</span>
                {selected && (
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 5.29a1 1 0 010 1.42l-7.01 7.01a1 1 0 01-1.42 0L3.296 8.74a1 1 0 111.414-1.414l4.153 4.152 6.303-6.303a1 1 0 011.538.114z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [selectedAction, setSelectedAction] = useState<InquiryAction | null>(
    null
  );
  const [studentName, setStudentName] = useState("");
  const [studentGrade, setStudentGrade] = useState("");
  const [interestLevel, setInterestLevel] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianEmail, setGuardianEmail] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [guardianContactPref, setGuardianContactPref] = useState("");
  const [inquiryType, setInquiryType] = useState("");
  const [inquiryTitle, setInquiryTitle] = useState("");
  const [inquiryBody, setInquiryBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [submitError, setSubmitError] = useState<string | null>(null);

  const showConsultForm = selectedAction === "consult";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedAction) {
      setSubmitState("error");
      setSubmitError("문의 유형을 먼저 선택해 주세요.");
      return;
    }

    if (!guardianContactPref) {
      setSubmitState("error");
      setSubmitError("선호하는 상담 방식을 선택해 주세요.");
      return;
    }

    setIsSubmitting(true);
    setSubmitState("idle");
    setSubmitError(null);

    const formData = new FormData(event.currentTarget);

    const getTrimmedValue = (key: string) => {
      const value = formData.get(key);
      return typeof value === "string" ? value.trim() : "";
    };

    const payload = {
      inquiryAction: selectedAction,
      studentName: getTrimmedValue("studentName"),
      studentGrade: getTrimmedValue("studentGrade"),
      interestLevel: getTrimmedValue("interestLevel"),
      guardianName: getTrimmedValue("guardianName"),
      guardianEmail: getTrimmedValue("guardianEmail"),
      guardianPhone: getTrimmedValue("guardianPhone"),
      guardianContactPreference: guardianContactPref.trim(),
      inquiryType: getTrimmedValue("inquiryType"),
      inquiryTitle: getTrimmedValue("inquiryTitle"),
      inquiryBody: getTrimmedValue("inquiryBody"),
      privacyConsent: formData.get("privacyConsent") === "on",
    };

    const requiredFieldMessages: Array<[string, string]> = [
      [payload.studentName, "학생 이름을 입력해 주세요."],
      [payload.studentGrade, "학생의 학년을 선택해 주세요."],
      [payload.guardianName, "보호자 성함을 입력해 주세요."],
      [payload.guardianEmail, "보호자 이메일을 입력해 주세요."],
      [payload.guardianPhone, "보호자 휴대전화 번호를 입력해 주세요."],
      [payload.inquiryType, "문의 유형을 선택해 주세요."],
      [payload.inquiryTitle, "문의 제목을 입력해 주세요."],
      [payload.inquiryBody, "문의 내용을 입력해 주세요."],
    ];

    const missingField = requiredFieldMessages.find(([value]) => !value);
    if (missingField) {
      setSubmitState("error");
      setSubmitError(missingField[1]);
      setIsSubmitting(false);
      return;
    }

    if (!payload.interestLevel) {
      setSubmitState("error");
      setSubmitError("학생의 관심 레벨을 선택해 주세요.");
      setIsSubmitting(false);
      return;
    }

    if (!payload.privacyConsent) {
      setSubmitState("error");
      setSubmitError("개인정보 수집 및 이용에 동의해 주세요.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(
          typeof errorBody.error === "string"
            ? errorBody.error
            : "문의 저장에 실패했습니다."
        );
      }

      setSubmitState("success");
      setSubmitError(null);
      setStudentName("");
      setStudentGrade("");
      setInterestLevel("");
      setGuardianName("");
      setGuardianEmail("");
      setGuardianPhone("");
      setGuardianContactPref("");
      setInquiryType("");
      setInquiryTitle("");
      setInquiryBody("");
      event.currentTarget.reset();
    } catch (error) {
      setSubmitState("error");
      setSubmitError(
        error instanceof Error
          ? error.message
          : "문의 저장 중 문제가 발생했습니다."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
                        prev === action.id ? null : action.id
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
                        isActive
                          ? "bg-main-600 text-white"
                          : "bg-main-100 text-main-600"
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
              <form onSubmit={handleSubmit} noValidate>
                <div className="rounded-[36px] border border-gray-100 bg-white px-7 py-8 shadow-[0_24px_80px_rgba(9,30,66,0.08)] md:px-12 md:py-14">
                  {/* 상단 우측 필수 안내 */}
                  <div className="mb-10 flex items-start justify-end">
                    <p className="hidden text-[13px] font-medium text-ink-900/60 md:block">
                      * 필수입력 항목입니다.
                    </p>
                  </div>

                  {/* 학생 정보: 좌측 제목 / 우측 폼 */}
                  <section className="grid gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr]">
                    {/* 좌측 타이틀 */}
                    <div className="pt-2">
                      <h3 className="text-[18px] font-semibold text-ink-900 md:text-[20px]">
                        학생 정보
                      </h3>
                    </div>

                    {/* 우측 폼 */}
                    <div className="space-y-6">
                      {/* 이름 / 학년 */}
                      <div className="grid gap-5 md:grid-cols-2">
                        <label className="flex flex-col gap-2">
                          <span className="text-[13px] font-semibold text-ink-900 md:text-[14px]">
                            이름 <span className="text-main-600">*</span>
                          </span>
                          <input
                            type="text"
                            name="studentName"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            placeholder="학생 이름을 입력해 주세요."
                            required
                            className="rounded-[18px] border border-gray-200 bg-white px-4 py-3 text-[14px] text-ink-900 placeholder:text-ink-900/40 focus:border-main-400 focus:outline-none focus:ring-2 focus:ring-main-200 md:text-[15px]"
                          />
                        </label>

                        <label className="flex flex-col gap-2">
                          <span className="text-[13px] font-semibold text-ink-900 md:text-[14px]">
                            학년 <span className="text-main-600">*</span>
                          </span>
                          <select
                            name="studentGrade"
                            value={studentGrade}
                            onChange={(e) => setStudentGrade(e.target.value)}
                            required
                            className={`rounded-[18px] border border-gray-200 bg-white px-4 py-3 text-[14px] focus:border-main-400 focus:outline-none focus:ring-2 focus:ring-main-200 md:text-[15px]
    ${studentGrade ? "text-ink-900" : "text-ink-900/40"}`}
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

                      {/* 관심 레벨: 커스텀 셀렉트 */}
                      <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-ink-900 md:text-[14px]">
                          관심 레벨 <span className="text-main-600">*</span>
                        </label>
                        <InterestLevelSelect
                          value={interestLevel}
                          onChange={setInterestLevel}
                        />
                      </div>
                    </div>
                  </section>

                  <hr className="my-12 border-t border-gray-100" />

                  {/* === 보호자 정보 섹션 (좌: 타이틀 / 우: 폼) === */}
                  <section className="mt-12 grid gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr]">
                    {/* 좌측 타이틀 */}
                    <div className="pt-2">
                      <h3 className="text-[18px] font-semibold text-ink-900 md:text-[20px]">
                        보호자 정보
                      </h3>
                    </div>

                    {/* 우측 폼 */}
                    <div className="space-y-6">
                      {/* 성함 */}
                      <label className="flex flex-col gap-2">
                        <span className="text-[13px] font-semibold text-ink-900 md:text-[14px]">
                          성함 <span className="text-main-600">*</span>
                        </span>
                        <input
                          type="text"
                          name="guardianName"
                          value={guardianName}
                          onChange={(e) => setGuardianName(e.target.value)}
                          placeholder="보호자 성함을 입력해 주세요."
                          required
                          className="rounded-[18px] border border-gray-200 bg-white px-4 py-3 text-[14px] text-ink-900 placeholder:text-ink-900/40 focus:border-main-400 focus:outline-none focus:ring-2 focus:ring-main-200 md:text-[15px]"
                        />
                      </label>

                      {/* 이메일 */}
                      <label className="flex flex-col gap-2">
                        <span className="text-[13px] font-semibold text-ink-900 md:text-[14px]">
                          이메일 <span className="text-main-600">*</span>
                        </span>
                        <input
                          type="email"
                          name="guardianEmail"
                          value={guardianEmail}
                          onChange={(e) => setGuardianEmail(e.target.value)}
                          placeholder="문의 내역을 전송 받을 이메일을 입력해 주세요."
                          required
                          className="rounded-[18px] border border-gray-200 bg-white px-4 py-3 text-[14px] text-ink-900 placeholder:text-ink-900/40 focus:border-main-400 focus:outline-none focus:ring-2 focus:ring-main-200 md:text-[15px]"
                        />
                      </label>

                      {/* 휴대전화 */}
                      <label className="flex flex-col gap-2">
                        <span className="text-[13px] font-semibold text-ink-900 md:text-[14px]">
                          휴대전화 <span className="text-main-600">*</span>
                        </span>
                        <input
                          type="tel"
                          name="guardianPhone"
                          value={guardianPhone}
                          onChange={(e) => setGuardianPhone(e.target.value)}
                          placeholder="보호자 휴대전화 번호를 입력해 주세요."
                          required
                          className="rounded-[18px] border border-gray-200 bg-white px-4 py-3 text-[14px] text-ink-900 placeholder:text-ink-900/40 focus:border-main-400 focus:outline-none focus:ring-2 focus:ring-main-200 md:text-[15px]"
                        />
                      </label>

                      {/* 선호 상담 방식 */}
                      <fieldset className="space-y-2">
                        <legend className="text-[13px] font-semibold text-ink-900 md:text-[14px]">
                          선호하는 상담 방식
                        </legend>
                        <div className="mt-3 flex flex-wrap gap-4">
                          {contactPreferences.map((label) => {
                            const selected = guardianContactPref === label;
                            return (
                              <label
                                key={label}
                                className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-[13px] transition-all
              ${selected ? "border-main-400 bg-main-50 text-main-700" : "border-gray-200 bg-white text-ink-900/80"}
              hover:-translate-y-[1px] hover:shadow-sm`}
                              >
                                <input
                                  type="radio"
                                  name="guardianContactPreference"
                                  value={label}
                                  className="sr-only"
                                  checked={selected}
                                  required={guardianContactPref === ""}
                                  onChange={() => setGuardianContactPref(label)}
                                />
                                {/* 체크 아이콘 */}
                                <svg
                                  className={`h-[16px] w-[16px] ${selected ? "opacity-100" : "opacity-40"}`}
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.704 5.29a1 1 0 010 1.42l-7.01 7.01a1 1 0 01-1.42 0L3.296 8.74a1 1 0 111.414-1.414l4.153 4.152 6.303-6.303a1 1 0 011.538.114z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {label}
                              </label>
                            );
                          })}
                        </div>

                      </fieldset>
                    </div>
                  </section>

                  {/* 구분선 */}
                  <hr className="my-12 border-t border-gray-100" />

                  {/* === 문의 내용 섹션 (좌: 타이틀 / 우: 폼) === */}
                  <section className="grid gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr]">
                    {/* 좌측 타이틀 */}
                    <div className="pt-2">
                      <h3 className="text-[18px] font-semibold text-ink-900 md:text-[20px]">
                        문의 내용
                      </h3>
                    </div>

                    {/* 우측 폼 */}
                    <div className="space-y-8">
                      {/* 유형 */}
                      <label className="flex flex-col gap-2">
                        <span className="text-[13px] font-semibold text-ink-900 md:text-[14px]">
                          유형 <span className="text-main-600">*</span>
                        </span>
                        <select
                          name="inquiryType"
                          value={inquiryType}
                          onChange={(e) => setInquiryType(e.target.value)}
                          required
                          className={`rounded-[18px] border border-gray-200 bg-white px-4 py-3 text-[14px] focus:border-main-400 focus:outline-none focus:ring-2 focus:ring-main-200 md:text-[15px]
          ${inquiryType ? "text-ink-900" : "text-ink-900/40"}`}
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

                      {/* 제목 */}
                      <label className="flex flex-col gap-2">
                        <span className="text-[13px] font-semibold text-ink-900 md:text-[14px]">
                          제목 <span className="text-main-600">*</span>
                        </span>
                        <div className="relative">
                          <input
                            type="text"
                            name="inquiryTitle"
                            value={inquiryTitle}
                            onChange={(e) => setInquiryTitle(e.target.value)}
                            maxLength={50}
                            placeholder="문의 제목을 입력해 주세요. (50자 이내)"
                            required
                            className="w-full rounded-[18px] border border-gray-200 bg-white px-4 py-3 text-[14px] text-ink-900 placeholder:text-ink-900/40 focus:border-main-400 focus:outline-none focus:ring-2 focus:ring-main-200 md:text-[15px]"
                          />
                          <span className="pointer-events-none absolute bottom-2 right-3 text-[12px] text-ink-900/40">
                            {inquiryTitle.length}/50
                          </span>
                        </div>
                      </label>

                      {/* 내용 */}
                      <label className="flex flex-col gap-2">
                        <span className="text-[13px] font-semibold text-ink-900 md:text-[14px]">
                          내용 <span className="text-main-600">*</span>
                        </span>
                        <div className="relative">
                          <textarea
                            rows={10}
                            name="inquiryBody"
                            value={inquiryBody}
                            onChange={(e) => setInquiryBody(e.target.value)}
                            maxLength={1000}
                            placeholder="문의 내용을 상세히 입력해 주세요. (1,000자 이내)"
                            required
                            className="w-full rounded-[18px] border border-gray-200 bg-white px-4 py-3 text-[14px] text-ink-900 placeholder:text-ink-900/40 focus:border-main-400 focus:outline-none focus:ring-2 focus:ring-main-200 md:text-[15px]"
                          />
                          <span className="pointer-events-none absolute bottom-2 right-3 text-[12px] text-ink-900/40">
                            {inquiryBody.length}/1000
                          </span>
                        </div>
                      </label>
                    </div>
                  </section>

                  {/* 구분선 */}
                  <hr className="my-12 border-t border-gray-100" />

                  {/* === 개인정보 수집 동의 === */}
                  <section className="grid gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr]">
                    {/* 좌측 여백(섹션 타이틀이 필요 없으면 비워둠) */}
                    <div className="pt-2" />

                    {/* 우측 내용 */}
                    <div className="space-y-4">
                      <p className="text-[13px] font-semibold text-ink-900">
                        개인정보 수집 동의
                      </p>

                      <ul className="list-disc space-y-1 pl-5 text-[13px] text-ink-900/60">
                        <li>처리 목적: 문의 내용에 대한 안내</li>
                        <li>처리 항목: 이름, 전화번호, 이메일</li>
                        <li>
                          이용 및 보유 기간: 문의일로부터 2년 보관 후 파기
                        </li>
                      </ul>

                      <label className="mt-3 flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="privacyConsent"
                          required
                          className="h-4 w-4 rounded border-gray-300 accent-main-600"
                        />
                        <span className="text-[14px] text-ink-900">
                          상담문의을 위한 개인정보 수집에 동의합니다.
                        </span>
                      </label>
                    </div>
                  </section>

                  {/* 제출 영역 */}
                  <div className="mt-10 flex flex-col gap-3 border-t border-gray-100 pt-6 md:flex-row md:items-center md:justify-between">
                    <p className="text-[13px] text-ink-900/60 md:text-[14px]">
                      접수 후 2영업일 이내에 담당자가 연락드릴 예정입니다.
                    </p>
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`inline-flex items-center justify-center rounded-[16px] px-6 py-3 text-[15px] font-semibold text-white transition-colors ${
                          isSubmitting
                            ? "bg-main-400"
                            : "bg-main-600 hover:bg-main-600/90"
                        }`}
                      >
                        {isSubmitting ? "접수 중..." : "상담 예약 요청하기"}
                      </button>
                      <p
                        className="text-[13px] text-ink-900/70 md:text-[14px]"
                        aria-live="polite"
                      >
                        {submitState === "success"
                          ? "문의가 접수되었습니다. 담당자가 곧 연락드릴게요."
                          : null}
                        {submitState === "error" && submitError
                          ? submitError
                          : null}
                      </p>
                    </div>
                  </div>
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
