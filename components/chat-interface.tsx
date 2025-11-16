'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { characterData } from '@/lib/character-data';
import ChatMessage from './chat-message';
import CharacterProfile from './character-profile';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Sparkles, MessageCircle, User } from 'lucide-react';
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
      className="flex-1 flex flex-col bg-background overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Premium Header */}
      <motion.div
        className={`relative border-b ${eraStyle.border} backdrop-blur-lg bg-background/50 overflow-hidden`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Decorative gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-r ${eraStyle.bg} opacity-30`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.1),transparent_50%)]" />

        <div className="relative w-full px-4 md:px-6 lg:px-8 xl:px-12 py-4 md:py-5">
          {/* Back Button */}
          <motion.button
            onClick={onBack}
            className="text-xs md:text-sm text-foreground/60 hover:text-foreground transition-colors mb-3 flex items-center gap-2 group"
            whileHover={{ x: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 group-hover:scale-110 transition-transform" />
            <span>Back to Characters</span>
          </motion.button>

          {/* Main Header Content */}
          <div className="flex items-center justify-between gap-4">
            {/* Left: Avatar + Character Info */}
            <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
              {/* Avatar with Glow */}
              <motion.div
                className="relative flex-shrink-0"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* Animated glow ring */}
                <motion.div
                  className={`absolute -inset-2 rounded-lg ${eraStyle.bg} opacity-50 blur-md`}
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Avatar */}
                <div className={`relative w-12 h-12 md:w-16 md:h-16 rounded-lg ${eraStyle.bg} border-2 ${eraStyle.border} overflow-hidden backdrop-blur-sm shadow-lg`}>
                  <Image
                    src={character.avatar}
                    alt={character.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 48px, 64px"
                    priority
                  />
                </div>
              </motion.div>

              {/* Character Info */}
              <div className="flex-1 min-w-0">
                {/* Character Name with Gradient */}
                <div className="flex items-center gap-2 mb-1">
                  <motion.h1
                    className={`text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent truncate`}
                    style={{ fontFamily: "'Cinzel', serif" }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    {character.name}
                  </motion.h1>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <Sparkles className={`w-4 h-4 md:w-5 md:h-5 ${eraStyle.text}`} />
                  </motion.div>
                </div>

                {/* Era Label Badge */}
                <motion.div
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${eraStyle.bg} border ${eraStyle.border} backdrop-blur-sm text-xs ${eraStyle.text} font-medium mb-1.5`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                >
                  <span>{character.eraLabel}</span>
                </motion.div>

                {/* Status Indicator */}
                <motion.div
                  className="flex items-center gap-2 text-xs text-foreground/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <div className="flex items-center gap-1.5">
                    <motion.div
                      className={`w-1.5 h-1.5 rounded-full ${eraStyle.text.replace('text-', 'bg-')}`}
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="hidden sm:inline">Active conversation</span>
                  </div>
                  <span className="hidden md:inline text-foreground/40">•</span>
                  <div className="hidden md:flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>{messages.length} {messages.length === 1 ? 'message' : 'messages'}</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <ThemeToggle />
              <motion.button
                onClick={() => setShowProfile(!showProfile)}
                className={`px-3 md:px-4 py-2 rounded-lg border transition-all text-xs md:text-sm font-medium flex items-center gap-2 ${
                  showProfile
                    ? `border-current ${eraStyle.text} bg-current/10 shadow-lg shadow-current/20`
                    : 'border-border text-foreground/60 hover:border-foreground/50 hover:bg-card/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <User className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span className="hidden sm:inline">{showProfile ? 'Hide' : 'Show'}</span>
                <span className="hidden lg:inline">Profile</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Gradient border bottom */}
        <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent`} />
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
