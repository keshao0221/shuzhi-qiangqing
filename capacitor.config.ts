import type { CapacitorConfig } from '@capacitor/cli';

const DEV_SERVER_URL = process.env.CAPACITOR_SERVER_URL || 'http://localhost:3000';

const config: CapacitorConfig = {
  appId: 'com.shuzhiqiangqing.app',
  appName: '数智强青',
  webDir: 'dist',
};

if (process.env.NODE_ENV !== 'production') {
  config.server = {
    url: DEV_SERVER_URL,
    cleartext: true,
  };
}

export default config;
