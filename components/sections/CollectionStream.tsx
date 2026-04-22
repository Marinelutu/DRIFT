'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { collections } from '@/lib/collections'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

export default function CollectionStream() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.stream-card')
    cards.forEach((card) => {
      const speed = card.getAttribute('data-speed') || '1'
      gsap.to(card, {
        y: () => `${-50 * parseFloat(speed)}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      })
    })
  }, { scope: containerRef })

  // Layout classes for a 12-column asymmetric grid
  const layouts = [
    "col-span-12 md:col-span-5 md:col-start-1 mt-0",
    "col-span-12 md:col-span-4 md:col-start-8 md:mt-32",
    "col-span-12 md:col-span-6 md:col-start-3 md:mt-16",
    "col-span-12 md:col-span-4 md:col-start-1 md:mt-48",
    "col-span-12 md:col-span-5 md:col-start-7 md:mt-20",
    "col-span-12 md:col-span-4 md:col-start-2 md:mt-10",
    "col-span-12 md:col-span-6 md:col-start-6 md:mt-32",
  ]
  const speeds = ["1.2", "0.8", "1.5", "0.9", "1.1", "1.3", "0.7"]

  return (
    <section className="py-32 px-8 max-w-[1400px] mx-auto overflow-hidden" ref={containerRef}>
      <h2 className="font-display text-[#1A1A18] text-[clamp(2.5rem,5vw,4rem)] mb-20">
        Hidden Gem Pieces
        <div className="w-[40px] h-[2px] bg-[#C4622D] mt-3"></div>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-6 relative">
        {collections.map((item, i) => (
          <div 
            key={item.id} 
            className={`stream-card relative group ${layouts[i] || 'col-span-12'}`}
            data-speed={speeds[i] || '1'}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EDEBE8]">
               <Image 
                 src={item.image} 
                 alt={item.name} 
                 fill 
                 className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105" 
                 sizes="(max-width: 768px) 100vw, 50vw"
               />
               <div className="absolute inset-0 bg-[#1A1A18]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
            
            <div className="mt-4 flex flex-col">
              <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#9A9189]">
                {item.category}
              </span>
              <h3 className="mt-1 font-sans text-[18px] font-medium text-[#1A1A18]">
                {item.name}
              </h3>
              <span className="mt-1 font-sans text-[14px] text-[#C4622D]">
                {item.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
