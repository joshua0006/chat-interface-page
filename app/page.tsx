'use client';

import { useState } from 'react';
import CharacterSelector from '@/components/character-selector';
import ChatInterface from '@/components/chat-interface';
import TimelineHero from '@/components/timeline-hero';
import { Navbar } from '@/components/navbar';

export default function Home() {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  return (
    <main className="h-screen [height:100dvh] bg-background text-foreground flex flex-col overflow-hidden">
      {!selectedCharacter && <Navbar />}
      {!selectedCharacter ? (
        <div className="flex-1 flex flex-col overflow-y-auto">
          <TimelineHero />
          <CharacterSelector onSelectCharacter={setSelectedCharacter} />
        </div>
      ) : (
        <ChatInterface characterId={selectedCharacter} onBack={() => setSelectedCharacter(null)} />
      )}
    </main>
  );
}
