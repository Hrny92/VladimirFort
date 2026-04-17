import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { name, email, phone, service, message } = await req.json()

  if (!name || !email) {
    return NextResponse.json({ error: 'Vyplňte prosím jméno a e-mail.' }, { status: 400 })
  }

  if (!process.env.WEB3FORMS_KEY) {
    return NextResponse.json({ error: 'Chyba konfigurace serveru.' }, { status: 500 })
  }

  const subject = service
    ? `Nová poptávka: ${service} – ${name}`
    : `Nová zpráva od ${name}`

  const body = {
    access_key: process.env.WEB3FORMS_KEY,
    subject,
    from_name: name,
    email,          // Web3Forms použije jako Reply-To
    phone:   phone   || '—',
    service: service || '—',
    message: message || '—',
  }

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await res.json()

  if (!data.success) {
    console.error('Web3Forms error:', data)
    return NextResponse.json({ error: 'Nepodařilo se odeslat zprávu.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
