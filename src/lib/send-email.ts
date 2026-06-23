import nodemailer from "nodemailer";

export async function sendAnamneseEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error("Credenciais SMTP não configuradas");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Diamond HOF Anamnese" <${user}>`,
    to,
    subject,
    html,
    text,
  });
}
