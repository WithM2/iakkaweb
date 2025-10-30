"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="mx-auto w-full max-w-[1200px] h-16 px-4 md:px-6 flex items-center gap-3">
        {/* LEFT GROUP: 로고 + GNB (왼쪽에 붙음) */}
        <div className="flex items-center gap-6">
          <Link href="/ko" className="flex items-center">
            <Image
              src="/images/logo.svg"
              alt="IAKKA"
              width={96}
              height={24}
              className="h-auto w-[86px]"
              priority
            />
          </Link>

          {/* GNB: md 이상에서 표시, 로고 옆에 밀착 */}
          <nav className="hidden md:flex items-center gap-7 text-[14px] text-gray-700">
            {/* 
            <Link href="/about" className="hover:text-gray-900">기업정보</Link>
            <Link href="/programs" className="hover:text-gray-900">교육 프로그램</Link>
            <Link href="/community" className="hover:text-gray-900">커뮤니티</Link>
            <Link href="/support" className="hover:text-gray-900">고객지원</Link>
             */}
          </nav>
        </div>

        {/* RIGHT GROUP: 우측 끝으로 밀기 */}
        <div className="ml-auto flex items-center gap-2">
          {/* 상담문의: 아웃라인 */}
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center rounded-[12px] border border-blue-600 text-blue-600 px-3 py-2 text-[13px] font-semibold hover:bg-blue-50"
          >
            상담문의
          </Link>

          {/* 교육신청: 블루 */}
          <Link
            href="mentoring/apply"
            className="inline-flex items-center rounded-[12px] bg-blue-600 text-white px-3 py-2 text-[13px] font-semibold hover:bg-blue-700"
          >
            교육신청
          </Link>

          {/* 언어 아이콘 */}
          {/* <button
            aria-label="언어 선택"
            className="inline-flex items-center justify-center p-0 text-gray-700 hover:text-gray-900
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/40"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
            >
              <path
                stroke="currentColor"
                strokeWidth="1.5"
                d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9Z"
              />
              <path
                stroke="currentColor"
                strokeWidth="1.5"
                d="M3 12h18M12 3c2.5 2.6 3.75 5.6 3.75 9S14.5 17.4 12 21M12 3c-2.5 2.6-3.75 5.6-3.75 9S9.5 17.4 12 21"
              />
            </svg>
          </button> */}

          {/* 햄버거: 아이콘만 노출 (원형 테두리/배경 제거) */}
          {/* <button
            aria-label="메뉴 열기"
            className="inline-flex items-center justify-center p-0 text-gray-700
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/40"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button> */}
        </div>
      </div>
    </header>
  );
}
