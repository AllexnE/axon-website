'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { NAV_LINKS, SITE } from '@/lib/constants'
import Modal from './Modal'

export default function Nav() {
  const [glassy, setGlassy]     = useState(false)
  const [loginOpen, setLogin]   = useState(false)
  const [menuOpen, setMenu]     = useState(false)

  useEffect(() => {
    const onScroll = () => setGlassy(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 400,
        padding: '0 40px',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        ...(glassy ? {
          background: 'rgba(3,3,10,0.75)',
          backdropFilter: 'blur(32px) saturate(160%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 1px 40px rgba(0,0,0,0.5)',
        } : {}),
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          height: 72, display: 'flex',
          alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <AxonHex />
            <span style={{
              fontWeight: 800, fontSize: 22,
              letterSpacing: '-0.06em',
              background: 'var(--grad-text)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>AXON</span>
          </Link>

          {/* Desktop links */}
          <ul className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 4, listStyle: 'none' }}>
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <Link href={l.href} style={{
                  padding: '7px 16px', borderRadius: 'var(--r2)',
                  fontSize: 14, fontWeight: 500, color: 'var(--t2)',
                  transition: 'color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = 'var(--t1)'; (e.target as HTMLElement).style.background = 'var(--raised)' }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = 'var(--t2)'; (e.target as HTMLElement).style.background = '' }}
                >{l.label}</Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button className="btn btn-ghost btn-sm" onClick={() => setLogin(true)}>Log in</button>
            <Link href="/download" className="btn btn-primary btn-sm">Get Axon Free →</Link>
          </div>
        </div>
      </nav>

      {/* Login modal */}
      {loginOpen && (
        <Modal onClose={() => setLogin(false)}>
          <LoginForm onClose={() => setLogin(false)} />
        </Modal>
      )}
    </>
  )
}

/* ── Login form inside modal ── */
function LoginForm({ onClose }: { onClose: () => void }) {
  const [email, setEmail]     = useState('')
  const [pass, setPass]       = useState('')
  const [done, setDone]       = useState(false)
  const [error, setError]     = useState('')
  const [view, setView]       = useState<'login' | 'signup'>('login')
  const [name, setName]       = useState('')
  const [creating, setCreating] = useState(false)
  const [created, setCreated] = useState(false)

  const doLogin = () => {
    if (!email.includes('@')) { setError('Enter a valid email'); return }
    setDone(true)
  }

  const doSignup = () => {
    setCreating(true)
    setTimeout(() => setCreated(true), 900)
  }

  if (done || created) return (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <div style={{ fontSize: 52, marginBottom: 16 }}>{created ? '🎉' : '✓'}</div>
      <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, color: '#34d399' }}>
        {created ? 'Account created!' : 'Signed in!'}
      </h3>
      <p style={{ color: 'var(--t2)', fontSize: 14, fontWeight: 300, lineHeight: 1.7 }}>
        Welcome to Axon Platform.<br />Full web app launching Q3 2026.
      </p>
      <button onClick={onClose} className="btn btn-primary btn-md"
        style={{ marginTop: 28, width: '100%', justifyContent: 'center' }}>
        Continue →
      </button>
    </div>
  )

  if (view === 'signup') return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontSize: 44, marginBottom: 12 }}>🚀</div>
        <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 6 }}>Create your account</h3>
        <p style={{ color: 'var(--t2)', fontSize: 14, fontWeight: 300 }}>Free forever. No credit card.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        <input className="input" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
        <input className="input" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Create a password" value={pass} onChange={e => setPass(e.target.value)} />
        <button className="btn btn-primary btn-lg" disabled={creating}
          style={{ width: '100%', justifyContent: 'center', marginTop: 4, borderRadius: 'var(--r2)' }}
          onClick={doSignup}>
          {creating ? 'Creating…' : 'Create free account →'}
        </button>
        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--t3)' }}>
          Have an account?{' '}
          <span onClick={() => setView('login')} style={{ color: 'var(--v3)', textDecoration: 'underline', cursor: 'none' }}>Sign in</span>
        </p>
      </div>
    </div>
  )

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontSize: 44, marginBottom: 12 }}>⬡</div>
        <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 6 }}>Welcome back</h3>
        <p style={{ color: 'var(--t2)', fontSize: 14, fontWeight: 300 }}>Sign in to your Axon account</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        {error && <p style={{ color: '#f87171', fontSize: 13, fontFamily: 'var(--font-mono)' }}>{error}</p>}
        <input className="input" type="email" placeholder="you@example.com"
          value={email} onChange={e => { setEmail(e.target.value); setError('') }} />
        <input className="input" type="password" placeholder="Password"
          value={pass} onChange={e => setPass(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && doLogin()} />
        <button className="btn btn-primary btn-lg"
          style={{ width: '100%', justifyContent: 'center', marginTop: 4, borderRadius: 'var(--r2)' }}
          onClick={doLogin}>Sign in →</button>
        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--t3)' }}>
          No account?{' '}
          <span onClick={() => setView('signup')} style={{ color: 'var(--v3)', textDecoration: 'underline', cursor: 'none' }}>Create one free</span>
        </p>
      </div>
    </div>
  )
}

/* ── Axon Hex Logo SVG ── */
function AxonHex() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hg" x1="0" y1="0" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <path d="M19 2.5 L33 10.75 L33 27.25 L19 35.5 L5 27.25 L5 10.75 Z"
        fill="url(#hg)" opacity=".12" />
      <path d="M19 2.5 L33 10.75 L33 27.25 L19 35.5 L5 27.25 L5 10.75 Z"
        stroke="url(#hg)" strokeWidth="1.5" fill="none" />
      <circle cx="19" cy="11" r="2.5" fill="url(#hg)" />
      <circle cx="27" cy="24" r="2"   fill="#6366f1" />
      <circle cx="11" cy="24" r="2"   fill="#6366f1" />
      <line x1="19" y1="11" x2="27" y2="24" stroke="url(#hg)" strokeWidth="1.2" opacity=".8" />
      <line x1="19" y1="11" x2="11" y2="24" stroke="url(#hg)" strokeWidth="1.2" opacity=".8" />
      <line x1="27" y1="24" x2="11" y2="24" stroke="#6366f1" strokeWidth="1" opacity=".5" />
    </svg>
  )
}
