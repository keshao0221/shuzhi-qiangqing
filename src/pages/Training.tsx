import React from 'react';
import { motion } from 'motion/react';
import { Play, Check, Trophy, Plus, Circle } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Exercise } from '@/src/types';
import { useToast } from '../context/ToastContext';

const MOCK_EXERCISES: Exercise[] = [
  { id: '1', name: '深蹲训练 (Deep Squat)', sets: '3 组', reps: '15 次', tag: '核心增强', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAs7gYkGj5EsyAP7fdoIKPYcaGOjNQxwMIHDjVmTFPiarA7116R0tJ8yVMtuBQSs8YiBu172qQhI7de4IxN2EVgsOsKdU5zmVHIH-xvQoZRfTdxlt_DENnTRVmfGxbCH17a_Q91lhvdWGp20NudawUfE_uMMiCrSBlLmSG3SUMUJXjp_kQrYadGwBe7RJHCYuQ8eYaizgg3NDKbptHHnQyE1YcngczsGbwP_-81ikYhtnqit3UAQkoXauSEY17dOnMlQZIcDBOKbns', completed: true },
  { id: '2', name: '开合跳 (Jumping Jacks)', sets: '2 组', time: '45 秒', tag: '有氧燃脂', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDf6bEONWNsX-pJuNWuurQt6x1PmC8sD_QSPv_LhwRIQVRsloyfsshTDjHcrFzE19p0zCZJogudIaSupShpraZ87kz_e0uWBfsJNEKe7QPbm_7STrN1yYnOJIqjxchvc44wQC-mbJB_c8pnIO_JgN10qMpIA5aOOcOf6cqD0GZOImw1tBup1GaYzbx_CFejVRrbUIQ2VqLP_c7VXwwqnC6gosgyLrN0fdKvzZuZeIXHfLdCc1jSsob8I_em-oahLsonmgJUVb7d9Fg', completed: false },
  { id: '3', name: '平板支撑 (Plank)', sets: '3 组', time: '60 秒', tag: '核心稳定', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA10oFfEnsGKZ3Fh3VAS1duhwrytbF8NSaYBAcBp2Z4IJD3yzYo_BhbbtcLuxsdHKcUijG62i2uRb8SWKL37X6l-S4ynY9fJdUeKVshm6QNfrvckeqnq2Jz-M7YW00VneW75pG-JvnfSOO-m2UAGKARtr4jIEKRVus1xdQaBxVxeKr2uWetCsy0RWaW46HNec4at_v68Ll8c-wNsqGC4kUkGiALR9pBlBYnexIPepn0W_F_HTvsV_Rx5eGFDRJXQA6pUJvZRTlqeXM', completed: false },
];

interface TrainingProps {
  onStart?: () => void;
}

export const Training: React.FC<TrainingProps> = ({ onStart }) => {
  const { showToast } = useToast();

  const handleDevFeature = () => {
    showToast('该功能正在火热开发中...', 'info');
  };

  return (
    <div className="pb-32 px-6 max-w-2xl mx-auto pt-10">
      <header className="flex items-center justify-between mb-8">
        <h2 className="font-display font-bold text-2xl tracking-tight">今日训练清单</h2>
        <button 
          onClick={handleDevFeature}
          className="text-brand-primary text-sm font-semibold cursor-pointer active:scale-95 transition-all"
        >
          编辑计划
        </button>
      </header>

      <section className="space-y-4">
        {MOCK_EXERCISES.map((ex, idx) => (
          <motion.div
            key={ex.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={handleDevFeature}
            className="bg-white p-4 rounded-3xl flex items-center gap-4 transition-all hover:scale-[1.02] shadow-sm cursor-pointer active:bg-slate-50"
          >
            <div className="w-16 h-16 rounded-2xl bg-brand-surface overflow-hidden shrink-0">
              <img src={ex.image} alt={ex.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-grow">
              <h4 className="font-bold text-[#2c2f30]">{ex.name}</h4>
              <p className="text-xs text-slate-500 font-medium mt-1">
                {ex.sets} × {ex.reps || ex.time} • {ex.tag}
              </p>
            </div>
            <div className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full transition-colors",
              ex.completed ? "bg-brand-accent text-brand-primary" : "bg-slate-100 text-slate-400"
            )}>
              {ex.completed ? <Check size={18} /> : <Circle size={18} />}
            </div>
          </motion.div>
        ))}
      </section>

      <section className="mt-10 mb-10">
        <motion.button 
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="w-full kinetic-gradient p-8 rounded-[2.5rem] flex items-center justify-between group shadow-xl shadow-brand-primary/20 cursor-pointer"
        >
          <div className="text-left text-white">
            <p className="text-[10px] uppercase tracking-widest opacity-80 mb-1">Ready for Action?</p>
            <h3 className="font-display font-bold text-3xl tracking-tight">开始训练</h3>
            <p className="text-sm opacity-90 mt-1">AI 核心模式已就绪</p>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-full p-4 group-hover:translate-x-1 transition-transform">
            <Play size={32} className="text-white fill-current" />
          </div>
        </motion.button>
      </section>

      <section 
        onClick={handleDevFeature}
        className="bg-[#eff1f2] rounded-[2rem] p-6 mb-10 overflow-hidden relative cursor-pointer active:bg-slate-200 transition-colors group"
      >
        <div className="relative z-10">
          <h3 className="font-display font-bold text-lg mb-2">本周达成奖励</h3>
          <p className="text-sm text-slate-600 max-w-[200px]">再完成 2 天训练即可获得 “运动达人” 勋章</p>
          <div className="mt-4 flex gap-2">
            {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-brand-accent" />)}
            {[1, 2].map(i => <div key={i} className="w-2 h-2 rounded-full bg-slate-300" />)}
          </div>
        </div>
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-brand-accent/10 rounded-full blur-2xl group-hover:scale-110 transition-transform" />
        <Trophy size={80} className="absolute right-6 top-6 text-brand-accent opacity-30" />
      </section>

    </div>
  );
};
