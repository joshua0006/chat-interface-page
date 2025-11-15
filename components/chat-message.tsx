'use client';

import { Character } from '@/lib/character-data';
import { motion } from 'framer-motion';

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
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        className={`max-w-[85%] sm:max-w-md md:max-w-lg px-4 py-3 rounded-2xl shadow-sm ${
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-md'
            : 'bg-card/80 backdrop-blur-sm border border-border/50 text-foreground rounded-bl-md'
        }`}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {!isUser && (
          <div className="flex items-center gap-2 mb-2 text-xs opacity-70">
            <span className="text-base">{eraIcons[character.era]}</span>
            <span className="font-medium">{character.name}</span>
            <span className="text-foreground/50 ml-auto text-[10px]">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        )}
        <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
        {isUser && (
          <div className="flex justify-end mt-1">
            <span className="text-[10px] opacity-60">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
