'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const colorways = [
  { name: 'Bone', hex: '#F0EBE3' },
  { name: 'Slate', hex: '#8A9BA8' },
  { name: 'Terracotta', hex: '#C4622D' },
  { name: 'Black', hex: '#1A1A18' },
  { name: 'Olive', hex: '#6B7C5C' },
]

const availability: Record<string, string[]> = {
  XS:  ['in_stock','in_stock','out_of_stock','in_stock','low_stock'],
  S:   ['in_stock','in_stock','in_stock','low_stock','in_stock'],
  M:   ['low_stock','in_stock','in_stock','in_stock','in_stock'],
  L:   ['out_of_stock','low_stock','in_stock','in_stock','out_of_stock'],
  XL:  ['out_of_stock','out_of_stock','low_stock','in_stock','in_stock'],
  XXL: ['out_of_stock','out_of_stock','out_of_stock','low_stock','in_stock'],
}

export function SizeGrid() {
  const [selectedCell, setSelectedCell] = useState<{ size: string; colorway: string } | null>(null)
  const [toastVisible, setToastVisible] = useState(false)

  useEffect(() => {
    if (toastVisible) {
      const timer = setTimeout(() => setToastVisible(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [toastVisible])

  const handleCellClick = (size: string, colorway: string, status: string) => {
    if (status === 'out_of_stock') return
    setSelectedCell({ size, colorway })
    setToastVisible(true)
  }

  return (
    <section className="bg-[#F5F0EB] py-24 px-8">
      <div className="max-w-[900px] mx-auto">
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-[#1A1A18] mb-10 leading-tight">
          Find Your Fit
        </h2>
        <div className="w-[40px] h-[2px] bg-[#C4622D] mt-3 mb-10" />

        <div className="overflow-x-auto pb-4">
          <div className="min-w-[600px]">
            {/* Headers */}
            <div className="flex mb-4">
              <div className="w-20 shrink-0" />
              <div className="flex-1 grid grid-cols-5 gap-2">
                {colorways.map((cw) => (
                  <div key={cw.name} className="flex flex-col items-center gap-2">
                    <div className="w-[10px] h-[10px] rounded-full" style={{ backgroundColor: cw.hex }} />
                    <span className="font-body text-[11px] text-[#1A1A18]">{cw.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="flex flex-col gap-2">
              {sizes.map((size) => (
                <div key={size} className="flex items-center">
                  <div className="w-20 shrink-0 font-body font-bold text-[13px] text-[#1A1A18]">
                    {size}
                  </div>
                  <div className="flex-1 grid grid-cols-5 gap-2">
                    {colorways.map((cw, idx) => {
                      const status = availability[size][idx]
                      const isSelected = selectedCell?.size === size && selectedCell?.colorway === cw.name

                      let bg = ''
                      let color = ''
                      let cursor = ''
                      let opacity = ''

                      if (isSelected) {
                        bg = 'bg-[#C4622D]'
                        color = 'text-white'
                        cursor = 'cursor-pointer'
                      } else if (status === 'in_stock') {
                        bg = 'bg-[#D4EDD4]'
                        color = 'text-[#1A1A18]'
                        cursor = 'cursor-pointer'
                      } else if (status === 'low_stock') {
                        bg = 'bg-[#FFF3CD]'
                        color = 'text-[#1A1A18]'
                        cursor = 'cursor-pointer'
                      } else {
                        bg = 'bg-[#EDEBE8]'
                        color = 'text-[#9A9189]'
                        opacity = 'opacity-50'
                        cursor = 'cursor-not-allowed'
                      }

                      return (
                        <div key={cw.name} className="relative group flex justify-center w-full">
                          <motion.div
                            whileTap={status !== 'out_of_stock' ? { scale: 0.9 } : {}}
                            animate={isSelected ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                            onClick={() => handleCellClick(size, cw.name, status)}
                            className={`w-full h-12 flex items-center justify-center rounded-none ${bg} ${color} ${cursor} ${opacity} transition-colors duration-200`}
                          />
                          {status === 'low_stock' && (
                            <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap bg-[#1A1A18] text-white font-body text-[11px] px-2 py-1">
                              Only 2 left
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-6 mt-8 font-body text-[11px] text-[#9A9189]">
          <div className="flex items-center gap-2">
            <div className="w-[8px] h-[8px] rounded-full bg-[#D4EDD4]" /> In Stock
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[8px] h-[8px] rounded-full bg-[#FFF3CD]" /> Low Stock
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[8px] h-[8px] rounded-full bg-[#EDEBE8]" /> Sold Out
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toastVisible && selectedCell && (
          <motion.div
            initial={{ y: 20, opacity: 0, x: '-50%' }}
            animate={{ y: 0, opacity: 1, x: '-50%' }}
            exit={{ y: 20, opacity: 0, x: '-50%' }}
            className="fixed bottom-6 left-1/2 z-[300] bg-[#1A1A18] text-white font-body text-[13px] px-6 py-3 rounded-[100px] whitespace-nowrap"
          >
            Added to wishlist — {selectedCell.size} / {selectedCell.colorway} ✓
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
