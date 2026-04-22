'use client'

import { useEffect, useRef } from 'react'

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const update = () => {
      const scrollY = window.scrollY
      const totalHeight = document.body.scrollHeight - window.innerHeight
      const progress = totalHeight > 0 ? scrollY / totalHeight : 0
      if (bar) {
        bar.style.width = `${progress * 100}%`
      }
      rafRef.current = requestAnimationFrame(update)
    }

    rafRef.current = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '2px',
        width: '0%',
        background: '#C4622D',
        zIndex: 9999,
        transform: 'translateZ(0)',
        willChange: 'width',
        pointerEvents: 'none',
      }}
    />
  )
}
