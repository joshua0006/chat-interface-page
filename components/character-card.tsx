'use client';

import { Character } from '@/lib/character-data';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CharacterCardProps {
  character: Character;
  onSelect: () => void;
  index?: number;
}

export default function CharacterCard({ character, onSelect, index = 0 }: CharacterCardProps) {
  const eraColors: Record<string, { border: string; bg: string; accent: string; shadow: string }> = {
    ancient: {
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/5',
      accent: 'text-amber-500',
      shadow: 'shadow-amber-500/20'
    },
    medieval: {
      border: 'border-gray-500/30',
      bg: 'bg-gray-500/5',
      accent: 'text-gray-400',
      shadow: 'shadow-gray-500/20'
    },
    victorian: {
      border: 'border-purple-500/30',
      bg: 'bg-purple-500/5',
      accent: 'text-purple-400',
      shadow: 'shadow-purple-500/20'
    },
    futurist: {
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500/5',
      accent: 'text-cyan-400',
      shadow: 'shadow-cyan-500/20'
    },
    future_ai: {
      border: 'border-indigo-500/30',
      bg: 'bg-indigo-500/5',
      accent: 'text-indigo-400',
      shadow: 'shadow-indigo-500/20'
    },
  };

  const eraStyle = eraColors[character.era];

  return (
    <motion.div
      onClick={onSelect}
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
    >
      <Card
        className={`
          h-48 md:h-56 cursor-pointer group relative overflow-hidden
          backdrop-blur-lg bg-background/30 border-2 ${eraStyle.border}
          transition-all duration-300
          hover:${eraStyle.shadow} hover:shadow-xl hover:border-opacity-80
        `}
      >
        {/* Glassmorphism overlay */}
        <div className={`absolute inset-0 ${eraStyle.bg} opacity-40 group-hover:opacity-60 transition-opacity duration-300`} />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-card/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardContent className="relative h-full flex flex-col items-center justify-center text-center p-4 gap-0">
          {/* Avatar/Logo */}
          <motion.div
            className="text-4xl md:text-5xl mb-3"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {character.avatar}
          </motion.div>

          {/* Character Name */}
          <h3
            className={`text-sm md:text-base font-bold mb-2 ${eraStyle.accent} transition-all duration-300 group-hover:brightness-125 leading-tight`}
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {character.name}
          </h3>

          {/* Era Badge */}
          <Badge
            variant="outline"
            className={`
              ${eraStyle.border} ${eraStyle.accent} bg-background/50
              backdrop-blur-sm text-xs border-current/30
              group-hover:border-current/60 transition-all
            `}
          >
            {character.eraLabel}
          </Badge>
        </CardContent>
      </Card>
    </motion.div>
  );
}
