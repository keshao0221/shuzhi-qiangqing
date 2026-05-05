import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Camera, CameraOff, Sparkles, Activity, Trophy, RefreshCw } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface WorkoutSessionProps {
  onBack: () => void;
}

export const WorkoutSession: React.FC<WorkoutSessionProps> = ({ onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'counting' | 'active'>('idle');
  const [score, setScore] = useState(0);
  const [reps, setReps] = useState(0);
  const [time, setTime] = useState(0);
  const [isTrying, setIsTrying] = useState(false);

  const requestCameraPermission = async (): Promise<boolean> => {
    try {
      console.log('Requesting camera permission via Web API...');
      
      // Directly use Web API getUserMedia
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      
      console.log('Media stream obtained successfully!');
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setError(null);
      return true;
    } catch (err: any) {
      console.error('Camera permission error:', err);
      console.error('Error name:', err.name);
      console.error('Error message:', err.message);
      
      let errorMsg = '无法访问摄像头';
      
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMsg = '摄像头权限被拒绝。\n请在手机设置中允许应用访问摄像头。';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errorMsg = '未找到摄像头设备。\n请确认您的设备有可用的前置摄像头。';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errorMsg = '摄像头被其他应用占用。\n请关闭其他使用摄像头的应用后重试。';
      } else if (err.name === 'OverconstrainedError') {
        errorMsg = '无法满足摄像头要求。\n请尝试使用其他设备。';
      } else if (err.name === 'AbortError') {
        errorMsg = '摄像头访问被中止。\n请重试。';
      } else if (err.name === 'TypeError') {
        errorMsg = '摄像头配置错误。\n请更新应用或联系开发者。';
      } else {
        errorMsg = `无法访问摄像头: ${err.message || err.name}`;
      }
      
      setError(errorMsg);
      return false;
    }
  };

  const startCamera = async () => {
    if (isTrying) return;
    setIsTrying(true);
    
    const success = await requestCameraPermission();
    if (success) {
      startCountdown();
    }
    
    setIsTrying(false);
  };

  const retryCamera = () => {
    setError(null);
    startCamera();
  };

  const startCountdown = () => {
    setStatus('counting');
    setCountdown(3);
  };

  useEffect(() => {
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCountdown(null);
      setStatus('active');
    }
  }, [countdown]);

  // Timer Logic
  useEffect(() => {
    if (status !== 'active') return;

    let startTime = Date.now();
    let frameId: number;

    const updateTimer = () => {
      setTime(Date.now() - startTime);
      frameId = requestAnimationFrame(updateTimer);
    };

    updateTimer();
    return () => cancelAnimationFrame(frameId);
  }, [status]);

  // Simulated AI Logic (No visual skeleton)
  useEffect(() => {
    if (status !== 'active') return;

    let frameId: number;
    
    const update = () => {
      // Update score simulated
      if (Math.random() > 0.985) {
        setScore(s => s + Math.floor(Math.random() * 10));
        setReps(r => r + 1);
      }
      frameId = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(frameId);
  }, [status]);

  const formatTime = (ms: number) => {
    const totalSeconds = ms / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col">
      {/* Header */}
      <div className="absolute top-16 left-0 w-full flex justify-center z-[120] pointer-events-none">
        <AnimatePresence>
          {status === 'active' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/40 backdrop-blur-xl px-8 py-3 rounded-full border border-white/10 shadow-2xl"
            >
              <span className="text-white font-mono text-3xl font-bold tracking-widest tabular-nums italic">
                {formatTime(time)}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute top-0 left-0 w-full p-6 flex items-center justify-between z-[110] bg-gradient-to-b from-black/60 to-transparent">
        <button 
          onClick={onBack}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white"
        >
          <ChevronLeft />
        </button>
      </div>

      {/* Camera Feed */}
      <div className="flex-grow relative overflow-hidden bg-slate-900">
        {!error ? (
          <>
            <video 
              ref={videoRef}
              autoPlay 
              playsInline 
              muted 
              className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
            />
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-slate-800">
            <CameraOff size={64} className="text-slate-500 mb-4" />
            <p className="text-white font-bold text-lg whitespace-pre-line mb-6">{error}</p>
            <div className="flex gap-4">
              <button 
                onClick={retryCamera} 
                disabled={isTrying}
                className="px-8 py-3 bg-brand-primary text-white rounded-full font-bold flex items-center gap-2 disabled:opacity-50"
              >
                <RefreshCw className={isTrying ? 'animate-spin' : ''} size={20} />
                {isTrying ? '正在尝试...' : '重试'}
              </button>
              <button onClick={onBack} className="px-8 py-3 bg-white/10 text-white rounded-full font-bold">返回</button>
            </div>
          </div>
        )}

        {/* HUD Stats */}
        <AnimatePresence>
          {status === 'active' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute bottom-12 left-0 w-full px-8 grid grid-cols-2 gap-4 z-[110]"
            >
              <div className="bg-black/40 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/10 flex flex-col items-center">
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">训练得分</p>
                <p className="text-white font-display text-5xl font-black">{score}</p>
              </div>
              <div className="bg-brand-accent/90 backdrop-blur-xl p-6 rounded-[2.5rem] border border-brand-accent/20 flex flex-col items-center shadow-lg shadow-brand-accent/20">
                <p className="text-brand-primary/60 text-[10px] font-bold uppercase tracking-widest mb-1">完成次数</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-brand-primary font-display text-5xl font-black">{reps}</p>
                  <p className="text-brand-primary font-bold text-sm">次</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Countdown Overlay */}
        <AnimatePresence>
          {countdown !== null && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              className="absolute inset-0 flex items-center justify-center z-[120]"
            >
              <span className="text-white font-display text-[160px] font-black drop-shadow-2xl">{countdown}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
