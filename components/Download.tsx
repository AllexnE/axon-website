'use client'

import { useState } from 'react'
import { PLATFORMS, type Platform } from '@/lib/constants'
import { copyToClipboard } from '@/lib/utils'
import Modal from './Modal'

export default function Download({ standalone }: { standalone?: boolean }) {
  const [selected, setSelected] = useState<Platform | null>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await copyToClipboard('axon struct run --ai /path/to/your/project')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <section className="sec" id="download" style={standalone ? { paddingTop: 60 } : {}}>
        <div className="wrap">
          <div className="rv" style={{ textAlign: 'center' }}>
            <div className="sec-eyebrow">// download</div>
            <h2 className="sec-title">Native. Instant.<br /><span className="gtext">No JRE required.</span></h2>
            <p className="sec-sub" style={{ margin: '0 auto' }}>jpackage-built installers. Works offline. Starts in under a second.</p>
          </div>

          <div className="rv rv-d1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 64 }}>
            {PLATFORMS.map(p => (
              <div key={p.id}
                onClick={() => setSelected(p)}
                style={{
                  background: 'var(--surf)', border: '1px solid var(--br3)',
                  borderRadius: 'var(--r4)', padding: '44px 36px',
                  textAlign: 'center', cursor: 'none', transition: 'all .35s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'var(--br2)'
                  el.style.transform = 'translateY(-8px)'
                  el.style.boxShadow = '0 24px 80px rgba(0,0,0,.4), 0 0 40px rgba(124,58,237,.1)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = ''
                  el.style.transform = ''
                  el.style.boxShadow = ''
                }}
              >
                <div style={{ fontSize: 60, lineHeight: 1, marginBottom: 20 }}>{p.icon}</div>
                <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>{p.name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--t3)', marginBottom: 28 }}>{p.spec}</div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'var(--raised)', border: '1px solid var(--br3)',
                  borderRadius: 'var(--r2)', padding: '11px 24px',
                  fontSize: 13, fontWeight: 600, color: 'var(--t2)',
                  transition: 'all .25s',
                }}>
                  ⬇ Download {p.ext}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--t3)', marginTop: 12 }}>
                  v3.0.0 · ~{p.sizeMb} MB
                </div>
              </div>
            ))}
          </div>

          {/* CLI install row */}
          <div className="rv" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'var(--surf)', border: '1px solid var(--br3)',
            borderRadius: 'var(--r3)', padding: '18px 28px', marginTop: 14, gap: 16,
          }}>
            <div style={{ display: 'flex', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 14, overflow: 'hidden' }}>
              <span style={{ color: 'var(--t3)', flexShrink: 0 }}>$</span>
              <span style={{ color: '#c084fc', flexShrink: 0 }}>axon</span>
              <span style={{ color: 'var(--t1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                struct run --ai /path/to/your/project
              </span>
            </div>
            <button onClick={handleCopy} style={{
              background: 'var(--raised)', border: '1px solid var(--br3)',
              borderRadius: 'var(--r1)', padding: '7px 16px', flexShrink: 0,
              fontFamily: 'var(--font-mono)', fontSize: 12,
              color: copied ? '#34d399' : 'var(--t2)', transition: 'all .2s',
            }}>
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>

          <div className="rv" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'var(--surf)', border: '1px solid var(--br3)',
            borderRadius: 'var(--r3)', padding: '14px 28px', marginTop: 8, opacity: .6,
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--t3)' }}>
              Requires Java 21 to build from source · Optional: Python 3.10+ for ML bridge
            </span>
            <a href="#docs" style={{
              background: 'var(--raised)', border: '1px solid var(--br3)',
              borderRadius: 'var(--r1)', padding: '7px 16px',
              fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--t2)',
              textDecoration: 'none', flexShrink: 0,
            }}>Build guide →</a>
          </div>
        </div>
      </section>

      {/* Download modal */}
      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <DownloadModal platform={selected} onClose={() => setSelected(null)} />
        </Modal>
      )}
    </>
  )
}

function DownloadModal({ platform: p, onClose }: { platform: Platform; onClose: () => void }) {
  const [progress, setProgress] = useState<number | null>(null)
  const [done, setDone] = useState(false)

  const startDownload = () => {
    let pct = 0
    setProgress(0)
    const iv = setInterval(() => {
      pct = Math.min(pct + Math.floor(Math.random() * 11) + 3, 100)
      setProgress(pct)
      if (pct >= 100) { clearInterval(iv); setDone(true) }
    }, 110)
  }

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontSize: 52, lineHeight: 1, marginBottom: 14 }}>{p.icon}</div>
        <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 6 }}>Download for {p.name}</h3>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--t3)' }}>
          Axon v3.0.0 · ~{p.sizeMb} MB · Free forever · MIT License
        </div>
      </div>

      <ol style={{ color: 'var(--t2)', fontSize: 14, lineHeight: 2.1, paddingLeft: 20, marginBottom: 24, fontWeight: 300 }}>
        <li>Click <strong style={{ color: 'var(--t1)' }}>Download {p.ext}</strong> below</li>
        {p.installSteps.map((step, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: step }} />
        ))}
      </ol>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button
          onClick={done ? undefined : progress !== null ? undefined : startDownload}
          style={{
            width: '100%', justifyContent: 'center', padding: '14px',
            borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: 'none',
            border: 'none', transition: 'all .2s',
            ...(done ? {
              background: 'rgba(16,185,129,.08)', color: '#34d399',
              border: '1px solid rgba(16,185,129,.25)',
            } : progress !== null ? {
              background: 'var(--raised)', color: 'var(--t2)',
            } : {
              background: 'var(--grad)', color: '#fff',
              boxShadow: '0 4px 24px rgba(124,58,237,.4)',
            }),
          }}
        >
          {done
            ? '✓ Download started — check your browser bar'
            : progress !== null
            ? `Preparing… ${progress}%`
            : `⬇ Download Axon 3.0.0${p.ext}`}
        </button>

        <button onClick={onClose} className="btn btn-ghost btn-md" style={{ width: '100%', justifyContent: 'center' }}>
          Cancel
        </button>
      </div>

      <p style={{ textAlign: 'center', marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--t3)' }}>
        No account required · No telemetry · Works fully offline
      </p>
    </div>
  )
}
