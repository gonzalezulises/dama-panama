import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (except /admin/login)
  if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Verify token using HMAC-SHA256 (same logic as lib/auth.ts but edge-compatible)
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
    const [payloadB64, signatureB64] = token.split(".");
    if (!payloadB64 || !signatureB64) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const payload = atob(payloadB64);
    const data = encoder.encode(payload);
    const signature = Uint8Array.from(atob(signatureB64), (c) =>
      c.charCodeAt(0)
    );

    const valid = await crypto.subtle.verify("HMAC", key, signature, data);
    if (!valid) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const parsed = JSON.parse(payload);
    if (Date.now() - parsed.iat > 24 * 60 * 60 * 1000) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
