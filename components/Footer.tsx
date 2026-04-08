'use client'

import Link from 'next/link'
import { Phone, Mail } from 'lucide-react'

const navLinks = [
  { label: 'O mně',      href: '#o-mne' },
  { label: 'Služby',     href: '#sluzby' },
  { label: 'Kalkulačka', href: '#kalkulacka' },
  { label: 'Kontakt',    href: '#kontakt' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const scrollTo = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer style={{ background: '#060F0A' }}>
      {/* Top accent line */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent 0%, rgba(39,116,78,0.4) 30%, rgba(76,175,121,0.6) 50%, rgba(39,116,78,0.4) 70%, transparent 100%)' }} />

      <div className="max-w-6xl mx-auto px-6 lg:px-16" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
        <div style={{ display: 'grid', gap: '3rem' }} className="md:grid-cols-[1fr_auto_auto]">

          {/* Brand block */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.25rem' }}>
              <div style={{
                width: 40, height: 40,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(39,116,78,0.12)',
                border: '1px solid rgba(76,175,121,0.2)',
              }}>
                <span style={{ fontWeight: 900, fontSize: 14, color: '#4CAF79' }}>VF</span>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 900, color: '#fff', letterSpacing: '-0.01em' }}>Vladimír Fořt</div>
                <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'rgba(76,175,121,0.6)' }}>Finanční specialista</div>
              </div>
            </div>

            <p style={{ fontSize: 13, lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: 280, color: 'rgba(255,255,255,0.3)' }}>
              Specialista na financování a pojišťování. Hypotéky, pojištění, financování. Od roku 2011.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { icon: Phone, value: '773 60 60 13', href: 'tel:+420773606013' },
                { icon: Mail,  value: 'vladimir.fort@bidli.cz', href: 'mailto:vladimir.fort@bidli.cz' },
              ].map((item, i) => (
                <a key={i} href={item.href}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#4CAF79')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}>
                  <item.icon style={{ width: 14, height: 14, flexShrink: 0 }} />
                  {item.value}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700, marginBottom: '1.25rem', color: 'rgba(255,255,255,0.2)' }}>Navigace</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {navLinks.map(link => (
                <li key={link.href}>
                  <button onClick={() => scrollTo(link.href)}
                    style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s', padding: 0 }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700, marginBottom: '1.25rem', color: 'rgba(255,255,255,0.2)' }}>Právní</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: '2rem' }}>
              <li>
                <Link href="/gdpr"
                  style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
                  Ochrana osobních údajů
                </Link>
              </li>
              <li>
                <button
                  onClick={() => window.dispatchEvent(new Event('openCookieSettings'))}
                  style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
                  Nastavení cookies
                </button>
              </li>
            </ul>
            <div style={{ padding: '0.75rem', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ fontSize: 11, lineHeight: 1.6, color: 'rgba(255,255,255,0.2)' }}>
                IČO: 67763006<br />Vázaný zástupce ČNB
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-16" style={{ paddingTop: '1rem', paddingBottom: '1rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>
            © {year} Vladimír Fořt. Všechna práva vyhrazena.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: 0.2 }}>
            <span style={{ width: 16, height: 1, background: '#4CAF79', display: 'block' }} />
            <span style={{ fontSize: 12, fontWeight: 900, color: '#4CAF79', letterSpacing: '-0.04em' }}>VF</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
