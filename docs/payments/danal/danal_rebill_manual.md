# 다날페이카드 정기결제 연동 가이드 (정식 Markdown 버전)

본 문서는 다날페이카드 정기결제(BATCH) 시스템 이해 및 연동 개발을 위한 기술 문서이다.  
정기결제용 BILLKEY 발급, 재결제(OTBILL), 취소, 이벤트 조회 등 전체 프로세스와 각 API 파라미터를 정의한다.

---

## 1. 개요

다날페이카드 정기결제 시스템의 구조, 처리 흐름, 요청/응답 파라미터를 설명한다.

### A. 사전 준비사항

#### a. 공통 사항

- AES256 및 Base64 관련 라이브러리 설치 필요
- Java 환경:
  - Oracle JCE 7 이상 다운로드 후 `JAVA_HOME/lib/security`에 설치
  - Apache `commons-codec` 라이브러리 설치
- 모든 언어 공통으로 **AES256 + Base64** 조합을 사용해 DATA 필드를 암복호화

#### b. PHP

- 필수 PHP 확장
  - `openssl`
    - 미설치 시: 확장 설치 또는 별도 암호화 라이브러리 사용
    - 확인: `function_exist('openssl_encrypt')` 또는 `phpinfo()`
  - `curl`
    - 미설치 시: OpenSSL + CURL 별도 설치 후 연동
    - 확인: `function_exist('curl_init')` 또는 `phpinfo()`
- Linux 예시
  - OpenSSL: http://www.openssl.org/source/
  - CURL: http://curl.haxx.se/download.html
  - 설치 예시
    - `./config --prefix=/usr/local/openssl`
    - `make`
    - `make install`
    - `./configure --with-ssl=/usr/local/openssl`
    - `make`
    - `make install`

#### c. ASP

- MSXML3 COM+ 등록 (DLL 등록 방법은 별도 문서 참고)
  - .NET Framework 설치 시 생략 가능
- DNCryptoCOM AES256 암복호화 모듈 COM+ 등록
  - 다날 ASP 연동 모듈에 포함된 DNCryptoCOM 문서 참고

#### d. JSP

- `jsinbi-x.x.x.jar` 설치
  - CP 관리자 페이지 → 결제모듈 다운로드 → T-pay
  - JSP 서버 라이브러리 폴더에 배치
- `commons-codec-x.x.jar` 설치
  - https://commons.apache.org/proper/commons-codec/
  - JSP 서버 라이브러리 폴더에 배치

---

### E. 다날 신용카드 정기결제 연동 순서

1. 각 서버 환경에 맞는 웹 통신 환경 설정
2. `Ready` 및 `CPCGI` 페이지 수정 (CP / 상품 정보, 경로 정보 등 설정)
3. 초기인증 완료 후 (`CPCGI`) CP 측 처리
   - 서비스 제공, TID 저장, DB 처리 등
   - NOTI 사용 시: NOTI 페이지에서 결제 완료 처리
4. 초기인증 시 발급받은 정기결제용 BILLKEY로 정기결제 처리
   - 이때 정기결제를 요청할 **CP 서버 IP를 영업 담당자를 통해 사전 등록**해야 함

---

### B. System Requirement

- OS: Linux / Sun OS / Windows / FreeBSD / AIX 등 대부분의 OS 지원
- 언어: PHP / JSP / ASP 등

---

### C. Danal Server

- DR 등으로 인해 IP 변경 가능성이 있으므로 반드시 **도메인(URL) 기준 접속**해야 한다.
- 방화벽 설정:
  - Outbound (CP → 다날)
    - URL: `https://tx-creditcard.danalpay.com/credit/`
    - IP: `150.242.135.193`, `103.11.131.146`
  - Inbound (다날 → CP, NOTI 사용 시)
    - IP: `150.242.135.194`, `103.11.131.143`

---

## 2. 정기결제 흐름

### A. Service Diagram (개념)

정기결제 서비스는 아래 요소로 구성된다.

