import React from 'react';
import { motion } from 'motion/react';
import { Play, Sparkles, Activity, Timer, ArrowRight, Zap, Target, Heart, Scale } from 'lucide-react';
import { Page } from '@/src/types';
import { cn } from '@/src/lib/utils';
import { useToast } from '../context/ToastContext';

export const Fun: React.FC = () => {
  const { showToast } = useToast();

  const handleDevFeature = () => {
    showToast('该游戏正在火热开发中，敬请期待！', 'info');
  };

  return (
    <div className="pb-32 px-6 pt-12 max-w-2xl mx-auto">
      <header className="mb-8">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500 mb-2">数智强青趣动空间</p>
        <h2 className="text-5xl font-display font-extrabold tracking-tighter">趣味运动</h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Large Hero Game Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={handleDevFeature}
          className="md:col-span-12 bg-white rounded-[2.5rem] flex flex-col justify-between hover:shadow-xl group relative overflow-hidden p-8 h-[380px] shadow-sm cursor-pointer"
        >
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-brand-accent px-4 py-1.5 rounded-full mb-8">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-primary animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">热门推荐</span>
            </div>
            <h3 className="text-4xl font-black tracking-tight mb-3">深蹲大挑战</h3>
            <p className="text-slate-500 max-w-xs font-medium leading-relaxed">
              结合 AI 姿态识别，在限定时间内完成精准深蹲，挑战你的爆发力。
            </p>
          </div>
          
          <div className="mt-auto relative z-10 flex items-center justify-between">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-primary hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-brand-primary/20"
            >
              开始挑战
            </motion.button>
            <div className="text-right">
              <span className="block text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">最高记录</span>
              <span className="text-3xl font-black text-brand-primary tracking-tighter">88 次</span>
            </div>
          </div>

          <div className="absolute right-[-10%] top-1/4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
            <Activity size={400} className="text-brand-primary" />
          </div>
        </motion.div>

        {/* Achievement Card */}
        <div className="md:col-span-12 bg-brand-primary text-white rounded-[2.5rem] p-8 mt-4 shadow-xl shadow-brand-primary/10 flex flex-col justify-between min-h-[160px] relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold mb-1">今日成就</h3>
              <p className="text-white/60 text-sm font-medium">运动从未如此有趣</p>
            </div>
            <Sparkles size={24} className="text-brand-accent" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <div className="text-5xl font-black tracking-tighter">1200</div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">消耗卡路里 (千卡)</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-3">
              <div className="bg-brand-accent text-brand-primary p-1 rounded-full">
                <Sparkles size={14} fill="currentColor" />
              </div>
              <span className="text-sm font-bold">击败了 92% 的用户</span>
            </div>
          </div>
        </div>

        {/* Small Game Grid */}
        <div className="md:col-span-12 grid grid-cols-2 gap-4 mt-4">
          <GameCard onClick={handleDevFeature} icon={<Scale className="text-brand-primary" />} title="平板支撑平衡" level="中等" />
          <GameCard onClick={handleDevFeature} icon={<Activity className="text-brand-primary" />} title="原地冲刺王" level="困难" />
          <GameCard onClick={handleDevFeature} icon={<Play className="text-brand-primary" />} title="开合跳节奏" level="简单" fill />
          <GameCard onClick={handleDevFeature} icon={<Heart className="text-brand-primary" />} title="心率跳绳" level="中等" />
        </div>
      </div>
    </div>
  );
};

const GameCard: React.FC<{ title: string; level: string; icon: React.ReactNode; fill?: boolean; onClick?: () => void }> = ({ title, level, icon, fill, onClick }) => (
  <motion.div 
    whileHover={{ y: -4 }}
    onClick={onClick}
    className="bg-white rounded-[2.5rem] p-6 shadow-sm flex flex-col group cursor-pointer"
  >
    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-colors">
      {React.cloneElement(icon as React.ReactElement, { size: 24, fill: fill ? "currentColor" : "none" })}
    </div>
    <h4 className="text-lg font-bold mb-1 tracking-tight">{title}</h4>
    <p className="text-xs text-slate-400 mb-4 font-bold tracking-widest uppercase">保持重心，平衡测试</p>
    <div className="flex items-center justify-between mt-auto">
      <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">难易度: {level}</span>
      <ArrowRight size={16} className="text-slate-300 group-hover:text-brand-primary transition-colors" />
    </div>
  </motion.div>
);
