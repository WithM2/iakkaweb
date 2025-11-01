"use client";

import { useMemo, useState } from "react";

type InquiryCategory = "consult" | "product" | "reservation";
type CategoryFilterValue = "all" | InquiryCategory;
type StatusValue = "all" | "completed" | "pending";

type GeneralAdminInquiry = {
  kind: "general";
  id: string;
  inquiryAction: InquiryCategory;
  inquiryType: string;
  inquiryTitle: string;
  inquiryBody: string;
  createdAt: string;
  isCompleted: boolean;
  canToggleCompletion: boolean;
  studentName: string;
  studentGrade: string;
  interestLevel: string;
  guardianName: string;
  guardianEmail: string;
  guardianPhone: string;
  guardianContactPreference: string;
};

type PartnershipAdminInquiry = {
  kind: "partnership";
  id: string;
  inquiryAction: "product";
  inquiryType: string;
  inquiryTitle: string;
  inquiryBody: string;
  createdAt: string;
  isCompleted: boolean;
  canToggleCompletion: false;
  organizationName: string;
  contactName: string;
  contactEmail: string;
};

export type AdminInquiry = GeneralAdminInquiry | PartnershipAdminInquiry;

type AdminInquiriesClientProps = {
  initialInquiries: AdminInquiry[];
  completionAvailable: boolean;
};

const CATEGORY_FILTERS: Array<{ label: string; value: CategoryFilterValue }> = [
  { label: "전체", value: "all" },
  { label: "상담", value: "consult" },
  { label: "제휴", value: "product" },
  { label: "예약", value: "reservation" },
];

const STATUS_FILTERS: Array<{ label: string; value: StatusValue }> = [
  { label: "전체", value: "all" },
  { label: "완료", value: "completed" },
  { label: "미완료", value: "pending" },
];

function formatInquiryAction(action: string) {
  switch (action) {
    case "consult":
      return "상담";
    case "product":
      return "제휴";
    case "reservation":
      return "예약";
    default:
      return action;
  }
}

function formatDateTime(value: string) {
  try {
    return new Date(value).toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return value;
  }
}

