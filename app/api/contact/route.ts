import { NextRequest, NextResponse } from 'next/server'
import * as tls from 'tls'

// ── Konfigurace (z env proměnných) ────────────────────────────────────────────
const SMTP_HOST      = process.env.SMTP_HOST      ?? 'smtp.seznam.cz'
const SMTP_PORT      = Number(process.env.SMTP_PORT ?? 465)
const SMTP_USER      = process.env.SMTP_USER      ?? ''
const SMTP_PASS      = process.env.SMTP_PASS      ?? ''
const SMTP_FROM      = process.env.SMTP_FROM      ?? ''
const SMTP_FROM_NAME = process.env.SMTP_FROM_NAME ?? 'Web Vladimír Fořt'
const TO_EMAIL       = process.env.CONTACT_TO_EMAIL ?? 'vladimir.fort@bidli.cz'

// ── Minimální SMTP klient přes Node TLS ──────────────────────────────────────

function smtpSend(cfg: {
  from: string; fromName: string; to: string
  replyTo: string; subject: string; html: string
}): Promise<void> {
  return new Promise((resolve, reject) => {
    const CRLF = '\r\n'
    const b64  = (s: string) => Buffer.from(s, 'utf-8').toString('base64')
    let   done = false

    const htmlB64  = b64(cfg.html)
    const b64Lines = htmlB64.match(/.{1,76}/g) ?? [htmlB64]
    const emailRaw = [
      `Date: ${new Date().toUTCString()}`,
      `From: =?UTF-8?B?${b64(cfg.fromName)}?= <${cfg.from}>`,
      `To: ${cfg.to}`,
      `Reply-To: ${cfg.replyTo}`,
      `Subject: =?UTF-8?B?${b64(cfg.subject)}?=`,
      `MIME-Version: 1.0`,
      `Content-Type: text/html; charset=UTF-8`,
      `Content-Transfer-Encoding: base64`,
      ``,
      ...b64Lines,
    ].join(CRLF)

    const socket = tls.connect({
      host: SMTP_HOST,
      port: SMTP_PORT,
      rejectUnauthorized: false,
    })

    let buf   = ''
    let phase = 0

    const write = (s: string) => socket.write(s + CRLF)

    const next = (code: number) => {
      if (code >= 400) { socket.destroy(); reject(new Error(`SMTP ${code}`)); return }
      switch (phase++) {
        case 0: write('EHLO webmailer'); break
        case 1: write('AUTH LOGIN'); break
        case 2: write(b64(SMTP_USER)); break
        case 3: write(b64(SMTP_PASS)); break
        case 4: write(`MAIL FROM:<${cfg.from}>`); break
        case 5: write(`RCPT TO:<${cfg.to}>`); break
        case 6: write('DATA'); break
        case 7: socket.write(emailRaw + CRLF + '.' + CRLF); break
        case 8: write('QUIT'); break
        case 9: done = true; socket.end(); resolve(); break
      }
    }

    socket.on('data', (chunk) => {
      buf += chunk.toString()
      let nl: number
      while ((nl = buf.indexOf('\n')) !== -1) {
        const line = buf.slice(0, nl).replace(/\r$/, '')
        buf = buf.slice(nl + 1)
        if (line.length < 3) continue
        const code    = parseInt(line.slice(0, 3), 10)
        const isFinal = line[3] === ' ' || line.length === 3
        if (isFinal && !isNaN(code)) next(code)
      }
    })

    socket.on('error', (err) => !done && reject(err))
    socket.on('close', ()    => { if (!done) reject(new Error('SMTP: spojení ukončeno předčasně')) })
  })
}

// ── HTML šablona e-mailu ──────────────────────────────────────────────────────

