'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Initial color
    gsap.set(containerRef.current, { backgroundColor: '#1A1A18' })

    // Transition points:
    const sections = gsap.utils.toArray<HTMLElement>('[data-bgcolor]')
    
    sections.forEach((section) => {
      const color = section.getAttribute('data-bgcolor')
      if (!color) return

      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => gsap.to(containerRef.current, { 
          backgroundColor: color, 
          duration: 1.2, 
          ease: 'power2.inOut',
          overwrite: 'auto'
        }),
        onEnterBack: () => gsap.to(containerRef.current, { 
          backgroundColor: color, 
          duration: 1.2, 
          ease: 'power2.inOut',
          overwrite: 'auto'
        }),
      })
    })

    // Set an initial listener for the transition back to dark at the very top
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      onLeaveBack: () => gsap.to(containerRef.current, { 
        backgroundColor: '#1A1A18', 
        duration: 1.2,
        ease: 'power2.inOut',
        overwrite: 'auto'
      }),
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="will-change-colors">
      {children}
    </div>
  )
}
