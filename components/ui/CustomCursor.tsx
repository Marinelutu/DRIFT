'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: -100, y: -100 })
  const targetRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)
  const hoveredRef = useRef(false)

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const cursor = cursorRef.current
    if (!cursor) return

    // Show cursor (it starts hidden via CSS)
    cursor.style.opacity = '1'

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-cursor-hover]')) {
        hoveredRef.current = true
        if (cursor) {
          cursor.style.width = '40px'
          cursor.style.height = '40px'
          cursor.style.background = 'rgba(196,98,45,0.12)'
          cursor.style.borderColor = 'transparent'
        }
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-cursor-hover]')) {
        hoveredRef.current = false
        if (cursor) {
          cursor.style.width = '12px'
          cursor.style.height = '12px'
          cursor.style.background = 'transparent'
          cursor.style.borderColor = '#C4622D'
        }
      }
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.15)
      posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.15)

      if (cursor) {
        cursor.style.transform = `translate3d(${posRef.current.x - (hoveredRef.current ? 20 : 6)}px, ${posRef.current.y - (hoveredRef.current ? 20 : 6)}px, 0)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mouseout', onMouseOut, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '12px',
        height: '12px',
        border: '1.5px solid #C4622D',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'multiply',
        opacity: 0,
        background: 'transparent',
        transition: 'width 0.2s ease, height 0.2s ease, background 0.2s ease, border-color 0.2s ease',
        willChange: 'transform',
      }}
    />
  )
}
