'use client'

import { useEffect } from 'react'

export default function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    if (!bar) return

    const onScroll = () => {
      const h = document.documentElement
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100
      bar.style.width = pct + '%'
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div id="scroll-progress" />
}
