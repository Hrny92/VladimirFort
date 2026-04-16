'use client'

import { useRef, useEffect } from 'react'

export default function Booking() {
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
    <section id="rezervace" ref={ref} style={{ background: '#0B1B13', padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>

      {/* Watermark */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0,
        display: 'flex', alignItems: 'center',
        pointerEvents: 'none', userSelect: 'none', overflow: 'hidden',
        opacity: 0.03,
      }}>
        <span style={{
          fontSize: 'clamp(200px, 26vw, 400px)',
          fontWeight: 900, color: '#4CAF79',
          letterSpacing: '-0.06em', lineHeight: 1,
          fontFamily: 'Inter, system-ui, sans-serif',
          paddingRight: '2%',
        }}>04</span>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-16" style={{ position: 'relative', zIndex: 1 }}>

        {/* Label */}
        <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem' }}>
          <span style={{ width: 24, height: 1, background: '#4CAF79', display: 'block' }} />
          <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#4CAF79' }}>
            Rezervace
          </span>
        </div>

        {/* Heading */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
          <h2 className="reveal" style={{ color: '#fff' }}>
            Rezervujte si<br />
            <span style={{ color: '#4CAF79' }}>konzultaci.</span>
          </h2>
          <p className="reveal text-left md:text-right" style={{ fontSize: 13, color: 'rgba(255,255,255,0.32)', maxWidth: 260, lineHeight: 1.7 }}>
            Vyberte si termín, který vám vyhovuje. Konzultace je zcela zdarma.
          </p>
        </div>

        {/* Iframe wrapper */}
        <div className="reveal" style={{
          border: '1px solid rgba(76,175,121,0.12)',
          background: '#fff',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Top accent line */}
          <div style={{
            height: 2,
            background: 'linear-gradient(90deg, #27744E, #4CAF79, transparent)',
          }} />
          <iframe
            src="https://outlook.office.com/book/rezervacepokus@bidli.cz/?ismsaljsauthenabled"
            width="100%"
            height="700"
            scrolling="yes"
            style={{ border: 0, display: 'block' }}
            title="Rezervace konzultace – Vladimír Fořt"
          />
        </div>

        {/* Footnote */}
        <p className="reveal" style={{ marginTop: '1rem', fontSize: 11, color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>
          Rezervační systém Microsoft Bookings · Obdržíte potvrzení e-mailem
        </p>

      </div>
    </section>
  )
}
