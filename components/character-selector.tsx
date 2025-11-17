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

          {/* Tablet/Mobile: Scrollable horizontal cards */}
          <div className="lg:hidden overflow-x-auto timeline-scroll pb-8 -mx-4 px-4 snap-x snap-mandatory">
            <div className="flex gap-4 md:gap-6 min-w-max">
              {characterData.map((character, index) => (
                <div key={character.id} className="w-64 md:w-80 flex-shrink-0 snap-center">
                  <CharacterCard
                    character={character}
                    onSelect={() => onSelectCharacter(character.id)}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
