'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { collections } from '@/lib/collections'
import { gsap, Draggable } from '@/lib/gsap'

export default function CollectionRail() {
  const [hintVisible, setHintVisible] = useState(true)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapperRef.current || !trackRef.current) return

    let velocity = 0
    let lastX = 0
    let lastTime = 0
    let rafId: number

    const ctx = gsap.context(() => {
      Draggable.create(trackRef.current, {
        type: 'x',
        bounds: wrapperRef.current,
        edgeResistance: 0.85,
        cursor: 'grab',
        activeCursor: 'grabbing',
        onDragStart: function () {
          setHintVisible(false)
          trackRef.current?.classList.add('is-dragging')
          cancelAnimationFrame(rafId)
        },
        onDrag: function () {
          const now = Date.now()
          const dt = now - lastTime
          if (dt > 0) {
            velocity = ((this.x - lastX) / dt) * 16 // roughly pixels per frame
          }
          lastX = this.x
          lastTime = now
        },
        onDragEnd: function () {
          trackRef.current?.classList.remove('is-dragging')
          
          const maxScroll = wrapperRef.current!.offsetWidth - trackRef.current!.scrollWidth
          const minScroll = 0
          
          let currentX = this.x
          
          const decay = () => {
            velocity *= 0.92
            if (Math.abs(velocity) < 0.5) {
              let snapX = Math.round(currentX / 340) * 340
              if (snapX > minScroll) snapX = minScroll
              if (snapX < maxScroll) snapX = maxScroll
              
              gsap.to(trackRef.current, { 
                x: snapX, 
                duration: 0.4, 
                ease: 'power2.out',
                onUpdate: () => this.update()
              })
              return
            }
            
            currentX += velocity
            
            if (currentX > minScroll) {
              currentX = minScroll
              velocity = 0
            }
            if (currentX < maxScroll) {
              currentX = maxScroll
              velocity = 0
            }
            
            gsap.set(trackRef.current, { x: currentX })
            this.update()
            
            rafId = requestAnimationFrame(decay)
          }
          
          rafId = requestAnimationFrame(decay)
        }
      })
    }, wrapperRef)

    return () => {
      cancelAnimationFrame(rafId)
      ctx.revert()
    }
  }, [])

  return (
    <section className="overflow-hidden bg-[#F5F0EB] pt-20 pb-16">
      <div className="px-8 max-w-[1400px] mx-auto mb-10">
        <h2 className="font-display text-[#1A1A18] text-[clamp(2.5rem,5vw,4rem)]">
          Hidden Gem Pieces
        </h2>
        <div className="w-[40px] h-[2px] bg-[#C4622D] mt-3 mb-10"></div>
        
        <div className="h-4 relative">
          <AnimatePresence>
            {hintVisible && (
              <motion.p
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="font-body text-[11px] text-[#9A9189] absolute top-0"
              >
                ← Drag to explore →
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div ref={wrapperRef} className="overflow-hidden">
        <div 
          ref={trackRef} 
          className="flex gap-[20px] w-fit will-change-transform pl-[10vw] pr-[10vw]"
        >
          {collections.map((item) => (
            <div 
              key={item.id} 
              className="w-[320px] h-[480px] shrink-0 overflow-hidden relative group"
            >
              <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04] [.is-dragging_&]:pointer-events-none">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="320px"
                />
              </div>
              <div className="absolute bottom-0 w-full h-[55%] bg-gradient-to-t from-[rgba(26,26,24,0.88)] to-transparent pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 p-5 pointer-events-none">
                <p className="font-body text-[10px] tracking-[0.15em] uppercase text-[#C4622D]">
                  {item.category}
                </p>
                <h3 className="font-display italic text-[1.4rem] text-white mt-1">
                  {item.name}
                </h3>
                <p className="font-body text-[13px] text-[rgba(255,255,255,0.7)] mt-1">
                  {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
