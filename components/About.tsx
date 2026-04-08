'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const highlights = [
  { num: '01', text: 'Specialista na financování a pojišťování od roku 2011' },
  { num: '02', text: 'Trpělivé jednání — žádný dotaz není špatný' },
  { num: '03', text: 'Hypotéky, pojištění a financování pod jednou střechou' },
  { num: '04', text: 'Individuální přístup a jasné vysvětlení každého kroku' },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)

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

  return (
    <section id="o-mne" ref={ref} style={{ background: '#F7FAF8', padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>

      {/* Watermark number */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0,
        display: 'flex', alignItems: 'center',
        pointerEvents: 'none', userSelect: 'none', overflow: 'hidden',
        opacity: 0.05,
      }}>
        <span style={{
          fontSize: 'clamp(200px, 26vw, 400px)',
          fontWeight: 900, color: '#27744E',
          letterSpacing: '-0.06em', lineHeight: 1,
          fontFamily: 'Inter, system-ui, sans-serif',
          paddingRight: '3%',
        }}>01</span>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-16" style={{ position: 'relative', zIndex: 1 }}>

        {/* Label */}
        <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '4rem' }}>
          <span style={{ width: 24, height: 1, background: '#27744E', display: 'block' }} />
          <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#27744E' }}>
            O mně
          </span>
        </div>

        <div style={{ display: 'grid', gap: '4rem' }}
          className="grid-cols-1 lg:grid-cols-[1fr_380px]">

          {/* Left */}
          <div>
            <h2 className="reveal" style={{ color: '#0B1B13', marginBottom: '2rem' }}>
              Pomáhám lidem<br />
              <span style={{ color: '#27744E' }}>financovat</span> jejich<br />
              sny od roku 2011.
            </h2>

            <p className="reveal" style={{ color: '#64748b', lineHeight: 1.8, maxWidth: 500, marginBottom: '1.25rem' }}>
              Jsem specialista na financování a pojišťování. Každý klient je pro mě jedinečný —
              věnuji čas tomu, abych porozuměl jeho situaci, a teprve pak navrhuji řešení.
              Věřím, že žádný dotaz není špatný a každý si zaslouží srozumitelné vysvětlení.
            </p>
            <p className="reveal" style={{ color: '#64748b', lineHeight: 1.8, maxWidth: 500, marginBottom: '3rem' }}>
              Díky dlouholeté praxi dokáži porovnat nabídky z většiny bank a pojišťoven
              a najít pro vás to nejlepší řešení.
            </p>

            {/* 2×2 highlight cards */}
            <div className="reveal" style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1,
              background: 'rgba(11,27,19,0.1)',
              marginBottom: '3rem',
            }}>
              {highlights.map((h, i) => (
                <div key={i} style={{
                  background: '#F7FAF8',
                  padding: '1.75rem 1.5rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Large watermark number */}
                  <span style={{
                    position: 'absolute', top: '-0.25rem', right: '0.75rem',
                    fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                    fontWeight: 900, color: '#27744E', opacity: 0.08,
                    lineHeight: 1, letterSpacing: '-0.04em',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    userSelect: 'none', pointerEvents: 'none',
                  }}>{h.num}</span>
                  {/* Green accent line */}
                  <div style={{ width: 24, height: 2, background: '#27744E', marginBottom: '1rem', opacity: 0.5 }} />
                  <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.65, fontWeight: 500 }}>
                    {h.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="reveal">
              <button
                onClick={() => document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: '#0B1B13', color: '#fff',
                  fontWeight: 700, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
                  padding: '14px 28px', border: 'none', cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#27744E' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#0B1B13' }}>
                Domluvit konzultaci →
              </button>
            </div>
          </div>

          {/* Right — photo + stats */}
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Photo */}
            <div style={{ position: 'relative', flex: 1, minHeight: 400, overflow: 'hidden' }}>
              <Image
                src="/about-image.png"
                alt="Vladimír Fořt – finanční specialista"
                fill
                style={{ objectFit: 'cover', objectPosition: 'top center' }}
                sizes="380px"
                priority
              />
            </div>

            {/* Stats strip */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              background: '#0B1B13',
            }}>
              {[
                { value: '14+', label: 'Let praxe' },
                { value: '100+', label: 'Klientů' },
                { value: '100%', label: 'Bezplatně' },
              ].map((s, i) => (
                <div key={i} style={{
                  padding: '1.25rem 0.75rem',
                  textAlign: 'center',
                  borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 6 }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(76,175,121,0.55)' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
