'use client'

import { useEffect, useRef, useState } from 'react'
import { STATS } from '@/lib/constants'
import { animateNumber } from '@/lib/utils'

export default function Stats() {
  return (
    <section className="sec" style={{ padding: '80px 0' }}>
      <div className="wrap">
        <div className="rv" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          border: '1px solid var(--br3)', borderRadius: 'var(--r4)',
          overflow: 'hidden', background: 'var(--surf)',
        }}>
          {STATS.map((s, i) => <StatItem key={i} {...s} last={i === STATS.length - 1} />)}
        </div>
      </div>
    </section>
  )
}

function StatItem({ value, suffix, label, last }: typeof STATS[0] & { last: boolean }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true
        animateNumber(value, setDisplay)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [value])

  return (
    <div ref={ref} style={{
      padding: '44px 28px', textAlign: 'center',
      borderRight: last ? 'none' : '1px solid var(--br3)',
      transition: 'background 0.3s', position: 'relative', overflow: 'hidden',
    }}
    onMouseEnter={e => { (e.currentTarget).style.background = 'var(--raised)' }}
    onMouseLeave={e => { (e.currentTarget).style.background = '' }}
    >
      <div style={{
        fontSize: 52, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1,
        background: 'var(--grad-text)', WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: 8,
      }}>
        {display}{suffix}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 500 }}>
        {label}
      </div>
    </div>
  )
}
