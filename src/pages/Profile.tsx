import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Timer, Wrench, Zap, Trophy, Goal, Award, Activity, Sparkles, Dumbbell, ArrowRight, LogOut, Edit3, Check, X, Camera, Settings } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useToast } from '../context/ToastContext';
import { useUser } from '../context/UserContext';

interface ProfileProps {
  onLogout?: () => void;
  onRedeem?: () => void;
  onSettings?: () => void;
  loginType: 'wechat' | 'email' | null;
  points: number;
}

export const Profile: React.FC<ProfileProps> = ({ onLogout, onRedeem, onSettings, loginType, points }) => {
  const { user, updateUser } = useUser();
  const [name, setName] = useState(user?.name || (loginType === 'wechat' ? '微信用户_小青' : '张智远'));
  const [avatar, setAvatar] = useState(user?.avatar || (loginType === 'wechat' 
    ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200' 
    : 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=200'
  ));
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(name);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const handleDevFeature = () => {
    showToast('该功能正在火热开发中...', 'info');
  };

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const getFontSizeClass = (text: string) => {
    const len = text.length;
    if (len <= 4) return 'text-4xl';
    if (len <= 6) return 'text-3xl';
    if (len <= 10) return 'text-2xl';
    return 'text-xl';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAvatar = reader.result as string;
        setAvatar(newAvatar);
        updateUser({ avatar: newAvatar });
        showToast('头像更新成功', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const handleEdit = () => {
    setTempName(name);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (tempName.trim()) {
      setName(tempName);
      await updateUser({ name: tempName });
      showToast('昵称更新成功', 'success');
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pb-32 px-6 max-w-2xl mx-auto pt-12"
    >
      <motion.section variants={itemVariants} className="mb-10 relative group">
        <div className="flex items-center gap-6">
          <motion.div 
            whileHover={isEditing ? { scale: 1.05 } : { scale: 1.02 }}
            onClick={handleAvatarClick}
            className={cn("relative", isEditing ? "cursor-pointer" : "cursor-default")}
          >
            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
            <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-2xl shadow-brand-primary/10 border-4 border-white transform -rotate-3 ring-1 ring-slate-100 relative group/avatar">
              <img 
                src={avatar} 
                alt="Profile" 
                className="w-full h-full object-cover transition-all duration-500 group-hover/avatar:scale-110"
                referrerPolicy="no-referrer"
              />
              {isEditing && (
                <div className="absolute inset-0 bg-brand-primary/40 backdrop-blur-[2px] flex items-center justify-center text-white opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                  <Camera size={24} />
                </div>
              )}
            </div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: 'spring' }}
              className="absolute -bottom-2 -right-2 w-8 h-8 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-lg border-2 border-white z-10"
            >
              <Sparkles size={14} fill="currentColor" />
            </motion.div>
          </motion.div>

          <div className="flex-1">
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div 
                  key="editing"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center gap-3"
                >
                  <input 
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className={cn(
                      "bg-slate-100 border-none rounded-xl px-4 py-2 font-display font-black tracking-tight outline-none focus:ring-2 focus:ring-brand-primary/20 w-full max-w-[240px] transition-all duration-200",
                      getFontSizeClass(tempName)
                    )}
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button onClick={handleSave} className="p-2 bg-brand-primary text-white rounded-full hover:scale-110 active:scale-95 transition-transform cursor-pointer shadow-lg shadow-brand-primary/20">
                      <Check size={20} />
                    </button>
                    <button onClick={handleCancel} className="p-2 bg-slate-100 text-slate-400 rounded-full hover:scale-110 active:scale-95 transition-transform cursor-pointer">
                      <X size={20} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="viewing"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center gap-4 py-2"
                >
                  <div className="relative max-w-[180px]">
                    <h1 className={cn(
                      "font-display font-black tracking-tighter text-slate-900 leading-none drop-shadow-sm transition-all duration-300 break-all",
                      getFontSizeClass(name)
                    )}>
                      {name}
                    </h1>
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: 'spring' }}
                      className="absolute -top-1 -right-2 w-2.5 h-2.5 bg-brand-accent rounded-full border-2 border-white"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 bg-gradient-to-br from-brand-primary to-[#6c9fff] text-white px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider shadow-md shadow-brand-primary/20">
                        <Trophy size={10} className="fill-current" />
                        LV.5
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={handleEdit}
                    className="p-1.5 text-slate-300 hover:text-brand-primary hover:bg-brand-primary/5 rounded-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                  >
                    <Edit3 size={16} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="grid grid-cols-2 gap-4 mb-10">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRedeem}
          className="kinetic-gradient col-span-2 p-8 rounded-[2.5rem] shadow-xl shadow-brand-primary/10 relative overflow-hidden text-white group cursor-pointer"
        >
          <div className="relative z-10 text-center sm:text-left">
            <p className="text-white/70 text-xs font-bold tracking-widest uppercase mb-1">累计积分</p>
            <div className="flex items-baseline justify-center sm:justify-start gap-2">
              <motion.span 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="font-display font-black text-5xl sm:text-6xl"
              >
                {points.toLocaleString()}
              </motion.span>
              <span className="font-bold text-sm">分</span>
            </div>
          </div>
          
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-8 -top-8 border-4 border-white/10 w-32 h-32 rounded-full"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-12 -bottom-12 bg-white/10 w-48 h-48 rounded-full blur-3xl"
          />

          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1], 
              rotate: [0, 5, 0],
              x: [0, 10, 0]
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity"
          >
            <Trophy size={160} />
          </motion.div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-[2rem] flex flex-col justify-between shadow-sm border border-slate-50"
        >
          <div>
            <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-4">本周运动</p>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-extrabold text-4xl">5</span>
              <span className="text-slate-400 font-semibold text-sm">天</span>
            </div>
          </div>
          <div className="mt-4 flex gap-1">
            {[1, 2, 3, 4, 5].map(i => (
              <motion.div 
                key={i} 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="h-1.5 flex-1 rounded-full bg-brand-accent origin-left" 
              />
            ))}
            {[1, 2].map(i => <div key={i} className="h-1.5 flex-1 rounded-full bg-slate-100" />)}
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-[2rem] flex flex-col justify-between shadow-sm border border-slate-50"
        >
          <div>
            <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-4">总训练</p>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-extrabold text-4xl text-brand-primary">84</span>
              <span className="text-slate-400 font-semibold text-sm">次</span>
            </div>
          </div>
          <div className="text-brand-primary text-xs font-bold flex items-center gap-1">
            <motion.div
              animate={{ x: [-2, 2, -2] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Activity size={14} />
            </motion.div>
            <span>较上周 +12%</span>
          </div>
        </motion.div>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-12">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="font-display font-extrabold text-2xl tracking-tight">勋章墙</h2>
            <p className="text-slate-500 text-sm font-bold">已解锁 4 / 12 个成就</p>
          </div>
          <motion.button 
            whileHover={{ x: 3 }}
            onClick={handleDevFeature}
            className="text-brand-primary text-sm font-bold flex items-center gap-1 cursor-pointer"
          >
            全部勋章 <ArrowRight size={14} />
          </motion.button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <Medal onClick={handleDevFeature} icon={<Timer className="text-[#60136d]" />} label="耐力达人" color="bg-[#f39cfb]/30" />
          <Medal onClick={handleDevFeature} icon={<Sparkles className="text-[#354500]" />} label="早起鸟" color="bg-brand-accent/40" />
          <Medal onClick={handleDevFeature} icon={<Zap className="text-brand-primary" />} label="核心力量" color="bg-brand-primary/10" />
          <Medal onClick={handleDevFeature} icon={<Dumbbell className="text-slate-400" />} label="百次训练" color="bg-slate-50" inactive />
          <Medal onClick={handleDevFeature} icon={<Award className="text-slate-400" />} label="月度冠军" color="bg-slate-50" inactive />
          <Medal onClick={handleDevFeature} icon={<Goal className="text-slate-400" />} label="社交达人" color="bg-slate-50" inactive />
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="bg-slate-100 rounded-[2.5rem] p-8 mb-8 overflow-hidden relative group">
        <h3 className="font-display font-bold text-lg mb-6 relative z-10">最近获得</h3>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-4 bg-white p-5 rounded-3xl shadow-sm relative z-10 cursor-pointer border border-white group-hover:border-brand-accent/30 transition-colors"
        >
          <div className="w-12 h-12 rounded-2xl bg-brand-accent flex items-center justify-center shadow-inner">
            <Trophy size={24} className="text-brand-primary" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm">连胜纪录勋章</p>
            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">2023年10月24日</p>
          </div>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight size={20} className="text-slate-300" />
          </motion.div>
        </motion.div>
        
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 rounded-full blur-2xl group-hover:bg-brand-accent/20 transition-colors" />
      </motion.section>

      <motion.section variants={itemVariants} className="mt-8 px-2 space-y-4">
        <motion.button 
          whileHover={{ scale: 1.02, backgroundColor: '#fff' }}
          whileTap={{ scale: 0.98 }}
          onClick={onSettings}
          className="w-full bg-white/80 text-slate-700 font-bold py-6 rounded-[2rem] flex items-center justify-center gap-3 shadow-sm hover:shadow-md transition-all border border-slate-100 cursor-pointer"
        >
          <Settings size={20} className="opacity-80" />
          <span>设置</span>
          <ArrowRight size={16} className="text-slate-400" />
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.02, backgroundColor: '#fff' }}
          whileTap={{ scale: 0.98 }}
          onClick={onLogout}
          className="w-full bg-white/80 text-red-500 font-bold py-6 rounded-[2rem] flex items-center justify-center gap-3 shadow-sm hover:shadow-md transition-all border border-slate-100 cursor-pointer"
        >
          <LogOut size={20} className="opacity-80" />
          <span>退出登录</span>
        </motion.button>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-[10px] text-slate-300 uppercase tracking-[0.2em] mt-4 font-bold"
        >
          数智强青 v1.0.4
        </motion.p>
      </motion.section>
    </motion.div>
  );
};

const Medal: React.FC<{ icon: React.ReactNode; label: string; color: string; inactive?: boolean; onClick?: () => void }> = ({ icon, label, color, inactive, onClick }) => (
  <motion.div 
    whileHover={{ y: -8, scale: 1.05 }}
    onClick={onClick}
    className={cn("flex flex-col items-center gap-3 group cursor-pointer", inactive && "opacity-40 grayscale-[0.5]")}
  >
    <div className={cn(
      "w-20 h-20 rounded-full flex items-center justify-center shadow-md border-2 border-transparent transition-all",
      color,
      !inactive && "group-hover:border-white group-hover:shadow-xl"
    )}>
      <motion.div
        whileHover={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.5 }}
      >
        {React.cloneElement(icon as React.ReactElement, { size: 36, fill: inactive ? "none" : "currentColor" })}
      </motion.div>
    </div>
    <span className={cn("text-xs font-bold text-center", !inactive ? "text-slate-700" : "text-slate-400")}>{label}</span>
  </motion.div>
);