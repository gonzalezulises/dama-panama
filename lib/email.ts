import { Resend } from "resend";

let resend: Resend | null = null;

function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

export async function sendConfirmationEmail(
  nombre: string,
  email: string
): Promise<void> {
  const client = getResend();
  if (!client) {
    console.log("RESEND_API_KEY no configurado, email de confirmación omitido.");
    return;
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@damapanama.org";

  try {
    await client.emails.send({
      from: `DAMA Panamá <${fromEmail}>`,
      to: email,
      subject: "Confirmación de Registro — Grupo de Estudio DMBOK",
      html: `
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
        <h2 style="color:#003366;margin:0 0 16px;font-size:20px;">
          ¡Hola, ${nombre}!
        </h2>
        <p style="color:#333;font-size:15px;line-height:1.6;margin:0 0 16px;">
          Tu registro al <strong>Grupo de Estudio DMBOK</strong> ha sido recibido exitosamente.
          Nuestro equipo revisará tu solicitud y te contactaremos pronto con los próximos pasos.
        </p>

        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;border-radius:8px;margin:24px 0;">
          <tr>
            <td style="padding:20px 24px;">
              <h3 style="color:#003366;margin:0 0 12px;font-size:16px;">Próximos pasos:</h3>
              <ol style="color:#333;font-size:14px;line-height:1.8;margin:0;padding-left:20px;">
                <li>Revisaremos tu registro (1-3 días hábiles)</li>
                <li>Recibirás un email con los detalles del grupo</li>
                <li>Te agregaremos al canal de comunicación</li>
                <li>¡Primera sesión de estudio!</li>
              </ol>
            </td>
          </tr>
        </table>

        <p style="color:#333;font-size:15px;line-height:1.6;margin:0 0 16px;">
          Mientras tanto, te invitamos a explorar los
          <a href="https://damapanama.org/dmbok" style="color:#003366;font-weight:600;">
            áreas de conocimiento del DMBOK</a>
          y la información sobre la
          <a href="https://damapanama.org/certificacion" style="color:#003366;font-weight:600;">
            certificación CDMP</a>.
        </p>

        <p style="color:#666;font-size:14px;line-height:1.6;margin:24px 0 0;">
          — El equipo de DAMA Panamá
        </p>
      </td>
    </tr>
    <tr>
      <td style="background-color:#f4f6f9;padding:20px 32px;text-align:center;">
        <p style="color:#999;font-size:12px;margin:0;">
          DAMA Panamá — Capítulo oficial de DAMA International<br/>
          Este email fue enviado porque te registraste en nuestro Grupo de Estudio DMBOK.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
      `.trim(),
    });

    console.log(`Email de confirmación enviado a ${email}`);
  } catch (error) {
    console.error("Error enviando email de confirmación:", error);
  }
}
