import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { verifyToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  // Verify auth
  const token = request.cookies.get("admin_token")?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return NextResponse.json(
      { ok: false, error: "RESEND_API_KEY no configurado" },
      { status: 503 }
    );
  }

  let body: { emails?: string[]; subject?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "JSON inválido" },
      { status: 400 }
    );
  }

  const { emails, subject, message } = body;

  if (!emails || !Array.isArray(emails) || emails.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Se requiere al menos un email" },
      { status: 400 }
    );
  }
  if (!subject || !subject.trim()) {
    return NextResponse.json(
      { ok: false, error: "Se requiere un asunto" },
      { status: 400 }
    );
  }
  if (!message || !message.trim()) {
    return NextResponse.json(
      { ok: false, error: "Se requiere un mensaje" },
      { status: 400 }
    );
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@damapanama.org";
  const resend = new Resend(resendKey);

  const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;font-family:'Source Sans 3',Arial,sans-serif;background-color:#f4f6f9;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;">
    <tr>
      <td style="background-color:#003366;padding:24px 32px;text-align:center;">
        <h1 style="margin:0;color:#ffffff;font-size:22px;font-family:'Plus Jakarta Sans',Arial,sans-serif;">
          DAMA Panamá
        </h1>
      </td>
    </tr>
    <tr>
      <td style="padding:32px;">
        <div style="color:#333;font-size:15px;line-height:1.6;white-space:pre-line;">${escapeHtml(message.trim())}</div>
        <p style="color:#666;font-size:14px;line-height:1.6;margin:24px 0 0;">
          — El equipo de DAMA Panamá
        </p>
      </td>
    </tr>
    <tr>
      <td style="background-color:#f4f6f9;padding:20px 32px;text-align:center;">
        <p style="color:#999;font-size:12px;margin:0;">
          DAMA Panamá — Capítulo oficial de DAMA International
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();

  let sent = 0;
  let failed = 0;
  const BATCH_SIZE = 10;

  for (let i = 0; i < emails.length; i += BATCH_SIZE) {
    const batch = emails.slice(i, i + BATCH_SIZE);
    const results = await Promise.allSettled(
      batch.map((email) =>
        resend.emails.send({
          from: `DAMA Panamá <${fromEmail}>`,
          to: email,
          subject: subject.trim(),
          html: htmlContent,
        })
      )
    );

    for (const result of results) {
      if (result.status === "fulfilled" && result.value.data) {
        sent++;
      } else {
        failed++;
        if (result.status === "rejected") {
          console.error("Error enviando email masivo:", result.reason);
        } else if (result.value.error) {
          console.error("Error enviando email masivo:", result.value.error);
        }
      }
    }
  }

  return NextResponse.json({ ok: true, sent, failed });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
