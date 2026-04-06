'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
} from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface TransitionCtx {
  navigate: (href: string) => void
}

const Context = createContext<TransitionCtx>({ navigate: () => {} })

export const usePageTransition = () => useContext(Context)

type Phase = 'idle' | 'slide-in' | 'covered' | 'slide-out'

export default function TransitionProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase]   = useState<Phase>('idle')
  const [slideX, setSlideX] = useState('100%')
  const router              = useRouter()
  const pathname            = usePathname()
  const prevPathRef         = useRef(pathname)
  const timers              = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = [] }

  const navigate = useCallback((href: string) => {
    if (href === window.location.pathname) return
    if (phase !== 'idle') return

    clearTimers()
    setSlideX('100%')
    setPhase('slide-in')

    requestAnimationFrame(() => {
      requestAnimationFrame(() => { setSlideX('0%') })
    })

    timers.current.push(
      setTimeout(() => {
        setPhase('covered')
        router.push(href)
      }, 340),
    )
  }, [phase, router])

  useEffect(() => {
    if (pathname === prevPathRef.current) return
    prevPathRef.current = pathname

    if (phase === 'covered' || phase === 'slide-in') {
      clearTimers()
      timers.current.push(
        setTimeout(() => {
          setPhase('slide-out')
          setSlideX('-105%')
          timers.current.push(
            setTimeout(() => setPhase('idle'), 480),
          )
        }, 60),
      )
    }
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => clearTimers(), [])

  const isSliding = phase === 'slide-in'
  const isLeaving = phase === 'slide-out'

  return (
    <Context.Provider value={{ navigate }}>
      {children}
      {phase !== 'idle' && (
        <div
          aria-hidden="true"
          style={{
            position:    'fixed',
            inset:       0,
            zIndex:      9998,
            transform:   `translateX(${slideX})`,
            transition:  isSliding
              ? 'transform 0.32s cubic-bezier(0.76,0,0.24,1)'
              : isLeaving
                ? 'transform 0.44s cubic-bezier(0.76,0,0.24,1)'
                : 'none',
            willChange:   'transform',
            pointerEvents: phase === 'covered' || isSliding ? 'all' : 'none',
            background:   '#091510',
            boxShadow:    '-8px 0 40px rgba(0,0,0,0.5)',
            overflow:     'hidden',
          }}
        >
          <div style={{
            position: 'absolute', borderRadius: '50%',
            width: '70%', height: '80%', top: '-20%', right: '-10%',
            background: 'radial-gradient(ellipse, rgba(14,80,40,0.8) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }} />
          <div style={{
            position: 'absolute',
            left: 0, top: 0, bottom: 0, width: 1,
            background: 'linear-gradient(180deg, transparent 0%, rgba(76,175,121,0.4) 30%, rgba(76,175,121,0.6) 50%, rgba(76,175,121,0.4) 70%, transparent 100%)',
            opacity: isLeaving ? 0 : 1,
            transition: 'opacity 0.1s',
          }} />
        </div>
      )}
    </Context.Provider>
  )
}
