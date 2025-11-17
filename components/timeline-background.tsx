'use client';

import { motion } from 'framer-motion';

export function TimelineBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Era gradient backgrounds that transition across the timeline */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          background: `
            linear-gradient(
              90deg,
              oklch(var(--ancient) / 0.15) 0%,
              oklch(var(--ancient) / 0.08) 20%,
              oklch(var(--medieval) / 0.08) 20%,
              oklch(var(--medieval) / 0.08) 40%,
              oklch(var(--victorian) / 0.08) 40%,
              oklch(var(--victorian) / 0.08) 60%,
              oklch(var(--futurist) / 0.08) 60%,
              oklch(var(--futurist) / 0.08) 80%,
              oklch(var(--future-ai) / 0.15) 80%,
              oklch(var(--future-ai) / 0.15) 100%
            )
          `,
        }}
      />

      {/* Subtle animated overlay for depth */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          background: `
            radial-gradient(
              circle at 0% 50%,
              oklch(var(--ancient) / 0.2) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 100% 50%,
              oklch(var(--future-ai) / 0.2) 0%,
              transparent 50%
            )
          `,
          backgroundSize: '200% 100%',
        }}
      />
    </div>
  );
}
