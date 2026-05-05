import React from 'react';
import { motion } from 'motion/react';
import { Heart, MessageCircle, Timer, Plus } from 'lucide-react';
import { Post } from '@/src/types';
import { cn } from '@/src/lib/utils';
import { useToast } from '../context/ToastContext';

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    user: { name: '张小雅', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwYbi3ftll25KkZp--yAyMXqIcXwPJp1lA3f7cltLUGW7tpIrrKbhxF5ojEnirMKispQo8YjY9XmdlQyT-4idhZ7z4MUluyDHwOtSTIQ6xzPUF41BPQWJ4xlkgteNJwNRQs6YZm2PSTeQUUQDSgF7xIEcVN-_FVSSojP-fhaCHyMR3Dc8c5zgyxDXkoTJRi2tRta9Fpe8zQhQYuTKjnS4aOUPSRFvpuscpCEF5RWm0I1AFWlxhMMSvWGpPMbk5Cc6itg_fho1CRgQ' },
    time: '2小时前',
    tag: '瑜伽',
    content: '刚完成30分钟瑜伽！开启清晰活力的一天。强烈推荐这个晨间流挑战。🧘‍♀️✨',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBykySm_l9vhLctet_wfKv-BcFOxKkV76R37WDwklsWmkrA7H1uaTW9dJkXaQZYeDJtC6epE2JD2vai997XM1mdSs0Bnxomc76RB0jXxN41m4tRXHq1pcroIqeBuP0xUH1qkpltojxPh5jaYgDpAe-iL4BsnP1vsZ5HBlrOTKBeS0W2WbE0JjSjB1ZfbdRx3Ksbt6nqbZKkxZpzAT5qrnw0oHNFEpJGB2R4YCP5e5pKjpJ8Z49NUc4KXqfJ7NTSsXPX6TyjluiGvC4',
    likes: 124,
    comments: 18,
    duration: '30 min'
  },
  {
    id: '2',
    user: { name: '吴大卫', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUmCafpx7TZEbBWkqDgGGUErr_jyzcVEwsdE61hCPnxblp0N_lN_D79sfIp2qqZhVIP2Ri0_cQ2C5Fj96aPPymZIKLF1JNN27ZXxYwwNPVaEnUrlqIvY9J0uXlqIt-ytamQpwjo6yqjbJ8YsH08R0lFma5qxctLI5xu1edL9-JkQgoB4P1bAW9rbPfqLcBkyUnA3xjTPqjF4NFulHIBHG_iAsECbQXPA0TSBxNqluso27IRn9aEfogmfelc4szZDa05_Xugf6Bj6E' },
    time: '5小时前',
    tag: '跑步',
    content: '今天冲刺了最后一英里。刷新了个人纪录！感觉充满力量。#永不言弃',
    likes: 89,
    comments: 12,
    duration: '45 min'
  }
];

