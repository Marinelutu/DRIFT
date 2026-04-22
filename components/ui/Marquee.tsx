'use client';

import React from 'react';

interface MarqueeProps {
  variant: 'dark' | 'light';
}

const Marquee: React.FC<MarqueeProps> = ({ variant }) => {
  const isDark = variant === 'dark';
  
  const content = "NEW SEASON  ·  WEAR THE MOMENT  ·  THE EASY LAYER  ·  DRIFT SS2025  ·  ";
  
  return (
    <div 
      className={`w-full overflow-hidden flex items-center h-[52px] border-y border-dark/10 select-none bg-transparent ${
        isDark ? 'text-base' : 'text-dark'
      }`}
    >
      <div 
        className="flex whitespace-nowrap will-change-transform animate-[marquee_22s_linear_infinite] hover:[animation-play-state:paused]"
        aria-hidden="true"
      >
        <span className="text-[12px] tracking-[0.2em] font-body uppercase px-4">
          {content}{content}{content}{content}
        </span>
        <span className="text-[12px] tracking-[0.2em] font-body uppercase px-4">
          {content}{content}{content}{content}
        </span>
      </div>
    </div>
  );
};

export default Marquee;
