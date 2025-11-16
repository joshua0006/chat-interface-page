'use client'

import { motion } from 'framer-motion'
import { ThemeToggle } from './theme-toggle'

export function Navbar() {
  return (
    <motion.nav
      className="flex-shrink-0 h-14 md:h-16 sticky top-0 z-50 border-b border-border/50 backdrop-blur-lg bg-background/80"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-full h-full px-4 md:px-6 lg:px-8 xl:px-12 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent" style={{ fontFamily: "'Cinzel', serif" }}>
            ChronoChat
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ThemeToggle />
        </motion.div>
      </div>
    </motion.nav>
  )
}
