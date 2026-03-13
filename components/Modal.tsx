'use client'

import { useEffect } from 'react'

interface ModalProps {
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="modal-overlay"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="modal-box">
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 20,
            background: 'none', border: 'none', color: 'var(--t3)',
            fontSize: 22, lineHeight: 1, transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--t1)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--t3)')}
        >✕</button>
        {children}
      </div>
    </div>
  )
}
