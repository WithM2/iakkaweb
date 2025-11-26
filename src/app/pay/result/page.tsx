import Link from "next/link";

const statusCopy = {
  success: {
    title: "결제를 완료했어요",
    description:
      "실제 결제 연동 시 결제 승인 API 요청을 보내주세요. (샌드박스 환경에서는 실제 결제가 진행되지 않습니다.)",
    badge: "성공",
    icon: "✓",
    tone: {
      icon: "bg-blue-50 text-blue-600",
      badge: "text-blue-700",
    },
  },
  fail: {
    title: "결제에 실패했습니다",
    description: "에러 메시지를 확인 후 다시 시도해주세요.",
    badge: "실패",
    icon: "✕",
    tone: {
      icon: "bg-red-50 text-red-600",
      badge: "text-red-700",
    },
  },
};

const getStatus = (status?: string) => {
  if (status === "success") {
    return "success" as const;
  }

  return "fail" as const;
};

type PaymentResultPageProps = {
  searchParams?: {
    status?: string;
    message?: string;
  };
};

export default function PaymentResultPage({
  searchParams,
}: PaymentResultPageProps) {
  const status = getStatus(searchParams?.status);
  const copy = statusCopy[status];

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-main-50 via-white to-white px-4 py-16">
      <div className="w-full max-w-xl space-y-6 rounded-2xl bg-white p-10 text-center shadow-[0_24px_80px_rgba(9,30,66,0.08)]">
        <div
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold ${copy.tone.icon}`}
        >
          {copy.icon}
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-ink-900 md:text-3xl">{copy.title}</h1>
          <p className="text-sm leading-6 text-ink-900/70 md:text-base">
            {copy.description}
          </p>
        </div>

        <div className="space-y-3 rounded-xl bg-ink-50 p-4 text-left text-sm text-ink-900/70">
          <div className="flex items-center justify-between font-semibold text-ink-900">
            <span>결제 상태</span>
            <span className={copy.tone.badge}>{copy.badge}</span>
          </div>
          {searchParams?.message ? (
            <div className="rounded-lg bg-white px-3 py-2 text-xs text-ink-900/70">
              <p className="font-semibold text-ink-900">에러 메시지</p>
              <p className="mt-1 break-words text-ink-900/70">
                {searchParams.message}
              </p>
            </div>
          ) : null}
          <p className="text-xs text-ink-900/60">
            샌드박스 successUrl / failUrl은 developers.danalpay.com으로 고정되어 있습니다.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 text-sm font-semibold">
          <Link
            href="/mentoring/apply/subscribe"
            className="rounded-lg bg-main-600 px-4 py-2 text-white transition hover:bg-main-600/90"
          >
            다시 결제하기
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-gray-200 px-4 py-2 text-ink-900 transition hover:border-main-200 hover:text-main-700"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}
