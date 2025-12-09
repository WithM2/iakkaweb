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

export function encodeEucKrString(value: string) {
  const encodedBytes: number[] = [];

  for (const char of value) {
    const bytes = encodeCharToEucKr(char);
    encodedBytes.push(...bytes);
  }

  return Uint8Array.from(encodedBytes);
}

export function decodePercentEncodedEucKr(value: string) {
  const encodedBytes: number[] = [];

  for (let i = 0; i < value.length; ) {
    const char = value[i];

    if (char === "%" && i + 2 < value.length) {
      const hex = value.slice(i + 1, i + 3);
      const byte = Number.parseInt(hex, 16);

      if (!Number.isNaN(byte)) {
        encodedBytes.push(byte);
        i += 3;
        continue;
      }
    }

    if (char === "+") {
      encodedBytes.push(" ".charCodeAt(0));
      i += 1;
      continue;
    }

    encodedBytes.push(char.charCodeAt(0));
    i += 1;
  }

  try {
    return eucKrDecoder.decode(Uint8Array.from(encodedBytes));
  } catch {
    return value;
  }
}

export function parseNameValuePairs(payload: string) {
  return payload.split("&").reduce<Record<string, string>>((acc, pair) => {
    if (!pair) return acc;

    const [rawName, ...rawValueParts] = pair.split("=");
    const name = rawName?.trim();
    if (!name) return acc;

    const rawValue = rawValueParts.join("=");
    try {
      acc[name] = decodePercentEncodedEucKr(rawValue);
    } catch {
      // 디코딩이 실패해도 원본 값을 그대로 사용한다.
      acc[name] = rawValue;
    }

    return acc;
  }, {});
}
