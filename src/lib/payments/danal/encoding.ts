const eucKrDecoder = new TextDecoder("euc-kr");
const EUC_KR_REPLACEMENT = "\uFFFD";

function buildEucKrEncodeMap() {
  const map = new Map<string, Uint8Array>();

  for (let byte = 0; byte < 256; byte += 1) {
    const decoded = eucKrDecoder.decode(new Uint8Array([byte]));
    if (decoded.length === 1 && !decoded.includes(EUC_KR_REPLACEMENT)) {
      map.set(decoded, new Uint8Array([byte]));
    }
  }

  for (let first = 0; first < 256; first += 1) {
    for (let second = 0; second < 256; second += 1) {
      const decoded = eucKrDecoder.decode(new Uint8Array([first, second]));
      if (decoded.length === 1 && !decoded.includes(EUC_KR_REPLACEMENT)) {
        if (!map.has(decoded)) {
          map.set(decoded, new Uint8Array([first, second]));
        }
      }
    }
  }

  return map;
}

const eucKrEncodeMap = buildEucKrEncodeMap();

function encodeCharToEucKr(char: string) {
  const encoded = eucKrEncodeMap.get(char);

  if (!encoded) {
    throw new Error(`문자(${char})를 EUC-KR로 인코딩할 수 없습니다.`);
  }

  return encoded;
}

export function urlEncodeEucKrValue(value: string) {
  const encodedBytes: number[] = [];

  for (const char of value) {
    const bytes = encodeCharToEucKr(char);
    encodedBytes.push(...bytes);
  }

  return encodedBytes
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
