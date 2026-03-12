import { Resend } from "resend";

let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

interface SendDownloadEmailParams {
  to: string;
  productTitle: string;
  downloadUrl: string;
}

export async function sendDownloadEmail({
  to,
  productTitle,
  downloadUrl,
}: SendDownloadEmailParams) {
  const { error } = await getResend().emails.send({
    from: "HR Interview Guide <noreply@yourdomain.com>", // Change to your verified domain
    to,
    subject: `Твоят файл: ${productTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1e293b; font-size: 24px;">Благодарим за покупката!</h1>
        <p style="color: #475569; font-size: 16px; line-height: 1.6;">
          Успешно закупи <strong>${productTitle}</strong>.
          Можеш да изтеглиш файла от линка по-долу.
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${downloadUrl}"
             style="background-color: #2563eb; color: white; padding: 14px 32px;
                    text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold;">
            Изтегли файла
          </a>
        </div>
        <p style="color: #94a3b8; font-size: 14px;">
          Линкът е валиден 7 дни. Ако имаш нужда от нов линк,
          посети нашия сайт и използвай секцията "Вече купих".
        </p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
        <p style="color: #94a3b8; font-size: 12px;">
          HR Interview Guide — Подготви се за интервюто на мечтите си
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("Failed to send email:", error);
    throw new Error("Failed to send download email");
  }
}
