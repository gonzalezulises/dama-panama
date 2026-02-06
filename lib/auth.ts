const encoder = new TextEncoder();

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) throw new Error("ADMIN_SECRET no configurado");
  return encoder.encode(secret);
}

async function getKey(): Promise<CryptoKey> {
  const secret = getSecret();
  return crypto.subtle.importKey(
    "raw",
    secret.buffer as ArrayBuffer,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function createToken(): Promise<string> {
  const key = await getKey();
  const payload = JSON.stringify({
    role: "admin",
    iat: Date.now(),
  });
  const data = encoder.encode(payload);
  const signature = await crypto.subtle.sign("HMAC", key, data);

  const payloadB64 = btoa(payload);
  const signatureB64 = btoa(
    String.fromCharCode(...new Uint8Array(signature))
  );

  return `${payloadB64}.${signatureB64}`;
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    const key = await getKey();
    const [payloadB64, signatureB64] = token.split(".");
    if (!payloadB64 || !signatureB64) return false;

    const payload = atob(payloadB64);
    const data = encoder.encode(payload);
    const signature = Uint8Array.from(atob(signatureB64), (c) =>
      c.charCodeAt(0)
    );

    const valid = await crypto.subtle.verify("HMAC", key, signature, data);
    if (!valid) return false;

    const parsed = JSON.parse(payload);
    // Token expires after 24 hours
    if (Date.now() - parsed.iat > 24 * 60 * 60 * 1000) return false;

    return parsed.role === "admin";
  } catch {
    return false;
  }
}
