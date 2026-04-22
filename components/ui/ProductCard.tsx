'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useCart } from '@/lib/CartContext'
import { gsap } from '@/lib/gsap'

export default function ProductCard({ 
  name, 
  category, 
  price, 
  image, 
  index,
  className = "" 
}: { 
  name: string, 
  category: string, 
  price: string, 
  image: string, 
  index: number,
  className?: string 
}) {
  const [added, setAdded] = useState(false)
  const [wishlist, setWishlist] = useState(false)
  const { increment } = useCart()
  const cardRef = useRef<HTMLDivElement>(null)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setAdded(true)

    const cartIcon = document.getElementById('nav-cart-icon')
    const card = cardRef.current

    if (cartIcon && card) {
      const cardRect = card.getBoundingClientRect()
      const cartRect = cartIcon.getBoundingClientRect()

      const startX = cardRect.left + cardRect.width / 2
      const startY = cardRect.top + cardRect.height / 2
      const endX = cartRect.left + cartRect.width / 2
      const endY = cartRect.top + cartRect.height / 2

      // Create flying orb
      const orb = document.createElement('div')
      orb.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #C4622D;
        pointer-events: none;
        z-index: 9998;
        will-change: transform;
        left: ${startX - 4}px;
        top: ${startY - 4}px;
      `
      document.body.appendChild(orb)

      const arcPeakY = Math.min(startY, endY) - 100

      gsap.timeline({
        onComplete: () => {
          orb.remove()
          increment()
        },
      })
        .to(orb, {
          duration: 0.3,
          ease: 'power2.out',
          left: (startX + endX) / 2 - 4,
          top: arcPeakY - 4,
        })
        .to(orb, {
          duration: 0.3,
          ease: 'power2.in',
          left: endX - 4,
          top: endY - 4,
        })
    } else {
      increment()
    }

    setTimeout(() => setAdded(false), 1500)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setWishlist(!wishlist)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.21, 1.02, 0.73, 1], delay: (index % 4) * 0.1 }}
      className={`group relative flex flex-col cursor-pointer ${className}`}
      whileHover="hover"
    >
      <div className="relative w-full h-full min-h-[250px] overflow-hidden bg-[#EDEBE8]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.05]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        
        {/* Wishlist Heart */}
        <button
          data-cursor-hover
          onClick={handleWishlist}
          className="absolute right-3 top-3 z-10 opacity-0 transition-opacity duration-250 group-hover:opacity-100"
          aria-label="Toggle wishlist"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill={wishlist ? "#C4622D" : "none"} 
            stroke={wishlist ? "#C4622D" : "#1A1A18"} 
            strokeWidth="1.5"
            className="transition-colors duration-200"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>

        {/* Quick Add Button */}
        <motion.button
          data-cursor-hover
          variants={{ rest: { y: 10, opacity: 0 }, hover: { y: 0, opacity: 1 } }}
          transition={{ duration: 0.25 }}
          initial="rest"
          className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-none bg-[#1A1A18] px-4 py-1.5 font-sans text-[12px] text-white"
          onClick={handleQuickAdd}
        >
          {added ? "Added ✓" : "Quick Add"}
        </motion.button>
      </div>
      
      <div className="mt-4 flex flex-col pb-2">
        <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#9A9189]">
          {category}
        </span>
        <h3 className="mt-1 font-sans text-[15px] font-medium text-[#1A1A18] self-start inline-flex relative overflow-hidden group-hover:text-[#1A1A18]">
          {name}
          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#1A1A18] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></span>
        </h3>
        <span className="mt-1 font-sans text-[14px] text-[#C4622D]">
          {price}
        </span>
      </div>
    </motion.div>
  )
}
