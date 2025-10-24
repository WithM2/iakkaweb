const OFFICE_INFO = [
  "경기도 안양시 만안구 안양로 311,",
  "project 500 tower 1610",
];

const INQUIRY_INFO = [
  { label: "전화 문의", value: "010-3199-1331" },
  { label: "이메일 문의", value: "iakka.kr@gmail.com" },
];

export function ContactSection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-20 md:px-6 md:py-[120px]">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="md:max-w-[240px]">
            <p className="text-[13px] font-semibold uppercase tracking-[0.6em] text-main-600 md:text-sm">
              CONTACT
            </p>
            <h3 className="mt-4 text-[24px] font-bold leading-[34px] text-ink-900 md:text-[32px] md:leading-[44px]">
              언제든지 IAKKA와 상담해 보세요
            </h3>
            <p className="mt-3 text-[14px] leading-[22px] text-ink-900/70 md:text-[15px] md:leading-[24px]">
              방문, 전화, 이메일 등 편한 방법으로 문의를 남겨 주시면 빠르게
              도와드릴게요.
            </p>
          </div>

          <div className="flex flex-1 flex-col gap-6 md:flex-row">
            <div className="flex-1 rounded-[32px] border border-main-300 bg-main-100/80 px-7 py-8 shadow-[0_20px_60px_rgba(8,32,85,0.1)] md:px-9 md:py-10">
              <h4 className="text-[18px] font-semibold text-main-800 md:text-[20px]">
                사무실 오시는 길
              </h4>
              <div className="mt-4 space-y-1 text-[15px] leading-[24px] text-ink-900/80 md:text-[16px] md:leading-[26px]">
                {OFFICE_INFO.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>

            <div className="flex-1 rounded-[32px] border border-main-300 bg-main-100/80 px-7 py-8 shadow-[0_20px_60px_rgba(8,32,85,0.1)] md:px-9 md:py-10">
              <h4 className="text-[18px] font-semibold text-main-800 md:text-[20px]">
                전화 문의
              </h4>
              <dl className="mt-4 space-y-4">
                {INQUIRY_INFO.map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-1 text-left">
                    <dt className="text-[13px] font-semibold uppercase tracking-[0.24em] text-main-600 md:text-[14px]">
                      {label}
                    </dt>
                    <dd className="text-[18px] font-semibold text-ink-900 md:text-[20px]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
