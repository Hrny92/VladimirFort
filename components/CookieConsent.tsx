'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type Prefs = { analytics: boolean; marketing: boolean }
const STORAGE_KEY = 'fort_cookie_v1'

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      style={{
        width: 40, height: 22, borderRadius: 11, position: 'relative',
        background: on ? '#27744E' : 'rgba(255,255,255,0.1)',
        border: `1px solid ${on ? '#27744E' : 'rgba(255,255,255,0.15)'}`,
        cursor: 'pointer', flexShrink: 0,
        transition: 'background 0.2s, border-color 0.2s',
      }}>
      <span style={{
        position: 'absolute', top: 2,
        left: on ? 20 : 2,
        width: 16, height: 16, borderRadius: '50%',
        background: '#fff',
        transition: 'left 0.2s',
        display: 'block',
      }} />
    </button>
  )
}

export default function CookieConsent() {
  const [visible,      setVisible]      = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [mounted,      setMounted]      = useState(false)
  const [prefs, setPrefs] = useState<Prefs>({ analytics: false, marketing: false })

  useEffect(() => {
    setMounted(true)
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(t)
    }
  }, [])

  const save = (all: boolean) => {
    const saved: Prefs = all ? { analytics: true, marketing: true } : prefs
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
    setVisible(false)
    setShowSettings(false)
  }

  if (!mounted || !visible) return null

  return (
    <>
      {/* Backdrop (only when settings panel open) */}
      {showSettings && (
        <div
          onClick={() => setShowSettings(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 998,
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(4px)',
          }}
        />
      )}

      {/* Settings panel */}
      {showSettings && (
        <div style={{
          position: 'fixed', bottom: '1.5rem', left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 999,
          width: '100%', maxWidth: 460,
          padding: '0 1rem',
        }}>
          <div style={{
            background: '#0B1B13',
            border: '1px solid rgba(76,175,121,0.2)',
            padding: '2rem',
          }}>
            {/* Header */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.5rem' }}>
                <span style={{ width: 20, height: 1, background: '#4CAF79', display: 'block' }} />
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.24em', color: '#4CAF79' }}>
                  Nastavení cookies
                </span>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                Vyberte, které cookies povolujete. Nezbytné cookies jsou vždy aktivní.
              </p>
            </div>

            {/* Categories */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: '1.5rem' }}>
              {/* Nezbytné — locked */}
              {[
                {
                  title: 'Nezbytné',
                  desc: 'Zajišťují základní funkce webu. Nelze vypnout.',
                  locked: true,
                  on: true,
                },
                {
                  title: 'Analytické',
                  desc: 'Pomáhají pochopit, jak návštěvníci web používají.',
                  locked: false,
                  on: prefs.analytics,
                  key: 'analytics' as keyof Prefs,
                },
                {
                  title: 'Marketingové',
                  desc: 'Používají se pro cílená sdělení a reklamu.',
                  locked: false,
                  on: prefs.marketing,
                  key: 'marketing' as keyof Prefs,
                },
              ].map((cat, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: '1rem',
                  padding: '1rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.85)', marginBottom: 2 }}>
                      {cat.title}
                    </div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>
                      {cat.desc}
                    </div>
                  </div>
                  {cat.locked ? (
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#4CAF79', flexShrink: 0 }}>
                      Vždy aktivní
                    </span>
                  ) : (
                    <Toggle
                      on={cat.on}
                      onChange={v => setPrefs(p => ({ ...p, [cat.key!]: v }))}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => save(false)}
                style={{
                  flex: 1, padding: '0.625rem 1rem',
                  fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em',
                  background: 'none',
                  color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  cursor: 'pointer', transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'rgba(255,255,255,0.3)'; b.style.color = '#fff' }}
                onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'rgba(255,255,255,0.12)'; b.style.color = 'rgba(255,255,255,0.5)' }}>
                Uložit výběr
              </button>
              <button
                onClick={() => save(true)}
                style={{
                  flex: 1, padding: '0.625rem 1rem',
                  fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em',
                  background: '#27744E', color: '#fff',
                  border: '1px solid #27744E',
                  cursor: 'pointer', transition: 'background 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#4CAF79' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#27744E' }}>
                Přijmout vše
              </button>
            </div>

            <p style={{ marginTop: '1rem', fontSize: 11, color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>
              <Link href="/gdpr" style={{ color: 'rgba(76,175,121,0.6)', textDecoration: 'none' }}>
                Zásady ochrany osobních údajů
              </Link>
            </p>
          </div>
        </div>
      )}

      {/* Main banner (hidden when settings panel is open) */}
      {!showSettings && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999,
          background: '#060F0A',
          borderTop: '1px solid rgba(76,175,121,0.15)',
        }}>
          <div style={{
            maxWidth: 1152, margin: '0 auto',
            padding: '1rem 1.5rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '1rem',
          }}>
            {/* Text */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 220 }}>
              <span style={{ fontSize: 16 }}>🍪</span>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
                Používáme cookies pro zlepšení vašeho zážitku.{' '}
                <Link href="/gdpr" style={{ color: 'rgba(76,175,121,0.7)', textDecoration: 'none' }}>
                  Více informací
                </Link>
              </p>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button
                onClick={() => setShowSettings(true)}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em',
                  background: 'none',
                  color: 'rgba(255,255,255,0.4)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer', transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'rgba(255,255,255,0.25)'; b.style.color = 'rgba(255,255,255,0.7)' }}
                onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'rgba(255,255,255,0.1)'; b.style.color = 'rgba(255,255,255,0.4)' }}>
                Nastavení
              </button>
              <button
                onClick={() => save(false)}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em',
                  background: 'none',
                  color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'rgba(255,255,255,0.3)'; b.style.color = '#fff' }}
                onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'rgba(255,255,255,0.15)'; b.style.color = 'rgba(255,255,255,0.5)' }}>
                Jen nezbytné
              </button>
              <button
                onClick={() => save(true)}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em',
                  background: '#27744E', color: '#fff',
                  border: '1px solid #27744E',
                  cursor: 'pointer', transition: 'background 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#4CAF79' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#27744E' }}>
                Přijmout vše
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
