import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bolt, Mail, Check, AlertCircle, User, Shield } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useToast } from '../context/ToastContext';
import { login, register } from '../lib/api';

interface LoginProps {
  onLogin: (type: 'wechat' | 'email') => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [loginStep, setLoginStep] = useState<'choice' | 'email' | 'register'>('choice');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleDevFeature = (e: React.MouseEvent, title: string) => {
    e.preventDefault();
    e.stopPropagation();
    showToast(`${title}功能正在准备中...`, 'info');
  };

  const handleLoginAttempt = (type: 'wechat' | 'email') => {
    if (!isAgreed) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
      return;
    }

    if (type === 'wechat') {
      // 模拟微信登录
      const mockWechatUser = {
        type: 'wechat' as const,
        wechatOpenId: 'wx_test_' + Date.now(),
        wechatNickname: '微信用户',
        wechatAvatar: '',
      };

      login(mockWechatUser).then((response) => {
        if (response.code === 200) {
          showToast('微信登录成功！', 'success');
          onLogin('wechat');
        } else {
          showToast(response.message || '登录失败', 'error');
        }
      });
    } else {
      setLoginStep('email');
    }
  };

  const handleEmailLogin = async () => {
    if (!email || !password) {
      showToast('请填写完整信息', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const response = await login({
        type: 'email',
        email,
        password,
      });

      if (response.code === 200) {
        showToast('登录成功！', 'success');
        onLogin('email');
      } else {
        showToast(response.message || '登录失败', 'error');
      }
    } catch (error) {
      showToast('网络错误', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailRegister = async () => {
    if (!email || !password) {
      showToast('请填写完整信息', 'error');
      return;
    }

    if (password.length < 6) {
      showToast('密码至少6位', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const response = await register({
        email,
        password,
        name: name || undefined,
      });

      if (response.code === 201 || response.code === 200) {
        showToast('注册成功！', 'success');
        onLogin('email');
      } else {
        showToast(response.message || '注册失败', 'error');
      }
    } catch (error) {
      showToast('网络错误', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-brand-surface">
      {/* Ambient backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#6c9fff] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-accent rounded-full mix-blend-multiply filter blur-[120px] opacity-10 pointer-events-none" />

      {/* Warning Toast */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-12 z-50 bg-red-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 font-bold text-sm"
          >
            <AlertCircle size={18} />
            <span>请先阅读并勾选用户协议</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md px-8 py-12 flex flex-col items-center z-10"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-16 space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-brand-primary to-[#6c9fff] rounded-3xl flex items-center justify-center shadow-2xl transform -rotate-6">
            <Bolt size={48} className="text-white fill-current" />
          </div>
          <div className="text-center mt-6">
            <h1 className="font-display text-4xl font-extrabold tracking-tighter text-slate-900 leading-none">数智强青</h1>
            <p className="font-body text-sm uppercase tracking-[0.05em] text-brand-primary font-bold mt-1 tracking-tight">AI 辅助的体质健康干预平台</p>
          </div>
        </div>

        {/* Action Card */}
        <div className="w-full bg-white rounded-[32px] p-8 shadow-xl flex flex-col relative overflow-hidden min-h-[340px]">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-surface/50 to-transparent pointer-events-none" />

          <AnimatePresence mode="wait">
            {loginStep === 'choice' && (
              <motion.div
                key="choice"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="relative z-10 space-y-6 flex flex-col h-full justify-center py-4"
              >
                <div className="space-y-4">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLoginAttempt('wechat')}
                    className="w-full h-14 flex items-center justify-center space-x-3 bg-[#07C160] hover:bg-[#06ad56] text-white rounded-full font-bold shadow-lg transition-transform"
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M8.5,13.5 C9.32842712,13.5 10,12.8284271 10,12 C10,11.1715729 9.32842712,10.5 8.5,10.5 C7.67157288,10.5 7,11.1715729 7,12 C7,12.8284271 7.67157288,13.5 8.5,13.5 Z M15.5,13.5 C16.3284271,13.5 17,12.8284271 17,12 C17,11.1715729 16.3284271,10.5 15.5,10.5 C14.6715729,10.5 14,11.1715729 14,12 C14,12.8284271 14.6715729,13.5 15.5,13.5 Z M12,4 C17.5228475,4 22,7.581722 22,12 C22,16.418278 17.5228475,20 12,20 C10.9859567,20 10.0070119,19.8821948 9.08272877,19.6624905 L5.5,21.5 L5.98634814,18.0645607 C3.57018335,16.6341257 2,14.4542385 2,12 C2,7.581722 6.4771525,4 12,4 Z"/>
                    </svg>
                    <span>微信一键登录</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLoginAttempt('email')}
                    className="w-full h-14 flex items-center justify-center space-x-2 bg-brand-surface hover:bg-slate-200 text-slate-800 rounded-full font-semibold border border-slate-200 transition-colors"
                  >
                    <Mail size={20} />
                    <span>邮箱登录/注册</span>
                  </motion.button>
                </div>

                <div className="pt-4 flex items-start space-x-3 border-t border-slate-100">
                  <input
                    type="checkbox"
                    id="agreement"
                    checked={isAgreed}
                    onChange={(e) => {
                      setIsAgreed(e.target.checked);
                      if (e.target.checked) setShowWarning(false);
                    }}
                    className="mt-1 w-5 h-5 rounded border-none bg-brand-surface text-brand-primary focus:ring-0 cursor-pointer transition-colors"
                  />
                  <label htmlFor="agreement" className="text-[12px] text-slate-400 leading-relaxed cursor-pointer select-none">
                    我已阅读并同意 <a href="#" onClick={(e) => handleDevFeature(e, '用户服务协议')} className="text-brand-primary font-medium">《用户服务协议》</a> 和 <a href="#" onClick={(e) => handleDevFeature(e, '隐私政策')} className="text-brand-primary font-medium">《隐私政策》</a>
                  </label>
                </div>
              </motion.div>
            )}

            {loginStep === 'email' && (
              <motion.div
                key="email"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="relative z-10 flex flex-col h-full"
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">邮箱登录</h3>
                  <p className="text-sm text-slate-500 mt-1">请输入您的邮箱和密码</p>
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      placeholder="请输入邮箱"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-14 pl-12 pr-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-brand-primary/20 text-lg font-medium outline-none transition-all"
                      autoFocus
                    />
                  </div>
                  <div className="relative">
                    <Shield size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      placeholder="请输入密码"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-14 pl-12 pr-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-brand-primary/20 text-lg font-medium outline-none transition-all"
                    />
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleEmailLogin}
                    disabled={isLoading}
                    className="w-full h-14 bg-brand-primary text-white rounded-full font-bold shadow-lg disabled:opacity-50 transition-all"
                  >
                    {isLoading ? '登录中...' : '登录'}
                  </motion.button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setLoginStep('choice')}
                      className="flex-1 text-sm text-slate-400 border-none bg-transparent hover:text-slate-600 font-medium pt-2"
                    >
                      返回
                    </button>
                    <button
                      onClick={() => setLoginStep('register')}
                      className="flex-1 text-sm text-brand-primary border-none bg-transparent hover:text-brand-primary/80 font-medium pt-2"
                    >
                      没有账号？去注册
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {loginStep === 'register' && (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="relative z-10 flex flex-col h-full"
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">邮箱注册</h3>
                  <p className="text-sm text-slate-500 mt-1">创建一个新账号</p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="昵称（选填）"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-14 pl-12 pr-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-brand-primary/20 text-lg font-medium outline-none transition-all"
                      autoFocus
                    />
                  </div>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      placeholder="请输入邮箱"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-14 pl-12 pr-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-brand-primary/20 text-lg font-medium outline-none transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Shield size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      placeholder="设置密码（至少6位）"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-14 pl-12 pr-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-brand-primary/20 text-lg font-medium outline-none transition-all"
                    />
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleEmailRegister}
                    disabled={isLoading}
                    className="w-full h-14 bg-brand-primary text-white rounded-full font-bold shadow-lg disabled:opacity-50 transition-all"
                  >
                    {isLoading ? '注册中...' : '注册'}
                  </motion.button>
                  <button
                    onClick={() => setLoginStep('email')}
                    className="w-full text-sm text-slate-400 border-none bg-transparent hover:text-slate-600 font-medium pt-2"
                  >
                    已有账号？去登录
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-12">
          <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto" />
        </div>
      </motion.div>
    </div>
  );
};
