'use client';

import { useState } from 'react';
import CharacterSelector from '@/components/character-selector';
import ChatInterface from '@/components/chat-interface';
import TimelineHero from '@/components/timeline-hero';
import { ThemeToggle } from '@/components/theme-toggle';
import { BackgroundLayers } from '@/components/background-layers';

export default function Home() {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  return (
    <main className="h-screen [height:100dvh] bg-background text-foreground flex flex-col overflow-hidden relative">
      <BackgroundLayers />
      {!selectedCharacter ? (
        <div className="flex-1 flex flex-col overflow-y-auto relative z-10">
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-50">
            <ThemeToggle />
          </div>
          <TimelineHero />
          <CharacterSelector onSelectCharacter={setSelectedCharacter} />
        </div>
      ) : (
        <ChatInterface characterId={selectedCharacter} onBack={() => setSelectedCharacter(null)} />
      )}
    </main>
  );
}
