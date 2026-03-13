'use client'

import { TESTIMONIALS } from '@/lib/constants'

export default function Testimonials() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="rv" style={{ textAlign: 'center' }}>
          <div className="sec-eyebrow">// developers</div>
          <h2 className="sec-title">What the beta<br /><span className="gtext">testers said.</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 64 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="rv" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div style={{
                background: 'var(--surf)', border: '1px solid var(--br3)',
                borderRadius: 'var(--r4)', padding: '36px 30px',
                position: 'relative', overflow: 'hidden',
                transition: 'all .35s',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--br2)'; el.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = ''; el.style.transform = '' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(124,58,237,.5),transparent)', opacity: 0, transition: 'opacity .3s' }} />
                <div style={{ color: 'var(--gold)', fontSize: 13, letterSpacing: 2, marginBottom: 18 }}>
                  {'★'.repeat(t.stars)}
                </div>
                <p style={{ fontSize: 14, color: 'var(--t2)', lineHeight: 1.85, marginBottom: 24, fontStyle: 'italic', fontWeight: 300 }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: t.gradient, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0,
                  }}>{t.initials}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--t3)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
