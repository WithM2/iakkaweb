import Link from "next/link";

const FOOTER_LINKS = [
  { label: "이용약관", href: "/terms" },
  { label: "개인정보처리방침", href: "/privacy" },
  { label: "고객센터", href: "/contact" },
];

const COMPANY_DETAILS = [
  "사업자명 : (주) 아카",
  "사업자등록번호 : 869-88-03078",
  "전화 : 031-341-0888",
  "주소 : 경기도 안양시 만안구 안양로 311, 16층 10호 (안양동, PROJECT 500 TOWER)",
  "이메일 : iakka.kr@gmail.com",
  "대표자명 : 이재현",
];

const CONTACT_CHANNELS = [
  {
    label: "전화 연결",
    href: "tel:031-341-0888",
    icon: (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 4h4l2 5-3 2c1 2.5 3.5 5 6 6l2-3 5 2v4c0 1.1-.9 2-2 2C10.4 22 2 13.6 2 3c0-1.1.9-2 2-2h1z"
        />
      </svg>
    ),
  },
  {
    label: "이메일 보내기",
    href: "mailto:iakka.kr@gmail.com",
    icon: (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm16 0-8 7-8-7"
        />
      </svg>
    ),
  },
  {
    label: "인스타그램 열기",
    href: "https://www.instagram.com/iakka_official/",
    icon: (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <rect x={3} y={3} width={18} height={18} rx={5} ry={5} />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <circle cx={17.5} cy={6.5} r={1} />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#101318] text-white">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-14 md:px-6 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="space-y-6 md:max-w-[420px]">
            <p className="text-[26px] font-semibold tracking-[-0.01em] text-white md:text-[32px]">
              IAKKA
            </p>
            <nav className="flex flex-wrap gap-x-6 gap-y-3 text-[14px] text-white/70 md:text-[15px]">
              {FOOTER_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="transition-colors hover:text-white"
                  aria-label={label}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-3 md:text-right">
            <p className="text-[13px] font-semibold uppercase tracking-[0.45em] text-main-300 md:text-[14px]">
              고객센터
            </p>
            <p className="text-[32px] font-bold leading-none text-white md:text-[40px]">
              031-341-0888
            </p>
            <p className="text-[13px] text-white/60 md:text-[14px]">
              평일 09:00 - 18:00 (주말 · 공휴일 제외)
            </p>
            <div className="flex gap-3 md:justify-end">
              {CONTACT_CHANNELS.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-white/30 hover:bg-white/10"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 h-px bg-white/10" />

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2 text-[12px] leading-[20px] text-white/55 md:text-[13px] md:leading-[22px]">
            {COMPANY_DETAILS.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <div className="flex flex-col items-start gap-2 text-[12px] text-white/60 md:text-right">
            <span className="font-semibold text-white/80 md:text-[13px]">
              상담 예약
            </span>
            <a
              className="text-white hover:text-main-300"
              href="mailto:iakka.kr@gmail.com"
            >
              iakka.kr@gmail.com
            </a>
            <a
              className="text-white hover:text-main-300"
              href="tel:01031991331"
            >
              031-341-0888
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
