import { createHmac, timingSafeEqual } from "node:crypto";

const TOKEN_LIFETIME_MS = 24 * 60 * 60 * 1000;

type NewsletterTokenPayload = {
  email: string;
  expiresAt: number;
};

function getSecret() {
  const secret = process.env.NEWSLETTER_CONFIRMATION_SECRET;
  if (!secret) throw new Error("Newsletter confirmation is not configured");
  return secret;
}

function signature(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

export function createNewsletterToken(email: string) {
  const payload: NewsletterTokenPayload = {
    email,
    expiresAt: Date.now() + TOKEN_LIFETIME_MS,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${signature(encoded)}`;
}

export function verifyNewsletterToken(token: string) {
  const [encoded, suppliedSignature] = token.split(".");
  if (!encoded || !suppliedSignature) return null;

  const expectedSignature = signature(encoded);
  const supplied = Buffer.from(suppliedSignature);
  const expected = Buffer.from(expectedSignature);
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8"),
    ) as NewsletterTokenPayload;

    if (
      typeof payload.email !== "string" ||
      typeof payload.expiresAt !== "number" ||
      payload.expiresAt < Date.now()
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
