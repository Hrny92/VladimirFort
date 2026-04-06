'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

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

  const go = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

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
          </div>

          {/* Mobile burger */}
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
            style={{ background: 'none', border: 'none', cursor: 'pointer', flexDirection: 'column', gap: 5, padding: 4 }}>
            <span style={{ width: 18, height: 1, background: mobileOpen ? '#4CAF79' : 'rgba(255,255,255,0.6)', display: 'block', transform: mobileOpen ? 'translateY(3px) rotate(45deg)' : 'none', transition: 'all 0.25s' }} />
            <span style={{ width: 18, height: 1, background: 'rgba(255,255,255,0.6)', display: 'block', opacity: mobileOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
            <span style={{ width: 18, height: 1, background: mobileOpen ? '#4CAF79' : 'rgba(255,255,255,0.6)', display: 'block', transform: mobileOpen ? 'translateY(-3px) rotate(-45deg)' : 'none', transition: 'all 0.25s' }} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className="md:hidden" style={{
        position: 'fixed', inset: 0, zIndex: 40,
        background: '#091510',
        opacity: mobileOpen ? 1 : 0,
        transform: mobileOpen ? 'none' : 'translateY(-6px)',
        pointerEvents: mobileOpen ? 'auto' : 'none',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(76,175,121,0.1) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />
        <div style={{
          position: 'relative', zIndex: 1,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          height: '100%', gap: 4,
        }}>
          <div style={{ marginBottom: 32, opacity: mobileOpen ? 0.5 : 0, transition: 'opacity 0.4s ease 0.1s' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4CAF79', display: 'block' }} />
          </div>
          {[['O mně','#o-mne'],['Služby','#sluzby'],['Kalkulačka','#kalkulacka'],['Kontakt','#kontakt']].map(([label, href], i) => (
            <button key={href} onClick={() => { setMobileOpen(false); go(href) }}
              style={{
                fontSize: 22, fontWeight: 300, letterSpacing: '0.02em',
                color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer',
                padding: '10px 32px',
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'none' : 'translateY(10px)',
                transition: `opacity 0.4s ease ${0.15 + i * 0.06}s, transform 0.4s ease ${0.15 + i * 0.06}s, color 0.2s`,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>
              {label}
            </button>
          ))}
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
                { end: 20, suffix: '+', label: 'Bank na trhu' },
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
