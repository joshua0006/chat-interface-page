'use client';

import { Character } from '@/lib/character-data';
import Image from 'next/image';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  character: Character;
  index?: number;
}

export default function ChatMessage({ message, character, index = 0 }: ChatMessageProps) {
  const eraIcons: Record<string, string> = {
    ancient: '⚱',
    medieval: '⚔',
    victorian: '🎩',
    futurist: '🚀',
    future_ai: '⚡',
  };

  const isUser = message.role === 'user';

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      {isUser ? (
        <div
          className="max-w-[85%] px-4 py-3 rounded-2xl shadow-sm bg-primary text-primary-foreground rounded-br-md"
        >
          <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
          <div className="flex justify-end mt-1">
            <span className="text-[10px] opacity-60">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex gap-3 items-start max-w-[85%]">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-card border border-border overflow-hidden">
            <Image
              src={character.avatar}
              alt={character.name}
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <div
            className="flex-1 px-4 py-3 rounded-2xl shadow-sm bg-card/80 backdrop-blur-sm border border-border/50 text-foreground rounded-bl-md"
          >
            <div className="flex items-center gap-2 mb-2 text-xs opacity-70">
              <span className="text-base">{eraIcons[character.era]}</span>
              <span className="font-medium">{character.name}</span>
              <span className="text-foreground/50 ml-auto text-[10px]">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}
