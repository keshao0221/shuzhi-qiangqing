/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Page } from './types';
import { Login } from './pages/Login';
import { Training } from './pages/Training';
import { Stats } from './pages/Stats';
import { Community } from './pages/Community';
import { Profile } from './pages/Profile';
import { Fun } from './pages/Fun';
import { Redemption } from './pages/Redemption';
import { WorkoutSession } from './pages/WorkoutSession';
import { Settings } from './pages/Settings';
import { BottomNav } from './components/BottomNav';
import { QuickStartFAB } from './components/QuickStartFAB';
import { ToastProvider } from './context/ToastContext';
import { UserProvider, useUser } from './context/UserContext';

function AppContent() {
  const { isLoggedIn, user, login, logout } = useUser();
  const [currentPage, setCurrentPage] = useState<Page>('stats');
  const [loginType, setLoginType] = useState<'wechat' | 'email' | null>(null);

  const handleLogin = async (type: 'wechat' | 'email', userData?: any) => {
    setLoginType(type);
    if (userData) {
      await login(userData);
    } else {
      await login({
        id: 'user-' + Date.now(),
        name: type === 'wechat' ? '微信用户' : '邮箱用户',
        points: 100,
      });
    }
    setCurrentPage('stats');
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('stats');
  };

  const points = user?.points || 1250;

  const renderPage = () => {
    switch (currentPage) {
      case 'stats': return <Stats />;
      case 'training': return (
        <Training 
          onStart={() => setCurrentPage('workout_session')} 
        />
      );
      case 'fun': return <Fun />;
      case 'community': return <Community />;
      case 'profile': return <Profile onLogout={handleLogout} loginType={loginType} onRedeem={() => setCurrentPage('redemption')} onSettings={() => setCurrentPage('settings')} points={points} />;
      case 'redemption': return <Redemption onBack={() => setCurrentPage('profile')} userPoints={points} onPointsUpdate={() => {}} />;
      case 'workout_session': return (
        <WorkoutSession 
          onBack={() => setCurrentPage('training')} 
        />
      );
      case 'settings': return <Settings onBack={() => setCurrentPage('profile')} />;
      default: return <Stats />;
    }
  };

  if (!isLoggedIn) {
    return (
      <ToastProvider>
        <Login onLogin={handleLogin} />
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-brand-surface selection:bg-brand-accent selection:text-brand-primary">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>

        <BottomNav 
          currentPage={currentPage} 
          onPageChange={(page) => setCurrentPage(page)} 
        />

        <QuickStartFAB 
          currentPage={currentPage}
          onStart={() => setCurrentPage('workout_session')}
        />
      </div>
    </ToastProvider>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}