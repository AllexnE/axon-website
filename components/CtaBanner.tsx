'use client'

import Link from 'next/link'
import { SITE } from '@/lib/constants'

export default function CtaBanner() {
  return (
    <div style={{ padding: '130px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="wrap" style={{ width: '100%' }}>
        <div className="rv" style={{
          background: 'var(--surf)', border: '1px solid rgba(124,58,237,.25)',
          borderRadius: 'var(--r5)', padding: '96px 72px', textAlign: 'center',
          position: 'relative', overflow: 'hidden', maxWidth: 920, margin: '0 auto',
        }}>
          {/* Top line */}
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(124,58,237,.7),rgba(59,130,246,.7),transparent)' }} />
          {/* Orb */}
          <div style={{ position: 'absolute', top: -140, left: '50%', transform: 'translateX(-50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,58,237,.2),transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

          <h2 className="sec-title" style={{ position: 'relative', zIndex: 1 }}>
            Your codebase.<br /><span className="gtext">Finally, perfectly organized.</span>
          </h2>
          <p style={{ fontSize: 18, color: 'var(--t2)', marginBottom: 48, fontWeight: 300, position: 'relative', zIndex: 1 }}>
            Free forever. Works 100% offline. No account. Rollback guaranteed.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <Link href="/download" className="btn btn-primary btn-xl">⬇ Download Axon Free</Link>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-xl">★ Star on GitHub</a>
          </div>
          <p style={{ marginTop: 28, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--t3)', position: 'relative', zIndex: 1 }}>
            Axon Struct · Axon Scout · Axon Flow · Axon Guard · Axon Lens
          </p>
        </div>
      </div>
    </div>
  )
}
