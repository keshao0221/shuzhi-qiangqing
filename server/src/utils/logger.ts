const formatTime = () => {
  return new Date().toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export const logger = {
  info: (...args: any[]) => {
    console.log(`[INFO] ${formatTime()}`, ...args);
  },
  warn: (...args: any[]) => {
    console.warn(`[WARN] ${formatTime()}`, ...args);
  },
  error: (...args: any[]) => {
    console.error(`[ERROR] ${formatTime()}`, ...args);
  },
  debug: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEBUG] ${formatTime()}`, ...args);
    }
  },
};
