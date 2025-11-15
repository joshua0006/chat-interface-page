'use client';

import { characterData } from '@/lib/character-data';
import CharacterCard from './character-card';
import { motion } from 'framer-motion';

interface CharacterSelectorProps {
  onSelectCharacter: (characterId: string) => void;
}

export default function CharacterSelector({ onSelectCharacter }: CharacterSelectorProps) {
  return (
    <div className="min-h-screen py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent" style={{ fontFamily: "'Cinzel', serif" }}>
            Select Your Guide Through Time
          </h2>
          <p className="text-foreground/60 max-w-2xl text-sm md:text-base leading-relaxed">
            Each character offers unique perspectives shaped by their era. Choose wisely and explore their wisdom.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5">
          {characterData.map((character, index) => (
            <CharacterCard
              key={character.id}
              character={character}
              onSelect={() => onSelectCharacter(character.id)}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
