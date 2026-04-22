'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'

export default function HeroPortal() {
  const outerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const portalImageRef = useRef<HTMLDivElement>(null)
  const imageOverlayRef = useRef<HTMLDivElement>(null)
  const textGroupRef = useRef<HTMLDivElement>(null)
  const chevronRef = useRef<HTMLSpanElement>(null)

  const [breathing, setBreathing] = useState(true)

  // Remove bouncing chevron animation after first scroll
  useEffect(() => {
    const onScroll = () => {
      setBreathing(false)
      window.removeEventListener('scroll', onScroll)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // GSAP scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const outer = outerRef.current
      const scene = sceneRef.current
      const portalImage = portalImageRef.current
      const imageOverlay = imageOverlayRef.current
      const textGroup = textGroupRef.current

      if (!outer || !scene || !portalImage || !imageOverlay || !textGroup) return

      // --- Initial Load Animation (Not scroll-linked) ---
      // "appear beautifully on that blurred image"
      gsap.fromTo(
        textGroup,
        { opacity: 0, scale: 1.1, filter: 'blur(8px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out', delay: 0.2 }
      )

      // --- Master timeline for the entire portal sequence ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outer,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      })

      // Step 1: "at first scroll make it move down where it is now"
      // Moves the text group down and shrinks it
      tl.to(
        textGroup,
        {
          y: '38vh', // Move down near the bottom
          scale: 0.7, // Shrink slightly to a refined size
          duration: 0.15,
          ease: 'power2.out',
        },
        0
      )

      // We scale the entire scene slightly to simulate walking closer (0 to 40%)
      tl.to(scene, { scale: 1.5, ease: 'power1.inOut', duration: 0.4 }, 0)

      // Fade out the text overlay *after* it has moved down (e.g. 15% to 30%)
      tl.to(textGroup, { opacity: 0, duration: 0.15 }, 0.15)

      // Step 2 & 3: "going deeper... start seeing the shop interior clearer" (20% to 70%)
      // Fade out the frosted glass effect
      tl.to(imageOverlay, { opacity: 0, ease: 'power2.inOut', duration: 0.5 }, 0.2)

      // Step 4: "start seeing only the window... in the end you see the full image" (40% to 100%)
      // Expand the window (clip-path) to swallow the wall and fill the entire screen
      tl.to(
        portalImage,
        {
          clipPath: 'inset(0vh 0vw)',
          duration: 0.6,
          ease: 'power2.inOut',
        },
        0.4
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={outerRef}
      className="relative w-full h-[400vh]"
      aria-label="Hero portal section"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-[#F5F0EB]"
      >
        {/* Scene Container: This scales to simulate walking closer */}
        <div
          ref={sceneRef}
          className="relative w-full h-full will-change-transform"
        >
          {/* 1. The Exterior Wall (Background Texture) */}
          <div
            className="absolute inset-0 bg-[url(/images/hero/hero-bg-texture.png)] bg-cover bg-center pointer-events-none"
            aria-hidden="true"
          />

          {/* 2. The Window into the Shop */}
          <div
            ref={portalImageRef}
            className="absolute inset-0 z-[10] will-change-transform [clip-path:inset(25vh_20vw)]"
            // The initial "window" size. 25vh top/bottom, 20vw left/right
          >
            {/* The Shop Interior Image */}
            <Image
              src="/images/hero/shop-interior-v2.png"
              alt="DRIFT high-end shop interior"
              fill
              loading="eager"
              sizes="100vw"
              className="object-contain"
            />
            
            {/* The "Glass Feeling" Overlay (Frosted/reflective, fades out) */}
            <div
              ref={imageOverlayRef}
              className="absolute inset-0 bg-white/20 backdrop-blur-md z-[11] will-change-opacity"
            />
            
            {/* Optional: A subtle window frame border that expands with the clip-path */}
            <div className="absolute inset-0 border-[3px] border-white/40 z-[12] pointer-events-none" />
          </div>

          {/* Flanking labels on the "wall" (outside the window) */}
          <span
            className="hidden md:block absolute top-1/2 left-[5vw] -translate-y-1/2 -rotate-90 font-[family-name:var(--font-body)] italic text-[11px] text-[#9A9189] tracking-[0.15em] whitespace-nowrap z-[5]"
          >
            New Season
          </span>
          <span
            className="hidden md:block absolute top-1/2 right-[5vw] -translate-y-1/2 rotate-90 font-[family-name:var(--font-body)] italic text-[11px] text-[#9A9189] tracking-[0.15em] whitespace-nowrap z-[5]"
          >
            SS 2025
          </span>
        </div>

        {/* Hero text group - Initially centered and refined, moved down via GSAP */}
        <div
          ref={textGroupRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-[30] will-change-transform w-full px-4"
        >
          <p className="font-[family-name:var(--font-body)] text-[clamp(1rem,2vw,1.5rem)] tracking-[0.4em] text-[#1A1A18] uppercase m-0 opacity-80">
            SS 2025
          </p>

          <h1 className="font-[family-name:var(--font-display)] italic text-[clamp(4rem,10vw,8rem)] text-[#1A1A18] mt-2 mb-0 leading-[1.1] tracking-tight">
            Wear the Moment.
          </h1>

          <p className="font-[family-name:var(--font-body)] text-[18px] text-[#C4622D] mt-8 cursor-default">
            Enter the Boutique{' '}
            <span
              ref={chevronRef}
              className={`inline-block ${breathing ? 'animate-[chevronBounce_1.5s_ease-in-out_infinite]' : ''}`}
            >
              ↓
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
