'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function NewsletterCard() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="sticky top-[100px] max-w-[420px] bg-[#1A1A18] px-10 py-12 rounded-none relative overflow-hidden">
      <div className="relative z-10">
        <div className="font-body text-[10px] tracking-[0.2em] uppercase text-[#C4622D]">
          DRIFT DROPS
        </div>
        <h3 className="font-display italic text-[2.8rem] text-[#F5F0EB] mt-3 leading-tight">
          Join the Drop.
        </h3>
        <p className="font-body text-[1rem] text-[rgba(245,240,235,0.55)] mt-4">
          New pieces. First access. No noise.
        </p>

        <div className="mt-8 h-[120px] relative">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-transparent border-none border-b border-[rgba(245,240,235,0.25)] text-[#F5F0EB] font-body text-[15px] py-3 focus:outline-none focus:border-[#C4622D] transition-colors duration-300 placeholder-[rgba(245,240,235,0.25)]"
                />
                <button
                  onClick={() => setSubmitted(true)}
                  className="w-full mt-4 bg-[#C4622D] text-white font-body text-[14px] py-4 rounded-none hover:bg-[#A8511F] transition-colors duration-200"
                >
                  Submit
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="font-display italic text-[1.5rem] text-[#F5F0EB] text-center">
                  ✓ You&apos;re on the list.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="font-body text-[11px] text-[rgba(245,240,235,0.3)] mt-6">
          No spam. Drop notifications only.
        </div>
      </div>

      <div className="font-display text-[18rem] opacity-[0.03] absolute -bottom-8 -right-4 pointer-events-none overflow-hidden leading-none text-[#F5F0EB] select-none z-0">
        D
      </div>
    </div>
  )
}
