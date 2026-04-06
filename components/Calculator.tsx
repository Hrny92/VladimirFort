'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'

function formatCZK(n: number) {
  return new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)
}

function SliderWithInput({ label, value, min, max, step, format, decimals = 0, onChange }: {
  label: string; value: number; min: number; max: number; step: number
  format: (v: number) => string; decimals?: number; onChange: (v: number) => void
}) {
  const [draft, setDraft] = useState<string | null>(null)
  const parse = (s: string) => parseFloat(s.replace(/\s/g, '').replace(',', '.'))

  const handleFocus = () =>
    setDraft(decimals > 0 ? value.toFixed(decimals).replace('.', ',') : String(Math.round(value)))

  const handleBlur = () => {
    const v = parse(draft ?? '')
    if (!isNaN(v)) {
      const snapped = Math.round(Math.min(max, Math.max(min, v)) / step) * step
      onChange(parseFloat(snapped.toFixed(decimals)))
    }
    setDraft(null)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs uppercase tracking-[0.14em] font-semibold" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</span>
        <input
          type="text" inputMode="decimal"
          value={draft !== null ? draft : format(value)}
          onFocus={handleFocus}
          onChange={e => { setDraft(e.target.value); const v = parse(e.target.value); if (!isNaN(v)) onChange(Math.min(max, Math.max(min, v))) }}
          onBlur={handleBlur}
          className="text-right bg-transparent font-black text-sm px-1 py-0.5 outline-none cursor-pointer focus:cursor-text"
          style={{ color: '#fff', borderBottom: '1px solid transparent', minWidth: 140 }}
          onFocusCapture={e => (e.currentTarget.style.borderBottomColor = '#4CAF79')}
          onBlurCapture={e => (e.currentTarget.style.borderBottomColor = 'transparent')}
        />
      </div>
      {/* Custom range bar */}
      <div className="relative h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div className="absolute top-0 left-0 h-full rounded-full"
          style={{ width: `${((value - min) / (max - min)) * 100}%`, background: '#27744E' }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => { setDraft(null); onChange(Number(e.target.value)) }}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-4 -top-1.5"
          style={{ height: '28px', top: '-12px' }}
        />
      </div>
    </div>
  )
}

