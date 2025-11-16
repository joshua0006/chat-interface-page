'use client'

export default function TimelineHero() {
  return (
    <div className="py-4 md:py-6 border-b border-border/20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 text-center">
        <h1
          className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          ChronoChat
        </h1>
        <p className="text-xs md:text-sm text-foreground/50">
          Conversations across time
        </p>
      </div>
    </div>
  )
}
