'use client';

import { Character } from '@/lib/character-data';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface CharacterProfileProps {
  character: Character;
}

export default function CharacterProfile({ character }: CharacterProfileProps) {
  const eraColors: Record<string, { bg: string; border: string; text: string; accent: string }> = {
    ancient: { bg: 'bg-amber-500/5', border: 'border-amber-500/30', text: 'text-amber-500', accent: 'bg-amber-500/10' },
    medieval: { bg: 'bg-gray-500/5', border: 'border-gray-500/30', text: 'text-gray-400', accent: 'bg-gray-500/10' },
    victorian: { bg: 'bg-purple-500/5', border: 'border-purple-500/30', text: 'text-purple-400', accent: 'bg-purple-500/10' },
    futurist: { bg: 'bg-cyan-500/5', border: 'border-cyan-500/30', text: 'text-cyan-400', accent: 'bg-cyan-500/10' },
    future_ai: { bg: 'bg-indigo-500/5', border: 'border-indigo-500/30', text: 'text-indigo-400', accent: 'bg-indigo-500/10' },
  };

  const eraStyle = eraColors[character.era];

  return (
    <motion.div
      className={`w-full md:w-72 lg:w-80 p-6 rounded-xl border ${eraStyle.border} ${eraStyle.bg} backdrop-blur-lg bg-card/50 shadow-lg max-h-[400px] md:max-h-[calc(100vh-200px)] overflow-y-auto`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Avatar */}
      <motion.div
        className={`relative w-24 h-24 rounded-lg mx-auto mb-4 overflow-hidden ${eraStyle.accent} border-2 ${eraStyle.border}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Image
          src={character.avatar}
          alt={character.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </motion.div>

      {/* Name and Era */}
      <motion.h2
        className={`text-xl font-bold text-center ${eraStyle.text} mb-1`}
        style={{ fontFamily: "'Cinzel', serif" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        {character.name}
      </motion.h2>
      <motion.p
        className="text-xs text-center text-foreground/60 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {character.eraLabel}
      </motion.p>

      {/* Backstory */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.25 }}
      >
        <h3 className="text-sm font-bold text-foreground/80 mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
          Backstory
        </h3>
        <p className="text-xs text-foreground/70 leading-relaxed">{character.backstory}</p>
      </motion.div>

      {/* Personality Traits */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <h3 className="text-sm font-bold text-foreground/80 mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
          Personality
        </h3>
        <div className="flex flex-wrap gap-2">
          {character.traits.map((trait, idx) => (
            <motion.span
              key={idx}
              className={`text-xs px-3 py-1 rounded-full ${eraStyle.accent} border ${eraStyle.border}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.35 + idx * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              {trait}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Expertise */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <h3 className="text-sm font-bold text-foreground/80 mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
          Areas of Expertise
        </h3>
        <ul className="text-xs text-foreground/70 space-y-1.5">
          {character.expertise.map((exp, idx) => (
            <motion.li
              key={idx}
              className="flex items-start gap-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.45 + idx * 0.05 }}
            >
              <span className={`mt-1 ${eraStyle.text}`}>→</span>
              <span>{exp}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