- 주체: 고객, 가맹점(CP), 다날 WEB, 다날 TX, 카드사, 휴대폰 본인확인 기관
- 주요 단계:
  1. 고객이 가맹점에서 정기결제 신청
  2. CP 서버가 다날 WEB 서버로 고객을 리다이렉트 (Ready/AUTH)
  3. 고객이 다날 결제창에서 카드정보 입력
  4. 휴대폰 본인확인 진행
  5. 다날이 초기인증 및 카드승인 수행
  6. BILLKEY 발급 및 CP 서버로 결과 전달
  7. 이후 CP 서버가 BILLKEY로 정기결제(OTBILL) 요청
  8. 카드사 승인 후 결과 응답/NOTI 전송

### B. Service Flow (요약)

- Ready (AUTH) → 다날 정기결제 초기인증창
- 고객 카드정보 입력 → 휴대폰 본인인증
- ISSUEBILLKEY 호출로 BILLKEY 발급
- OTBILL 호출로 BILLKEY 기반 정기결제 실행
- 필요 시 DELBILLKEY / Bill Cancel 호출

---

## B. 각 페이지 설명

### 1) CGI Script 페이지 목록

| 파일명             | 설명                                 |
| ------------------ | ------------------------------------ |
| `./inc/function.*` | 공통 함수 정의                       |
| `Order.*`          | 정기결제 주문 예제 페이지            |
| `Ready.*`          | CP 및 정기결제 요청 전송 페이지      |
| `Error.*`          | 에러 UI 페이지                       |
| `Cancel.*`         | 정기결제 초기인증 취소 UI 페이지     |
| `Noti.*`           | 정기결제 응답 통보 수신 페이지       |
| `Success.*`        | 정기결제 초기인증 성공 UI 페이지     |
| `OTBILL.*`         | BILLKEY 기반 정기결제 요청 페이지    |
| `ISSUEBILLKEY.*`   | BILLKEY 생성 요청 전송 페이지        |
| `DELBILLKEY.*`     | BILLKEY 삭제 요청 페이지             |
| `BillCancel.*`     | 승인 완료 건에 대한 취소 요청 페이지 |

---

### 2) Order 페이지

- 역할: 정기결제 주문 예제 페이지
- 설명: 예제용으로 주문 정보(상품명, 금액, 사용자 정보 등)를 입력받아 보여 줌

---

### 3) function

- 역할: 결제 서비스용 공통 함수 정의
- 설명: CP 환경에 맞게 반드시 변경해야 하는 주요 파라미터

| Field       | Required | Max(Byte) | 비고                                           |
| ----------- | -------- | --------- | ---------------------------------------------- |
| `CPID`      | Required | -         | 다날이 발급한 CP ID                            |
| `CRYPTOKEY` | Required | -         | 다날이 제공한 암·복호화 KEY (64자 해시 문자열) |

---

### 4) 특수문자 처리 규칙

요청 값에 다음 특수문자를 포함하면 오류 가능성이 있어 **사용 금지**:

