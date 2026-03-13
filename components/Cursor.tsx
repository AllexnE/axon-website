'use client'

import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const dot  = document.getElementById('cursor')
    const ring = document.getElementById('cursor-ring')
    if (!dot || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      dot.style.left = mx + 'px'
      dot.style.top  = my + 'px'
    }

    let rafId: number
    const animRing = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'
      rafId = requestAnimationFrame(animRing)
    }

    document.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(animRing)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div id="cursor" />
      <div id="cursor-ring" />
    </>
  )
}
