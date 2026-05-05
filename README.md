# 数智强青

AI 辅助的青少年体质健康干预平台

## 项目简介

数智强青是一个集运动训练、数据分析、社区互动于一体的综合性青少年健康管理平台，利用 AI 技术为用户提供个性化的运动指导和健康服务。

## 项目结构

```
数智强青1/
├── android/          # Android 移动端应用（基于 Capacitor）
├── server/           # 后端 API 服务
├── src/              # 前端源代码
│   ├── components/   # 公共组件
│   ├── context/      # React Context
│   ├── lib/          # 工具库
│   └── pages/        # 页面组件
├── dist/             # 前端构建产物
└── 配置文件
```

## 技术栈

### 前端
- **框架**: React 19 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **UI 动画**: Motion
- **图表**: Recharts
- **图标**: Lucide React
- **移动端**: Capacitor

### 后端
- **框架**: Express.js + TypeScript
- **中间件**: CORS
- **认证**: JWT
- **工具**: tsx, uuid

### AI 服务
- Google Gemini AI

## 功能模块

### 1. 登录模块 (Login)
- 微信登录
- 手机号登录

### 2. 数据统计 (Stats)
- 运动数据可视化
- 健康指标展示
- 进度追踪

### 3. 训练模块 (Training)
- 运动计划管理
- 快速开始训练
- 训练会话 (WorkoutSession)

### 4. 趣味活动 (Fun)
- 互动游戏
- 趣味挑战

### 5. 社区互动 (Community)
- 动态发布
- 点赞评论
- 用户社交

### 6. 积分兑换 (Redemption)
- 积分系统
- 礼品兑换

### 7. 个人中心 (Profile)
- 用户信息管理
- 退出登录

## 环境配置

### 前端环境变量 (.env)
```env
GEMINI_API_KEY=your_gemini_api_key
APP_URL=your_app_url
```

### 后端环境变量 (server/.env)
```env
PORT=3001
JWT_SECRET=your_jwt_secret
```

## 安装与运行

### 前置要求
- Node.js (最新 LTS 版本)
- npm 或 yarn

### 1. 安装依赖
```bash
npm install
```

### 2. 配置环境变量
复制 `.env.example` 为 `.env` 并填入相应配置

### 3. 启动前端开发服务器
```bash
npm run dev
```
前端服务将在 http://localhost:3000 启动

### 4. 启动后端服务
```bash
cd server
npm install
npm run dev
```
后端服务将在 http://localhost:3001 启动

## 构建与部署

### 前端构建
```bash
npm run build
```

### 后端构建
```bash
cd server
npm run build
npm start
```

### Android 应用构建
```bash
npm run build
npx cap sync android
```
然后使用 Android Studio 打开 `android/` 目录进行构建

## 主要文件说明

| 文件/目录 | 说明 |
|----------|------|
| `src/App.tsx` | 应用主入口，路由和状态管理 |
| `server/src/index.ts` | 后端服务入口 |
| `capacitor.config.ts` | Capacitor 移动端配置 |
| `app.json` | 应用配置信息 |

## 开发团队

数智强青团队

## 许可证

Apache-2.0
