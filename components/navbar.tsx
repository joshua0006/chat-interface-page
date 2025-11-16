'use client'

import { ThemeToggle } from './theme-toggle'

export function Navbar() {
  return (
    <nav className="flex-shrink-0 h-14 md:h-16 sticky top-0 z-50 border-b border-border/30 backdrop-blur-md bg-background/80">
      <div className="w-full h-full px-4 md:px-6 lg:px-8 flex items-center justify-between">
        <h1 className="text-base md:text-lg font-semibold text-foreground" style={{ fontFamily: "'Cinzel', serif" }}>
          ChronoChat
        </h1>
        <ThemeToggle />
      </div>
    </nav>
  )
}
