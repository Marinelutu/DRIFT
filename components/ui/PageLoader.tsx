'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Lock scroll while loading
    document.body.style.overflow = 'hidden'

    // Sequence: logo fades in (0.5s), then after 300ms delay overlay fades out (0.5s)
    // Total: ~1.3s before unmount
    const timer = setTimeout(() => {
      setVisible(false)
    }, 1300)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [])

  const onExitComplete = () => {
    // Restore scroll after exit animation
    document.body.style.overflow = ''
  }

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {visible && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#F5F0EB',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'all',
          }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '3rem',
              letterSpacing: '0.25em',
              color: '#1A1A18',
              fontWeight: 400,
            }}
          >
            DRIFT
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
