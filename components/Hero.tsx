'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { PRODUCTS } from '@/lib/constants'
import { copyToClipboard } from '@/lib/utils'
import useReveal from './useReveal'

const TYPEWRITER_LINES = PRODUCTS.map(p => `${p.name} — ${p.tagline}`)

export default function Hero() {
  const [typedText, setTypedText] = useState('')
  const [copied, setCopied]       = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef  = useRef({ x: 0, y: 0 })
  useReveal()

  /* ── Particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number

    const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const N = 55
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      vx: (Math.random() - .5) * .28,
      vy: (Math.random() - .5) * .28,
      r: Math.random() * 2 + .5,
    }))

    const sigs: { a: number; b: number; t: number; spd: number }[] = []
    const sigInt = setInterval(() => {
      const a = Math.floor(Math.random() * N)
      let b: number
      do { b = Math.floor(Math.random() * N) } while (b === a)
      sigs.push({ a, b, t: 0, spd: .007 + Math.random() * .005 })
    }, 700)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { x: mx, y: my } = mouseRef.current
      pts.forEach(p => {
        const dx = p.x - mx, dy = p.y - my, d = Math.sqrt(dx * dx + dy * dy)
        if (d < 120 && d > 0) { const f = (.5 - d / 240); p.vx += dx / d * f * .4; p.vy += dy / d * f * .4 }
        p.vx *= .992; p.vy *= .992
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      })
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy)
        if (d < 155) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y)
          ctx.strokeStyle = `rgba(124,58,237,${(1 - d / 155) * .1})`; ctx.lineWidth = .7; ctx.stroke()
        }
      }
      pts.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(124,58,237,.35)'; ctx.fill() })
      for (let i = sigs.length - 1; i >= 0; i--) {
        const s = sigs[i]; s.t += s.spd
        if (s.t > 1) { sigs.splice(i, 1); continue }
        const a = pts[s.a], b = pts[s.b]
        const px = a.x + (b.x - a.x) * s.t, py = a.y + (b.y - a.y) * s.t, al = Math.sin(s.t * Math.PI)
        ctx.beginPath(); ctx.arc(px, py, 3.5, 0, Math.PI * 2); ctx.fillStyle = `rgba(167,139,250,${al * .9})`; ctx.fill()
        ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2); ctx.fillStyle = `rgba(124,58,237,${al * .18})`; ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { window.removeEventListener('resize', resize); clearInterval(sigInt); cancelAnimationFrame(raf) }
  }, [])

  /* ── Mouse tracking for particles ── */
  useEffect(() => {
    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  /* ── Typewriter ── */
  useEffect(() => {
    let li = 0, ci = 0, del = false, timer: ReturnType<typeof setTimeout>
    const tick = () => {
      const line = TYPEWRITER_LINES[li]
      if (!del) {
        ci++; setTypedText(line.slice(0, ci))
        if (ci === line.length) { del = true; timer = setTimeout(tick, 2200); return }
        timer = setTimeout(tick, 38 + Math.random() * 18)
      } else {
        ci--; setTypedText(line.slice(0, ci))
        if (ci === 0) { del = false; li = (li + 1) % TYPEWRITER_LINES.length; timer = setTimeout(tick, 400); return }
        timer = setTimeout(tick, 16)
      }
    }
    timer = setTimeout(tick, 800)
    return () => clearTimeout(timer)
  }, [])

  const handleCopy = async () => {
    await copyToClipboard('axon struct run --ai .')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const scrollToProduct = (idx: number) => {
    const sec = document.getElementById('products')
    if (!sec) return
    sec.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTimeout(() => {
      const cards = document.querySelectorAll<HTMLElement>('.p-card')
      const sc    = document.getElementById('pscroll')
      if (cards[idx] && sc) sc.scrollTo({ left: cards[idx].offsetLeft - 32, behavior: 'smooth' })
      if (cards[idx]) {
        cards[idx].style.borderColor = 'rgba(124,58,237,.8)'
        setTimeout(() => { cards[idx].style.borderColor = '' }, 1800)
      }
    }, 650)
  }

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      padding: '140px 28px 80px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Mesh gradient */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse 80% 50% at 50% -10%, rgba(124,58,237,.18) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 80% 60%, rgba(59,130,246,.10) 0%, transparent 50%),
          radial-gradient(ellipse 40% 50% at 20% 70%, rgba(16,185,129,.07) 0%, transparent 50%)`,
        animation: 'meshFloat 18s ease-in-out infinite alternate',
      }} />
      <style>{`@keyframes meshFloat{0%{opacity:1}100%{opacity:.8}}`}</style>

      {/* Orbit rings */}
      {[600, 900, 1200].map((size, i) => (
        <div key={size} style={{
          position: 'absolute', top: '50%', left: '50%',
          width: size, height: size, borderRadius: '50%',
          border: '1px solid rgba(124,58,237,.06)',
          transform: 'translate(-50%,-50%)',
          animation: `spin${i} ${[40,70,100][i]}s linear infinite ${i === 1 ? 'reverse' : ''}`,
        }} />
      ))}
      <style>{`
        @keyframes spin0{to{transform:translate(-50%,-50%) rotate(360deg)}}
        @keyframes spin1{to{transform:translate(-50%,-50%) rotate(360deg)}}
        @keyframes spin2{to{transform:translate(-50%,-50%) rotate(360deg)}}
      `}</style>

      {/* Particle canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 900 }}>
        {/* Live badge */}
        <div className="rv" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(16,185,129,.08)', border: '1px solid rgba(16,185,129,.2)',
          borderRadius: 100, padding: '6px 16px',
          fontFamily: 'var(--font-mono)', fontSize: 12, color: '#34d399',
          letterSpacing: '.04em', marginBottom: 36,
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981', display: 'inline-block', animation: 'livePulse 1.8s ease-in-out infinite' }} />
          v3.0 live — Thompson Sampling AI engine
        </div>
        <style>{`@keyframes livePulse{0%,100%{box-shadow:0 0 4px #10b981}50%{box-shadow:0 0 14px #10b981,0 0 24px rgba(16,185,129,.4)}}`}</style>

        {/* Headline */}
        <h1 className="rv" style={{
          fontSize: 'clamp(52px,8.5vw,116px)', fontWeight: 800,
          lineHeight: .95, letterSpacing: '-0.045em', marginBottom: 28,
        }}>
          Intelligence<br />
          <span className="gtext">wired into</span><br />
          <span style={{ color: 'var(--t3)', fontWeight: 600 }}>every tool.</span>
        </h1>

        <p className="rv rv-d1" style={{
          fontSize: 'clamp(16px,1.8vw,20px)', color: 'var(--t2)',
          fontWeight: 300, maxWidth: 600, margin: '0 auto 20px', lineHeight: 1.75,
        }}>
          Axon is the AI-first developer platform — five tools that scan, organize, protect, and evolve alongside every project you build.
        </p>

        {/* Typewriter */}
        <div className="rv rv-d2" style={{
          height: 28, overflow: 'hidden', margin: '0 auto 44px',
          fontSize: 16, fontFamily: 'var(--font-mono)', color: 'var(--v3)',
        }}>
          {typedText}
          <span style={{ display: 'inline-block', width: 2, height: 18, background: 'var(--v3)', verticalAlign: 'middle', marginLeft: 2, animation: 'blink 1s step-end infinite' }} />
          <style>{`@keyframes blink{50%{opacity:0}}`}</style>
        </div>

        {/* CTAs */}
        <div className="rv rv-d2" style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 56 }}>
          <Link href="/download" className="btn btn-primary btn-xl">⬇ Download Free</Link>
          <Link href="/#products" className="btn btn-outline btn-xl">Explore products →</Link>
        </div>

        {/* CLI pill */}
        <div className="rv rv-d3" style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          background: 'rgba(15,15,26,.8)', border: '1px solid rgba(124,58,237,.2)',
          borderRadius: 100, padding: '10px 12px 10px 22px',
          fontFamily: 'var(--font-mono)', fontSize: 13,
          backdropFilter: 'blur(12px)', maxWidth: 'min(92vw,560px)',
        }}>
          <span style={{ color: 'var(--t3)', flexShrink: 0 }}>$</span>
          <span style={{ color: 'var(--t1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            axon struct run --ai /path/to/your/project
          </span>
          <button onClick={handleCopy} style={{
            flexShrink: 0, background: 'var(--raised)', border: '1px solid var(--br3)',
            borderRadius: 100, padding: '5px 14px', fontSize: 11,
            fontWeight: 700, color: copied ? '#34d399' : 'var(--t2)',
            fontFamily: 'var(--font-display)', transition: 'all 0.2s',
          }}>
            {copied ? '✓ Copied!' : 'Copy'}
          </button>
        </div>

        {/* Product dots */}
        <div className="rv rv-d4" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10, marginTop: 24 }}>
          {PRODUCTS.map((p, i) => (
            <button key={p.id} onClick={() => scrollToProduct(i)} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(10,10,20,.7)', border: '1px solid var(--br3)',
              borderRadius: 'var(--r2)', padding: '8px 16px',
              fontSize: 13, fontWeight: 500, color: 'var(--t2)',
              backdropFilter: 'blur(8px)', transition: 'all 0.25s',
            }}
            onMouseEnter={e => { (e.currentTarget).style.borderColor = 'var(--br2)'; (e.currentTarget).style.color = 'var(--t1)'; (e.currentTarget).style.transform = 'translateY(-3px)' }}
            onMouseLeave={e => { (e.currentTarget).style.borderColor = ''; (e.currentTarget).style.color = 'var(--t2)'; (e.currentTarget).style.transform = '' }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, boxShadow: `0 0 8px ${p.color}`, flexShrink: 0 }} />
              {p.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
