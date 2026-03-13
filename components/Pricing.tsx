'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PRICING } from '@/lib/constants'

export default function Pricing({ standalone }: { standalone?: boolean }) {
  const [annual, setAnnual] = useState(false)

  return (
    <section className="sec" id="pricing" style={standalone ? { paddingTop: 60 } : {}}>
      <div className="wrap">
        <div className="rv" style={{ textAlign: 'center' }}>
          <div className="sec-eyebrow">// pricing</div>
          <h2 className="sec-title">Start free.<br /><span className="gtext">Grow with Axon.</span></h2>
          <p className="sec-sub" style={{ margin: '0 auto' }}>All core intelligence is free forever.</p>
        </div>

        {/* Toggle */}
        <div className="rv" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 64, marginBottom: 52 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: annual ? 'var(--t2)' : 'var(--t1)' }}>Monthly</span>
          <div
            onClick={() => setAnnual(a => !a)}
            style={{
              width: 52, height: 28, background: annual ? 'var(--v1)' : 'var(--raised)',
              border: annual ? '1px solid var(--v1)' : '1px solid var(--br3)',
              borderRadius: 14, cursor: 'none', position: 'relative', transition: 'background .2s',
            }}
          >
            <div style={{
              position: 'absolute', top: 4, left: 4,
              width: 18, height: 18, borderRadius: '50%', background: '#fff',
              transition: 'transform .25s cubic-bezier(.34,1.56,.64,1)',
              transform: annual ? 'translateX(24px)' : 'none',
            }} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 500, color: annual ? 'var(--t1)' : 'var(--t2)' }}>Annual</span>
          <span style={{
            background: 'rgba(16,185,129,.1)', border: '1px solid rgba(16,185,129,.2)',
            color: '#34d399', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
            padding: '3px 10px', borderRadius: 100,
          }}>Save 30%</span>
        </div>

        {/* Cards */}
        <div className="rv rv-d1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {PRICING.map((tier, i) => {
            const price = annual ? tier.annualPrice : tier.monthlyPrice
            const perLabel = tier.monthlyPrice === 0 ? '/forever' : annual ? '/mo · billed annually' : '/month'
            return (
              <div key={tier.id} style={{
                background: tier.featured
                  ? 'linear-gradient(160deg,rgba(124,58,237,.18) 0%,var(--surf) 60%)'
                  : 'var(--surf)',
                border: `1px solid ${tier.featured ? 'rgba(124,58,237,.4)' : 'var(--br3)'}`,
                borderRadius: 'var(--r4)', padding: '44px 36px',
                position: 'relative', transition: 'all .35s',
                transform: tier.featured ? 'scale(1.02)' : 'none',
                boxShadow: tier.featured ? '0 0 80px rgba(124,58,237,.15)' : 'none',
              }}
              onMouseEnter={e => { if (!tier.featured) { (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)' } }}
              onMouseLeave={e => { if (!tier.featured) { (e.currentTarget as HTMLElement).style.transform = '' } }}
              >
                {tier.featured && (
                  <div style={{
                    position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--grad)', color: '#fff',
                    fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
                    padding: '5px 18px', borderRadius: 100, textTransform: 'uppercase',
                    letterSpacing: '.06em', whiteSpace: 'nowrap',
                  }}>Most Popular</div>
                )}

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 22 }}>
                  {tier.name}
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 10 }}>
                  <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--t2)', marginBottom: 10 }}>$</span>
                  <span style={{
                    fontSize: 72, fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1,
                    ...(tier.featured ? {
                      background: 'var(--grad-text)', WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    } : {}),
                    transition: 'all .3s',
                  }}>{price}</span>
                  <span style={{ fontSize: 15, color: 'var(--t2)', marginBottom: 10, fontWeight: 300 }}>{perLabel}</span>
                </div>

                <p style={{ fontSize: 14, color: 'var(--t2)', marginBottom: 32, lineHeight: 1.65, fontWeight: 300 }}>{tier.description}</p>

                <ul style={{ marginBottom: 36 }}>
                  {tier.features.map((f, j) => (
                    <li key={j} style={{
                      display: 'flex', gap: 10, alignItems: 'flex-start',
                      padding: '9px 0', fontSize: 14, color: 'var(--t2)',
                      borderBottom: j < tier.features.length - 1 ? '1px solid var(--br3)' : 'none',
                      fontWeight: 300,
                    }}>
                      <span style={{ color: f.included ? 'var(--em)' : 'var(--t4)', flexShrink: 0, fontWeight: 700 }}>
                        {f.included ? '✓' : '–'}
                      </span>
                      {f.label}
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.ctaHref}
                  className={`btn btn-md ${tier.featured ? 'btn-primary' : tier.id === 'team' ? 'btn-outline' : 'btn-ghost'}`}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {tier.cta}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
