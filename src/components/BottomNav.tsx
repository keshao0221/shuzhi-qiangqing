import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Dumbbell, Gamepad2, Users, User } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Page } from '@/src/types';

interface BottomNavProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onPageChange }) => {
  const tabs = [
    { id: 'stats', label: '首页', icon: Home },
    { id: 'training', label: '训练', icon: Dumbbell },
    { id: 'fun', label: '游戏', icon: Gamepad2 },
    { id: 'community', label: '社区', icon: Users },
    { id: 'profile', label: '我的', icon: User },
  ];

  // Hidden in workout session
  if (currentPage === 'workout_session') return null;

  return (
    <div className="fixed bottom-6 left-0 w-full z-[1000] px-6 pointer-events-none">
      <nav className="max-w-md mx-auto h-20 bg-white/80 backdrop-blur-2xl rounded-[2.5rem] border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.08)] flex justify-between items-center px-3 pointer-events-auto relative overflow-hidden">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentPage === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onPageChange(tab.id as Page)}
              className="flex-1 relative h-full flex flex-col items-center justify-center transition-all cursor-pointer group"
            >
              {/* Active Highlight Pill */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-x-1 inset-y-2 bg-brand-accent rounded-[1.8rem] z-0 shadow-sm"
                    transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
                  />
                )}
              </AnimatePresence>

              <div className="relative z-10 flex flex-col items-center gap-1">
                <motion.div
                  animate={{ 
                    y: isActive ? -1 : 0,
                    scale: isActive ? 1.05 : 1
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Icon
                    size={22}
                    className={cn(
                      "transition-colors duration-300",
                      isActive ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"
                    )}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </motion.div>
                <span className={cn(
                  "font-body font-bold text-[9px] uppercase tracking-widest transition-colors duration-300",
                  isActive ? "text-slate-900" : "text-slate-400"
                )}>
                  {tab.label}
                </span>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
