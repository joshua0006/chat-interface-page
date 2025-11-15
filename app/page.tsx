'use client';

import { useState } from 'react';
import CharacterSelector from '@/components/character-selector';
import ChatInterface from '@/components/chat-interface';
import TimelineHero from '@/components/timeline-hero';
import { Navbar } from '@/components/navbar';

export default function Home() {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {!selectedCharacter && <Navbar />}
      {!selectedCharacter ? (
        <>
          <TimelineHero />
          <CharacterSelector onSelectCharacter={setSelectedCharacter} />
        </>
      ) : (
        <ChatInterface characterId={selectedCharacter} onBack={() => setSelectedCharacter(null)} />
      )}
    </main>
  );
}
