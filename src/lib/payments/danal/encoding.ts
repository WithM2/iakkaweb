const utf8Encoder = new TextEncoder();

export function urlEncodeUtf8Value(value: string) {
  // 다날 매뉴얼은 EUC-KR URL 인코딩을 권장하지만, 런타임 제약으로 UTF-8 인코딩을 사용한다.
  // 문자열을 UTF-8 바이트로 변환한 뒤 퍼센트 인코딩하여 전달한다.
  return Array.from(utf8Encoder.encode(value))
    .map((byte) => `%${byte.toString(16).toUpperCase().padStart(2, "0")}`)
    .join("");
}

export function parseNameValuePairs(payload: string) {
  return payload.split("&").reduce<Record<string, string>>((acc, pair) => {
    if (!pair) return acc;

    const [rawName, ...rawValueParts] = pair.split("=");
    const name = rawName?.trim();
    if (!name) return acc;

    const rawValue = rawValueParts.join("=");
    try {
      acc[name] = decodeURIComponent(rawValue);
    } catch {
      // 디코딩이 실패해도 원본 값을 그대로 사용한다.
      acc[name] = rawValue;
    }

    return acc;
  }, {});
}
