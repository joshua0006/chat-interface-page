"use client"

import React from 'react'

export function BackgroundLayers() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Static Geometric Pattern Layer - Dot Grid */}
      <div
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.08]"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Static Geometric Pattern Layer - Fine Dot Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.08] dark:opacity-[0.04]"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, currentColor 0.5px, transparent 0.5px)
          `,
          backgroundSize: '16px 16px',
        }}
      />

      {/* Static Geometric Pattern Layer - Diagonal Lines */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 48px,
              currentColor 48px,
              currentColor 49px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 48px,
              currentColor 48px,
              currentColor 49px
            )
          `,
        }}
      />

      {/* Base Texture Layer - Fine grain/noise */}
      <div
        className="absolute inset-0 animate-drift-slow"
        style={{
          opacity: 'var(--bg-texture-opacity)',
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")
          `,
          backgroundSize: '300px 300px',
          mixBlendMode: 'soft-light',
        }}
      />

      {/* Animated Gradient Layer - Era colors */}
      <div
        className="absolute inset-0 animate-gradient-shift"
        style={{
          background: `
            radial-gradient(circle at 15% 25%, oklch(var(--ancient) / var(--bg-gradient-opacity)) 0%, transparent 45%),
            radial-gradient(circle at 85% 20%, oklch(var(--futurist) / var(--bg-gradient-opacity)) 0%, transparent 45%),
            radial-gradient(circle at 50% 80%, oklch(var(--victorian) / var(--bg-gradient-opacity)) 0%, transparent 50%),
            radial-gradient(circle at 20% 75%, oklch(var(--medieval) / var(--bg-gradient-opacity)) 0%, transparent 40%),
            radial-gradient(circle at 75% 60%, oklch(var(--future-ai) / var(--bg-gradient-opacity)) 0%, transparent 45%)
          `,
          mixBlendMode: 'soft-light',
        }}
      />

      {/* Time Motif Layer - Subtle clock and timeline patterns */}
      <div
        className="absolute inset-0"
        style={{ opacity: 'var(--bg-motif-opacity)' }}
      >
        {/* Roman Numerals scattered */}
        <div className="absolute top-[10%] left-[15%] text-6xl font-serif opacity-30 animate-float-gentle" style={{ animationDelay: '0s' }}>
          XII
        </div>
        <div className="absolute top-[25%] right-[20%] text-5xl font-serif opacity-25 animate-float-gentle" style={{ animationDelay: '8s' }}>
          III
        </div>
        <div className="absolute bottom-[30%] left-[25%] text-7xl font-serif opacity-20 animate-float-gentle" style={{ animationDelay: '16s' }}>
          VI
        </div>
        <div className="absolute bottom-[15%] right-[15%] text-6xl font-serif opacity-25 animate-float-gentle" style={{ animationDelay: '24s' }}>
          IX
        </div>

        {/* Subtle clock face outline */}
        <svg
          className="absolute top-[35%] left-[8%] w-64 h-64 opacity-20 animate-rotate-slow"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.3"
        >
          <circle cx="50" cy="50" r="45" />
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180)
            const x1 = 50 + 40 * Math.cos(angle)
            const y1 = 50 + 40 * Math.sin(angle)
            const x2 = 50 + 45 * Math.cos(angle)
            const y2 = 50 + 45 * Math.sin(angle)
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
          })}
        </svg>

        <svg
          className="absolute bottom-[20%] right-[10%] w-48 h-48 opacity-15 animate-rotate-slow"
          style={{ animationDirection: 'reverse' }}
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.3"
        >
          <circle cx="50" cy="50" r="45" />
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180)
            const x1 = 50 + 40 * Math.cos(angle)
            const y1 = 50 + 40 * Math.sin(angle)
            const x2 = 50 + 45 * Math.cos(angle)
            const y2 = 50 + 45 * Math.sin(angle)
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
          })}
        </svg>

        {/* Timeline grid pattern */}
        <svg
          className="absolute top-[15%] right-[30%] w-80 h-32 opacity-15"
          viewBox="0 0 200 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.2"
        >
          <line x1="0" y1="25" x2="200" y2="25" strokeDasharray="2,3" />
          {[0, 40, 80, 120, 160, 200].map((x, i) => (
            <g key={i}>
              <circle cx={x} cy="25" r="2" fill="currentColor" opacity="0.4" />
              <line x1={x} y1="20" x2={x} y2="30" />
            </g>
          ))}
        </svg>

        <svg
          className="absolute bottom-[40%] left-[35%] w-72 h-32 opacity-15"
          viewBox="0 0 200 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.2"
        >
          <line x1="0" y1="25" x2="200" y2="25" strokeDasharray="2,3" />
          {[0, 50, 100, 150, 200].map((x, i) => (
            <g key={i}>
              <circle cx={x} cy="25" r="2" fill="currentColor" opacity="0.4" />
              <line x1={x} y1="20" x2={x} y2="30" />
            </g>
          ))}
        </svg>
      </div>

      {/* Floating Particles - Temporal flow effect */}
      <div
        className="absolute inset-0"
        style={{ opacity: 'var(--bg-particle-opacity)' }}
      >
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full animate-particle-drift"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${-10 + Math.random() * 20}%`,
              animationDelay: `${i * 2.5}s`,
              animationDuration: `${25 + Math.random() * 15}s`,
            }}
          />
        ))}

        {/* Larger, slower particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`large-${i}`}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-particle-drift"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${-10 + Math.random() * 20}%`,
              animationDelay: `${i * 5}s`,
              animationDuration: `${40 + Math.random() * 20}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, oklch(var(--background) / 0.3) 100%)',
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  )
}