function buildEmail(data: {
  name: string; email: string; phone: string; service: string; message: string
}) {
  const row = (label: string, value: string) =>
    value ? `<tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;width:140px;vertical-align:top;">
        <span style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;">${label}</span>
      </td>
      <td style="padding:10px 0 10px 20px;border-bottom:1px solid #f0f0f0;vertical-align:top;">
        <span style="font-size:15px;color:#0f172a;font-weight:500;">${value}</span>
      </td>
    </tr>` : ''

  return `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nová zpráva z webu</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- HEADER -->
        <tr>
          <td style="background:#0B1B13;border-radius:16px 16px 0 0;padding:40px 48px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0"><tr>
              <td>
                <p style="margin:0 0 4px 0;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:rgba(76,175,121,0.7);">
                  Vladimír Fořt · Finanční specialista
                </p>
                <h1 style="margin:0;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;line-height:1.2;">
                  Nová zpráva z webu
                </h1>
              </td>
              <td align="right" style="vertical-align:middle;">
                <div style="width:44px;height:44px;background:rgba(39,116,78,0.25);border:1px solid rgba(76,175,121,0.3);border-radius:12px;display:inline-flex;align-items:center;justify-content:center;">
                  <span style="font-size:16px;font-weight:900;color:#4CAF79;line-height:1;">VF</span>
                </div>
              </td>
            </tr></table>
          </td>
        </tr>

        ${data.service ? `
        <tr>
          <td style="background:#0f2018;padding:0 48px;">
            <div style="padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
              <span style="display:inline-block;background:rgba(39,116,78,0.25);border:1px solid rgba(76,175,121,0.3);color:#4CAF79;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;padding:5px 14px;border-radius:100px;">
                Zájem o: ${data.service}
              </span>
            </div>
          </td>
        </tr>` : ''}

        <!-- BODY -->
        <tr>
          <td style="background:#ffffff;padding:36px 48px 40px;border-radius:0 0 16px 16px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
              ${row('Jméno', data.name)}
              ${row('E-mail', `<a href="mailto:${data.email}" style="color:#27744E;text-decoration:none;">${data.email}</a>`)}
              ${row('Telefon', data.phone ? `<a href="tel:${data.phone.replace(/\s/g, '')}" style="color:#27744E;text-decoration:none;">${data.phone}</a>` : '')}
            </table>

            ${data.message ? `
            <div style="margin-bottom:32px;">
              <p style="margin:0 0 10px 0;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;">Zpráva</p>
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:18px 20px;">
                <p style="margin:0;font-size:15px;line-height:1.7;color:#334155;">${data.message.replace(/\n/g, '<br/>')}</p>
              </div>
            </div>` : ''}

            <table width="100%" cellpadding="0" cellspacing="0"><tr><td>
              <a href="mailto:${data.email}"
                style="display:inline-block;background:#0B1B13;color:#ffffff;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:14px 28px;border-radius:100px;text-decoration:none;margin-right:12px;">
                Odpovědět
              </a>
              ${data.phone ? `<a href="tel:${data.phone.replace(/\s/g, '')}"
                style="display:inline-block;background:#f1f5f9;color:#0B1B13;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:14px 28px;border-radius:100px;text-decoration:none;">
                Zavolat
              </a>` : ''}
            </td></tr></table>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="padding:24px 0 0;">
            <p style="margin:0;text-align:center;font-size:12px;color:#94a3b8;line-height:1.6;">
              Vladimír Fořt · Finanční specialista ·
              <a href="mailto:vladimir.fort@bidli.cz" style="color:#4CAF79;text-decoration:none;">vladimir.fort@bidli.cz</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

// ── POST /api/contact ─────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  if (!SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
    return NextResponse.json({ error: 'SMTP není nakonfigurováno.' }, { status: 500 })
  }

  let body: { name: string; email: string; phone: string; service: string; message: string }
  try {
    body = await req.json()
    if (!body.name || !body.email) throw new Error()
  } catch {
    return NextResponse.json({ error: 'Neplatná data formuláře.' }, { status: 400 })
  }

  const subject = body.service
    ? `Nová poptávka: ${body.service} – ${body.name}`
    : `Nová zpráva od ${body.name}`

  try {
    await smtpSend({
      from:     SMTP_FROM,
      fromName: SMTP_FROM_NAME,
      to:       TO_EMAIL,
      replyTo:  body.email,
      subject,
      html:     buildEmail(body),
    })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Contact SMTP error:', e)
    return NextResponse.json({ error: 'Chyba při odesílání e-mailu.' }, { status: 502 })
  }
}
