'use client'

import { useState, useEffect } from 'react'

const links = [
  { label: 'O mně',      href: '#o-mne' },
  { label: 'Služby',     href: '#sluzby' },
  { label: 'Kalkulačka', href: '#kalkulacka' },
]

const mobileLinks = [
  ...links,
  { label: 'Kontakt', href: '#kontakt' },
]

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (href: string) => { setMobileOpen(false); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <>
      {/* Fixed bar */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        opacity: scrolled ? 1 : 0,
        transform: scrolled ? 'none' : 'translateY(-100%)',
        pointerEvents: scrolled ? 'auto' : 'none',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}>
        {/* 1px green top line */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(76,175,121,0.5) 40%, rgba(76,175,121,0.5) 60%, transparent)' }} />
        <div style={{ background: 'rgba(9,21,16,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{
            maxWidth: 1152, margin: '0 auto',
            padding: '0 1.5rem',
            height: 52,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            {/* Logo */}
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4CAF79', display: 'block' }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em' }}>
                Vladimír Fořt
              </span>
            </button>

            {/* Right group: links + CTA */}
            <div className="hidden md:flex" style={{ alignItems: 'center', gap: 32 }}>
              {links.map(l => (
                <button key={l.href} onClick={() => go(l.href)}
                  style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.38)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}>
                  {l.label}
                </button>
              ))}
              <button onClick={() => go('#kontakt')}
                style={{
                  fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em',
                  color: '#4CAF79', background: 'none', border: '1px solid rgba(76,175,121,0.3)',
                  padding: '7px 18px', cursor: 'pointer', transition: 'border-color 0.2s, background 0.2s',
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
        </div>
      </header>

      {/* Mobile overlay */}
      <div className="md:hidden" style={{
        position: 'fixed', inset: 0, zIndex: 40,
        background: '#091510',
        opacity: mobileOpen ? 1 : 0,
        transform: mobileOpen ? 'none' : 'translateY(-6px)',
        pointerEvents: mobileOpen ? 'auto' : 'none',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}>
        {/* Dot grid */}
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
          {/* Green dot */}
          <div style={{ marginBottom: 32, opacity: mobileOpen ? 0.5 : 0, transition: 'opacity 0.4s ease 0.1s' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4CAF79', display: 'block' }} />
          </div>

          {mobileLinks.map((l, i) => (
            <button key={l.href} onClick={() => go(l.href)}
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
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
