'use client';

import { useState, useRef, useEffect } from 'react';
import { characterData } from '@/lib/character-data';
import ChatMessage from './chat-message';
import CharacterProfile from './character-profile';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

interface ChatInterfaceProps {
  characterId: string;
  onBack: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatInterface({ characterId, onBack }: ChatInterfaceProps) {
  const character = characterData.find(c => c.id === characterId)!;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with character greeting
  useEffect(() => {
    const greeting: Message = {
      id: '0',
      role: 'assistant',
      content: character.greeting,
      timestamp: new Date(),
    };
    setMessages([greeting]);
  }, [character]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate character response with personality
    setTimeout(() => {
      const responses = character.sampleResponses;
      const responseText = responses[Math.floor(Math.random() * responses.length)];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 800);
  };

  const eraColors: Record<string, { bg: string; border: string; text: string }> = {
    ancient: { bg: 'bg-amber-500/5', border: 'border-amber-500/30', text: 'text-amber-500' },
    medieval: { bg: 'bg-gray-500/5', border: 'border-gray-500/30', text: 'text-gray-400' },
    victorian: { bg: 'bg-purple-500/5', border: 'border-purple-500/30', text: 'text-purple-400' },
    futurist: { bg: 'bg-cyan-500/5', border: 'border-cyan-500/30', text: 'text-cyan-400' },
    future_ai: { bg: 'bg-indigo-500/5', border: 'border-indigo-500/30', text: 'text-indigo-400' },
  };

  const eraStyle = eraColors[character.era];

  return (
    <motion.div
      className="h-screen flex flex-col bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <motion.div
        className={`border-b ${eraStyle.border} ${eraStyle.bg} backdrop-blur-lg bg-background/50`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 py-4 flex items-center justify-between">
          <div>
            <motion.button
              onClick={onBack}
              className="text-sm text-foreground/60 hover:text-foreground transition-colors mb-2 flex items-center gap-2"
              whileHover={{ x: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Characters
            </motion.button>
            <h1 className="text-xl md:text-2xl font-bold" style={{ fontFamily: "'Cinzel', serif" }}>
              {character.name}
            </h1>
            <p className={`text-xs ${eraStyle.text}`}>{character.eraLabel}</p>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle />
            <motion.button
              onClick={() => setShowProfile(!showProfile)}
              className={`px-3 md:px-4 py-2 rounded-lg border transition-all text-sm ${
                showProfile
                  ? `border-current ${eraStyle.text} bg-current/10`
                  : 'border-border text-foreground/60 hover:border-foreground/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {showProfile ? 'Hide Profile' : 'Show Profile'}
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="flex-1 overflow-hidden flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 w-full px-4 md:px-6 lg:px-8 xl:px-12 py-4 md:py-6">
        {/* Chat Messages */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto pr-2 md:pr-4 space-y-2">
            {messages.map((message, index) => (
              <ChatMessage key={message.id} message={message} character={character} index={index} />
            ))}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  className="flex justify-start py-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="flex gap-2 px-4 py-3 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-primary"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-primary"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                    />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-primary"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <motion.form
            onSubmit={handleSendMessage}
            className="mt-4 md:mt-6 flex gap-2 md:gap-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your question..."
              className="flex-1 px-4 py-3 rounded-xl bg-card/50 backdrop-blur-sm border border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              disabled={isLoading}
            />
            <motion.button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 md:px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="hidden sm:inline">Send</span>
              <Send className="w-4 h-4" />
            </motion.button>
          </motion.form>
        </div>

        {/* Character Profile Sidebar */}
        <AnimatePresence>
          {showProfile && <CharacterProfile character={character} />}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
