import crypto from "crypto";

const SECRET = process.env.DOWNLOAD_SECRET || "fallback-secret-change-me";

interface TokenPayload {
  productId: string;
  email: string;
  expiresAt: number;
}

export function generateDownloadToken(
  productId: string,
  email: string,
  expiresInDays: number = 7
): string {
  const payload: TokenPayload = {
    productId,
    email,
    expiresAt: Date.now() + expiresInDays * 24 * 60 * 60 * 1000,
  };

  const data = JSON.stringify(payload);
  const encoded = Buffer.from(data).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SECRET)
    .update(encoded)
    .digest("base64url");

  return `${encoded}.${signature}`;
}

export function verifyDownloadToken(
  token: string
): TokenPayload | null {
  try {
    const [encoded, signature] = token.split(".");
    if (!encoded || !signature) return null;

    const expectedSignature = crypto
      .createHmac("sha256", SECRET)
      .update(encoded)
      .digest("base64url");

    if (signature !== expectedSignature) return null;

    const payload: TokenPayload = JSON.parse(
      Buffer.from(encoded, "base64url").toString()
    );

    if (Date.now() > payload.expiresAt) return null;

    return payload;
  } catch {
    return null;
  }
}