export default function Calculator() {
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

  const [propertyValue, setPropertyValue] = useState(5_000_000)
  const [loanAmount, setLoanAmount]       = useState(4_000_000)
  const [interestRate, setInterestRate]   = useState(5.5)
  const [loanYears, setLoanYears]         = useState(30)
  const [fixation, setFixation]           = useState(5)

  const { monthly, totalPaid, totalInterest, ltv } = useMemo(() => {
    const r = interestRate / 100 / 12
    const n = loanYears * 12
    const monthly = r === 0 ? loanAmount / n : (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    return { monthly, totalPaid: monthly * n, totalInterest: monthly * n - loanAmount, ltv: (loanAmount / propertyValue) * 100 }
  }, [propertyValue, loanAmount, interestRate, loanYears])

  const ltvColor = ltv <= 70 ? '#4CAF79' : ltv <= 80 ? '#f59e0b' : '#ef4444'

  return (
    <section id="kalkulacka" ref={ref} className="relative overflow-hidden" style={{ background: '#EEF3EF', paddingTop: '7rem', paddingBottom: '7rem' }}>

      {/* Watermark */}
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
          paddingRight: '2%',
        }}>03</span>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-16 relative z-10">

        {/* Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '4rem' }} className="reveal">
          <span style={{ width: 24, height: 1, background: '#27744E', display: 'block' }} />
          <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#27744E' }}>
            Kalkulačka
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
          <h2 className="reveal" style={{ color: '#0B1B13' }}>
            Orientační výpočet<br />
            <span style={{ color: '#27744E' }}>hypotéky.</span>
          </h2>
          <p className="reveal" style={{ fontSize: 13, color: 'rgba(11,27,19,0.4)', maxWidth: 260, lineHeight: 1.7, textAlign: 'right' }}>
            Výsledky jsou orientační. Pro přesnou nabídku ze všech bank mě kontaktujte zdarma.
          </p>
        </div>

        <div style={{ display: 'grid', gap: '1.5rem' }} className="lg:grid-cols-2">

          {/* Left panel — inputs */}
          <div style={{ background: '#0B1B13', padding: '2rem' }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(76,175,121,0.6)', marginBottom: '1.5rem' }}>
              Parametry hypotéky
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <SliderWithInput label="Hodnota nemovitosti" value={propertyValue} min={500_000} max={20_000_000} step={100_000}
                format={formatCZK} decimals={0}
                onChange={v => { setPropertyValue(v); if (loanAmount > v * 0.9) setLoanAmount(Math.round(v * 0.8)) }} />
              <SliderWithInput label="Výše hypotéky" value={loanAmount} min={200_000} max={propertyValue} step={50_000}
                format={formatCZK} decimals={0} onChange={setLoanAmount} />
              <SliderWithInput label="Úroková sazba" value={interestRate} min={1} max={12} step={0.01}
                format={v => `${v.toFixed(2).replace('.', ',')} % p.a.`} decimals={2} onChange={setInterestRate} />
              <SliderWithInput label="Doba splácení" value={loanYears} min={5} max={30} step={1}
                format={v => `${v} let`} decimals={0} onChange={setLoanYears} />

              {/* Fixation pills */}
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem' }}>
                  Délka fixace
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {[1, 2, 3, 5, 7, 10].map(y => (
                    <button key={y} onClick={() => setFixation(y)}
                      style={{
                        padding: '6px 12px',
                        fontSize: 12,
                        fontWeight: 700,
                        background: fixation === y ? '#27744E' : 'rgba(255,255,255,0.04)',
                        color: fixation === y ? '#fff' : 'rgba(255,255,255,0.3)',
                        border: `1px solid ${fixation === y ? '#27744E' : 'rgba(255,255,255,0.06)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}>
                      {y}{y === 1 ? ' rok' : y <= 4 ? ' roky' : ' let'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right panel — results */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Monthly payment */}
            <div style={{ background: '#0B1B13', padding: '2rem' }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(76,175,121,0.6)', marginBottom: '0.5rem' }}>
                Měsíční splátka
              </p>
              <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '1.5rem' }}>
                {formatCZK(monthly)}
              </div>

              {/* LTV */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: 'rgba(255,255,255,0.3)' }}>LTV ratio</span>
                <span style={{ fontWeight: 900, color: ltvColor }}>{ltv.toFixed(1)}%</span>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, marginBottom: 8 }}>
                <div style={{ height: '100%', borderRadius: 2, width: `${Math.min(ltv, 100)}%`, background: ltvColor, transition: 'width 0.5s ease' }} />
              </div>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
                {ltv <= 70 ? 'Výborné LTV — nejlepší sazby' : ltv <= 80 ? 'Standardní podmínky' : 'Vysoké LTV — omezené možnosti'}
              </p>
            </div>

            {/* Stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { label: 'Celkem zaplatíte', value: formatCZK(totalPaid) },
                { label: 'Celkové úroky', value: formatCZK(totalInterest) },
                { label: 'Jistina', value: formatCZK(loanAmount) },
                { label: 'Fixace', value: `${fixation} ${fixation === 1 ? 'rok' : fixation <= 4 ? 'roky' : 'let'}` },
              ].map((item, i) => (
                <div key={i} style={{ padding: '1rem', background: '#fff', border: '1px solid rgba(11,27,19,0.08)' }}>
                  <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: '#0B1B13' }}>{item.value}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em',
                background: '#0B1B13', color: '#fff',
                border: 'none', cursor: 'pointer',
                padding: '1rem',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#27744E' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#0B1B13' }}>
              Chci přesnou nabídku zdarma <ArrowRight style={{ width: 14, height: 14 }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
