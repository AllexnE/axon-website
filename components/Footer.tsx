'use client'

import Link from 'next/link'
import { SITE } from '@/lib/constants'

const FOOTER_LINKS = {
  Platform: [
    { label: 'Axon Struct', href: '/#products' },
    { label: 'Axon Scout', href: '/#products' },
    { label: 'Axon Flow', href: '/#products' },
    { label: 'Axon Guard', href: '/#products' },
    { label: 'Axon Lens', href: '/#products' },
  ],
  Developers: [
    { label: 'Quick Start', href: '/docs' },
    { label: 'Blueprint DSL', href: '/docs' },
    { label: 'Java API', href: '/docs' },
    { label: 'ML Bridge', href: '/docs' },
    { label: 'GitHub Actions', href: '/docs' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Changelog', href: '#' },
    { label: 'GitHub ↗', href: SITE.github },
    { label: 'Contact', href: `mailto:${SITE.email}` },
    { label: 'Privacy', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--surf)', borderTop: '1px solid var(--br3)', padding: '80px 36px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr 1fr 1fr', gap: 48, marginBottom: 60 }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>⬡</span>
              <span style={{
                fontWeight: 800, fontSize: 20, letterSpacing: '-0.06em',
                background: 'var(--grad-text)', WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>AXON</span>
            </Link>
            <p style={{ fontSize: 14, color: 'var(--t3)', marginTop: 18, maxWidth: 260, lineHeight: 1.75, fontWeight: 300 }}>
              Intelligence wired into every developer tool. Built on Java 21 + JavaFX. Powered by Thompson Sampling, TF-IDF, and online ML — 100% offline.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([col, links]) => (
            <div key={col}>
              <h5 style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 18, fontWeight: 600 }}>{col}</h5>
              <ul style={{ listStyle: 'none' }}>
                {links.map(l => (
                  <li key={l.label} style={{ marginBottom: 12 }}>
                    <Link href={l.href} style={{ fontSize: 14, color: 'var(--t2)', fontWeight: 300, transition: 'color .2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--v3)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--t2)')}
                    >{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 28, borderTop: '1px solid var(--br3)', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--t3)' }}>
          <div>© 2026 Axon Platform. Intelligence wired into every tool.</div>
          <div style={{ display: 'flex', gap: 24 }}>
            {[['GitHub ↗', SITE.github], ['MIT License', '#'], ['Privacy', '#']].map(([label, href]) => (
              <a key={label} href={href} style={{ color: 'var(--t3)', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--v3)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--t3)')}
              >{label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
