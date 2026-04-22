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
      className="scroll-progress"
    />
  )
}
