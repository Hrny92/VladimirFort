'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Phone, Mail } from 'lucide-react'

function Counter({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const [n, setN]   = useState(0)
  const [go, setGo] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 900)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!go) return
    let t0: number
    const run = (ts: number) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / 1400, 1)
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * end))
      if (p < 1) requestAnimationFrame(run)
      else setN(end)
    }
    requestAnimationFrame(run)
  }, [go, end])

  return (
    <div>
      <div className="text-3xl md:text-4xl font-black tabular-nums text-white leading-none mb-2">
        {n}{suffix}
      </div>
      <div className="text-[10px] uppercase tracking-[0.22em] font-medium" style={{ color: 'rgba(76,175,121,0.65)' }}>
        {label}
      </div>
    </div>
  )
}

export default function Hero() {
  const [visible,    setVisible]    = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const KEY = 'fort_intro_v1'
    if (sessionStorage.getItem(KEY)) {
      const t = setTimeout(() => setVisible(true), 60)
      return () => clearTimeout(t)
    }
    const onDone = () => setVisible(true)
    window.addEventListener('introComplete', onDone)
    return () => window.removeEventListener('introComplete', onDone)
  }, [])

  // Lock scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const go = (href: string) => {
    setMobileOpen(false)
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 320)
  }

  return (
    <section
      id="hero"
      style={{
        height: '100vh',
        minHeight: 600,
        background: '#091510',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Dot grid — full section, behind everything including photo */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        backgroundImage: 'radial-gradient(circle, rgba(76,175,121,0.14) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Subtle left vignette only — keeps text readable, doesn't touch right side */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
        background: 'linear-gradient(to right, rgba(9,21,16,0.75) 0%, rgba(9,21,16,0.35) 35%, transparent 55%)',
      }} />

      {/* Hero image — bottom-anchored, dominant right side, transparent PNG */}
      <div className="hidden md:block" style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 'clamp(380px, 52vw, 820px)',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 3,
      }}>
        {/* Bottom fade only — transparent PNG needs no left-side background fill */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'linear-gradient(to top, #091510 0%, transparent 10%)',
        }} />
        <Image
          src="/hero-img.png"
          alt="Vladimír Fořt"
          fill
          style={{ objectFit: 'contain', objectPosition: 'bottom right' }}
          sizes="52vw"
          priority
        />
      </div>

      {/* Nav */}
      <nav style={{ position: 'relative', zIndex: 10 }}>
        <div style={{
          maxWidth: 1152, margin: '0 auto',
          padding: '0 1.5rem',
          height: 52,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4CAF79', display: 'block' }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em' }}>
              Vladimír Fořt
            </span>
          </button>

          {/* Right group: links + CTA */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 32 }}>
            {[['O mně','#o-mne'],['Služby','#sluzby'],['Kalkulačka','#kalkulacka']].map(([label, href]) => (
              <button key={href}
                onClick={() => go(href)}
                style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.38)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}>
                {label}
              </button>
            ))}
            <button onClick={() => go('#kontakt')}
              style={{
                fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em',
                color: '#4CAF79', background: 'none',
                border: '1px solid rgba(76,175,121,0.3)',
                padding: '7px 18px', cursor: 'pointer',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'rgba(76,175,121,0.6)'; b.style.background = 'rgba(76,175,121,0.08)' }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'rgba(76,175,121,0.3)'; b.style.background = 'none' }}>
              Kontakt →
            </button>
            {process.env.NEXT_PUBLIC_BOOKING_URL && (
              <a
                href={process.env.NEXT_PUBLIC_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#0B1B13', background: '#4CAF79', padding: '7px 18px', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'background 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#5DC98A' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#4CAF79' }}>
                Rezervovat schůzku
              </a>
            )}
          </div>

          {/* Mobile burger */}
          <button onClick={() => setMobileOpen(true)}
            className="md:hidden"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, flexDirection: 'column', gap: 5 }}>
            <span style={{ width: 20, height: 1.5, background: 'rgba(255,255,255,0.7)', display: 'block', borderRadius: 1 }} />
            <span style={{ width: 14, height: 1.5, background: 'rgba(255,255,255,0.7)', display: 'block', borderRadius: 1 }} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer — identical to Navbar */}
      <div className="md:hidden" style={{
        position: 'fixed', inset: 0, zIndex: 60,
        pointerEvents: mobileOpen ? 'auto' : 'none',
      }}>
        {/* Backdrop */}
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            opacity: mobileOpen ? 1 : 0,
            transition: 'opacity 0.35s ease',
          }}
        />
        {/* Drawer panel */}
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0,
          width: '82%', maxWidth: 340,
          background: '#091510',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex', flexDirection: 'column',
          borderLeft: '1px solid rgba(76,175,121,0.1)',
        }}>
          {/* Dot grid */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, rgba(76,175,121,0.08) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }} />
          {/* Top bar */}
          <div style={{
            position: 'relative', zIndex: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4CAF79', display: 'block' }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em' }}>
                Vladimír Fořt
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              style={{
                width: 34, height: 34,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '50%',
                cursor: 'pointer', color: 'rgba(255,255,255,0.6)',
                fontSize: 18, lineHeight: 1,
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'rgba(76,175,121,0.15)'; b.style.color = '#4CAF79' }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'rgba(255,255,255,0.05)'; b.style.color = 'rgba(255,255,255,0.6)' }}>
              ✕
            </button>
          </div>
          {/* Nav links */}
          <nav style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem 1.5rem' }}>
            {[['O mně','#o-mne'],['Služby','#sluzby'],['Kalkulačka','#kalkulacka'],['Kontakt','#kontakt']].map(([label, href], i) => (
              <button key={href} onClick={() => go(href)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1.1rem 0',
                  background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)',
                  cursor: 'pointer', textAlign: 'left', width: '100%',
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? 'none' : 'translateX(20px)',
                  transition: `opacity 0.4s ease ${0.1 + i * 0.06}s, transform 0.4s ease ${0.1 + i * 0.06}s`,
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.querySelector('.hl')?.setAttribute('style', 'font-size:22px;font-weight:300;color:#fff;letter-spacing:0.01em;transition:all 0.2s')
                  el.querySelector('.ha')?.setAttribute('style', 'color:#4CAF79;transform:translateX(4px);transition:all 0.2s')
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.querySelector('.hl')?.setAttribute('style', 'font-size:22px;font-weight:300;color:rgba(255,255,255,0.55);letter-spacing:0.01em;transition:all 0.2s')
                  el.querySelector('.ha')?.setAttribute('style', 'color:rgba(255,255,255,0.2);transform:none;transition:all 0.2s')
                }}>
                <span className="hl" style={{ fontSize: 22, fontWeight: 300, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.01em', transition: 'all 0.2s' }}>
                  {label}
                </span>
                <span className="ha" style={{ color: 'rgba(255,255,255,0.2)', fontSize: 16, transition: 'all 0.2s' }}>→</span>
              </button>
            ))}
          </nav>
          {/* Bottom contacts */}
          <div style={{
            position: 'relative', zIndex: 1,
            padding: '1.5rem',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            opacity: mobileOpen ? 1 : 0,
            transition: 'opacity 0.4s ease 0.4s',
          }}>
            <p style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(76,175,121,0.5)', marginBottom: '0.75rem' }}>
              Kontakt
            </p>
            <a href="tel:+420773606013" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0.5rem 0', textDecoration: 'none' }}>
              <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(76,175,121,0.2)', flexShrink: 0 }}>
                <Phone style={{ width: 12, height: 12, color: '#4CAF79' }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>773 60 60 13</span>
            </a>
            <a href="mailto:vladimir.fort@bidli.cz" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0.5rem 0', textDecoration: 'none' }}>
              <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(76,175,121,0.2)', flexShrink: 0 }}>
                <Mail style={{ width: 12, height: 12, color: '#4CAF79' }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>vladimir.fort@bidli.cz</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', pointerEvents: 'none' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-16"
          style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: '3rem' }}>

          {/* Headline block */}
          <div style={{ maxWidth: 560, marginTop: '10vh' }}>

            {/* Eyebrow */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              marginBottom: '2.5rem',
              opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(8px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}>
              <span style={{ width: 24, height: 1, background: '#4CAF79', display: 'block' }} />
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#4CAF79' }}>
                Finanční specialista
              </span>
              <span style={{ color: 'rgba(76,175,121,0.4)', fontSize: 12, margin: '0 4px' }}>·</span>
              <img src="/Bidli-logo-wh.svg" alt="Bidli" style={{ height: 26, opacity: 0.65, display: 'inline-block', verticalAlign: 'middle' }} />
            </div>

            {/* H1 */}
            <h1 style={{
              marginBottom: '2rem',
              opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)',
              transition: 'opacity 0.7s ease 0.08s, transform 0.7s ease 0.08s',
            }}>
              <span style={{ display: 'block', color: '#fff' }}>Vaše finance</span>
              <span style={{ display: 'block' }}>
                <span style={{ color: 'rgba(255,255,255,0.22)' }}>v dobrých </span>
                <span style={{ color: '#4CAF79' }}>rukou.</span>
              </span>
            </h1>

            {/* Perex */}
            <p style={{
              color: 'rgba(255,255,255,0.38)', lineHeight: 1.75, maxWidth: 400,
              marginBottom: '2.5rem',
              opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(10px)',
              transition: 'opacity 0.6s ease 0.18s, transform 0.6s ease 0.18s',
            }}>
              Hypotéky, pojištění a financování — komplexní řešení od jednoho specialisty.
              Trpělivé jednání, jasné vysvětlení.
            </p>

            {/* CTAs */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap', pointerEvents: 'auto',
              opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(8px)',
              transition: 'opacity 0.6s ease 0.26s, transform 0.6s ease 0.26s',
            }}>
              <button
                onClick={() => go('#kontakt')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: '#4CAF79', color: '#091510',
                  fontWeight: 800, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase',
                  padding: '14px 28px',
                  border: 'none', cursor: 'pointer',
                  transition: 'background 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#5DC98A'; b.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#4CAF79'; b.style.transform = 'none' }}>
                Konzultace zdarma
                <span style={{ fontSize: 14, lineHeight: 1 }}>→</span>
              </button>

              <button
                onClick={() => go('#kalkulacka')}
                style={{
                  fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.32)', background: 'none', border: 'none', cursor: 'pointer',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.32)')}>
                Kalkulačka hypoték →
              </button>
            </div>
          </div>

          {/* Stats bar */}
          <div style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.45s',
          }}>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 28 }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, maxWidth: 480 }}>
              {[
                { end: 14, suffix: '+', label: 'Let praxe' },
                { end: 100, suffix: '%', label: 'Bezplatný servis' },
                { end: 100, suffix: '+', label: 'Spokojených klientů' },
              ].map((s, i) => (
                <div key={i} style={{
                  paddingLeft: i > 0 ? 28 : 0,
                  borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                }}>
                  <Counter {...s} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
