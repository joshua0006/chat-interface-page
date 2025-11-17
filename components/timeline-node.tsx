'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TimelineNodeProps {
  era: string;
  delay?: number;
}

const eraStyles = {
  ancient: 'bg-amber-500 border-amber-600',
  medieval: 'bg-gray-500 border-gray-600',
  victorian: 'bg-purple-500 border-purple-600',
  futurist: 'bg-cyan-500 border-cyan-600',
  future_ai: 'bg-indigo-500 border-indigo-600',
};

export function TimelineNode({ era, delay = 0 }: TimelineNodeProps) {
  const style = eraStyles[era as keyof typeof eraStyles] || eraStyles.ancient;

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay,
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
      >
        <div
          className={cn(
            'w-3 h-3 rounded-full border-2 border-background shadow-sm',
            style
          )}
        />
      </motion.div>
    </div>
  );
}
