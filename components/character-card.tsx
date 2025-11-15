'use client';

import { Character } from '@/lib/character-data';
import { motion } from 'framer-motion';

interface CharacterCardProps {
  character: Character;
  onSelect: () => void;
  index?: number;
}

export default function CharacterCard({ character, onSelect, index = 0 }: CharacterCardProps) {
  const eraColors: Record<string, { border: string; bg: string; accent: string; logo: string; glow: string }> = {
    ancient: {
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/5',
      accent: 'text-amber-500',
      logo: '⚱',
      glow: 'hover:shadow-amber-500/20'
    },
    medieval: {
      border: 'border-gray-500/30',
      bg: 'bg-gray-500/5',
      accent: 'text-gray-400',
      logo: '⚔',
      glow: 'hover:shadow-gray-500/20'
    },
    victorian: {
      border: 'border-purple-500/30',
      bg: 'bg-purple-500/5',
      accent: 'text-purple-400',
      logo: '🎩',
      glow: 'hover:shadow-purple-500/20'
    },
    futurist: {
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500/5',
      accent: 'text-cyan-400',
      logo: '🚀',
      glow: 'hover:shadow-cyan-500/20'
    },
    future_ai: {
      border: 'border-indigo-500/30',
      bg: 'bg-indigo-500/5',
      accent: 'text-indigo-400',
      logo: '⚡',
      glow: 'hover:shadow-indigo-500/20'
    },
  };

  const eraStyle = eraColors[character.era];

  return (
    <motion.div
      onClick={onSelect}
      className="relative group cursor-pointer h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glassmorphism card background */}
      <div className={`absolute inset-0 rounded-xl ${eraStyle.bg} border ${eraStyle.border} backdrop-blur-sm transition-all duration-500 group-hover:border-opacity-60 ${eraStyle.glow} group-hover:shadow-xl`} />

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-card/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative p-6 h-full flex flex-col">
        {/* Era Logo */}
        <motion.div
          className="text-4xl md:text-5xl mb-4"
          whileHover={{ scale: 1.15, rotate: 12 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          {eraStyle.logo}
        </motion.div>

        {/* Character Name */}
        <h3 className={`text-lg md:text-xl font-bold mb-2 ${eraStyle.accent} transition-all duration-300 group-hover:brightness-125`} style={{ fontFamily: "'Cinzel', serif" }}>
          {character.name}
        </h3>

        {/* Era Badge */}
        <div className={`inline-flex text-xs font-medium ${eraStyle.accent} opacity-70 mb-3 px-2 py-1 rounded-full bg-card/50 border border-border/30 w-fit`}>
          {character.eraLabel}
        </div>

        {/* Personality Traits */}
        <p className="text-xs md:text-sm text-foreground/60 mb-4 flex-grow line-clamp-3 leading-relaxed">
          {character.traits.join(' • ')}
        </p>

        {/* Interact Button */}
        <motion.button
          className={`mt-auto px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 border ${eraStyle.border} ${eraStyle.accent} hover:bg-current hover:text-background group-hover:shadow-lg relative overflow-hidden`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">Begin Conversation</span>
          <motion.div
            className="absolute inset-0 bg-current"
            initial={{ x: '-100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>
    </motion.div>
  );
}
