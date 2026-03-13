'use client'

import { MARQUEE_TAGS } from '@/lib/constants'

export default function Marquee() {
  const tags = [...MARQUEE_TAGS, ...MARQUEE_TAGS]
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid var(--br3)', borderBottom: '1px solid var(--br3)', background: 'var(--deep)', padding: '16px 0' }}>
      <div className="marquee-track">
        {tags.map((t, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '0 40px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--t3)',
            whiteSpace: 'nowrap', borderRight: '1px solid var(--br3)',
          }}>
            {t} <span style={{ color: 'var(--v3)' }}>✦</span>
          </div>
        ))}
      </div>
    </div>
  )
}
