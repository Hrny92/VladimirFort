'use client'

import { useEffect, useRef, useState } from 'react'
import { Home, Building2, Shield, Heart, Briefcase } from 'lucide-react'

const services = [
  {
    num: '01',
    icon: Home,
    title: 'Hypotéky',
    desc: 'Srovnám pro vás nabídky z více než 20 bank. Hypotéka na bydlení, refinancování, investiční hypotéka — vše vyřídím od A do Z.',
    tag: 'Financování',
    featured: true,
  },
  {
    num: '02',
    icon: Building2,
    title: 'Družstevní financování',
    desc: 'Alternativní forma financování bydlení přes bytová družstva. Ideální tam, kde klasická hypotéka nestačí nebo není vhodná.',
    tag: 'Financování',
    featured: false,
  },
  {
    num: '03',
    icon: Shield,
    title: 'Pojištění majetku a odpovědnosti',
    desc: 'Pojistím váš dům, byt, domácnost i osobní odpovědnost. Nastavím optimální krytí přesně na míru vaší situace.',
    tag: 'Pojištění',
    featured: false,
  },
  {
    num: '04',
    icon: Heart,
    title: 'Životní pojištění',
    desc: 'Životní pojištění přesně na míru vašim potřebám. Zajistím vás i vaši rodinu pro případ nečekaných událostí.',
    tag: 'Pojištění',
    featured: false,
  },
  {
    num: '05',
    icon: Briefcase,
    title: 'Pojištění podnikatelů',
    desc: 'Komplexní pojistný servis pro OSVČ a firmy — pojištění majetku, odpovědnosti, přerušení provozu a více.',
    tag: 'Pojištění',
    featured: false,
  },
]

function BentoCard({ s }: { s: typeof services[0] }) {
  const [hovered, setHovered] = useState(false)
  const Icon = s.icon

  return (
    <div
      className="reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' })}
      style={{
        position: 'relative',
        padding: '2rem',
        background: hovered ? 'rgba(76,175,121,0.04)' : '#0B1B13',
        cursor: 'pointer',
        transition: 'background 0.3s',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        height: '100%',
        minHeight: 220,
      }}>

      {/* Top row: icon left, tag right */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{
          width: 44, height: 44,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: `1px solid ${hovered ? 'rgba(76,175,121,0.45)' : 'rgba(255,255,255,0.1)'}`,
          background: hovered ? 'rgba(76,175,121,0.08)' : 'rgba(255,255,255,0.02)',
          transition: 'all 0.3s',
          flexShrink: 0,
        }}>
          <Icon style={{
            width: 18, height: 18,
            color: hovered ? '#4CAF79' : 'rgba(255,255,255,0.45)',
            transition: 'color 0.3s',
          }} />
        </div>
        <span style={{
          fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
          color: hovered ? '#4CAF79' : 'rgba(255,255,255,0.2)',
          border: `1px solid ${hovered ? 'rgba(76,175,121,0.3)' : 'rgba(255,255,255,0.07)'}`,
          padding: '4px 10px',
          transition: 'all 0.3s',
          flexShrink: 0,
        }}>{s.tag}</span>
      </div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: 16,
          fontWeight: 700,
          color: hovered ? '#fff' : 'rgba(255,255,255,0.88)',
          marginBottom: '0.5rem',
          lineHeight: 1.3,
          transition: 'color 0.3s',
        }}>{s.title}</div>
        <div style={{
          fontSize: 13,
          lineHeight: 1.65,
          color: hovered ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.36)',
          transition: 'color 0.3s',
        }}>{s.desc}</div>
      </div>

      {/* Arrow */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        color: hovered ? '#4CAF79' : 'rgba(255,255,255,0.15)',
        transition: 'color 0.3s',
        fontSize: 12,
      }}>
        <span style={{
          fontSize: 15,
          display: 'inline-block',
          transform: hovered ? 'translateX(4px)' : 'none',
          transition: 'transform 0.3s',
        }}>→</span>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Zjistit více
        </span>
      </div>
    </div>
  )
}

export default function Services() {
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
    <section id="sluzby" ref={ref} style={{ background: '#0B1B13', padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>


<div className="max-w-6xl mx-auto px-6 lg:px-16" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3.5rem' }}>
          <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 24, height: 1, background: '#4CAF79', display: 'block' }} />
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#4CAF79' }}>
              Služby
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 className="reveal" style={{ color: '#fff' }}>
              Vše pod jednou<br />
              <span style={{ color: '#4CAF79' }}>střechou.</span>
            </h2>
            <p className="reveal" style={{ fontSize: 13, color: 'rgba(255,255,255,0.32)', maxWidth: 260, lineHeight: 1.7, textAlign: 'right' }}>
              Komplexní poradenství od jednoho specialisty. Jeden hovor stačí.
            </p>
          </div>
        </div>

        {/* Bento grid
            Row 1: [01 featured — col span 2] [02]
            Row 2: [03] [04] [05]
        */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          background: 'rgba(255,255,255,0.07)',
          marginBottom: '2.5rem',
        }}>
          {/* 01 — featured, spans 2 columns */}
          <div style={{ gridColumn: 'span 2' }}>
            <BentoCard s={services[0]} />
          </div>

          {/* 02 */}
          <BentoCard s={services[1]} />

          {/* 03, 04, 05 */}
          {services.slice(2).map((s, i) => (
            <BentoCard key={i} s={s} />
          ))}
        </div>

        {/* CTA */}
        <div className="reveal" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.32)' }}>
            Nejste si jistí, která služba je pro vás?
          </p>
          <button
            onClick={() => document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'none', border: '1px solid rgba(76,175,121,0.3)',
              color: '#4CAF79', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              padding: '10px 20px', cursor: 'pointer',
              transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'rgba(76,175,121,0.6)'; b.style.background = 'rgba(76,175,121,0.08)' }}
            onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'rgba(76,175,121,0.3)'; b.style.background = 'none' }}>
            Konzultace zdarma →
          </button>
        </div>
      </div>
    </section>
  )
}
