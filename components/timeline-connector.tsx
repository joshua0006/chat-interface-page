'use client';

import { motion } from 'framer-motion';

interface TimelineConnectorProps {
  fromEra: string;
  toEra: string;
  delay?: number;
}

const eraColors = {
  ancient: 'oklch(var(--ancient))',
  medieval: 'oklch(var(--medieval))',
  victorian: 'oklch(var(--victorian))',
  futurist: 'oklch(var(--futurist))',
  future_ai: 'oklch(var(--future-ai))',
};

export function TimelineConnector({
  fromEra,
  toEra,
  delay = 0
}: TimelineConnectorProps) {
  const fromColor = eraColors[fromEra as keyof typeof eraColors];
  const toColor = eraColors[toEra as keyof typeof eraColors];

  // Create gradient ID for this specific connector
  const gradientId = `gradient-${fromEra}-${toEra}`;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
      style={{ zIndex: 1 }}
    >
      {/* Define gradient for this connector */}
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={fromColor} stopOpacity={0.4} />
          <stop offset="100%" stopColor={toColor} stopOpacity={0.4} />
        </linearGradient>
      </defs>

      {/* Main connecting line - static, no hover effects */}
      <motion.line
        x1="0"
        y1="50%"
        x2="100%"
        y2="50%"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: 1,
          opacity: 1,
        }}
        transition={{
          delay: delay,
          duration: 1.5,
          ease: 'easeInOut'
        }}
      />
    </svg>
  );
}
