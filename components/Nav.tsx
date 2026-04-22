'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/lib/CartContext'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { count } = useCart()
  const prevCountRef = useRef(count)
  const [badgePulse, setBadgePulse] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Badge spring on increment
  useEffect(() => {
    if (count > prevCountRef.current) {
      setBadgePulse(true)
      const t = setTimeout(() => setBadgePulse(false), 400)
      prevCountRef.current = count
      return () => clearTimeout(t)
    }
    prevCountRef.current = count
  }, [count])

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-400 ease-in-out px-8 py-6 flex items-center justify-between ${
        scrolled
          ? 'bg-[#F5F0EB]/96 backdrop-blur-xl py-4'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center">
        <Link 
          href="/" 
          data-cursor-hover
          className="text-[1.1rem] font-[family-name:var(--font-display)] tracking-[0.25em] text-[#1A1A18] uppercase"
        >
          DRIFT
        </Link>
        
        <div className="hidden md:flex items-center ml-10 space-x-8 text-[13px] font-[family-name:var(--font-body)] text-[#1A1A18]">
          <Link href="/collections" data-cursor-hover className="hover:opacity-60 transition-opacity">Collections</Link>
          <Link href="/lookbook" data-cursor-hover className="hover:opacity-60 transition-opacity">Lookbook</Link>
          <Link href="/about" data-cursor-hover className="hover:opacity-60 transition-opacity">About</Link>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <button data-cursor-hover className="hover:opacity-60 transition-opacity" aria-label="Search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
        
        <button data-cursor-hover className="hover:opacity-60 transition-opacity" aria-label="Wishlist">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>

        <button
          id="nav-cart-icon"
          data-cursor-hover
          className="relative hover:opacity-60 transition-opacity flex items-center"
          aria-label="Cart"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <AnimatePresence mode="wait">
            <motion.span
              key={count}
              initial={{ scale: 1 }}
              animate={badgePulse ? { scale: [1, 1.4, 1] } : { scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              className="ml-1 text-[13px] font-[family-name:var(--font-body)]"
            >
              {count}
            </motion.span>
          </AnimatePresence>
        </button>

        <button
          data-cursor-hover
          className="bg-[#C4622D] text-white text-[13px] font-[family-name:var(--font-body)] px-5 py-2 uppercase tracking-wider hover:bg-[#A8511F] transition-colors duration-200"
        >
          Join
        </button>
      </div>
    </nav>
  )
}
