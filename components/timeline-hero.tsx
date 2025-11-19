'use client'

import { motion } from 'framer-motion'

export default function TimelineHero() {
  return (
    <div className="py-12 md:py-16 lg:py-20 border-b border-border/10">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 text-center">
        {/* Premium Heading with Gradient */}
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 md:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent inline-block">
            ChronoChat
          </span>
        </motion.h1>

        {/* Subtle Decorative Line */}
        <motion.div
          className="w-16 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto mb-6 md:mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        />

        {/* Description Text */}
        <motion.p
          className="text-sm md:text-base lg:text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          From ancient philosophers to futuristic AI minds, each conversation opens a window into a different time period. Explore diverse perspectives, discover timeless wisdom, and see how ideas evolve across the ages.
        </motion.p>
      </div>
    </div>
  )
}
