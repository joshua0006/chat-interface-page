'use client';

import { characterData } from '@/lib/character-data';
import CharacterCard from './character-card';
import { TimelineBackground } from './timeline-background';
import { TimelineConnector } from './timeline-connector';
import { TimelineNode } from './timeline-node';
import { EraMarker } from './era-marker';
import { Separator } from './ui/separator';

interface CharacterSelectorProps {
  onSelectCharacter: (characterId: string) => void;
}

export default function CharacterSelector({ onSelectCharacter }: CharacterSelectorProps) {
  return (
    <div className="flex-1 py-4 md:py-6 px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 relative overflow-hidden">
      {/* Timeline background gradient */}
      <TimelineBackground />

      <div className="w-full relative z-10">
        {/* Horizontal scrollable timeline container */}
        <div className="relative">
          {/* Desktop: Horizontal Timeline */}
          <div className="hidden lg:block">
            <div className="relative h-[600px] flex flex-col px-8">
              {/* Character cards - Top tier */}
              <div className="relative w-full flex justify-between pt-8 pb-12">
                {characterData.map((character, index) => (
                  <div
                    key={`card-${character.id}`}
                    className="relative flex-1 flex justify-center"
                  >
                    <div className="relative w-48 xl:w-56">
                      <CharacterCard
                        character={character}
                        onSelect={() => onSelectCharacter(character.id)}
                        index={index}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeline rail - Middle tier using shadcn Separator */}
              <div className="relative w-full">
                <Separator className="bg-border/60" />

                {/* Timeline nodes and connectors */}
                <div className="absolute top-0 left-0 right-0 h-px">
                  <div className="relative w-full h-full flex justify-between">
                    {characterData.map((character, index) => (
                      <div
                        key={`node-${character.id}`}
                        className="relative flex-1 flex justify-center"
                      >
                        {/* Timeline connector to next character */}
                        {index < characterData.length - 1 && (
                          <div className="absolute left-1/2 top-0 w-full h-px">
                            <TimelineConnector
                              fromEra={character.era}
                              toEra={characterData[index + 1].era}
                              delay={index * 0.2}
                            />
                          </div>
                        )}

                        {/* Timeline node */}
                        <TimelineNode
                          era={character.era}
                          delay={index * 0.1}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Era markers - Bottom tier */}
              <div className="relative w-full flex justify-between">
                {characterData.map((character, index) => (
                  <div
                    key={`marker-${character.id}`}
                    className="relative flex-1 flex justify-center"
                  >
                    <div className="relative">
                      <EraMarker
                        era={character.era}
                        eraLabel={character.eraLabel}
                        delay={index * 0.15}
                        className="relative -top-0"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tablet/Mobile: Responsive grid layout */}
          <div className="lg:hidden py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
              {characterData.map((character, index) => (
                <div
                  key={character.id}
                  className="relative"
                >
                  {/* Simplified timeline indicator */}
                  {index > 0 && index % 2 === 0 && (
                    <div className="absolute -top-2 left-0 right-0 flex items-center justify-center">
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-border/40 to-transparent" />
                    </div>
                  )}

                  <CharacterCard
                    character={character}
                    onSelect={() => onSelectCharacter(character.id)}
                    index={index}
                  />

                  {/* Era indicator dot */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1">
                    <div
                      className="w-2 h-2 rounded-full opacity-60"
                      style={{
                        backgroundColor: `oklch(var(--${character.era}))`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
