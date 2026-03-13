'use client'

import { useEffect, useRef } from 'react'
import { PRODUCTS, type Product } from '@/lib/constants'

const STATUS_STYLES = {
  live: { bg: 'rgba(16,185,129,.1)', color: '#34d399', border: 'rgba(16,185,129,.2)', label: '● Live' },
  beta: { bg: 'rgba(245,158,11,.1)', color: '#fbbf24', border: 'rgba(245,158,11,.2)', label: '◐ Beta' },
  soon: { bg: 'rgba(255,255,255,.04)', color: 'var(--t3)', border: 'var(--br3)', label: '○ Soon' },
}

export default function Products() {
  const scrollRef = useRef<HTMLDivElement>(null)

  /* Drag-to-scroll */
  useEffect(() => {
    const el = scrollRef.current; if (!el) return
    let down = false, sx = 0, sl = 0
    const md = (e: MouseEvent) => { down = true; sx = e.pageX - el.offsetLeft; sl = el.scrollLeft }
    const ml = () => { down = false }
    const mu = () => { down = false }
    const mm = (e: MouseEvent) => { if (!down) return; e.preventDefault(); el.scrollLeft = sl - (e.pageX - el.offsetLeft - sx) * 1.4 }
    el.addEventListener('mousedown', md)
    el.addEventListener('mouseleave', ml)
    el.addEventListener('mouseup', mu)
    el.addEventListener('mousemove', mm)
    return () => { el.removeEventListener('mousedown', md); el.removeEventListener('mouseleave', ml); el.removeEventListener('mouseup', mu); el.removeEventListener('mousemove', mm) }
  }, [])

  return (
    <section className="sec" id="products">
      <div className="wrap">
        <div className="rv">
          <div className="sec-eyebrow">// platform</div>
          <h2 className="sec-title">One platform.<br /><span className="gtext">Five tools that think.</span></h2>
          <p className="sec-sub">Every Axon tool shares one neural engine — they learn together, improve together, and compose seamlessly.</p>
        </div>
      </div>

      <div style={{ overflow: 'hidden', margin: '0 -36px', padding: '0 36px 32px' }}>
        <div id="pscroll" ref={scrollRef} style={{
          display: 'flex', gap: 16, overflowX: 'auto',
          scrollSnapType: 'x mandatory', scrollbarWidth: 'none',
          paddingBottom: 8, cursor: 'grab', marginTop: 64,
        }}>
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductCard({ product: p, featured }: { product: Product; featured: boolean }) {
  const s = STATUS_STYLES[p.status]
  const ref = useRef<HTMLDivElement>(null)

  /* 3D tilt */
  useEffect(() => {
    const el = ref.current; if (!el) return
    const mm = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width - .5) * 12
      const y = ((e.clientY - r.top) / r.height - .5) * -12
      el.style.transform = `translateY(-6px) perspective(700px) rotateX(${y}deg) rotateY(${x}deg)`
    }
    const ml = () => { el.style.transition = 'transform .4s'; el.style.transform = ''; setTimeout(() => el.style.transition = '', 400) }
    el.addEventListener('mousemove', mm)
    el.addEventListener('mouseleave', ml)
    return () => { el.removeEventListener('mousemove', mm); el.removeEventListener('mouseleave', ml) }
  }, [])

  return (
    <div ref={ref} className={`p-card rv`} style={{
      flex: `0 0 ${featured ? 460 : 380}px`,
      minHeight: 520, background: 'var(--surf)',
      border: `1px solid ${featured ? 'rgba(124,58,237,.3)' : 'var(--br3)'}`,
      borderRadius: 'var(--r4)', padding: '36px 32px',
      scrollSnapAlign: 'start', position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      ...(featured ? {
        background: 'linear-gradient(160deg,rgba(124,58,237,.1) 0%,var(--surf) 50%)',
        boxShadow: '0 0 60px rgba(124,58,237,.12)',
      } : {}),
      transition: 'border-color .3s',
    }}>
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 48, height: 48, background: 'var(--raised)',
            border: '1px solid var(--br3)', borderRadius: 'var(--r3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
          }}>{p.icon}</div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 4 }}>{p.name}</div>
            <div className="badge" style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>{s.label}</div>
          </div>
        </div>
        {p.eta && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--t3)' }}>{p.eta}</span>}
      </div>

      <h3 style={{ fontSize: featured ? 30 : 24, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 14, lineHeight: 1.15 }}>
        {p.tagline}
      </h3>
      <p style={{ fontSize: 14, color: 'var(--t2)', lineHeight: 1.75, fontWeight: 300, flex: 1 }}>
        {p.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 24 }}>
        {p.tags.map(t => (
          <span key={t} style={{
            background: 'var(--raised)', border: '1px solid var(--br3)',
            borderRadius: 100, padding: '3px 12px',
            fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--t3)',
          }}>{t}</span>
        ))}
      </div>

      {/* Featured terminal */}
      {featured && <FeaturedTerminal />}
    </div>
  )
}

function FeaturedTerminal() {
  return (
    <div style={{ background: 'var(--base)', border: '1px solid var(--br3)', borderRadius: 'var(--r3)', overflow: 'hidden', marginTop: 28 }}>
      <div style={{ background: 'var(--raised)', padding: '10px 16px', borderBottom: '1px solid var(--br3)', display: 'flex', alignItems: 'center', gap: 6 }}>
        {['#ff5f56','#ffbd2e','#27c93f'].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--t3)', marginLeft: 8 }}>axon struct — ~/spring-backend</span>
      </div>
      <div style={{ padding: '16px 20px', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2 }}>
        <div><span style={{ color: '#a78bfa' }}>$</span> <span style={{ color: 'var(--t1)' }}>axon struct run --ai .</span></div>
        <div style={{ color: 'var(--t3)' }}>◆ Scanning 347 files in 11ms...</div>
        <div><span style={{ color: '#34d399' }}>✓</span> <span style={{ color: 'var(--t1)' }}>Detected: Spring Boot (maven)</span></div>
        <div><span style={{ color: '#34d399' }}>✓</span> <span style={{ color: 'var(--t1)' }}>Clustered → 8 semantic groups</span></div>
        <div style={{ color: 'var(--t3)' }}>◆ Plan: 42 operations</div>
        <div>&nbsp;&nbsp;<span style={{ color: '#34d399' }}>MOVE</span> <span style={{ color: 'var(--t1)' }}>UserService.java</span> <span style={{ color: '#fbbf24' }}>[0.94]</span></div>
        <div><span style={{ color: '#a78bfa' }}>?</span> <span style={{ color: 'var(--t1)' }}>Approve all 42? </span><span style={{ color: '#34d399' }}>y</span></div>
        <div><span style={{ color: '#34d399' }}>✓</span> <span style={{ color: 'var(--t1)' }}>Done in 280ms · SHA-256 verified</span></div>
        <div><span style={{ color: '#a78bfa' }}>$</span> <span style={{ display: 'inline-block', width: 7, height: 13, background: '#a78bfa', verticalAlign: 'text-bottom', animation: 'blink 1s step-end infinite' }} /></div>
      </div>
    </div>
  )
}
