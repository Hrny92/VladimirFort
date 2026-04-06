'use client'

import { useState, useEffect } from 'react'
import { Phone, Mail } from 'lucide-react'

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

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const go = (href: string) => {
    setMobileOpen(false)
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 320)
  }

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
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(76,175,121,0.5) 40%, rgba(76,175,121,0.5) 60%, transparent)' }} />
        <div style={{ background: 'rgba(9,21,16,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{
            maxWidth: 1152, margin: '0 auto', padding: '0 1.5rem',
            height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            {/* Logo */}
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4CAF79', display: 'block' }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em' }}>
                Vladimír Fořt
              </span>
            </button>

            {/* Desktop: links + CTA */}
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
                style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#4CAF79', background: 'none', border: '1px solid rgba(76,175,121,0.3)', padding: '7px 18px', cursor: 'pointer', transition: 'border-color 0.2s, background 0.2s' }}
                onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'rgba(76,175,121,0.6)'; b.style.background = 'rgba(76,175,121,0.08)' }}
                onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'rgba(76,175,121,0.3)'; b.style.background = 'none' }}>
                Kontakt →
              </button>
            </div>

            {/* Mobile burger */}
            <button onClick={() => setMobileOpen(true)}
              className="md:hidden"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, display: 'flex', flexDirection: 'column', gap: 5 }}>
              <span style={{ width: 20, height: 1.5, background: 'rgba(255,255,255,0.7)', display: 'block', borderRadius: 1 }} />
              <span style={{ width: 14, height: 1.5, background: 'rgba(255,255,255,0.7)', display: 'block', borderRadius: 1 }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay — slides in from right */}
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
          {/* Dot grid texture */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, rgba(76,175,121,0.08) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }} />

          {/* Top bar: logo + close */}
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
            {mobileLinks.map((l, i) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1.1rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)',
                  cursor: 'pointer', textAlign: 'left', width: '100%',
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? 'none' : 'translateX(20px)',
                  transition: `opacity 0.4s ease ${0.1 + i * 0.06}s, transform 0.4s ease ${0.1 + i * 0.06}s`,
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.querySelector('.link-label')?.setAttribute('style', 'font-size:22px;font-weight:300;color:#fff;letter-spacing:0.01em;transition:all 0.2s')
                  el.querySelector('.link-arrow')?.setAttribute('style', 'color:#4CAF79;transform:translateX(4px);transition:all 0.2s')
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.querySelector('.link-label')?.setAttribute('style', 'font-size:22px;font-weight:300;color:rgba(255,255,255,0.55);letter-spacing:0.01em;transition:all 0.2s')
                  el.querySelector('.link-arrow')?.setAttribute('style', 'color:rgba(255,255,255,0.2);transform:none;transition:all 0.2s')
                }}>
                <span className="link-label" style={{ fontSize: 22, fontWeight: 300, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.01em', transition: 'all 0.2s' }}>
                  {l.label}
                </span>
                <span className="link-arrow" style={{ color: 'rgba(255,255,255,0.2)', fontSize: 16, transition: 'all 0.2s' }}>→</span>
              </button>
            ))}
          </nav>

          {/* Bottom: contact info */}
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
    </>
  )
}
