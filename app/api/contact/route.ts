import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// ── POST /api/contact ─────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const { name, email, phone, service, message } = await req.json()

  if (!name || !email) {
    return NextResponse.json({ error: 'Vyplňte prosím jméno a e-mail.' }, { status: 400 })
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('SMTP credentials not set')
    return NextResponse.json({ error: 'Chyba serveru – SMTP není nakonfigurováno.' }, { status: 500 })
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,       // STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false },
  })

  const subject = service
    ? `Nová poptávka: ${service} – ${name}`
    : `Nová zpráva od ${name}`

  const html = buildEmail({ name, email, phone, service, message })

  try {
    await transporter.sendMail({
      from: `"Web Vladimír Fořt" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO ?? 'lukas.hrncir@bidli.cz',
      replyTo: email,
      subject,
      html,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('SMTP error:', err)
    return NextResponse.json({ error: 'Nepodařilo se odeslat e-mail. Zkuste to prosím znovu.' }, { status: 502 })
  }
}

// ── HTML šablona ──────────────────────────────────────────────────────────────

function buildEmail(data: {
  name: string; email: string; phone: string; service: string; message: string
}) {
  const row = (label: string, value: string) => !value ? '' : `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;width:140px;vertical-align:top;">
        <span style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;">${label}</span>
      </td>
      <td style="padding:10px 0 10px 20px;border-bottom:1px solid #f0f0f0;vertical-align:top;">
        <span style="font-size:15px;color:#0f172a;font-weight:500;">${value}</span>
      </td>
    </tr>`

  return `<!DOCTYPE html>
<html lang="cs">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- HEADER -->
  <tr><td style="background:#0B1B13;border-radius:12px 12px 0 0;padding:36px 40px;">
    <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:rgba(76,175,121,0.7);">
      Vladimír Fořt · Finanční specialista
    </p>
    <h1 style="margin:0;font-size:24px;font-weight:800;color:#fff;letter-spacing:-0.02em;">
      Nová zpráva z webu
    </h1>
  </td></tr>

  ${data.service ? `
  <tr><td style="background:#0f2018;padding:12px 40px;">
    <span style="display:inline-block;background:rgba(39,116,78,0.25);border:1px solid rgba(76,175,121,0.3);color:#4CAF79;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;padding:5px 14px;">
      Zájem o: ${data.service}
    </span>
  </td></tr>` : ''}

  <!-- BODY -->
  <tr><td style="background:#fff;padding:36px 40px 40px;border-radius:0 0 12px 12px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      ${row('Jméno', data.name)}
      ${row('E-mail', `<a href="mailto:${data.email}" style="color:#27744E;text-decoration:none;">${data.email}</a>`)}
      ${row('Telefon', data.phone ? `<a href="tel:${data.phone.replace(/\s/g,'')}" style="color:#27744E;text-decoration:none;">${data.phone}</a>` : '')}
    </table>

    ${data.message ? `
    <div style="margin-bottom:28px;">
      <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;">Zpráva</p>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:18px 20px;border-radius:6px;">
        <p style="margin:0;font-size:15px;line-height:1.7;color:#334155;">${data.message.replace(/\n/g, '<br/>')}</p>
      </div>
    </div>` : ''}

    <a href="mailto:${data.email}"
      style="display:inline-block;background:#0B1B13;color:#fff;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:13px 26px;text-decoration:none;margin-right:10px;">
      Odpovědět
    </a>
    ${data.phone ? `<a href="tel:${data.phone.replace(/\s/g,'')}"
      style="display:inline-block;background:#f1f5f9;color:#0B1B13;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:13px 26px;text-decoration:none;">
      Zavolat
    </a>` : ''}
  </td></tr>

  <!-- FOOTER -->
  <tr><td style="padding:20px 0 0;">
    <p style="margin:0;text-align:center;font-size:12px;color:#94a3b8;">
      vladimirfort.cz ·
      <a href="mailto:lukas.hrncir@bidli.cz" style="color:#4CAF79;text-decoration:none;">lukas.hrncir@bidli.cz</a>
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`
}
