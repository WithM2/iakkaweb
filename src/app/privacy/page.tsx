import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

const privacySections = [
  {
    id: "article1",
    title: "제1조 (개인정보의 처리 목적, 수집 항목 및 보유 기간)",
    paragraphs: [
      "회사는 다음의 목적 범위 내에서만 개인정보를 처리하며, 목적이 변경되는 경우에는 관련 법령에 따라 별도 동의를 받습니다.",
      "1) 회원 가입 및 관리",
      "- 처리 목적: 회원 식별, 본인·연령 확인, 부정 이용 및 중복 가입 방지, 분쟁 조정을 위한 기록 보존",
      "- 수집 항목: (필수) 이름, 아이디(이메일), 비밀번호, 휴대전화번호 / (선택) 학교·학년, 거주지역, 자녀와의 관계(학부모 회원)",
      "- 보유 및 이용 기간: 회원 탈퇴 시까지",
      "2) 교육 서비스 제공 및 운영",
      "- 처리 목적: 수강 신청, 수업 운영, 학습 관리, 학부모 및 학생 대상 공지, 결과 안내",
      "- 수집 항목: 학습자 정보(이름, 학년, 반·소속), 학부모 성명 및 연락처, 수강 이력, 출결 정보, 과제·활동 결과물, 평가 결과",
      "- 보유 및 이용 기간: 서비스 제공 완료 및 요금 정산 완료 시까지",
      "3) 요금 정산 및 환불 처리",
      "- 처리 목적: 서비스 이용에 따른 결제, 환불, 영수증 발행",
      "- 수집 항목: 결제자 이름, 연락처, 결제일시, 결제 금액, 결제 수단 정보, 카드사명, 카드번호(일부), 은행명, 계좌번호(일부) 등 결제 관련 기록",
      "- 보유 및 이용 기간: 5년 (전자상거래 등에서의 소비자보호에 관한 법률 근거)",
      "4) 온라인 수업 녹화 영상 처리",
      "- 처리 목적: 수업 품질 관리, 분쟁 발생 시 사실 확인, 학습 안전관리 및 부정행위 방지",
      "- 수집 항목: 수업 녹화 영상(학생·멘토의 얼굴, 음성, 화면 공유 내용 포함), 녹화 생성 시각 등 메타데이터",
      "- 보유 및 이용 기간: 수업 종료 후 30일간 보관 후 복구가 불가능한 방법으로 파기 (분쟁이 있는 경우 해당 분쟁 종료 시까지 추가 보관 가능)",
      "- 안내: 녹화 영상은 내부에서 엄격히 접근이 통제되며, 명시된 목적 외로 이용되거나 외부에 제공되지 않습니다.",
      "5) 고객 상담 및 민원 처리",
      "- 처리 목적: 문의사항 응대, 불만 처리 및 공지 전달",
      "- 수집 항목: 성명, 연락처(전화번호·이메일), 문의 내용, 처리 기록",
      "- 보유 및 이용 기간: 3년 (전자상거래 등에서의 소비자보호에 관한 법률 근거)",
      "6) 서비스 이용 기록 분석",
      "- 처리 목적: 서비스 개선, 통계 분석, 접속 빈도 파악",
      "- 수집 항목: 접속 IP 주소, 쿠키, 방문 일시, 서비스 이용 기록, 기기 정보(OS, 브라우저 종류 등)",
      "- 보유 및 이용 기간: 3개월 (통신비밀보호법 근거)",
      "이용자는 위 개인정보 수집·이용에 대한 동의를 거부할 권리가 있습니다. 다만 필수 항목 동의를 거부하는 경우 회원 가입 및 서비스 이용이 제한될 수 있고, 선택 항목 미동의 시 일부 맞춤형 서비스 제공에 제한이 있을 수 있습니다.",
      "개인정보 수집 방법: 사이트 회원 가입, 서면 양식, 서비스 이용 과정에서 정보주체가 직접 입력, 제휴 기관으로부터의 수강생 명단 제공(별도 동의 후), 고객센터(전화·이메일·온라인 문의)를 통한 상담, 서비스 이용 과정에서 자동으로 생성되는 정보 수집 등",
    ],
  },
  {
    id: "article2",
    title: "제2조 (개인정보의 제3자 제공)",
    paragraphs: [
      "회사는 제1조에서 명시한 목적 범위 내에서만 개인정보를 처리하며, 정보주체의 동의가 있거나 법률에 특별한 규정이 있는 경우 등 개인정보 보호법이 허용하는 범위에서만 제3자에게 제공합니다.",
      "회사가 개인정보를 제3자에게 제공해야 하는 경우에는 다음 사항을 개별적으로 안내하고 사전 동의를 받습니다.",
      "- 개인정보를 제공받는 자의 명칭 및 연락처",
      "- 제공받는 자의 개인정보 이용 목적",
      "- 제공하는 개인정보 항목",
      "- 제공받는 자의 보유 및 이용 기간",
      "- 동의를 거부할 권리 및 동의 거부에 따른 불이익 내용",
    ],
  },
  {
    id: "article3",
    title: "제3조 (개인정보 처리의 위탁)",
    paragraphs: [
      "회사는 원활한 서비스 제공을 위해 개인정보 처리 업무의 일부를 수탁업체에 위탁할 수 있습니다.",
      "현재 위탁 중인 개인정보 처리 업무 및 수탁업체는 아래와 같습니다.",
    ],
  },
  {
    id: "article4",
    title: "제4조 (만 14세 미만 아동의 개인정보 처리에 관한 사항)",
    paragraphs: [
      "회사는 만 14세 미만 아동의 개인정보를 처리할 때 개인정보 보호법 제22조의2에 따라 법정대리인 동의를 반드시 받습니다.",
      "법정대리인 동의를 위해 필요한 최소한의 정보(법정대리인의 성명, 연락처 등)는 아동으로부터 직접 수집할 수 있습니다.",
      "법정대리인 동의 여부 확인은 관련 시행령에서 정한 방법(휴대전화 문자 인증, 인터넷 사이트에서의 동의 표시 확인 등)에 준하는 방식으로 진행합니다.",
      "법정대리인은 아동의 개인정보에 대해 열람, 정정·삭제, 처리정지 요구 등 정보주체의 권리를 행사할 수 있습니다.",
    ],
  },
  {
    id: "article5",
    title: "제5조 (정보주체와 법정대리인의 권리·의무 및 그 행사방법)",
    paragraphs: [
      "정보주체(만 14세 미만인 경우 법정대리인)는 언제든지 회사에 대해 다음과 같은 개인정보 관련 권리를 행사할 수 있습니다.",
      "- 개인정보 열람 요구",
      "- 개인정보 정정·삭제 요구",
      "- 개인정보 처리정지 요구",
      "권리 행사는 서면, 전화, 전자우편, 사이트 내 문의하기 등으로 요청하실 수 있으며, 회사는 지체 없이 필요한 조치를 진행합니다.",
      "정보주체가 개인정보 오류에 대한 정정 또는 삭제를 요구하는 동안 회사는 해당 개인정보를 정정·삭제 완료 전까지 이용하거나 제3자에게 제공하지 않습니다.",
      "권리 행사는 법정대리인 또는 위임을 받은 대리인을 통해서도 할 수 있으며, 이 경우 회사는 적법한 대리인임을 확인하기 위한 위임장 등 증빙서류를 요청할 수 있습니다.",
      "정보주체는 개인정보 보호법 등 관계 법령을 위반하여 회사 및 타인의 개인정보와 사생활을 침해해서는 안 됩니다.",
    ],
  },
  {
    id: "article6",
    title: "제6조 (개인정보의 파기)",
    paragraphs: [
      "회사는 보유 기간이 경과하거나 처리 목적이 달성되는 등 개인정보가 불필요해진 경우, 지체 없이 해당 정보를 파기합니다.",
      "정보주체로부터 동의받은 보유기간이 지나거나 처리 목적이 달성되었더라도, 다른 법령에 따라 계속 보존해야 하는 경우에는 별도의 DB로 옮기거나 보관 장소를 달리하여 분리 보관합니다.",
      "개인정보 파기 절차 및 방법은 다음과 같습니다.",
      "- 파기절차: 파기 사유가 발생한 정보를 선정하고, 개인정보 보호책임자의 승인을 받아 파기합니다.",
      "- 파기방법: 전자 파일은 복구·재생이 불가능한 기술적 방법으로 삭제하고, 종이 문서는 분쇄하거나 소각하여 파기합니다.",
    ],
  },
  {
    id: "article7",
    title: "제7조 (개인정보의 안전성 확보 조치)",
    paragraphs: [
      "회사는 개인정보의 안전한 처리를 위하여 다음과 같은 조치를 시행하고 있습니다.",
      "- 관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육, 개인정보 취급자 최소화",
      "- 기술적 조치: 개인정보처리시스템 접근권한 관리, 비밀번호 등 주요 정보 암호화, 보안프로그램 설치 및 주기적 갱신",
      "- 물리적 조치: 전산실, 자료보관실 등의 출입 통제",
    ],
  },
  {
    id: "article8",
    title: "제8조 (쿠키(Cookie)의 설치·운영 및 거부에 관한 사항)",
    paragraphs: [
      "회사는 이용자에게 보다 적합한 서비스를 제공하기 위해 필요 시 쿠키(Cookie)를 사용할 수 있습니다.",
      "쿠키는 웹사이트 운영 서버가 이용자의 브라우저에 전송하는 소량의 정보로, 이용자의 PC·모바일 기기에 저장될 수 있습니다.",
      "이용자는 브라우저 설정을 통해 쿠키 저장을 거부하거나 저장된 쿠키를 삭제할 수 있습니다.",
      "브라우저 예시(인터넷 익스플로러): 웹 브라우저 상단 메뉴 → 도구 → 인터넷 옵션 → 개인정보 설정에서 가능",
      "쿠키 사용을 거부할 경우, 로그인 기반 일부 서비스 이용에 제한이 발생할 수 있습니다.",
    ],
  },
  {
    id: "article9",
    title: "제9조 (개인정보 보호책임자)",
    paragraphs: [
      "회사는 개인정보 처리에 관한 업무를 총괄·책임지고, 개인정보 관련 문의·불만 처리 및 피해 구제를 담당하는 개인정보 보호책임자를 지정하고 있습니다.",
      "- 개인정보 보호책임자",
      "  성명: 이재현",
      "  직책: 대표",
      "  연락처: 031-341-0888",
      "  이메일: iakka.kr@gmail.com",
      "정보주체는 서비스 이용 중 발생하는 모든 개인정보 보호 관련 문의, 불만 처리, 피해 구제 요구 등을 위 연락처로 요청할 수 있으며, 회사는 지체 없이 답변 및 처리합니다.",
    ],
  },
  {
    id: "article10",
    title: "제10조 (권익침해 구제방법)",
    paragraphs: [
      "정보주체는 개인정보 침해로 인한 피해 구제를 위하여 다음 기관에 분쟁조정 또는 상담을 신청할 수 있습니다.",
      "- 개인정보분쟁조정위원회: (국번없이) 1833-6972 / www.kopico.go.kr",
      "- 개인정보침해신고센터(한국인터넷진흥원): (국번없이) 118 / privacy.kisa.or.kr",
      "- 대검찰청: (국번없이) 1301 / www.spo.go.kr",
      "- 경찰청 사이버범죄 신고시스템: (국번없이) 182 / ecrm.cyber.go.kr",
    ],
  },
  {
    id: "article11",
    title: "제11조 (개인정보처리방침의 공개 및 변경)",
    paragraphs: [
      "본 개인정보처리방침은 회사 웹사이트(https://www.iakka.kr/ko) 첫 화면 하단에서 상시 확인할 수 있도록 공개합니다.",
      "법령·정책 또는 서비스 변경으로 내용이 추가·삭제·수정되는 경우, 시행 7일 전부터 사이트 공지사항이나 팝업 등을 통해 안내합니다.",
      "수집 항목이나 이용 목적 등 정보주체 권리에 중대한 변경이 발생하는 경우에는 최소 30일 전에 공지하고, 필요한 경우 별도의 동의를 다시 받을 수 있습니다.",
      "변경된 방침은 공지된 시행일자부터 효력이 발생하며, 현재 방침의 적용 시작일은 2025. 12. 02.입니다.",
    ],
  },
];