- `&` (앰퍼샌드)
- `'` (작은따옴표)
- `"` (큰따옴표)
- `\` (역슬래시)
- `<` 또는 `>` (부등호)
- `|` (파이프)
- `\n`, `\r\n` (개행)
- `,` (콤마)
- `+` (플러스)

---

### 5) 암호화 규칙 (DATA 구성)

**전문을 직접 구성할 경우 반드시 다음 규칙을 따른다.**

- 요청 전문 구조:
  - `CPID=xxxxxxxxxx&DATA=xxxxxxxxxx`

- 파라미터 설명:
  - `CPID`: 다날에서 부여한 가맹점 ID
  - `DATA`: CPID를 제외한 모든 파라미터를 암호화한 값

#### DATA 생성 절차(요청 시)

1. CPID를 제외한 모든 파라미터를 Key=Value 형태로 나열
2. 각 value는 **URLEncode(EUC-KR)** 처리
3. `key=URLEncode(value)&key2=URLEncode(value2)&...` 형태의 QueryString 구성
4. 주어진 암호화 Key와 IV를 이용해 AES256 암호화 (binary)
5. 암호화 결과를 Base64 인코딩
6. Base64 결과를 다시 URLEncode
7. 최종 결과를 `DATA` 값으로 사용

> DATA = URLEncode( Base64Encode( AES256( QueryString ) ) )

#### DATA 해석 절차(응답 시)

1. 응답 `DATA` 값 URLDecode
2. Base64Decode
3. AES256 복호화 → QueryString 획득
4. QueryString은 `Name=Value&Name2=Value2` 형태이며, 각 Value는 URLEncoded 상태
5. 각 Value를 URLDecode하여 실제 값을 사용

- 문자셋: **EUC-KR**
- 암/복호화 및 URL 인코딩/디코딩 규칙은 다날 샘플 소스와 동일하게 구현 권장

---

### 6) 응답 값 처리 규칙

- 다날의 응답 및 NOTI 값은 **Name-Value Pair** 형식
  - Name과 Value 구분자: `=`
  - Pair 간 구분자: `&`
  - 예: `Name1=Value1&Name2=Value2`
- **순서가 보장되지 않으므로**, 단순 split 순서 사용 금지
  - 반드시 Name을 기준으로 파싱해서 사용해야 한다.

---

## Ready (AUTH – 초기인증 요청)

### 1. 역할

- CP 인증 및 결제 관련 정보를 다날 서버로 전송하여 거래 키(TID)를 생성
- AUTH 성공 시 다날 WEB 서버의 정기결제 초기인증 페이지로 이동하기 위한 `STARTURL`과 `STARTPARAMS`를 받는다.

### 2. INPUT (CP → DANAL)

**기본 정보**

| Field     | Required | Length | 설명           |
| --------- | -------- | ------ | -------------- |
| `CPID`    | Required | 10     | 가맹점 ID      |
| `SUBCPID` | Optional | 64     | 하위 가맹점 ID |

**결제 정보**

| Field             | Required    | Length | 설명                                                                                                                 |
| ----------------- | ----------- | ------ | -------------------------------------------------------------------------------------------------------------------- |
| `ORDERID`         | Optional    | 255    | 가맹점 주문번호                                                                                                      |
| `ITEMNAME`        | Required    | 255    | 상품명                                                                                                               |
| `AMOUNT`          | Conditional | 11     | ISBILL = `Y`일 때 필수. 결제금액(세금·봉사료 포함, 최소 100원). AUTH/BILL/ISSUEBILLKEY/OTBILL에서 동일 값 유지 필요. |
| `CURRENCY`        | Required    | 3      | 통화코드: `410`(KRW), `840`(USD)                                                                                     |
| `OFFERPERIOD`     | Optional    | 24     | 유효기간(예: `YYYYMMDDHHmmYYYYMMDDHHmm` 또는 `YYYYMMDDYYYYMMDD`)                                                     |
| `DISABLEAMOUNTUI` | Optional    | 1      | 결제창 내 금액 노출 여부 (`Y` 미노출(기본값) / `N` 노출). 특수 상황(AMOUNT=0, ISBILL=N)에서만 유효.                  |
| `CARDAUTH`        | Optional    | 10     | 정기결제창 내 사업자번호 고정 값                                                                                     |
| `CARDAUTHTYPE`    | Optional    | 1      | 사업자/개인 구분 (`0` 법인, `1` 개인)                                                                                |

**고객 정보**

| Field       | Required | Length | 설명                                                                                                                             |
| ----------- | -------- | ------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `USERNAME`  | Optional | 20     | 구매자 이름                                                                                                                      |
| `USERPHONE` | Optional | 20     | 구매자 전화번호                                                                                                                  |
| `USERID`    | Required | 128    | 구매자 ID                                                                                                                        |
| `USEREMAIL` | Optional | 128    | 구매자 이메일 (전자상거래법 메일 발송용)                                                                                         |
| `USERAGENT` | Required | 2      | 사용자 환경: `PC` / `MW` / `MA` / `MI`<br>- PC: PC Web<br>- MW: Mobile Web<br>- MA: Mobile App(Android)<br>- MI: Mobile App(iOS) |

**기본 정보**

| Field         | Required    | Length | 설명                                                                                                       |
| ------------- | ----------- | ------ | ---------------------------------------------------------------------------------------------------------- |
| `TXTYPE`      | Required    | 20     | `"AUTH"` (고정)                                                                                            |
| `SERVICETYPE` | Required    | 20     | `"BATCH"` (정기결제 고정)                                                                                  |
| `CANCELURL`   | Required    | 255    | 결제 취소 시 이동 URL (GET 파라미터 포함 가능하나, 브라우저 기준 데이터라 신뢰 금지)                       |
| `RETURNURL`   | Required    | 255    | 초기인증 완료 후 이동 URL (GET 파라미터 포함 가능하나, 브라우저 기준 데이터라 신뢰 금지)                   |
| `ISBILL`      | Required    | 1      | 초기인증 시 실제 결제 여부<br>- `Y`: 요청 금액으로 결제<br>- `N`: 100원 승인 후 자동 취소 (BILLKEY만 발급) |
| `ISNOTI`      | Required    | 1      | NOTI 사용 여부 (`Y` / `N`)                                                                                 |
| `NOTIURL`     | Conditional | 255    | ISNOTI=`Y`일 때 필수. NOTI 수신 URL. POST 방식으로 결과 전달.                                              |
| `BYPASSVALUE` | -           | 255    | 추가 필드 (예: `Field1=abc;Field2=def;`)                                                                   |

### 3. OUTPUT (DANAL → CP)

**결제 정보**

| Field        | Required | Length | 설명            |
| ------------ | -------- | ------ | --------------- |
| `RETURNCODE` | Required | 4      | 결과코드        |
| `RETURNMSG`  | Required | 255    | 결과메시지      |
| `TID`        | Optional | 24     | 다날 거래 키    |
| `ORDERID`    | Optional | 255    | 가맹점 주문번호 |
| `AMOUNT`     | Optional | 11     | 결제금액        |

**다날 WEB 서버 정보**

| Field         | Required | Length | 설명                                  |
| ------------- | -------- | ------ | ------------------------------------- |
| `STARTURL`    | Optional | 255    | 정기결제 초기인증 표준페이지 시작 URL |
| `STARTPARAMS` | Optional | -      | STARTURL로 POST해야 할 파라미터       |

- CP는 AUTH 성공 시 응답받은 `STARTURL`과 `STARTPARAMS`를 사용해 고객 브라우저를 다날 WEB 서버로 POST 리다이렉트한다.

---

### [CP WEB SERVER → DANAL WEB SERVER 전송 데이터]

- Method: `POST`
- Charset: `EUC-KR`

| Field         | Required | 설명                              |
| ------------- | -------- | --------------------------------- |
| `STARTPARAMS` | Required | AUTH 응답에서 받은 값 그대로 전송 |
| `CIURL`       | Optional | CP CI 이미지 URL (89x34)          |
| `COLOR`       | Optional | 다날 신용카드 결제창 배경색 옵션  |

---

### [DANAL WEB SERVER → CP WEB SERVER 전송 데이터]

- 대상: `RETURNURL`
- Method: `POST`
- Charset: `EUC-KR`

| Field        | Required | 설명            |
| ------------ | -------- | --------------- |
| `TID`        | Required | 다날 거래 키    |
| `RETURNCODE` | Required | 결과코드        |
| `RETURNMSG`  | Required | 결과메시지      |
| `ORDERID`    | Optional | 가맹점 주문번호 |

---

## 카드정보 입력 페이지

- 역할: 고객이 정기결제에 사용할 카드 정보(카드번호, 유효기간 등)를 입력하고 인증하는 단계
- UI: 다날 제공 표준 신용카드 결제창 사용

---

## 본인확인 페이지

- 역할: 정기결제 신청자의 본인 확인 (휴대폰 본인인증)
- 구성:
  - 통신사 선택, 이름/주민번호/전화번호 입력
  - 캡차 또는 인증번호(SMS) 입력 단계

---

## ISSUEBILLKEY (정기결제용 BILLKEY 발급)

### 1. 역할

- 초기인증 결과(카드승인 포함)에 따라 정기결제용 BILLKEY 발급 요청
- ISBILL 설정에 따라 실제 결제를 수행하거나, 100원 결제 후 취소만 수행

### 2. INPUT (DANAL → CP)

| 영역      | Field         | Required    | Length | 설명                                                                     |
| --------- | ------------- | ----------- | ------ | ------------------------------------------------------------------------ |
| CP 정보   | `CPID`        | Required    | 10     | 가맹점 ID                                                                |
| 결제 정보 | `AMOUNT`      | Conditional | 11     | ISBILL=`Y`인 경우 필수. AUTH 단계와 동일 금액. ISBILL=`N`인 경우 미전달. |
|           | `TID`         | Required    | 24     | 다날 거래 키                                                             |
| 기본 정보 | `TXTYPE`      | Required    | 20     | `"ISSUEBILLKEY"`                                                         |
|           | `SERVICETYPE` | Required    | 20     | `"BATCH"`                                                                |

### 3. OUTPUT (DANAL → CP)

**결제 정보**

| Field        | Required | Length | 설명                           |
| ------------ | -------- | ------ | ------------------------------ |
| `RETURNCODE` | Required | 4      | 결과코드                       |
| `RETURNMSG`  | Required | 255    | 결과메시지                     |
| `TID`        | Optional | 24     | 다날 거래 키                   |
| `ISBILL`     | Optional | 1      | 초기인증 시 결제 여부(`Y`/`N`) |
| `BILLKEY`    | Optional | 255    | 정기결제용 BILLKEY             |
| `ORDERID`    | Optional | 255    | 가맹점 주문번호                |
| `ITEMNAME`   | Optional | 255    | 상품명                         |
| `AMOUNT`     | Optional | 11     | 승인금액(총액)                 |
| `TRANDATE`   | Optional | 8      | 매출발생일 (`yyyyMMdd`)        |
| `TRANTIME`   | Optional | 6      | 매출발생시간 (`HHmmss`)        |

**카드 정보**

| Field        | Required | Length | 설명                                                  |
| ------------ | -------- | ------ | ----------------------------------------------------- |
| `CARDCODE`   | Optional | 4      | 카드사 코드                                           |
| `CARDNAME`   | Optional | 25     | 카드사명                                              |
| `CARDNO`     | Optional | 20     | 마스킹 카드번호 (`****` 처리). ISBILL=`N`이면 미제공. |
| `QUOTA`      | Optional | 2      | 할부 개월 수. ISBILL=`N`이면 `"00"` 고정              |
| `CARDAUTHNO` | Optional | 128    | 승인번호. ISBILL=`N`이면 미제공.                      |

**고객 정보 / 기타**

| Field         | Required | Length | 설명                           |
| ------------- | -------- | ------ | ------------------------------ |
| `USERNAME`    | Optional | 20     | 구매자 이름                    |
| `USERPHONE`   | Optional | 20     | 구매자 전화번호                |
| `USERID`      | Optional | 128    | 구매자 ID                      |
| `BYPASSVALUE` | Optional | 255    | AUTH에서 전달한 값 그대로 리턴 |

---

## Noti (결제 통지)

### 1. 역할

- ISNOTI=`Y`일 때, BILL 처리 후 CP의 NOTIURL로 승인 결과를 통보한다.

### 2. 특성

- BILL 응답과 동일한 데이터 구조
- 동일 거래에 대해 네트워크 사정으로 **여러 번 호출될 수 있음**
  - CP는 TID/ORDERID 기준으로 중복 처리 여부를 체크해야 한다.
- NOTI 수신 후 반드시 대문자 `"OK"` 문자열만 응답해야 하며, 다른 문자열/HTML 포함 시 실패로 간주됨.
  - `"OK"` 수신 시: 최대 10분 동안 1분 간격 재시도
  - `"FAIL"` 수신 시: 재시도 없음

### 3. INPUT (DANAL → CP)

| Field        | Required    | Length | 설명                           |
| ------------ | ----------- | ------ | ------------------------------ |
| `RETURNCODE` | Required    | 4      | 결과코드                       |
| `RETURNMSG`  | Required    | 255    | 결과메시지                     |
| `TID`        | Required    | 24     | 다날 거래 키                   |
| `ISBILL`     | Required    | 1      | 초기인증 시 결제여부 (`Y`/`N`) |
| `BILLKEY`    | Required    | 255    | BILLKEY                        |
| `ORDERID`    | Optional    | 255    | 가맹점 주문번호                |
| `ITEMNAME`   | Required    | 255    | 상품명                         |
| `AMOUNT`     | Conditional | 11     | ISBILL=`Y`일 때 승인금액       |
| `TRANDATE`   | Optional    | 8      | 승인일 (`yyyyMMdd`)            |
| `TRANTIME`   | Optional    | 6      | 승인시간 (`HHmmss`)            |

**카드 정보**

| Field        | Required | Length | 설명                                  |
| ------------ | -------- | ------ | ------------------------------------- |
| `CARDCODE`   | Required | 4      | 카드사 코드                           |
| `CARDNAME`   | Required | 25     | 카드사명                              |
| `CARDNO`     | Required | 20     | 마스킹 카드번호                       |
| `QUOTA`      | Required | 2      | 할부 개월 수 (정기결제는 `"00"` 고정) |
| `CARDAUTHNO` | Required | 128    | 승인번호                              |

**고객/기타**

| Field         | Required | Length | 설명                         |
| ------------- | -------- | ------ | ---------------------------- |
| `USERNAME`    | Optional | 20     | 구매자 이름                  |
| `USERPHONE`   | Optional | 20     | 구매자 전화번호              |
| `USERID`      | Required | 128    | 구매자 ID                    |
| `BYPASSVALUE` | Optional | 255    | AUTH에서 보낸 값 그대로 리턴 |

---

## OTBILL (정기결제 요청 – BILLKEY 기반)

### 1. 역할

- 초기인증 성공 후 발급된 BILLKEY를 사용해 **주기적인 정기결제**를 수행한다.

### 2. 제약

- 정기결제 요청을 보낼 CP 서버의 IP는 **사전에 다날 측에 등록**되어야 한다.
- 초기인증 때의 금액과 다른 금액으로도 청구 가능.
- 최소 결제 금액: 301원.

### 3. INPUT (CP → DANAL)

**CP 정보**

| Field     | Required | Length | 설명        |
| --------- | -------- | ------ | ----------- |
| `CPID`    | Required | 10     | 가맹점      |
| `SUBCPID` | Optional | 64     | 하위 가맹점 |

**결제 정보**

| Field      | Required | Length | 설명                                   |
| ---------- | -------- | ------ | -------------------------------------- |
| `ORDERID`  | Optional | 255    | 가맹점 주문번호                        |
| `ITEMNAME` | Required | 255    | 상품명                                 |
| `AMOUNT`   | Required | 11     | 결제금액(세금·봉사료 포함, 최소 301원) |
| `CURRENCY` | Required | 3      | `410`(KRW) / `840`(USD)                |

**고객 정보**

| Field       | Required | Length | 설명            |
| ----------- | -------- | ------ | --------------- |
| `USERNAME`  | Optional | 20     | 구매자 이름     |
| `USERPHONE` | Optional | 20     | 구매자 전화번호 |
| `USERID`    | Required | 128    | 구매자 ID       |
| `USERAGENT` | Required | 2      | `"ONLINE"` 고정 |

**기본 정보**

| Field         | Required | Length | 설명            |
| ------------- | -------- | ------ | --------------- |
| `TXTYPE`      | Required | 20     | `"OTBILL"` 고정 |
| `SERVICETYPE` | Required | 20     | `"BATCH"` 고정  |
| `ISREBILL`    | Required | 1      | `"Y"` 고정      |

**카드정보**

| Field      | Required | Length | 설명               |
| ---------- | -------- | ------ | ------------------ |
| `BILLINFO` | Required | 255    | 정기결제용 BILLKEY |

### 4. OUTPUT (DANAL → CP)

- BILL과 동일한 승인 정보 구조

---

## DELBILLKEY (정기결제 Key 삭제)

### 1. 역할

- 더 이상 사용하지 않는 정기결제용 BILLKEY를 서버에서 제거할 때 사용한다.
  - 예: 회원 탈퇴, 결제 수단 변경 등

### 2. INPUT (CP → DANAL)

| Field         | Required | Length | 설명           |
| ------------- | -------- | ------ | -------------- |
| `CPID`        | Required | 10     | 가맹점         |
| `BILLKEY`     | Required | 255    | 삭제할 BILLKEY |
| `TXTYPE`      | Required | 20     | `"DELBILLKEY"` |
| `SERVICETYPE` | Required | 20     | `"BATCH"`      |

### 3. OUTPUT

| Field        | Required | Length | 설명         |
| ------------ | -------- | ------ | ------------ |
| `RETURNCODE` | Required | 4      | 결과코드     |
| `RETURNMSG`  | Required | 255    | 결과메시지   |
| `TID`        | Optional | 24     | 다날 거래 키 |

---

## Bill Cancel (취소)

### 1. 역할

- 승인된 카드 거래에 대해 전체/부분 취소를 수행한다.
- 승인일 기준 **1년(365일)** 이내 거래만 취소 가능.

### 2. INPUT (CP → DANAL)

**CP 정보**

| Field  | Required | Length | 설명   |
| ------ | -------- | ------ | ------ |
| `CPID` | Required | 10     | 가맹점 |

**취소 정보**

| Field             | Required | Length | 설명                                |
| ----------------- | -------- | ------ | ----------------------------------- |
| `AMOUNT`          | Required | 9      | 취소금액                            |
| `TID`             | Required | 24     | 원거래 키 (1년 이내 건만 취소 가능) |
| `CANCELTYPE`      | Required | 1      | `C` 전체취소 / `P` 부분취소         |
| `CANCELREQUESTER` | Optional | 20     | 취소 요청자                         |
| `CANCELDESC`      | Optional | 255    | 취소 사유                           |

**기본 정보**

| Field         | Required | Length | 설명          |
| ------------- | -------- | ------ | ------------- |
| `TXTYPE`      | Required | 20     | `"CANCEL"`    |
| `SERVICETYPE` | Required | 20     | `"DANALCARD"` |

### 3. OUTPUT

| Field        | Required | Length | 설명           |
| ------------ | -------- | ------ | -------------- |
| `RETURNCODE` | Required | 4      | 결과코드       |
| `RETURNMSG`  | Required | 255    | 결과메시지     |
| `O_TID`      | Optional | 24     | 원거래 키      |
| `TID`        | Optional | 24     | 취소 거래 키   |
| `AMOUNT`     | Optional | 11     | 승인 취소 금액 |
| `TRANDATE`   | Optional | 8      | 승인 발생일자  |
| `TRANTIME`   | Optional | 6      | 승인 발생시간  |
| `BALANCE`    | Optional | 11     | 취소 후 잔액   |

---

## Eventinfo (이벤트 정보 조회)

### 1. 역할

- 카드사 무이자·분담무이자·즉시할인 등 이벤트 정보를 조회한다.

### 2. INPUT (CP → DANAL)

| Field           | Required | Length | 설명                                              |
| --------------- | -------- | ------ | ------------------------------------------------- |
| `CPID`          | Required | 10     | 가맹점                                            |
| `PROMOTIONTYPE` | Optional | 1      | 조회 타입: `D`(할인), `N`(무이자), 미전달 시 전체 |
| `TXTYPE`        | Required | 20     | `"GETEVENTINFO"`                                  |

### 3. OUTPUT (요약)

| Field        | Required | Length | 설명                   |
| ------------ | -------- | ------ | ---------------------- |
| `TID`        | Required | 24     | 거래 키                |
| `RETURNCODE` | Required | 4      | 결과코드               |
| `RETURNMSG`  | Required | 255    | 결과메시지             |
| `*EVENTINFO` | Optional | -      | 카드 이벤트 정보(JSON) |

`*EVENTINFO` 구조:

- `DISCOUNTINFO` (즉시할인)
  - `serviceType[]`: 할인 적용 서비스 타입 배열 (DANALCARD/ISPAY/EZPAY 등)
  - `cardName`, `cardCode`
  - `deposit`, `balance`, `minDeposit`, `minAmount`, `discountAmount`
  - `sDate`, `eDate` (yyyy-MM-dd hh:mm:ss)
- `NOINTINFO` (무이자)
  - `cardName`, `cardCode`
  - `eventType`: `F1`(카드사무이자) / `F2`(분담무이자)
  - `nointDetail[]`
    - `serviceType`: `ALL`, `DANALCARD`, `ISPAY`, `BATCH`, `KEYIN`, `EZPAY` 등
    - `noint`: 무이자 대상 할부개월
    - `nointAmount`: 최소 결제 금액
    - `sDate`, `eDate`

---

## 5. 관련 보안 가이드

### A. 거래 비교

#### a. CPCGI

- 결제 응답 `RETURNCODE`가 `"0000"`일 때만 결제 성공 처리
- 그 외 코드는 모두 실패 처리
- CPCGI 페이지 내에서 다날 서버와의 통신은 반드시 **server-to-server** 방식으로 처리
  - 클라이언트 브라우저가 다날 서버에 직접 통신해서는 안 됨

#### b. NOTI

- 사용자의 악의적 조작을 방지하기 위해, DB 처리 전에:
  - 요청 시 사용한 값(금액, 사용자 ID 등)과
  - 다날이 응답한 값이 일치하는지 반드시 비교해야 함

---

## 6. 참고사항

### A. 카드코드표 (발췌)

| 카드사명           | 다날코드 |
| ------------------ | -------- | --- |
| 신한카드           | 0100     |
| BC카드             | 0200     |
| SC BC              | 0201     |
| 우리 BC            | 0202     |
| 경남 BC            | 0203     |
| 대구 BC            | 0204     |
| NH BC              | 0205     |
| 기업 BC            | 0206     |
| 부산 BC            | 0207     |
| 하나 BC            | 0208     |
| 신한 BC            | 0209     |
| 국민 BC            | 0210     |
| KB국민             | 0300     |
| 현대카드           | 0400     |
| 삼성카드           | 0500     |
| 하나카드           | 0600     |
| 하나(구외환)       | 0601     |
| 롯데카드           | 0700     |
| 롯데 AMX           | 0701     |
| NH채움             | 0800     |
| 씨티카드           | 0906     |
| 우리카드           | 0907     |
| 광주카드           | 0908     |
| 전북카드           | 0909     |
| 제주카드           | 0910     |
| 수협카드           | 0911     |
| 신협카드           | 0912     |
| 새마을금고         | 0913     |
| 우체국             | 0914     |
| 저축은행           | 0915     |
| KDB산업            | 0916     |
| 평화카드           | 0917     |
| 한미               | 0918     |
| 신세계한미         | 0919     |
| 케이뱅크           | 0921     |
| 카카오뱅크체크     | 0922     |
| 카카오페이         | 0923     |
| 코나카드           | 0924     |
| 토스카드           | 0925     |
| KB증권카드         | 0926     |
| 산림조합카드       | 0927     |
| 해외은련(UnionPay) | 0928     |
| 한국투자증권       | 0929     |
| 은련(해외발행)     | 0930     |
| 토스뱅크           | 0931     |
| 페이코             | 0932     |
| 티머니             | 0933     | p   |
| 한화투자증권       | 0934     |
| 페이코 포인트      | 1100     |
| 카카오 포인트      | 1200     |
| 네이버 포인트      | 1300     |

(전체 표는 원본 문서 참고)

### B. 주의사항

- 네이버, 카카오톡 앱에서 결제창을 새 창/탭으로 띄우면 결제가 정상 동작하지 않을 수 있음
- 인앱 브라우저 특성상 `_self` 형태로 열도록 구성하는 것이 권장됨

---
