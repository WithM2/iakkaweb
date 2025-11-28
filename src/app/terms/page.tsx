import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

const termsSections = [
  {
    id: "purpose",
    title: "제1조 (목적)",
    paragraphs: [
      "이 약관은 (주) 아카(이하 \"회사\")가 제공하는 서비스의 이용과 관련하여 회사와 이용자 간 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.",
    ],
  },
  {
    id: "definitions",
    title: "제2조 (용어의 정의)",
    paragraphs: [
      "1. \"서비스\"란 회사가 제공하는 교육 및 관련 제반 서비스를 의미합니다.",
      "2. \"이용자\"란 본 약관에 동의하고 서비스를 이용하는 개인 또는 법인을 말합니다.",
      "3. 본 약관에서 정하지 아니한 사항은 관계 법령 및 개별 안내에 따릅니다.",
    ],
  },
  {
    id: "effectiveness",
    title: "제3조 (약관의 효력 및 변경)",
    paragraphs: [
      "회사는 필요한 경우 관련 법령을 위반하지 않는 범위에서 본 약관을 개정할 수 있으며, 변경 내용과 시행일을 최소 7일 전에 공지합니다.",
      "이용자가 변경 후에도 서비스를 계속 이용하는 경우 변경된 약관에 동의한 것으로 봅니다.",
    ],
  },
  {
    id: "service",
    title: "제4조 (서비스의 제공)",
    paragraphs: [
      "회사는 학습 콘텐츠, 멘토링, 이벤트 등 다양한 프로그램을 제공할 수 있으며, 서비스의 구체적인 내용은 별도의 안내를 통해 설명합니다.",
      "기술적 사유나 운영상 필요에 따라 서비스 제공을 일시 중단할 수 있으며, 이 경우 사전 또는 사후에 공지합니다.",
    ],
  },
  {
    id: "user-obligations",
    title: "제5조 (이용자의 의무)",
    paragraphs: [
      "이용자는 관계 법령, 본 약관 및 안내에 따라 서비스를 이용해야 하며, 타인의 권리를 침해하거나 서비스 운영을 방해해서는 안 됩니다.",
      "회원 계정 및 인증 정보는 이용자 본인이 직접 관리해야 하며, 제3자에게 양도·대여할 수 없습니다.",
    ],
  },
  {
    id: "fees",
    title: "제6조 (이용 요금 및 결제)",
    paragraphs: [
      "일부 서비스는 유료로 제공될 수 있으며, 결제 조건은 별도의 결제 화면 또는 계약서에 따릅니다.",
      "유료 서비스 이용 중 해지 또는 환불 조건은 관련 법령과 회사의 운영 정책을 따릅니다.",
    ],
  },
  {
    id: "termination",
    title: "제7조 (이용 제한 및 해지)",
    paragraphs: [
      "회사는 이용자가 약관을 위반한 경우 서비스 이용을 제한하거나 계약을 해지할 수 있으며, 긴급한 사유가 있는 경우 즉시 조치할 수 있습니다.",
      "이용자는 언제든지 고객센터를 통해 서비스 이용을 해지할 수 있으며, 해지 시 관련 법령에서 정한 범위 내에서 데이터를 보관 또는 삭제합니다.",
    ],
  },
  {
    id: "liability",
    title: "제8조 (책임의 한계)",
    paragraphs: [
      "회사는 천재지변, 불가항력적 사유, 이용자의 책임 있는 사유로 발생한 손해에 대해 책임을 지지 않습니다.",
      "회사가 제공하는 정보나 자료는 학습 및 참고용으로 제공되며, 이용자는 자신의 판단과 책임하에 이를 활용합니다.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="bg-[#f7f8fa] text-ink-900">
        <section className="bg-[#0f1116] py-14 text-white md:py-18">
          <div className="mx-auto flex w-full max-w-[1040px] flex-col gap-4 px-5 md:px-6">
            <p className="text-[14px] font-semibold uppercase tracking-[0.28em] text-main-200 md:text-[15px]">
              Terms of Service
            </p>
            <h1 className="text-[28px] font-bold leading-[36px] md:text-[40px] md:leading-[52px]">
              IAKKA 서비스 이용약관
            </h1>
            <p className="max-w-[840px] text-[15px] leading-[24px] text-white/70 md:text-[16px] md:leading-[26px]">
              토스페이먼츠 약관 레이아웃처럼 핵심 정보를 먼저 안내하고, 모든 이용자가
              동일한 기준으로 서비스를 이용할 수 있도록 정리한 더미 약관입니다.
            </p>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-[1040px] flex-col gap-8 px-5 py-12 md:px-6 md:py-16">
          <div className="rounded-2xl border border-[#e6e9ef] bg-white/80 p-6 shadow-[0_18px_60px_rgba(13,20,33,0.07)] md:p-8">
            <h2 className="text-[18px] font-semibold text-main-700 md:text-[20px]">안내</h2>
            <p className="mt-3 text-[14px] leading-[22px] text-ink-800 md:text-[15px] md:leading-[24px]">
              본 약관은 서비스 이용에 대한 기본적인 사항을 담고 있으며, 별도의 약정이나
              정책이 있는 경우 해당 내용이 우선 적용될 수 있습니다. 고객센터를 통해 언제든
              문의하실 수 있습니다.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "시행일",
                  content: "2024. 01. 01",
                },
                {
                  title: "버전",
                  content: "v1.0 (더미)",
                },
                {
                  title: "문의",
                  content: "contact@iakka.kr",
                },
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
              {termsSections.map(({ id, title }) => (
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
            {termsSections.map(({ id, title, paragraphs }) => (
              <article
                key={id}
                id={id}
                className="rounded-2xl border border-[#e6e9ef] bg-white p-6 shadow-[0_18px_60px_rgba(13,20,33,0.07)] md:p-8"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-[6px] inline-flex h-6 w-6 items-center justify-center rounded-full bg-main-50 text-[12px] font-semibold text-main-700">
                    §
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
