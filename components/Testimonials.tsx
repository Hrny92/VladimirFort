'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import reviewsData from '@/data/reviews.json'

type Review = {
  name: string
  rating: number
  text: string
  date: string
}

function cleanText(text: string): string {
  return text.split('\n').map(l => l.trim()).filter(Boolean).join(' ').trim()
}

export default function Testimonials() {
  const ref                     = useRef<HTMLElement>(null)
  const [active, setActive]     = useState(0)
  const [visible, setVisible]   = useState(false)
  const [animDir, setAnimDir]   = useState<'left' | 'right'>('right')
  const [animating, setAnimating] = useState(false)
  const reviews: Review[]       = reviewsData.reviews

  // Reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) setVisible(true)
      }),
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const goTo = useCallback((index: number, dir: 'left' | 'right') => {
    if (animating) return
    setAnimDir(dir)
    setAnimating(true)
    setTimeout(() => {
      setActive(index)
      setAnimating(false)
    }, 320)
  }, [animating])

  const prev = () => goTo(active === 0 ? reviews.length - 1 : active - 1, 'left')
  const next = () => goTo(active === reviews.length - 1 ? 0 : active + 1, 'right')

  // Auto-advance every 6s
  useEffect(() => {
    if (!visible) return
    const t = setInterval(() => goTo(active === reviews.length - 1 ? 0 : active + 1, 'right'), 6000)
    return () => clearInterval(t)
  }, [visible, active, goTo, reviews.length])

  if (!reviews || reviews.length === 0) return null

  const review   = reviews[active]
  const initials = review.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase()

  const slideStyle: React.CSSProperties = {
    opacity:   animating ? 0 : 1,
    transform: animating
      ? `translateX(${animDir === 'right' ? '24px' : '-24px'})`
      : 'translateX(0)',
    transition: 'opacity 0.32s ease, transform 0.32s ease',
  }

  return (
    <section id="reference" ref={ref} style={{ background: '#EEF3EF', padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>

      <div className="max-w-6xl mx-auto px-6 lg:px-16" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{
          marginBottom: '3.5rem',
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(12px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem' }}>
            <span style={{ width: 24, height: 1, background: '#4CAF79', display: 'block' }} />
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#4CAF79' }}>
              Reference
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ color: '#0B1B13' }}>
              Co říkají<br />
              <span style={{ color: '#27744E' }}>klienti.</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
              <div style={{ display: 'flex', gap: 3 }}>
                {[1,2,3,4,5].map(i => <span key={i} style={{ color: '#27744E', fontSize: 18 }}>★</span>)}
              </div>
              <p style={{ fontSize: 12, color: 'rgba(11,27,19,0.4)', textAlign: 'right' }}>
                Ověřené hodnocení na{' '}
                <a href="https://www.bidli.cz/pruvodce/vladimir-fort/609" target="_blank" rel="noopener noreferrer"
                  style={{ color: '#27744E', textDecoration: 'none' }}>Bidli.cz</a>
              </p>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div style={{
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)',
          transition: 'opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s',
        }}>
          {/* Card */}
          <div style={{
            padding: 'clamp(0rem, 2vw, 1rem) 0',
            position: 'relative', overflow: 'hidden',
            minHeight: 280,
          }}>
            {/* Quote watermark */}
            <span style={{
              position: 'absolute', top: '-1rem', right: 0,
              fontSize: 160, fontWeight: 900, color: '#27744E', opacity: 0.05,
              lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
              fontFamily: 'Georgia, serif',
            }}>"</span>

            <div style={slideStyle}>
              {/* Stars */}
              <div style={{ display: 'flex', gap: 4, marginBottom: '1.5rem' }}>
                {[1,2,3,4,5].map(i => (
                  <span key={i} style={{ color: '#27744E', fontSize: 16 }}>★</span>
                ))}
              </div>

              {/* Text */}
              <p style={{
                fontSize: 'clamp(15px, 1.8vw, 18px)',
                lineHeight: 1.85,
                color: '#334155',
                fontStyle: 'italic',
                marginBottom: '2.5rem',
                maxWidth: 780,
              }}>
                „{cleanText(review.text)}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                  background: 'rgba(39,116,78,0.12)',
                  border: '1px solid rgba(39,116,78,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#27744E' }}>{initials}</span>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0B1B13' }}>{review.name}</div>
                  {review.date && (
                    <div style={{ fontSize: 10, color: 'rgba(11,27,19,0.35)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 2 }}>
                      {review.date}
                    </div>
                  )}
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <img src="/Bidli-logo-wh.svg" alt="Bidli" style={{ height: 14, opacity: 0, display: 'none' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.75rem' }}>

            {/* Dots */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > active ? 'right' : 'left')}
                  style={{
                    width: i === active ? 24 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: i === active ? '#27744E' : 'rgba(11,27,19,0.15)',
                    border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'width 0.3s ease, background 0.3s ease',
                  }}
                  aria-label={`Reference ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows + counter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 11, color: 'rgba(11,27,19,0.3)', letterSpacing: '0.1em' }}>
                {String(active + 1).padStart(2, '0')} / {String(reviews.length).padStart(2, '0')}
              </span>
              <button onClick={prev} aria-label="Předchozí"
                style={{
                  width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'none', border: '1px solid rgba(11,27,19,0.12)',
                  color: 'rgba(11,27,19,0.35)', cursor: 'pointer', fontSize: 16,
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { const b = e.currentTarget; b.style.borderColor = '#27744E'; b.style.color = '#27744E' }}
                onMouseLeave={e => { const b = e.currentTarget; b.style.borderColor = 'rgba(11,27,19,0.12)'; b.style.color = 'rgba(11,27,19,0.35)' }}>
                ←
              </button>
              <button onClick={next} aria-label="Další"
                style={{
                  width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'none', border: '1px solid rgba(11,27,19,0.12)',
                  color: 'rgba(11,27,19,0.35)', cursor: 'pointer', fontSize: 16,
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { const b = e.currentTarget; b.style.borderColor = '#27744E'; b.style.color = '#27744E' }}
                onMouseLeave={e => { const b = e.currentTarget; b.style.borderColor = 'rgba(11,27,19,0.12)'; b.style.color = 'rgba(11,27,19,0.35)' }}>
                →
              </button>
            </div>
          </div>

          {/* Link */}
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <a href="https://www.bidli.cz/pruvodce/vladimir-fort/609" target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em',
                color: 'rgba(11,27,19,0.3)', textDecoration: 'none',
                border: '1px solid rgba(11,27,19,0.1)', padding: '10px 24px',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.color = '#27744E'; a.style.borderColor = 'rgba(39,116,78,0.4)' }}
              onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.color = 'rgba(11,27,19,0.3)'; a.style.borderColor = 'rgba(11,27,19,0.1)' }}>
              Všechny recenze na Bidli.cz →
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
