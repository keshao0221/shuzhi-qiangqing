import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Gift, GraduationCap, Coins, ShoppingBag, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { cn } from '@/src/lib/utils';

interface RedemptionProps {
  onBack: () => void;
  userPoints: number;
  onPointsUpdate: (points: number) => void;
}

export const Redemption: React.FC<RedemptionProps> = ({ onBack, userPoints, onPointsUpdate }) => {
  const { showToast } = useToast();

  const handleRedeemStudyHours = async (hours: number, cost: number) => {
    if (userPoints < cost) {
      showToast('积分不足', 'error');
      return;
    }

    try {
      // 模拟接入教务系统接口
      showToast(`正在链接教务系统...`, 'info');
      
      // 模拟延迟
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onPointsUpdate(userPoints - cost);
      showToast(`成功兑换 ${hours} 学时！已同步至教务系统。`, 'success');
    } catch (error) {
      showToast('兑换失败，请稍后重试', 'error');
    }
  };

  const handleRedeemProduct = (name: string, cost: number) => {
    if (userPoints < cost) {
      showToast('积分不足', 'error');
      return;
    }
    onPointsUpdate(userPoints - cost);
    showToast(`成功兑换 ${name}！请前往校内服务点领取。`, 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Header */}
      <header className="bg-white px-6 pt-12 pb-6 border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:text-slate-900 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-black tracking-tight">积分兑换系统</h2>
        </div>
        <div className="flex items-center gap-2 bg-brand-accent/30 px-3 py-1.5 rounded-full">
          <Coins size={16} className="text-brand-primary" />
          <span className="text-sm font-black text-brand-primary">{userPoints.toLocaleString()}</span>
        </div>
      </header>

      <div className="px-6 py-8 max-w-2xl mx-auto space-y-8">
        {/* Study Hours Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="text-brand-primary" size={20} />
            <h3 className="font-bold text-slate-900">学时兑换</h3>
            <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold">教务系统直连</span>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {[
              { hours: 1, cost: 200 },
              { hours: 3, cost: 500 },
              { hours: 5, cost: 800 },
            ].map((item) => (
              <motion.div 
                key={item.hours}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRedeemStudyHours(item.hours, item.cost)}
                className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.hours} 课外学时</h4>
                    <p className="text-xs text-slate-400">自动同步个人教务档案</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-slate-50 px-4 py-2 rounded-xl group-hover:bg-brand-primary group-hover:text-white transition-colors">
                  <span className="text-sm font-black">{item.cost}</span>
                  <span className="text-[10px] font-bold">积分</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Physical Products */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag className="text-brand-primary" size={20} />
            <h3 className="font-bold text-slate-900">实物奖品</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {[
              { name: '数智强青定制护腕', cost: 150, image: 'https://images.unsplash.com/photo-1510017070194-2228800994f2?auto=format&fit=crop&q=80&w=300&h=300' },
              { name: '智能运动水壶', cost: 450, image: 'https://images.unsplash.com/photo-1602143307507-96c21e64627d?auto=format&fit=crop&q=80&w=300&h=300' },
              { name: '专业阻力带套装', cost: 600, image: 'https://images.unsplash.com/photo-1544033527-b192daee1f5b?auto=format&fit=crop&q=80&w=300&h=300' },
            ].map((product) => (
              <motion.div 
                key={product.name}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRedeemProduct(product.name, product.cost)}
                className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-sm">{product.name}</h4>
                  <div className="flex items-center gap-1 text-brand-primary mt-1">
                    <Coins size={12} />
                    <span className="text-sm font-black">{product.cost}</span>
                  </div>
                </div>
                <ChevronRight className="text-slate-300 group-hover:text-brand-primary transition-colors" />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
