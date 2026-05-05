import React from 'react';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Page } from '@/src/types';

interface QuickStartFABProps {
  currentPage: Page;
  onStart: () => void;
}

export const QuickStartFAB: React.FC<QuickStartFABProps> = ({ currentPage, onStart }) => {
  // Hide in workout session and redemption page
  if (currentPage === 'workout_session' || currentPage === 'redemption' || currentPage === 'login') return null;

  return (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed bottom-28 right-6 z-50 pointer-events-none"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onStart}
        className="kinetic-gradient w-16 h-16 rounded-3xl flex flex-col items-center justify-center text-white shadow-2xl shadow-brand-primary/40 pointer-events-auto group border-4 border-white/20 backdrop-blur-sm"
      >
        <div className="relative font-display font-black text-[10px] tracking-tighter mb-0.5">
          GO
        </div>
        <Zap size={24} className="fill-current -mt-1 group-hover:animate-pulse" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-accent rounded-full border-2 border-white" />
      </motion.button>
    </motion.div>
  );
};