function FilterPill({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm transition
        ${active ? "border-main-600 bg-main-600 text-white shadow-[0_12px_30px_rgba(0,121,234,0.35)]" : "border-gray-200 bg-white text-ink-900/60 hover:border-main-300 hover:bg-main-100 hover:text-ink-900"}`}
    >
      {label}
    </button>
  );
}

export default function AdminInquiriesClient({
  initialInquiries,
  completionAvailable,
}: AdminInquiriesClientProps) {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilterValue>("all");
  const [statusFilter, setStatusFilter] = useState<StatusValue>("all");
  const [activeUpdateId, setActiveUpdateId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const counts = useMemo(() => {
    const completed = inquiries.filter((item) => item.isCompleted).length;
    return {
      total: inquiries.length,
      completed,
      pending: inquiries.length - completed,
    };
  }, [inquiries]);

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      const categoryMatches =
        categoryFilter === "all" || item.inquiryAction === categoryFilter;
      const statusMatches =
        statusFilter === "all" ||
        (statusFilter === "completed" ? item.isCompleted : !item.isCompleted);

      return categoryMatches && statusMatches;
    });
  }, [categoryFilter, statusFilter, inquiries]);

  async function handleToggleCompletion(
    inquiry: AdminInquiry,
    nextState: boolean
  ) {
    if (!inquiry.canToggleCompletion) {
      setErrorMessage(
        inquiry.kind === "partnership"
          ? "제휴 문의는 아직 완료 상태를 변경할 수 없습니다."
          : "Supabase 문의 테이블에 is_completed 컬럼이 없어 완료 상태를 변경할 수 없습니다. Supabase Studio에서 컬럼을 추가한 뒤 다시 시도해 주세요."
      );
      return;
    }

    setActiveUpdateId(inquiry.id);
    setErrorMessage(null);

    try {
      const response = await fetch(`/api/admin/inquiries/${inquiry.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isCompleted: nextState }),
      });

      if (!response.ok) {
        const { error } = (await response.json().catch(() => ({ error: "" }))) as {
          error?: string;
        };
        throw new Error(error || "요청을 처리하지 못했습니다.");
      }

      const data = (await response.json()) as {
        id: string;
        isCompleted: boolean;
      };

      setInquiries((prev) =>
        prev.map((item) =>
          item.id === data.id ? { ...item, isCompleted: data.isCompleted } : item
        )
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "문의 상태를 업데이트하는 중 문제가 발생했습니다."
      );
    } finally {
      setActiveUpdateId(null);
    }
  }

  return (
    <div className="min-h-screen bg-main-100 pb-16 pt-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 md:px-6 lg:px-8">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-main-800">
            Admin
          </p>
          <h1 className="text-3xl font-semibold text-ink-900 md:text-4xl">
            문의사항 관리
          </h1>
          <p className="text-sm text-ink-900/60">
            접수된 문의사항을 확인하고 완료 상태를 관리할 수 있습니다. 필터를
            활용해 원하는 유형만 빠르게 찾아보세요.
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-[32px] bg-white p-6 shadow-[0_24px_60px_rgba(9,30,66,0.08)] md:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {CATEGORY_FILTERS.map((filter) => (
                <FilterPill
                  key={filter.value}
                  label={filter.label}
                  active={categoryFilter === filter.value}
                  onClick={() => setCategoryFilter(filter.value)}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {STATUS_FILTERS.map((filter) => (
                <FilterPill
                  key={filter.value}
                  label={filter.label}
                  active={statusFilter === filter.value}
                  onClick={() => setStatusFilter(filter.value)}
                />
              ))}
            </div>
          </div>

          <dl className="grid grid-cols-1 gap-4 rounded-2xl bg-main-100/60 p-4 text-sm font-medium text-ink-900 md:grid-cols-3">
            <div className="rounded-2xl border border-main-100 bg-white/80 px-4 py-3 shadow-sm">
              <dt className="text-xs uppercase tracking-[0.12em] text-ink-900/60">
                전체 문의
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-ink-900">
                {counts.total.toLocaleString()}
              </dd>
            </div>
            <div className="rounded-2xl border border-main-100 bg-white/80 px-4 py-3 shadow-sm">
              <dt className="text-xs uppercase tracking-[0.12em] text-ink-900/60">
                완료
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-main-600">
                {counts.completed.toLocaleString()}
              </dd>
            </div>
            <div className="rounded-2xl border border-main-100 bg-white/80 px-4 py-3 shadow-sm">
              <dt className="text-xs uppercase tracking-[0.12em] text-ink-900/60">
                미완료
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-[#FF6B6B]">
                {counts.pending.toLocaleString()}
              </dd>
            </div>
          </dl>

          {!completionAvailable && (
            <div className="rounded-2xl border border-[#F1E0B9] bg-[#FFF8E7] px-4 py-3 text-sm text-[#8F6400]">
              문의 상태 관리를 사용하려면 Supabase Studio에서 <code>inquiries</code>
              테이블에 <code>is_completed</code> 컬럼(boolean, 기본값 false)을 추가한
              후 다시 시도해 주세요.
            </div>
          )}

          {errorMessage && (
            <div className="rounded-2xl border border-[#FBD5D5] bg-[#FFF5F5] px-4 py-3 text-sm text-[#B42318]">
              {errorMessage}
            </div>
          )}

          <div className="space-y-6">
          {filteredInquiries.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-main-300 bg-main-100/50 px-6 py-12 text-center text-sm text-ink-900/60">
              선택한 조건에 해당하는 문의가 없습니다.
            </div>
          ) : (
            filteredInquiries.map((inquiry) => {
              const isUpdating = activeUpdateId === inquiry.id;
              const markAsCompleted = () =>
                handleToggleCompletion(inquiry, true);
              const revertCompletion = () =>
                handleToggleCompletion(inquiry, false);

              return (
                <article
                    key={inquiry.id}
                    className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-[0_12px_40px_rgba(9,30,66,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(9,30,66,0.08)]"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-medium text-main-800">
                          <span className="rounded-full bg-main-100 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-main-800">
                            {formatInquiryAction(inquiry.inquiryAction)} 문의
                          </span>
                          <span className="text-ink-900/50">{inquiry.inquiryType}</span>
                        </div>
                        <h2 className="mt-3 text-2xl font-semibold text-ink-900">
                          {inquiry.inquiryTitle}
                        </h2>
                        <p className="mt-1 text-sm text-ink-900/50">
                          접수일 {formatDateTime(inquiry.createdAt)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span
                          className={`rounded-full px-4 py-1 text-sm font-medium ${
                            inquiry.isCompleted
                              ? "bg-main-100 text-main-800"
                              : "bg-[#FFF0D6] text-[#B25E09]"
                          }`}
                        >
                          {inquiry.isCompleted ? "완료" : "미완료"}
                        </span>
                        {inquiry.isCompleted ? (
                          <button
                            type="button"
                            onClick={revertCompletion}
                            disabled={isUpdating || !inquiry.canToggleCompletion}
                            className="rounded-full border border-main-600 px-5 py-2 text-sm font-medium text-main-600 transition hover:bg-main-100 disabled:border-main-300 disabled:text-main-300"
                          >
                            {isUpdating ? "처리 중..." : "상담 완료 취소"}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={markAsCompleted}
                            disabled={isUpdating || !inquiry.canToggleCompletion}
                            className="rounded-full bg-main-600 px-5 py-2 text-sm font-medium text-white shadow-[0_12px_30px_rgba(0,121,234,0.35)] transition hover:bg-main-800 disabled:bg-main-300"
                          >
                            {isUpdating ? "처리 중..." : "상담 완료"}
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="mt-5 whitespace-pre-line text-sm leading-7 text-ink-900/80">
                      {inquiry.inquiryBody}
                    </p>

                    {inquiry.kind === "general" ? (
                      <dl className="mt-6 grid grid-cols-1 gap-4 text-sm text-ink-900/80 md:grid-cols-2">
                        <div className="rounded-2xl bg-main-100/60 px-4 py-3">
                          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-900/60">
                            학생 정보
                          </dt>
                          <dd className="mt-2 space-y-1">
                            <p>
                              <span className="text-ink-900/50">이름</span>
                              <span className="ml-2 font-medium text-ink-900">
                                {inquiry.studentName}
                              </span>
                            </p>
                            <p>
                              <span className="text-ink-900/50">학년</span>
                              <span className="ml-2 font-medium text-ink-900">
                                {inquiry.studentGrade}
                              </span>
                            </p>
                            <p>
                              <span className="text-ink-900/50">관심 단계</span>
                              <span className="ml-2 font-medium text-ink-900">
                                {inquiry.interestLevel}
                              </span>
                            </p>
                          </dd>
                        </div>
                        <div className="rounded-2xl bg-main-100/60 px-4 py-3">
                          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-900/60">
                            보호자 정보
                          </dt>
                          <dd className="mt-2 space-y-1">
                            <p>
                              <span className="text-ink-900/50">이름</span>
                              <span className="ml-2 font-medium text-ink-900">
                                {inquiry.guardianName}
                              </span>
                            </p>
                            <p>
                              <span className="text-ink-900/50">이메일</span>
                              <span className="ml-2 font-medium text-ink-900">
                                {inquiry.guardianEmail}
                              </span>
                            </p>
                            <p>
                              <span className="text-ink-900/50">연락처</span>
                              <span className="ml-2 font-medium text-ink-900">
                                {inquiry.guardianPhone}
                              </span>
                            </p>
                            <p>
                              <span className="text-ink-900/50">선호 채널</span>
                              <span className="ml-2 font-medium text-ink-900">
                                {inquiry.guardianContactPreference}
                              </span>
                            </p>
                          </dd>
                        </div>
                      </dl>
                    ) : (
                      <dl className="mt-6 grid grid-cols-1 gap-4 text-sm text-ink-900/80 md:grid-cols-2">
                        <div className="rounded-2xl bg-main-100/60 px-4 py-3">
                          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-900/60">
                            제휴 기관 정보
                          </dt>
                          <dd className="mt-2 space-y-1">
                            <p>
                              <span className="text-ink-900/50">기관명</span>
                              <span className="ml-2 font-medium text-ink-900">
                                {inquiry.organizationName}
                              </span>
                            </p>
                          </dd>
                        </div>
                        <div className="rounded-2xl bg-main-100/60 px-4 py-3">
                          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-900/60">
                            담당자 정보
                          </dt>
                          <dd className="mt-2 space-y-1">
                            <p>
                              <span className="text-ink-900/50">이름</span>
                              <span className="ml-2 font-medium text-ink-900">
                                {inquiry.contactName}
                              </span>
                            </p>
                            <p>
                              <span className="text-ink-900/50">이메일</span>
                              <a
                                href={`mailto:${inquiry.contactEmail}`}
                                className="ml-2 font-medium text-main-700 underline decoration-main-200 underline-offset-4 hover:text-main-900"
                              >
                                {inquiry.contactEmail}
                              </a>
                            </p>
                          </dd>
                        </div>
                      </dl>
                    )}
                  </article>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
