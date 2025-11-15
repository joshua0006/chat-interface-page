'use client'

import { motion } from 'framer-motion'

export default function TimelineHero() {
  const eras = [
    { name: 'Ancient Era', color: 'bg-amber-600' },
    { name: 'Medieval', color: 'bg-gray-600' },
    { name: 'Victorian', color: 'bg-purple-600' },
    { name: '1960s', color: 'bg-cyan-500' },
    { name: 'Future AI', color: 'bg-indigo-500' },
  ]

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background pt-12 md:pt-16 pb-12">
      {/* Animated background grid with parallax */}
      <motion.div
        className="absolute inset-0 opacity-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.2, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,hsl(var(--primary)/0.1)_25%,hsl(var(--primary)/0.1)_26%,transparent_27%,transparent_74%,hsl(var(--primary)/0.1)_75%,hsl(var(--primary)/0.1)_76%,transparent_77%,transparent)] bg-[size:50px_50px]" />
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.h1
          className="mb-2 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Chrono
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-accent">
            Chat
          </span>
        </motion.h1>

        <motion.p
          className="mb-8 text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Journey through time and wisdom. Connect with historical minds and future intelligences across the ages.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-3 md:gap-4 text-xs md:text-sm font-medium text-foreground/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {eras.map((era, index) => (
            <motion.div
              key={era.name}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/50 border border-border/50 backdrop-blur-sm hover:bg-card/80 transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.3 + index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.div
                className={`w-2 h-2 rounded-full ${era.color}`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2,
                  delay: index * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span>{era.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
