'use client'

import { useState, useEffect, useRef } from 'react'

const KEY = 'fort_intro_v1'

export default function PageLoader() {
  const [show, setShow]           = useState(true)
  const [contentIn, setContentIn] = useState(false)
  const [exiting, setExiting]     = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    if (sessionStorage.getItem(KEY)) {
      setShow(false)
      return
    }

    timers.current.forEach(clearTimeout)
    timers.current = []

    setContentIn(false)
    setExiting(false)
    document.body.style.overflow = 'hidden'

    timers.current = [
      setTimeout(() => setContentIn(true), 60),
      setTimeout(() => setExiting(true), 1500),
      setTimeout(() => {
        sessionStorage.setItem(KEY, '1')
        setShow(false)
        document.body.style.overflow = ''
        window.dispatchEvent(new CustomEvent('introComplete'))
      }, 2100),
    ]

    return () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
      document.body.style.overflow = ''
    }
  }, [])

  if (!show) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#091510',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'scale(1.04)' : 'scale(1)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        pointerEvents: exiting ? 'none' : 'all',
        willChange: 'opacity, transform',
      }}
    >
      {/* Fluid orbs – green palette */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', borderRadius: '50%',
          width: '80%', height: '70%', top: '-20%', right: '-15%',
          background: 'radial-gradient(ellipse, rgba(14,80,40,0.9) 0%, rgba(8,40,20,0.6) 40%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'wave1 12s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', borderRadius: '50%',
          width: '100%', height: '80%', top: '10%', left: '-20%',
          background: 'radial-gradient(ellipse at 30% 50%, rgba(20,80,50,0.5) 0%, transparent 65%)',
          filter: 'blur(60px)',
          animation: 'wave2 16s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', borderRadius: '50%',
          width: '50%', height: '60%', bottom: '-10%', left: '5%',
          background: 'radial-gradient(ellipse, rgba(30,100,60,0.45) 0%, transparent 70%)',
          filter: 'blur(50px)',
          animation: 'wave3 10s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'repeating-linear-gradient(105deg, transparent, transparent 40px, rgba(76,175,121,0.8) 40px, rgba(76,175,121,0.8) 41px)',
        }} />
      </div>

      {/* Noise */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.035,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '180px 180px',
      }} />

      {/* Monogram / initials */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          opacity: contentIn ? 1 : 0,
          transform: contentIn ? 'translateY(0)' : 'translateY(22px)',
          transition: 'opacity 0.65s ease, transform 0.65s cubic-bezier(0.34,1.3,0.64,1)',
        }}
      >
        {/* Glow */}
        <div style={{
          position: 'absolute',
          width: 120, height: 120,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(39,116,78,0.5) 0%, transparent 70%)',
          filter: 'blur(22px)',
          pointerEvents: 'none',
        }} />

        {/* Monogram VF */}
        <div style={{
          position: 'relative',
          width: 80, height: 80,
          borderRadius: 20,
          background: 'rgba(39,116,78,0.15)',
          border: '1px solid rgba(76,175,121,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{
            fontSize: 32,
            fontWeight: 800,
            color: '#4CAF79',
            letterSpacing: '-0.05em',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}>VF</span>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}>
          <span style={{
            fontSize: 15,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.85)',
            letterSpacing: '-0.01em',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}>Vladimír Fořt</span>
          <span style={{
            fontSize: 11,
            fontWeight: 500,
            color: 'rgba(76,175,121,0.7)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}>Finanční specialista</span>
        </div>
      </div>
    </div>
  )
}
