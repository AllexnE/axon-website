'use client'

import { useState } from 'react'
import { DOC_SECTIONS, DOC_CONTENT } from '@/lib/docs'

// Group sections
const groups = Array.from(new Set(DOC_SECTIONS.map(s => s.group)))

export default function Docs({ standalone }: { standalone?: boolean }) {
  const [active, setActive] = useState('qs')

  const grouped = groups.map(g => ({
    label: g,
    items: DOC_SECTIONS.filter(s => s.group === g),
  }))

  return (
    <section className="sec" id="docs" style={standalone ? { paddingTop: 60 } : {}}>
      <div className="wrap">
        {!standalone && (
          <div className="rv">
            <div className="sec-eyebrow">// documentation</div>
            <h2 className="sec-title">Everything documented.<br /><span className="gtext">Nothing assumed.</span></h2>
          </div>
        )}

        <div className="rv" style={{
          display: 'grid', gridTemplateColumns: '264px 1fr',
          background: 'var(--br3)', gap: 1,
          border: '1px solid var(--br3)', borderRadius: 'var(--r4)',
          overflow: 'hidden', marginTop: standalone ? 0 : 64,
        }}>
          {/* Sidebar */}
          <div style={{ background: 'var(--surf)', padding: '28px 12px' }}>
            {grouped.map(g => (
              <div key={g.label} style={{ marginBottom: 8 }}>
                <span style={{
                  display: 'block', padding: '0 12px 8px', marginTop: 18,
                  fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--t3)',
                  textTransform: 'uppercase', letterSpacing: '.1em',
                }}>{g.label}</span>
                {g.items.map(s => (
                  <button key={s.key} onClick={() => setActive(s.key)} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    width: '100%', padding: '8px 12px', borderRadius: 'var(--r2)',
                    fontSize: 13, fontWeight: 500, textAlign: 'left',
                    color: active === s.key ? '#a78bfa' : 'var(--t2)',
                    background: active === s.key ? 'rgba(124,58,237,.12)' : 'transparent',
                    transition: 'all .15s',
                  }}
                  onMouseEnter={e => { if (active !== s.key) { (e.currentTarget).style.background = 'var(--raised)'; (e.currentTarget).style.color = 'var(--t1)' } }}
                  onMouseLeave={e => { if (active !== s.key) { (e.currentTarget).style.background = ''; (e.currentTarget).style.color = 'var(--t2)' } }}
                  >
                    <span style={{ fontSize: 12, opacity: .7 }}>{s.icon}</span>
                    {s.label}
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* Content */}
          <div
            key={active}
            style={{
              background: 'var(--base)', padding: '52px 56px',
              animation: 'docFade .22s ease both',
            }}
            dangerouslySetInnerHTML={{ __html: DOC_CONTENT[active] ?? '<h2>Coming soon</h2><p style="color:var(--t2)">This page is being written.</p>' }}
          />
        </div>
      </div>

      <style>{`
        @keyframes docFade { from { opacity: 0; transform: translateY(8px); } }
        .docs-table { width: 100%; border-collapse: collapse; font-size: 13px; margin: 20px 0; }
        .docs-table th { text-align: left; padding: 8px 16px; font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; letter-spacing: .08em; color: var(--t3); border-bottom: 1px solid var(--br3); }
        .docs-table td { padding: 11px 16px; color: var(--t2); border-bottom: 1px solid var(--br3); font-weight: 300; }
        #docs h2 { font-size: 32px; font-weight: 800; letter-spacing: -.03em; margin-bottom: 20px; }
        #docs p { color: var(--t2); font-size: 14px; line-height: 1.85; margin-bottom: 20px; font-weight: 300; }
        #docs strong { color: var(--t1); font-weight: 700; }
        #docs code { background: var(--raised); border: 1px solid var(--br3); border-radius: 4px; padding: 2px 8px; font-family: var(--font-mono); font-size: 12px; color: #c084fc; }
        #docs pre { margin: 20px 0; }
      `}</style>
    </section>
  )
}
