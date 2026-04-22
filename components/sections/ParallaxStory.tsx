'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'

export default function ParallaxStory() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const modelRef = useRef<HTMLDivElement>(null)
  const jacketRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scrub animations
      gsap.fromTo(bgRef.current,
        { y: 0 },
        {
          y: -120,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true
          }
        }
      )

      gsap.fromTo(modelRef.current,
        { y: 60 },
        {
          y: -220,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true
          }
        }
      )

      gsap.fromTo(jacketRef.current,
        { y: 0, rotation: 0 },
        {
          y: -420,
          rotation: -4,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true
          }
        }
      )

      // Text block animation
      gsap.to(textRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "30% center",
          once: true
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[180vh] bg-transparent">
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden">
        
        {/* Layer 1 - BG */}
        <div 
          ref={bgRef}
          className="absolute left-[-5%] top-[-5%] z-[1] h-[110%] w-[110%] [filter:blur(3px)_brightness(0.55)]"
        >
          <Image
            src="/images/editorial/parallax-bg.webp"
            alt="City Street Evening"
            fill
            className="object-cover"
          />
        </div>

        {/* Layer 2 - Model */}
        <div
          ref={modelRef}
          className="absolute bottom-0 right-[12vw] z-[2] w-[40vw] max-w-[560px]"
        >
          <div className="relative aspect-[2/3] w-full">
            <Image
              src="/images/editorial/parallax-model.png"
              alt="Model"
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>

        {/* Layer 3 - Jacket */}
        <div
          ref={jacketRef}
          className="absolute left-[14vw] top-[8vh] z-[3] w-[26vw] max-w-[360px] drop-shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
        >
          <div className="relative aspect-[3/4] w-full">
            <Image
              src="/images/editorial/parallax-jacket.png"
              alt="Jacket"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Text Block */}
        <div
          ref={textRef}
          className="absolute left-[8vw] top-[32vh] z-[4] -translate-x-[70px] opacity-0"
        >
          <h2 className="font-display text-[clamp(3rem,6vw,5.5rem)] italic leading-tight text-white">
            The Easy Layer.
          </h2>
          <p className="mt-3 font-sans text-[1rem] text-[rgba(255,255,255,0.6)]">
            One piece. Every occasion.
          </p>
          <div className="mt-6 cursor-pointer font-sans text-[13px] text-[#C4622D]">
            Shop Outerwear →
          </div>
        </div>

      </div>
    </section>
  )
}
