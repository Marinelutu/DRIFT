'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface KineticTextProps {
  headline: string;
  subtext: string;
  bg: 'light' | 'dark';
  align?: 'left' | 'center';
}

const KineticText: React.FC<KineticTextProps> = ({ headline, subtext, bg, align = 'left' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const words = headline.split(' ');
  const isDark = bg === 'dark';
  const isCentered = align === 'center';

  return (
    <section 
      ref={containerRef}
      className={`py-36 px-8 ${isDark ? 'bg-dark text-base' : 'bg-base text-dark'}`}
    >
      <div className={`max-w-[1400px] mx-auto ${isCentered ? 'text-center' : 'text-left'}`}>
        <h2 className="mb-8 font-display text-[clamp(3.5rem,7vw,6.5rem)] leading-[1.1]">
          {words.map((word, idx) => (
            <span key={idx} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
              <motion.span
                className="inline-block will-change-transform"
                initial={{ y: '110%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : {}}
                transition={{
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                  delay: idx * 0.055
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h2>
        
        <motion.p
          className={`font-body text-[1rem] leading-relaxed max-w-[520px] ${
            isCentered ? 'mx-auto' : 'mr-auto'
          } ${isDark ? 'text-white/50' : 'text-muted'}`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{
            duration: 0.6,
            delay: (words.length * 0.055) + 0.2
          }}
        >
          {subtext}
        </motion.p>
      </div>
    </section>
  );
};

export default KineticText;
