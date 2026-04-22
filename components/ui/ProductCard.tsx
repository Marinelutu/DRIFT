'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useCart } from '@/lib/CartContext'
import { gsap } from '@/lib/gsap'

export default function ProductCard({ name, category, price, image, index }: { name: string, category: string, price: string, image: string, index: number }) {
  const [added, setAdded] = useState(false)
  const [wishlist, setWishlist] = useState(false)
  const { increment } = useCart()
  const cardRef = useRef<HTMLDivElement>(null)

  const handleQuickAdd = () => {
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

      // Arc: go up first, then curve down to cart
      // Use two sequential tweens to form the arc
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
    e.stopPropagation()
    setWishlist(!wishlist)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: (index % 3) * 0.1 }}
      className="group relative flex flex-col"
      whileHover="hover"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EDEBE8]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.06]"
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
      
      <div className="mt-3 flex flex-col">
        <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#9A9189]">
          {category}
        </span>
        <h3 className="mt-1 font-sans text-[15px] font-medium text-[#1A1A18]">
          {name}
        </h3>
        <span className="mt-0.5 font-sans text-[14px] text-[#C4622D]">
          {price}
        </span>
      </div>
    </motion.div>
  )
}
