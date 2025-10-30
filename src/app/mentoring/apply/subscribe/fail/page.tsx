import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Link from "next/link";

export default function MentoringSubscribeFailPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="mx-auto w-full max-w-[960px] px-5 py-20 text-center md:px-6 md:py-28">
          <p className="text-[14px] font-semibold uppercase tracking-[0.18em] text-red-500">
            결제 실패
          </p>
          <h1 className="mt-4 text-[32px] font-bold tracking-[-0.01em] text-ink-900 md:text-[40px]">
            결제를 완료하지 못했습니다.
          </h1>
          <p className="mt-4 text-[14px] leading-[24px] text-ink-900/70 md:text-[16px] md:leading-[26px]">
            다시 시도하거나 다른 결제 수단을 선택해주세요. 문제가 계속된다면 고객센터로 문의 부탁드립니다.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row">
            <Link
              href="/mentoring/apply/subscribe"
              className="inline-flex items-center justify-center rounded-[16px] bg-main-600 px-6 py-3 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-main-600/90"
            >
              결제 다시 시도하기
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-[16px] border border-ink-900/10 px-6 py-3 text-[15px] font-semibold text-ink-900/80 transition-colors duration-200 hover:border-main-200 hover:text-main-700"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
