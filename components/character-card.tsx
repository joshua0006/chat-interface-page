'use client';

import { Character } from '@/lib/character-data';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CharacterCardProps {
  character: Character;
  onSelect: () => void;
  index?: number;
}

export default function CharacterCard({ character, onSelect, index = 0 }: CharacterCardProps) {
  const eraColors: Record<string, { border: string; accent: string; shadow: string }> = {
    ancient: {
      border: 'border-amber-500/30',
      accent: 'text-amber-500',
      shadow: 'shadow-amber-500/20'
    },
    medieval: {
      border: 'border-gray-500/30',
      accent: 'text-gray-400',
      shadow: 'shadow-gray-500/20'
    },
    victorian: {
      border: 'border-purple-500/30',
      accent: 'text-purple-400',
      shadow: 'shadow-purple-500/20'
    },
    futurist: {
      border: 'border-cyan-500/30',
      accent: 'text-cyan-400',
      shadow: 'shadow-cyan-500/20'
    },
    future_ai: {
      border: 'border-indigo-500/30',
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
          cursor-pointer group relative overflow-hidden
          bg-transparent border-2 ${eraStyle.border}
          transition-all duration-300
          hover:${eraStyle.shadow} hover:shadow-xl hover:border-opacity-80
          p-0
        `}
      >
        {/* Full-bleed Image - Natural Aspect Ratio */}
        <div className="relative w-full">
          <Image
            src={character.avatar}
            alt={character.name}
            width={800}
            height={800}
            className="w-full h-auto"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
          />
        </div>

        {/* Bottom Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-28 md:h-32 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-all duration-300" />

        {/* Text Content - Left Aligned */}
        <CardContent className="absolute bottom-0 left-0 right-0 flex flex-col items-start text-left p-3 md:p-4 gap-1 z-10">
          {/* Character Name */}
          <h3
            className={`text-base md:text-lg font-bold text-white drop-shadow-lg transition-all duration-300 group-hover:brightness-125 leading-tight`}
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {character.name}
          </h3>

          {/* Era Badge */}
          <Badge
            variant="outline"
            className={`
              ${eraStyle.border} bg-black/30
              backdrop-blur-sm text-xs border-current/40 text-white
              group-hover:border-current/70 transition-all
              w-fit
            `}
          >
            {character.eraLabel}
          </Badge>
        </CardContent>
      </Card>
    </motion.div>
  );
}
