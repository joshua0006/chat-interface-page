'use client';

import { characterData } from '@/lib/character-data';
import CharacterCard from './character-card';

interface CharacterSelectorProps {
  onSelectCharacter: (characterId: string) => void;
}

export default function CharacterSelector({ onSelectCharacter }: CharacterSelectorProps) {
  return (
    <div className="flex-1 py-4 md:py-6 px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
      <div className="w-full">
        <div className="mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-2 text-foreground" style={{ fontFamily: "'Cinzel', serif" }}>
            Select Your Guide
          </h2>
          <p className="text-foreground/50 text-xs md:text-sm">
            Choose a character to begin your conversation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8 pb-6">
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
