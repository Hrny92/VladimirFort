'use client'

import { useState, useRef, useEffect } from 'react'
import { Phone, Mail, ArrowRight, CheckCircle2, Loader2, X } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error'

function ThankYouModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem',
      background: 'rgba(9,21,16,0.9)', backdropFilter: 'blur(8px)',
    }}
      onClick={onClose}>
      <div style={{
        position: 'relative', width: '100%', maxWidth: 440,
        padding: '2.5rem',
        background: '#0B1B13',
        border: '1px solid rgba(76,175,121,0.2)',
      }}
        onClick={e => e.stopPropagation()}>

        <button onClick={onClose} style={{
          position: 'absolute', top: '1rem', right: '1rem',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.3)',
        }}>
          <X style={{ width: 16, height: 16 }} />
        </button>

        {/* Top accent line */}
        <div style={{ height: 2, background: 'linear-gradient(90deg, #27744E, #4CAF79, transparent)', width: '60%', marginBottom: '2rem' }} />

        <div style={{
          width: 56, height: 56,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '1.5rem',
          background: 'rgba(34,197,94,0.1)',
          border: '1px solid rgba(34,197,94,0.2)',
        }}>
          <CheckCircle2 style={{ width: 28, height: 28, color: '#4ade80' }} />
        </div>

        <h3 style={{ color: '#fff', fontWeight: 900, fontSize: '1.5rem', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
          Zpráva odeslána!
        </h3>
        <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: '1.5rem', color: 'rgba(255,255,255,0.5)' }}>
          Děkuji za zájem. Ozvu se vám do{' '}
          <span style={{ color: '#fff', fontWeight: 700 }}>24 hodin</span> v pracovní dny.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href="tel:+420773606013"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '0.75rem 1rem', fontSize: 13, fontWeight: 700, textDecoration: 'none',
              color: '#4CAF79', border: '1px solid rgba(76,175,121,0.25)',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(76,175,121,0.5)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(76,175,121,0.25)')}>
            <Phone style={{ width: 14, height: 14 }} /> 773 60 60 13
          </a>
          <a href="mailto:vladimir.fort@bidli.cz"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '0.75rem 1rem', fontSize: 13, fontWeight: 700, textDecoration: 'none',
              color: '#4CAF79', border: '1px solid rgba(76,175,121,0.25)',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(76,175,121,0.5)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(76,175,121,0.25)')}>
            <Mail style={{ width: 14, height: 14 }} /> E-mail
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Contact() {
  const ref    = useRef<HTMLElement>(null)
  const [status,    setStatus]    = useState<Status>('idle')
  const [showModal, setShowModal] = useState(false)
  const [errorMsg,  setErrorMsg]  = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting)
          entry.target.querySelectorAll('.reveal').forEach((el, i) =>
            setTimeout(() => el.classList.add('visible'), i * 80))
      }),
      { threshold: 0.05 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res  = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) { setErrorMsg(data.error ?? 'Něco se pokazilo.'); setStatus('error'); return }
      setStatus('success')
      setShowModal(true)
      setForm({ name: '', email: '', phone: '', service: '', message: '' })
    } catch {
      setErrorMsg('Nepodařilo se odeslat zprávu.')
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    color: '#fff',
    fontSize: 14,
    padding: '0.75rem 1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
  }

  return (
    <>
      {showModal && <ThankYouModal onClose={() => { setShowModal(false); setStatus('idle') }} />}

      <section id="kontakt" ref={ref} style={{ background: '#0B1B13', padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>

        {/* Watermark */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          display: 'flex', alignItems: 'center',
          pointerEvents: 'none', userSelect: 'none', overflow: 'hidden',
          opacity: 0.03,
        }}>
          <span style={{
            fontSize: 'clamp(200px, 26vw, 400px)',
            fontWeight: 900, color: '#4CAF79',
            letterSpacing: '-0.06em', lineHeight: 1,
            fontFamily: 'Inter, system-ui, sans-serif',
            paddingLeft: '2%',
          }}>05</span>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-16" style={{ position: 'relative', zIndex: 1 }}>

          {/* Label */}
          <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '4rem' }}>
            <span style={{ width: 24, height: 1, background: '#4CAF79', display: 'block' }} />
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#4CAF79' }}>
              Kontakt
            </span>
          </div>

          <div style={{ display: 'grid', gap: '4rem' }} className="lg:grid-cols-[1fr_1.2fr]">

            {/* Left */}
            <div>
              <h2 className="reveal" style={{ color: '#fff', marginBottom: '1.5rem' }}>
                Pojďme to<br />
                <span style={{ color: '#4CAF79' }}>probrat.</span>
              </h2>
              <p className="reveal" style={{ fontSize: 13, lineHeight: 1.8, marginBottom: '3rem', color: 'rgba(255,255,255,0.4)' }}>
                Konzultace je zcela zdarma a bez závazků. Napište nebo zavolejte.
              </p>

              {/* Contact items */}
              <div className="reveal">
                {[
                  { icon: Phone, label: 'Telefon', value: '773 60 60 13', href: 'tel:+420773606013' },
                  { icon: Mail,  label: 'E-mail',  value: 'vladimir.fort@bidli.cz', href: 'mailto:vladimir.fort@bidli.cz' },
                ].map((item, i) => (
                  <a key={i} href={item.href}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 20,
                      padding: '1.25rem 0',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      textDecoration: 'none',
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                    <div style={{
                      width: 40, height: 40, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(39,116,78,0.1)',
                      border: '1px solid rgba(76,175,121,0.15)',
                    }}>
                      <item.icon style={{ width: 16, height: 16, color: '#4CAF79' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 2, color: 'rgba(255,255,255,0.3)' }}>{item.label}</div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>{item.value}</div>
                    </div>
                    <ArrowRight style={{ width: 16, height: 16, color: '#4CAF79', marginLeft: 'auto', flexShrink: 0 }} />
                  </a>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="reveal">
              <form onSubmit={handleSubmit} style={{
                padding: '2rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}>

                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(76,175,121,0.6)', marginBottom: '1.5rem' }}>
                  Napište mi
                </p>

                <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }} className="sm:grid-cols-2">
                  {[
                    { key: 'name',  label: 'Jméno a příjmení', placeholder: 'Jan Novák',    type: 'text',  required: true },
                    { key: 'email', label: 'E-mail',            placeholder: 'vas@email.cz', type: 'email', required: true },
                  ].map(field => (
                    <div key={field.key}>
                      <label style={{ display: 'block', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 6, color: 'rgba(255,255,255,0.3)' }}>{field.label}</label>
                      <input type={field.type} required={field.required} placeholder={field.placeholder}
                        value={form[field.key as keyof typeof form]}
                        onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                        style={inputStyle}
                        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(76,175,121,0.4)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')} />
                    </div>
                  ))}
                </div>

                <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }} className="sm:grid-cols-2">
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 6, color: 'rgba(255,255,255,0.3)' }}>Telefon</label>
                    <input type="tel" placeholder="+420 777 888 999"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(76,175,121,0.4)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 6, color: 'rgba(255,255,255,0.3)' }}>Mám zájem o</label>
                    <select value={form.service}
                      onChange={e => setForm({ ...form, service: e.target.value })}
                      style={{ ...inputStyle, appearance: 'none' } as React.CSSProperties}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(76,175,121,0.4)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}>
                      <option value="" style={{ background: '#0B1B13' }}>Vyberte...</option>
                      {['Hypotéka', 'Družstevní financování', 'Pojištění majetku', 'Životní pojištění', 'Pojištění podnikatelů', 'Jiné'].map(o => (
                        <option key={o} value={o.toLowerCase()} style={{ background: '#0B1B13' }}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 6, color: 'rgba(255,255,255,0.3)' }}>Zpráva</label>
                  <textarea rows={4} placeholder="Popište vaši situaci..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(76,175,121,0.4)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')} />
                </div>

                {status === 'error' && (
                  <p style={{ color: '#f87171', fontSize: 12, textAlign: 'center', marginBottom: '0.75rem' }}>{errorMsg}</p>
                )}

                <button type="submit" disabled={status === 'loading'}
                  style={{
                    width: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em',
                    padding: '1rem',
                    background: '#fff', color: '#0B1B13',
                    border: 'none', cursor: 'pointer',
                    transition: 'background 0.2s',
                    opacity: status === 'loading' ? 0.5 : 1,
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#4CAF79' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fff' }}>
                  {status === 'loading'
                    ? <><Loader2 style={{ width: 16, height: 16 }} className="animate-spin" /> Odesílám...</>
                    : <>Odeslat zprávu <ArrowRight style={{ width: 16, height: 16 }} /></>}
                </button>

                <p style={{ textAlign: 'center', fontSize: 11, marginTop: '0.75rem', color: 'rgba(255,255,255,0.2)' }}>
                  Odesláním souhlasíte se zpracováním osobních údajů.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