const consignmentRows = [
  {
    company: "(주)다날",
    task: "신용카드·계좌이체 등 결제 처리, 휴대전화 본인 확인",
  },
  {
    company: "문자/알림톡 대행업체 (도입 시 공지)",
    task: "공지사항 및 정보 안내를 위한 문자·알림톡 발송",
  },
  {
    company: "Supabase",
    task: "데이터베이스 운영 및 서비스 제공을 위한 시스템 인프라 제공",
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
              에듀테크 서비스 IAKKA는 개인정보 보호법 등 관련 법령을 준수하며,
              웹사이트와 온·오프라인 교육 서비스를 이용하는 모든 정보주체의
              개인정보와 권익 보호를 위해 본 개인정보처리방침을 적용합니다.
            </p>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-[1040px] flex-col gap-8 px-5 py-12 md:px-6 md:py-16">
          <div className="rounded-2xl border border-[#e6e9ef] bg-white/80 p-6 shadow-[0_18px_60px_rgba(13,20,33,0.07)] md:p-8">
            <h2 className="text-[18px] font-semibold text-main-700 md:text-[20px]">
              안내
            </h2>
            <p className="mt-3 text-[14px] leading-[22px] text-ink-800 md:text-[15px] md:leading-[24px]">
              본 개인정보처리방침은 IAKKA가 운영하는
              웹사이트(https://www.iakka.kr/ko) 및 회사가 제공하는 모든
              온라인·오프라인 교육 서비스에 공통으로 적용되며, 개인정보의
              수집·이용·보관·파기 및 정보주체의 권리와 그 행사 방법을
              규정합니다.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                { title: "시행일", content: "2025. 12. 02." },
                { title: "버전", content: "v1.0" },
                { title: "문의", content: "iakka.kr@gmail.com" },
              ].map(({ title, content }) => (
                <div
                  key={title}
                  className="rounded-xl border border-main-100 bg-main-50 px-4 py-3 text-[14px] text-ink-900"
                >
                  <p className="text-[13px] font-semibold text-main-600">
                    {title}
                  </p>
                  <p className="mt-1 font-medium text-ink-800">{content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#e6e9ef] bg-white p-6 shadow-[0_18px_60px_rgba(13,20,33,0.07)] md:p-8">
            <h3 className="text-[17px] font-semibold text-ink-900 md:text-[19px]">
              목차
            </h3>
            <ol className="mt-4 grid gap-3 text-[14px] leading-[22px] text-ink-800 md:grid-cols-2 md:text-[15px]">
              {privacySections.map(({ id, title }) => (
                <li key={id} className="flex items-start gap-2">
                  <span
                    className="mt-[3px] h-[6px] w-[6px] rounded-full bg-main-500"
                    aria-hidden
                  />
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
                    <h4 className="text-[17px] font-semibold text-ink-900 md:text-[19px]">
                      {title}
                    </h4>
                    <div className="mt-3 space-y-3 text-[14px] leading-[22px] text-ink-800 md:text-[15px] md:leading-[24px]">
                      {paragraphs.map((text, idx) => (
                        <p key={idx}>{text}</p>
                      ))}

                      {/* 제3조(위탁)에서만 실제 표 렌더링 */}
                      {id === "article3" && (
                        <div className="mt-4 overflow-x-auto">
                          <table className="w-full border-collapse text-left text-[14px] md:text-[15px]">
                            <thead>
                              <tr className="bg-main-50">
                                <th className="border border-[#e6e9ef] px-3 py-2 font-semibold text-ink-900">
                                  수탁업체 명
                                </th>
                                <th className="border border-[#e6e9ef] px-3 py-2 font-semibold text-ink-900">
                                  위탁업무 내용
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {consignmentRows.map((row) => (
                                <tr key={row.company}>
                                  <td className="border border-[#e6e9ef] px-3 py-2 align-top text-ink-900">
                                    {row.company}
                                  </td>
                                  <td className="border border-[#e6e9ef] px-3 py-2 align-top text-ink-800">
                                    {row.task}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <p className="mt-2 text-[13px] text-ink-700">
                            위탁업무의 내용 또는 수탁업체가 변경되는 경우,
                            회사는 본 개인정보처리방침을 통해 지체 없이 해당
                            내용을 공개합니다.
                          </p>
                        </div>
                      )}
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
