import React from 'react';
import { motion } from 'motion/react';
import { Timer, Flame, Plus, ArrowRight, Dumbbell, Move, Tent } from 'lucide-react';
import { BarChart, Bar, Cell, ResponsiveContainer, XAxis } from 'recharts';
import { cn } from '@/src/lib/utils';
import { useToast } from '../context/ToastContext';

const DATA = [
  { name: '周一', value: 30 },
  { name: '周二', value: 55 },
  { name: '周三', value: 40 },
  { name: '周四', value: 85 },
  { name: '周五', value: 65 },
  { name: '周六', value: 20 },
  { name: '周日', value: 45 },
];

export const Stats: React.FC = () => {
  const { showToast } = useToast();

  const handleDevFeature = () => {
    showToast('该功能正在火热开发中...', 'info');
  };

  return (
    <div className="pb-32 flex flex-col pt-12">
      <section className="px-6 py-4">
        <div className="flex items-end justify-between mb-8">
          <h1 className="font-display text-4xl font-bold tracking-tighter">训练概览</h1>
          <div className="flex bg-slate-200 rounded-full p-1">
            <button className="bg-white text-brand-primary font-bold text-xs px-4 py-1.5 rounded-full shadow-sm">本周</button>
            <button 
              onClick={handleDevFeature}
              className="text-slate-500 text-xs px-4 py-1.5 rounded-full hover:bg-white transition-colors"
            >
              本月
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="col-span-2 bg-white rounded-[32px] p-6 shadow-sm relative overflow-hidden flex flex-col min-h-[320px]"
          >
            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 font-bold">累计训练时长</h3>
              <div className="font-display text-5xl font-black tracking-tighter">
                12,450 <span className="text-xl text-slate-400 font-bold tracking-normal">小时</span>
              </div>
            </div>

            <div className="flex-grow mt-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DATA}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} 
                    dy={10}
                  />
                  <Bar 
                    dataKey="value" 
                    radius={[8, 8, 0, 0]}
                    animationDuration={1500}
                    animationBegin={300}
                  >
                    {DATA.map((entry, index) => (
                      <Cell key={index} fill={index === 3 ? '#0058bb' : '#6c9fff'} opacity={index === 3 ? 1 : 0.6} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <div className="bg-white rounded-[24px] p-6 shadow-sm flex flex-col justify-between h-[132px]">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
              <Timer size={20} className="text-slate-500" />
            </div>
            <div>
              <div className="font-display text-3xl font-bold tracking-tighter">4小时 <span className="text-lg text-slate-400">20分</span></div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">活跃时间</div>
            </div>
          </div>

          <div className="bg-brand-accent rounded-[24px] p-6 shadow-lg shadow-brand-accent/20 flex flex-col justify-between h-[132px]">
            <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
              <Flame size={20} className="text-brand-primary" fill="currentColor" />
            </div>
            <div>
              <div className="font-display text-4xl font-black tracking-tighter text-brand-primary">1,200</div>
              <div className="text-[10px] uppercase tracking-widest text-brand-primary opacity-80 font-bold">卡路里消耗 (千卡)</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-[#eff1f2] px-6 py-10 rounded-t-[40px] flex-grow">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tighter">自定义计划</h2>
            <p className="text-xs text-slate-500 mt-1 font-bold">你的专属训练队列</p>
          </div>
          <button 
            onClick={handleDevFeature}
            className="bg-brand-primary text-white rounded-full px-5 py-3 flex items-center gap-2 shadow-lg active:scale-95 transition-transform"
          >
            <Plus size={16} />
            <span className="font-bold text-sm">新计划</span>
          </button>
        </div>

        <div className="space-y-4">
          <PlanCard onClick={handleDevFeature} title="力量爆发 A组" exercises="深蹲 ● 硬拉 ● 卧推" icon={<Dumbbell className="text-brand-primary" />} active />
          <PlanCard onClick={handleDevFeature} title="核心耐力 B组" exercises="波比跳 ● 平板支撑 ● 冲刺" icon={<Move className="text-slate-500" />} />
          <PlanCard onClick={handleDevFeature} title="拉伸与恢复" exercises="动态拉伸 ● 泡沫轴放松" icon={<Tent className="text-slate-500" />} opacity={0.7} />
        </div>
      </section>
    </div>
  );
};

interface PlanCardProps {
  title: string;
  exercises: string;
  icon: React.ReactNode;
  active?: boolean;
  opacity?: number;
  onClick?: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ title, exercises, icon, active, opacity, onClick }) => (
  <motion.div 
    whileHover={{ y: -4 }}
    onClick={onClick}
    className={cn(
      "bg-white rounded-[24px] p-5 flex items-center gap-5 shadow-sm transition-all cursor-pointer group",
      opacity ? `opacity-[${opacity}]` : ""
    )}
    style={{ opacity }}
  >
    <div className={cn(
      "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0",
      active ? "bg-brand-primary/10" : "bg-slate-100"
    )}>
      {icon}
    </div>
    <div className="flex-grow">
      <h4 className="font-display text-lg font-bold tracking-tight">{title}</h4>
      <p className="text-sm text-slate-500 flex items-center gap-2">
        {exercises}
      </p>
    </div>
    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-colors">
      <ArrowRight size={16} />
    </div>
  </motion.div>
);
