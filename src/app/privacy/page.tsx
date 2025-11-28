import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

const privacySections = [
  {
    id: "collection",
    title: "1. 수집하는 개인정보 항목",
    paragraphs: [
      "회원 가입, 상담, 서비스 신청 시 이름, 연락처, 이메일 등 기본 정보가 수집될 수 있습니다.",
      "서비스 이용 과정에서 결제 기록, 기기 정보, 로그 기록 등 서비스 운영에 필요한 최소한의 정보가 발생할 수 있습니다.",
    ],
  },
  {
    id: "purpose",
    title: "2. 개인정보의 이용 목적",
    paragraphs: [
      "서비스 제공 및 계약 이행, 고객 상담 및 민원 처리를 위해 개인정보를 활용합니다.",
      "맞춤형 콘텐츠 안내, 서비스 개선, 보안 모니터링 등 이용자 경험 향상을 위한 목적으로 사용할 수 있습니다.",
    ],
  },
  {
    id: "retention",
    title: "3. 보유 및 이용 기간",
    paragraphs: [
      "법령에서 별도로 정한 기간이 있는 경우 해당 기간 동안 보관하며, 그 외에는 수집 및 이용 목적이 달성되면 지체 없이 파기합니다.",
      "단, 부정 이용 방지 및 분쟁 해결을 위해 관련 법령에서 허용하는 범위 내에서 일정 기간 보관될 수 있습니다.",
    ],
  },
  {
    id: "consignment",
    title: "4. 개인정보의 처리 위탁",
    paragraphs: [
      "서비스 제공을 위해 필요한 업무 중 일부를 외부 전문 업체에 위탁할 수 있으며, 위탁 시 개인정보 보호 관련 법령을 준수합니다.",
      "위탁 업체와 역할, 보관 기간 등 구체적인 내용은 별도의 안내 또는 공지를 통해 확인하실 수 있습니다.",
    ],
  },
  {
    id: "rights",
    title: "5. 이용자 및 법정대리인의 권리",
    paragraphs: [
      "이용자와 법정대리인은 언제든지 개인정보 열람, 정정, 삭제를 요청할 수 있으며 회사는 지체 없이 필요한 조치를 취합니다.",
      "개인정보 처리에 대한 동의를 철회하는 경우 서비스 이용에 제한이 발생할 수 있으며, 회사는 관련 법령에 따라 필요한 범위 내에서 정보를 보관할 수 있습니다.",
    ],
  },
  {
    id: "security",
    title: "6. 개인정보의 안전성 확보 조치",
    paragraphs: [
      "회사는 개인정보 암호화, 접근 통제, 보안 교육 등 합리적인 보호 조치를 마련하여 개인정보를 안전하게 관리합니다.",
      "보안 사고 발생 시 지체 없이 사실을 알리고, 추가 피해를 방지하기 위한 조치를 시행합니다.",
    ],
  },
  {
    id: "contact",
    title: "7. 개인정보 보호책임자 및 문의처",
    paragraphs: [
      "개인정보 보호책임자: 더미 이름 / 이메일: privacy@iakka.kr / 연락처: 031-341-0888",
      "기타 개인정보 침해에 대한 신고나 상담이 필요한 경우 한국인터넷진흥원(KISA) 등 관계 기관에 문의하실 수 있습니다.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="bg-[#f7f8fa] text-ink-900">
        <section className="bg-[#0f1116] py-14 text-white md:py-18">
          <div className="mx-auto flex w-full max-w-[1040px] flex-col gap-4 px-5 md:px-6">
            <p className="text-[14px] font-semibold uppercase tracking-[0.28em] text-main-200 md:text-[15px]">
              Privacy Policy
            </p>
            <h1 className="text-[28px] font-bold leading-[36px] md:text-[40px] md:leading-[52px]">
              개인정보처리방침
            </h1>
            <p className="max-w-[840px] text-[15px] leading-[24px] text-white/70 md:text-[16px] md:leading-[26px]">
              토스페이먼츠 정책 페이지처럼 주요 항목을 명확하게 나열한 더미 개인정보처리방침입니다.
            </p>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-[1040px] flex-col gap-8 px-5 py-12 md:px-6 md:py-16">
          <div className="rounded-2xl border border-[#e6e9ef] bg-white/80 p-6 shadow-[0_18px_60px_rgba(13,20,33,0.07)] md:p-8">
            <h2 className="text-[18px] font-semibold text-main-700 md:text-[20px]">안내</h2>
            <p className="mt-3 text-[14px] leading-[22px] text-ink-800 md:text-[15px] md:leading-[24px]">
              서비스 이용 과정에서 수집되는 개인정보는 투명하게 관리되며, 회사는 이용자 권리 보호를 위해 최선을 다합니다. 아래 내용을 통해 수집, 이용, 보관, 보호 절차를 확인하세요.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                { title: "시행일", content: "2024. 01. 01" },
                { title: "버전", content: "v1.0 (더미)" },
                { title: "문의", content: "privacy@iakka.kr" },
              ].map(({ title, content }) => (
                <div
                  key={title}
                  className="rounded-xl border border-main-100 bg-main-50 px-4 py-3 text-[14px] text-ink-900"
                >
                  <p className="text-[13px] font-semibold text-main-600">{title}</p>
                  <p className="mt-1 font-medium text-ink-800">{content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#e6e9ef] bg-white p-6 shadow-[0_18px_60px_rgba(13,20,33,0.07)] md:p-8">
            <h3 className="text-[17px] font-semibold text-ink-900 md:text-[19px]">목차</h3>
            <ol className="mt-4 grid gap-3 text-[14px] leading-[22px] text-ink-800 md:grid-cols-2 md:text-[15px]">
              {privacySections.map(({ id, title }) => (
                <li key={id} className="flex items-start gap-2">
                  <span className="mt-[3px] h-[6px] w-[6px] rounded-full bg-main-500" aria-hidden />
                  <a className="hover:text-main-600" href={`#${id}`}>
                    {title}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-6">
            {privacySections.map(({ id, title, paragraphs }) => (
              <article
                key={id}
                id={id}
                className="rounded-2xl border border-[#e6e9ef] bg-white p-6 shadow-[0_18px_60px_rgba(13,20,33,0.07)] md:p-8"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-[6px] inline-flex h-6 w-6 items-center justify-center rounded-full bg-main-50 text-[12px] font-semibold text-main-700">
                    ●
                  </span>
                  <div>
                    <h4 className="text-[17px] font-semibold text-ink-900 md:text-[19px]">{title}</h4>
                    <div className="mt-3 space-y-3 text-[14px] leading-[22px] text-ink-800 md:text-[15px] md:leading-[24px]">
                      {paragraphs.map((text) => (
                        <p key={text}>{text}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