export const Community: React.FC = () => {
  const { showToast } = useToast();

  const handleDevFeature = () => {
    showToast('社区功能正在升级中，很快就能互动啦！', 'info');
  };

  return (
    <div className="pb-32 pt-12 max-w-2xl mx-auto">
      <section className="px-6 mb-8">
        <div className="flex justify-between items-end mb-4">
          <h2 className="font-display font-extrabold text-3xl tracking-tight">热门挑战</h2>
          <span 
            onClick={handleDevFeature}
            className="text-brand-primary font-semibold text-sm cursor-pointer hover:underline"
          >
            查看全部
          </span>
        </div>
        
        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar -mx-6 px-6">
          <ChallengePreview 
            onClick={handleDevFeature}
            title="21天瑜伽流" 
            participants="1.2k" 
            badge="Active" 
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuAyu8aqBOgLzCPoyjHFqJZinjYrhCI8QsED6SyXvpVMTQTEqScbkELHa_hR9wmN5sfSwVS8rT5upPHZZuKdD6JTR11MrGQq0EXys0EnMiKtipm_l_626Pf1xcZwBLS_NFnuz7j60I3z8A0pRpxgmpJlZhtGae3QHFKgPp67JJIegJqOMND3pvnmXulKWci-6sHyn3S1yWYbyzx5nTemmuZqUWokyJbwOfTPekuBZpll0izqdSfbwSbvH1LejLbHoAoNR0H5Geay9iU" 
          />
          <ChallengePreview 
            onClick={handleDevFeature}
            title="晨间精英冲刺" 
            participants="856" 
            badge="Popular" 
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuBNJoNennw62iG5-AZPkR_OzHY_IDgcLgGT1hxypxiWB8s5if-wc5Bf-Mwpz42tbmwCAXgF4TMfUVvwS2uvyNCmasDmq2x96h0RhILqHzV3vj8TT_GqgMtjb0r0vdU-9pTTFo6bSJ_DeN34EgZysVw0CL1G6N7D4VuVl7mJrI0gkK72a13p_iFhi9_RE5J-TpdKJq0j-vt5uUjbZuUhm71UnFjC947FrN1YVcC4w5gWCao7pk8nhwQw1nyNIhkQj-awF_v5VWt2TxI" 
          />
        </div>
      </section>

      <section className="px-6 space-y-6">
        <h2 className="font-display font-extrabold text-3xl tracking-tight mb-4">动态</h2>
        {MOCK_POSTS.map(post => (
          <article key={post.id} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <img src={post.user.avatar} className="w-11 h-11 rounded-full object-cover" alt={post.user.name} />
                <div>
                  <p className="font-display font-bold text-base">{post.user.name}</p>
                  <p className="text-slate-400 text-xs">{post.time}</p>
                </div>
              </div>
              <div className="px-3 py-1 bg-slate-100 rounded-full">
                <span className="text-brand-primary font-bold text-[10px] uppercase tracking-wider">{post.tag}</span>
              </div>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed mb-4">{post.content}</p>
            {post.image && (
              <div className="aspect-video w-full rounded-2xl overflow-hidden mb-4">
                <img src={post.image} className="w-full h-full object-cover" alt="Post content" />
              </div>
            )}
            <div className="flex items-center justify-between border-t border-slate-50 pt-4">
              <div className="flex gap-6">
                <button 
                  onClick={handleDevFeature}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <Heart size={20} />
                  <span className="text-xs font-semibold">{post.likes}</span>
                </button>
                <button 
                  onClick={handleDevFeature}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-brand-primary transition-colors cursor-pointer"
                >
                  <MessageCircle size={20} />
                  <span className="text-xs font-semibold">{post.comments}</span>
                </button>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-brand-accent/20 rounded-full text-brand-primary">
                <Timer size={14} />
                <span className="text-xs font-bold">{post.duration}</span>
              </div>
            </div>
          </article>
        ))}
      </section>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleDevFeature}
        className="fixed bottom-28 right-6 w-14 h-14 bg-brand-primary text-white rounded-full shadow-lg shadow-brand-primary/30 flex items-center justify-center z-40 cursor-pointer"
      >
        <Plus size={28} />
      </motion.button>
    </div>
  );
};

interface ChallengePreviewProps {
  title: string;
  participants: string;
  badge: string;
  image: string;
  onClick?: () => void;
}

const ChallengePreview: React.FC<ChallengePreviewProps> = ({ title, participants, badge, image, onClick }) => (
  <div 
    onClick={onClick}
    className="shrink-0 w-72 h-40 relative rounded-3xl overflow-hidden shadow-sm group cursor-pointer"
  >
    <img src={image} className="absolute inset-0 w-full h-full object-cover" alt={title} />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
    <div className="absolute bottom-4 left-4 right-4 text-white">
      <span className="inline-block px-2 py-0.5 bg-brand-accent text-brand-primary text-[10px] font-bold rounded-full mb-1 uppercase tracking-widest">{badge === 'Active' ? '进行中' : '热门'}</span>
      <p className="font-display font-bold text-lg leading-tight">{title}</p>
      <p className="text-white/70 text-xs mt-1">{participants} 人参与</p>
    </div>
  </div>
);
