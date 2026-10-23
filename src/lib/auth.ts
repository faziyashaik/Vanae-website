export const SESSION_COOKIE_NAME = "vanae_admin_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24; // 24 hours

// Default fallback SHA-256 hash for 'VanaeAdmin@2026!'
const DEFAULT_ADMIN_HASH =
  "d126da2091af54a566c42b8d6a222f701cc636e93c42a2fe1c49798ba658054d";
const DEFAULT_ADMIN_EMAIL = "admin@vanae.com";
const DEFAULT_SESSION_SECRET =
  "vanae_admin_session_secret_key_8492049182390123849120";

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(str: string): Uint8Array {
  let b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4) b64 += "=";
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder();
  const digestBuf = await crypto.subtle.digest("SHA-256", enc.encode(password));
  return Array.from(new Uint8Array(digestBuf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

async function getHmacKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function verifyAdminCredentials(
  identifier: string,
  plainPassword: string
): Promise<boolean> {
  const configuredEmail =
    process.env.ADMIN_EMAIL ||
    process.env.ADMIN_USERNAME ||
    DEFAULT_ADMIN_EMAIL;

  const trimmedIdentifier = identifier.trim().toLowerCase();
  const trimmedConfigured = configuredEmail.trim().toLowerCase();

  if (trimmedIdentifier !== trimmedConfigured) {
    return false;
  }

  let expectedHash = DEFAULT_ADMIN_HASH;

  if (process.env.ADMIN_PASSWORD_HASH) {
    expectedHash = process.env.ADMIN_PASSWORD_HASH.trim().toLowerCase();
  } else if (process.env.ADMIN_PASSWORD) {
    expectedHash = await hashPassword(process.env.ADMIN_PASSWORD);
  }

  const inputHash = await hashPassword(plainPassword);
  return constantTimeEqual(inputHash, expectedHash);
}

export async function createSessionToken(username: string): Promise<string> {
  const secret = process.env.ADMIN_SESSION_SECRET || DEFAULT_SESSION_SECRET;
  const key = await getHmacKey(secret);

  const payload = {
    sub: username,
    exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  };

  const enc = new TextEncoder();
  const payloadBytes = enc.encode(JSON.stringify(payload));
  const payloadB64 = toBase64Url(payloadBytes);

  const signatureBuf = await crypto.subtle.sign(
    "HMAC",
    key,
    enc.encode(payloadB64)
  );
  const signatureB64 = toBase64Url(new Uint8Array(signatureBuf));

  return `${payloadB64}.${signatureB64}`;
}

export async function verifySessionToken(
  token: string | undefined | null
): Promise<{ valid: boolean; user?: string }> {
  if (!token || typeof token !== "string") {
    return { valid: false };
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return { valid: false };
  }

  const [payloadB64, signatureB64] = parts;

  try {
    const secret = process.env.ADMIN_SESSION_SECRET || DEFAULT_SESSION_SECRET;
    const key = await getHmacKey(secret);

    const enc = new TextEncoder();
    const signatureBytes = fromBase64Url(signatureB64);

    const isValidSig = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes as unknown as BufferSource,
      enc.encode(payloadB64)
    );

    if (!isValidSig) {
      return { valid: false };
    }

    const payloadBytes = fromBase64Url(payloadB64);
    const dec = new TextDecoder();
    const payload = JSON.parse(dec.decode(payloadBytes));

    if (typeof payload.exp !== "number" || payload.exp < Date.now()) {
      return { valid: false };
    }

    return { valid: true, user: payload.sub };
  } catch {
    return { valid: false };
  }
}

export function getSessionCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";
  return {
    name: SESSION_COOKIE_NAME,
    httpOnly: true,
    secure: isProd,
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}
