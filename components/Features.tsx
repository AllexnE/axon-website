'use client'

import { useEffect, useRef, useState } from 'react'

export default function Features() {
  return (
    <section className="sec" id="features">
      <div className="wrap">
        <div className="rv">
          <div className="sec-eyebrow">// capabilities</div>
          <h2 className="sec-title">Not just smarter.<br /><span className="gtext">Built different.</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 12, marginTop: 64 }}>
          <BentoCard span={8} accent glow>
            <div style={{ fontSize: 32, marginBottom: 18 }}>🧠</div>
            <h4 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 12 }}>Thompson Sampling Confidence</h4>
            <p style={{ fontSize: 14, color: 'var(--t2)', lineHeight: 1.75, fontWeight: 300, marginBottom: 22 }}>
              Every AI decision carries a Beta(α,β) distribution. Each approval tightens α; each rejection tightens β. Calibrated to ≤15% std-dev at n≥10.
            </p>
            <ConfidenceBars />
          </BentoCard>

          <BentoCard span={4}>
            <div style={{ fontSize: 32, marginBottom: 18 }}>📘</div>
            <h4 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>Blueprint DSL</h4>
            <p style={{ fontSize: 14, color: 'var(--t2)', lineHeight: 1.75, fontWeight: 300 }}>Plain text. Commit it. Every developer runs one command.</p>
            <pre className="code-block" style={{ marginTop: 18, fontSize: 12 }}>
              <span className="ck">RULE</span> <span className="cs">*Test.java</span> → <span className="cn">test/</span>{'\n'}
              <span className="ck">RULE</span> <span className="cs">*.yml</span>      → <span className="cn">config/</span>{'\n'}
              <span className="ck">RULE</span> <span className="cs">*.bak</span>      → <span className="ck">DELETE</span>
            </pre>
          </BentoCard>

          <BentoCard span={4}>
            <div style={{ fontSize: 32, marginBottom: 18 }}>↩</div>
            <h4 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>Atomic Rollback</h4>
            <p style={{ fontSize: 14, color: 'var(--t2)', lineHeight: 1.75, fontWeight: 300 }}>SHA-256 verified journal. Every move reversed in exact order.</p>
            <div style={{ marginTop: 18 }}>
              {[
                { color: '#10b981', text: 'MOVE UserService.java', sub: 'sha256: a3f8c… · 280ms' },
                { color: '#10b981', text: 'MOVE application.yml', sub: 'sha256: 9c2e1… · 281ms' },
                { color: '#f59e0b', text: '↩ ROLLBACK available', sub: 'journal-1741699200.jsonl' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, padding: '10px 0', borderBottom: i < 2 ? '1px solid var(--br3)' : 'none', alignItems: 'flex-start' }}>
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: item.color, marginTop: 5, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--t2)' }}>{item.text}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--t3)', marginTop: 2 }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          <BentoCard span={4} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{
              fontSize: 80, fontWeight: 900, letterSpacing: '-0.06em', lineHeight: 1,
              background: 'var(--grad-text)', WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: 12,
            }}>0</div>
            <h4 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Files Ever<br />Auto-Deleted</h4>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(244,63,94,.08)', border: '1px solid rgba(244,63,94,.2)',
              borderRadius: 'var(--r2)', padding: '10px 16px',
              fontFamily: 'var(--font-mono)', fontSize: 12, color: '#fb7185',
            }}>⚠ DELETE always needs human approval</div>
          </BentoCard>

          <BentoCard span={4}>
            <div style={{ fontSize: 32, marginBottom: 18 }}>🔎</div>
            <h4 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>Auto-Detection</h4>
            <p style={{ fontSize: 14, color: 'var(--t2)', lineHeight: 1.75, fontWeight: 300 }}>
              13 templates: Maven · Spring · Node · Python · Flutter · Go · Rust · Android · C# · Data Science · Monorepo · Web · Generic.
            </p>
          </BentoCard>

          <BentoCard span={4}>
            <div style={{ fontSize: 32, marginBottom: 18 }}>♻</div>
            <h4 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>Duplicate Finder</h4>
            <p style={{ fontSize: 14, color: 'var(--t2)', lineHeight: 1.75, fontWeight: 300 }}>
              xxHash64 fast-pass + SHA-256 confirmation. Find 400MB of wasted space in milliseconds. Zero false positives.
            </p>
          </BentoCard>
        </div>
      </div>
    </section>
  )
}

/* ── Confidence bars with animation ── */
function ConfidenceBars() {
  const [animated, setAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setAnimated(true); obs.disconnect() }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const bars = [
    { label: 'UserService.java → service/', pct: 94 },
    { label: 'application.yml → config/', pct: 98 },
    { label: 'UserServiceTest → test/java/', pct: 97 },
  ]

  return (
    <div ref={ref}>
      {bars.map((b, i) => (
        <div key={i} style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--t3)', marginBottom: 6 }}>
            <span>{b.label}</span>
            <span style={{ color: 'var(--v3)', fontWeight: 700 }}>{animated ? b.pct : 0}%</span>
          </div>
          <div style={{ height: 5, background: 'var(--raised)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 3, background: 'var(--grad)',
              width: animated ? b.pct + '%' : '0%',
              transition: `width 1.4s ${i * 0.16}s cubic-bezier(.4,0,.2,1)`,
            }} />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Reusable bento card ── */
function BentoCard({ span, children, accent, glow, style }: {
  span: number
  children: React.ReactNode
  accent?: boolean
  glow?: boolean
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const mm = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width - .5) * 12
      const y = ((e.clientY - r.top) / r.height - .5) * -12
      el.style.transform = `translateY(-3px) perspective(700px) rotateX(${y}deg) rotateY(${x}deg)`
    }
    const ml = () => { el.style.transition = 'transform .4s'; el.style.transform = ''; setTimeout(() => el.style.transition = '', 400) }
    el.addEventListener('mousemove', mm)
    el.addEventListener('mouseleave', ml)
    return () => { el.removeEventListener('mousemove', mm); el.removeEventListener('mouseleave', ml) }
  }, [])

  return (
    <div ref={ref} className="rv" style={{
      gridColumn: `span ${span}`,
      background: accent ? 'linear-gradient(140deg,rgba(124,58,237,.15),rgba(59,130,246,.08))' : 'var(--surf)',
      border: `1px solid ${accent ? 'rgba(124,58,237,.25)' : 'var(--br3)'}`,
      borderRadius: 'var(--r4)', padding: '36px 32px',
      position: 'relative', overflow: 'hidden',
      transition: 'border-color .3s',
      ...(glow ? {
        '--before': `content:"";position:absolute;top:0;left:0;right:0;height:1px;
          background:linear-gradient(90deg,transparent,rgba(124,58,237,.8),transparent)`,
      } : {}),
      ...style,
    }}
    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--br2)'}
    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = ''}
    >
      {glow && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(124,58,237,.8),transparent)' }} />}
      {children}
    </div>
  )
}
