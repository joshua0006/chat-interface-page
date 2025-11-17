'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface EraMarkerProps {
  era: string;
  eraLabel: string;
  delay?: number;
  className?: string;
}

const eraColors = {
  ancient: 'text-amber-500',
  medieval: 'text-gray-400',
  victorian: 'text-purple-400',
  futurist: 'text-cyan-400',
  future_ai: 'text-indigo-400',
};

const eraBorderColors = {
  ancient: 'border-amber-500/30',
  medieval: 'border-gray-400/30',
  victorian: 'border-purple-400/30',
  futurist: 'border-cyan-400/30',
  future_ai: 'border-indigo-400/30',
};

export function EraMarker({ era, eraLabel, delay = 0, className }: EraMarkerProps) {
  const textColor = eraColors[era as keyof typeof eraColors] || eraColors.ancient;
  const borderColor = eraBorderColors[era as keyof typeof eraBorderColors] || eraBorderColors.ancient;

  return (
    <motion.div
      className={cn(
        'flex flex-col items-center gap-1 z-20',
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: delay + 0.3,
        duration: 0.6,
        ease: 'easeOut',
      }}
    >
      {/* Decorative line connecting to timeline */}
      <motion.div
        className={cn('w-px h-4', borderColor)}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{
          delay: delay + 0.5,
          duration: 0.4,
          ease: 'easeOut',
        }}
        style={{
          transformOrigin: 'bottom',
        }}
      />

      {/* Era label */}
      <div
        className={cn(
          'px-3 py-1.5 rounded-full border backdrop-blur-sm',
          'text-xs md:text-sm font-medium whitespace-nowrap',
          textColor,
          borderColor
        )}
        style={{
          backgroundColor: 'oklch(var(--background) / 0.8)',
        }}
      >
        {eraLabel}
      </div>
    </motion.div>
  );
}
