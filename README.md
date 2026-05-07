# 数智强青

AI 辅助的青少年体质健康干预平台

---

## 📖 目录

- [项目简介](#项目简介)
- [核心约束](#核心约束)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [功能模块](#功能模块)
- [后端架构](#后端架构)
- [安装与运行](#安装与运行)
- [环境配置](#环境配置)
- [部署与运维](#部署与运维)
- [主要文件说明](#主要文件说明)

---

## 项目简介

数智强青是一个集运动训练、数据分析、社区互动于一体的综合性青少年健康管理平台，利用 AI 技术为用户提供个性化的运动指导和健康服务。

**项目定位**：创业 MVP，暑假"三下乡"社会实践用。

---

## 核心约束

| 要求 | 说明 |
|------|------|
| **完全离线可用** | 三下乡现场无网络，AI动作矫正、体感对战、打卡记录等核心功能不中断 |
| **联网自动同步** | 网络恢复时，本地数据自动与服务器双向同步 |
| **低端机流畅运行** | 适配信号差、配置低的安卓/苹果手机 |
| **100% 自托管** | 自有服务器部署所有后端服务，无云平台依赖 |
| **免费开源优先** | 所有技术选型均为开源且免费 |
| **开发周期** | 2个月内交付可上架 iOS 和 Android 的版本 |

---

## 技术栈

### 前端

| 技术 | 版本 | 说明 |
|------|------|------|
| React | 19 | UI框架 |
| TypeScript | ~5.8.2 | 类型安全 |
| Vite | ^6.2.0 | 构建工具 |
| Tailwind CSS | ^4.1.14 | 样式框架 |
| Motion | ^12.23.24 | UI动画 |
| Recharts | ^3.8.1 | 图表库 |
| Lucide React | ^0.546.0 | 图标库 |
| Capacitor | ^8.3.1 | 移动端框架 |

### 后端

| 技术 | 版本 | 说明 |
|------|------|------|
| Express.js | ^4.21.2 | Web框架 |
| TypeScript | ^5.4.5 | 类型安全 |
| SQLite | 3 | 本地数据库（嵌入式，无需单独服务） |
| Prisma | ^5.14.0 | ORM |
| JWT | ^9.0.2 | 认证 |
| Zod | ^3.23.8 | 数据验证 |

### AI 服务

| 服务 | 说明 | 状态 |
|------|------|------|
| Google Gemini AI | 个性化运动建议、健康数据分析 | 待实现 |
| ML Kit Pose Detection | 实时姿态估计（端侧） | ✅ 已集成 MediaPipe Pose |

---

## 项目结构

```
数智强青/
├── android/                    # Android 移动端应用（基于 Capacitor）
│   └── app/
│       └── src/main/
├── server/                     # 后端 API 服务
│   ├── src/
│   │   ├── controllers/        # 控制器层
│   │   ├── services/           # 业务逻辑层
│   │   ├── repositories/       # 数据访问层
│   │   ├── middleware/         # 中间件
│   │   ├── validators/         # 参数验证
│   │   ├── config/             # 配置文件
│   │   ├── utils/              # 工具函数
│   │   └── types/              # 类型定义
│   └── prisma/                 # Prisma 数据库配置
├── src/                        # 前端源代码
│   ├── components/             # 公共组件
│   │   ├── BottomNav.tsx       # 底部导航
│   │   ├── QuickStartFAB.tsx   # 快速开始按钮
│   │   └── SkeletonOverlay.tsx # 骨骼叠加层
│   ├── context/                # React Context
│   │   ├── ToastContext.tsx    # 提示消息
│   │   └── UserContext.tsx     # 用户状态
│   ├── lib/                    # 工具库
│   │   ├── api.ts              # API 封装
│   │   ├── utils.ts            # 工具函数
│   │   ├── usePoseDetection.ts # 姿势检测Hook
│   │   └── poseAnalyzer.ts     # 动作分析逻辑
│   └── pages/                  # 页面组件
│       ├── Login.tsx           # 登录页面
│       ├── Training.tsx        # 训练页面
│       ├── WorkoutSession.tsx  # 训练会话
│       ├── Stats.tsx           # 数据统计
│       ├── Fun.tsx             # 趣味活动
│       ├── Community.tsx       # 社区互动
│       ├── Redemption.tsx      # 积分兑换
│       ├── Profile.tsx         # 个人中心
│       └── Settings.tsx       # 设置页面
├── .env                        # 前端环境变量
├── package.json
├── server/.env                 # 后端环境变量
└── README.md                   # 项目文档
```

---

## 功能模块

### 1. 登录模块 (Login) ✅
- 邮箱登录/注册
- 微信登录（预留）

### 2. 数据统计 (Stats) ✅
- 运动数据可视化
- 健康指标展示
- 周统计数据
- 进度追踪

### 3. 训练模块 (Training) ✅
- 运动计划管理
- 快速开始训练
- 训练会话记录
- 运动项目管理

### 4. 趣味活动 (Fun) ⚠️
- 互动游戏框架（待完善）
- 趣味挑战（待完善）

### 5. 社区互动 (Community) ✅
- 动态发布
- 点赞评论
- 评论列表

### 6. 积分兑换 (Redemption) ✅
- 积分系统
- 礼品兑换
- 兑换历史
- 积分历史

### 7. 个人中心 (Profile) ✅
- 用户信息管理
- 退出登录

### 8. AI动作矫正 ✅
- 实时姿态检测（MediaPipe Pose）
- 骨骼关键点可视化
- 深蹲/弓步/平板支撑/开合跳动作分析
- 动作评分与矫正建议

---

## 后端架构

### 一、架构概述

本文档描述数智强青项目的后端模块架构设计，采用分层架构模式，遵循单一职责原则，确保高内聚低耦合。

### 技术栈

| 分类 | 技术 | 说明 |
|------|------|------|
| **框架** | Express.js + TypeScript | Node.js Web 框架 |
| **数据库** | SQLite + Prisma | 嵌入式本地数据库 + ORM（无需单独服务） |
| **缓存** | Redis | 会话缓存、热点数据（可选） |
| **认证** | JWT | JSON Web Token |
| **验证** | Zod | TypeScript 表单验证 |
| **API文档** | Swagger/OpenAPI | 接口文档生成 |

---

### 二、模块划分

#### 2.1 认证模块 (Auth Module)

**职责**：用户登录、注册、Token管理

```
src/
├── controllers/
│   └── auth.controller.ts    # 登录/注册API入口
├── services/
│   └── auth.service.ts       # 认证业务逻辑
├── middleware/
│   └── auth.middleware.ts    # JWT验证中间件（开发模式可跳过）
├── utils/
│   └── jwt.util.ts           # JWT工具函数（生成/验证）
└── validators/
    └── auth.validator.ts     # 登录注册参数验证
```

**核心功能**：
- 用户注册（手机号/微信）
- 用户登录（生成JWT Token）
- Token刷新机制
- 密码重置流程

---

#### 2.2 用户模块 (User Module)

**职责**：用户信息管理

```
src/
├── controllers/
│   └── user.controller.ts    # 用户API入口
├── services/
│   └── user.service.ts       # 用户业务逻辑
├── repositories/
│   └── user.repository.ts    # 用户数据访问层
└── validators/
    └── user.validator.ts     # 用户参数验证
```

**核心功能**：
- 用户信息查询
- 用户信息更新
- 用户积分管理
- 用户统计数据查询

---

#### 2.3 训练模块 (Training Module)

**职责**：运动计划、训练会话管理

```
src/
├── controllers/
│   └── training.controller.ts    # 训练API入口
├── services/
│   └── training.service.ts       # 训练业务逻辑
├── repositories/
│   ├── plan.repository.ts        # 运动计划数据访问
│   └── session.repository.ts     # 训练会话数据访问
└── validators/
    └── training.validator.ts     # 训练参数验证
```

**核心功能**：
- 运动计划CRUD操作
- 训练会话记录
- 训练进度追踪
- AI运动指导（调用Gemini API）

---

#### 2.4 运动分析模块 (Motion Analysis Module)

**职责**：运动动作实时分析与矫正

```
src/
├── controllers/
│   └── motion.controller.ts       # 运动分析API入口
├── services/
│   ├── motion.service.ts          # 运动数据处理业务逻辑
│   ├── pose-detector.service.ts   # 姿势检测服务
│   └── ai-analysis.service.ts     # AI分析服务
├── repositories/
│   └── motion.repository.ts       # 运动数据分析存储
├── validators/
│   └── motion.validator.ts        # 运动数据验证
├── types/
│   └── motion.ts                  # 运动相关类型定义
└── utils/
    └── motion-utils.ts            # 运动数据处理工具函数
```

**核心功能**：
- 实时采集传感器数据（加速度、陀螺仪、心率）
- 人体姿势关键点检测与分析
- AI驱动的动作矫正建议
- 运动质量评估（一致性、对称性、效率）
- 实时反馈与警告提醒

---

#### 2.5 统计模块 (Stats Module)

**职责**：数据统计与可视化

```
src/
├── controllers/
│   └── stats.controller.ts    # 统计API入口
├── services/
│   └── stats.service.ts       # 统计业务逻辑
└── repositories/
    └── stats.repository.ts    # 统计数据访问层
```

**核心功能**：
- 运动数据统计
- 健康指标分析
- 趋势图表数据
- 成就系统

---

#### 2.6 社区模块 (Community Module)

**职责**：社交互动功能

```
src/
├── controllers/
│   └── community.controller.ts    # 社区API入口
├── services/
│   └── community.service.ts       # 社区业务逻辑
├── repositories/
│   ├── post.repository.ts         # 帖子数据访问
│   └── comment.repository.ts      # 评论数据访问
└── validators/
    └── community.validator.ts     # 社区参数验证
```

**核心功能**：
- 动态发布
- 点赞评论
- 用户关注
- 话题广场

---

#### 2.7 积分兑换模块 (Redemption Module)

**职责**：积分系统与礼品兑换

```
src/
├── controllers/
│   └── redemption.controller.ts    # 积分API入口
├── services/
│   └── redemption.service.ts       # 积分业务逻辑
├── repositories/
│   ├── points.repository.ts        # 积分数据访问
│   └── gift.repository.ts          # 礼品数据访问
└── validators/
    └── redemption.validator.ts     # 积分参数验证
```

**核心功能**：
- 积分获取/消耗
- 礼品列表管理
- 兑换记录查询
- 礼品发放流程

---

#### 2.7 运动分析模块 (Motion Analysis Module) ✅

**职责**：实时姿态检测与动作分析

```
src/
├── lib/
│   ├── usePoseDetection.ts    # 姿势检测Hook
│   └── poseAnalyzer.ts         # 动作分析逻辑
└── components/
    └── SkeletonOverlay.tsx    # 骨骼绘制组件
```

**核心功能**：
- 实时人体33点骨骼关键点检测（MediaPipe Pose）
- 深蹲、弓步、平板支撑、开合跳等动作分析
- 动作标准评分与矫正建议
- 骨骼可视化绘制

---

#### 2.9 基础设施模块 (Infrastructure)

**职责**：框架配置与工具

```
src/
├── config/
│   ├── app.config.ts         # 应用配置
│   ├── database.config.ts    # 数据库配置
│   └── redis.config.ts       # Redis配置
├── middleware/
│   ├── error.middleware.ts   # 统一错误处理
│   ├── logger.middleware.ts  # 请求日志
│   └── rate-limit.middleware.ts # 限流中间件
├── utils/
│   ├── logger.ts             # 日志工具
│   └── response.ts           # 统一响应格式
└── index.ts                  # 应用入口
```

---

### 三、模块间依赖关系

```
┌─────────────────────────────────────────────────────────────────┐
│                        模块依赖关系图                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Auth Module         User Module        Training Module        │
│        │                   │                     │              │
│        ▼                   ▼                     ▼              │
│   ┌─────────────────────────────────────────────────────┐       │
│   │              Core Infrastructure                    │       │
│   │  (Config / Middleware / Utils / Database)          │       │
│   └─────────────────────────────────────────────────────┘       │
│        │                   │                     │              │
│        ▼                   ▼                     ▼              │
│   Stats Module    Community Module    Redemption Module        │
│        │                   │                     │              │
│        └───────────────────┴─────────────────────┘              │
│                              │                                  │
│                              ▼                                  │
│                       AI Service Module                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### 四、完整目录结构

```
server/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.ts          # 认证API
│   │   ├── user.controller.ts          # 用户API
│   │   ├── training.controller.ts      # 训练API
│   │   ├── stats.controller.ts         # 统计API
│   │   ├── community.controller.ts     # 社区API
│   │   └── redemption.controller.ts    # 积分API
│   ├── services/
│   │   ├── auth.service.ts             # 认证业务逻辑
│   │   ├── user.service.ts             # 用户业务逻辑
│   │   ├── training.service.ts         # 训练业务逻辑
│   │   ├── stats.service.ts            # 统计业务逻辑
│   │   ├── community.service.ts        # 社区业务逻辑
│   │   ├── redemption.service.ts       # 积分业务逻辑
│   │   └── gemini.service.ts           # AI服务
│   ├── repositories/
│   │   ├── user.repository.ts          # 用户数据访问
│   │   ├── plan.repository.ts          # 计划数据访问
│   │   ├── session.repository.ts       # 会话数据访问
│   │   ├── stats.repository.ts         # 统计数据访问
│   │   ├── post.repository.ts          # 帖子数据访问
│   │   ├── comment.repository.ts       # 评论数据访问
│   │   ├── points.repository.ts        # 积分数据访问
│   │   └── gift.repository.ts          # 礼品数据访问
│   ├── middleware/
│   │   ├── auth.middleware.ts          # 认证中间件
│   │   ├── error.middleware.ts         # 错误处理
│   │   ├── logger.middleware.ts        # 请求日志
│   │   └── rate-limit.middleware.ts    # 限流
│   ├── validators/
│   │   ├── auth.validator.ts           # 认证验证
│   │   ├── user.validator.ts           # 用户验证
│   │   ├── training.validator.ts       # 训练验证
│   │   ├── community.validator.ts      # 社区验证
│   │   └── redemption.validator.ts     # 积分验证
│   ├── config/
│   │   ├── app.config.ts               # 应用配置
│   │   ├── database.config.ts          # 数据库配置
│   │   ├── redis.config.ts             # Redis配置
│   │   └── ai.config.ts                # AI配置
│   ├── utils/
│   │   ├── logger.ts                   # 日志工具
│   │   ├── response.ts                 # 响应工具
│   │   └── jwt.util.ts                 # JWT工具
│   ├── types/
│   │   └── index.ts                    # 类型定义
│   └── index.ts                        # 应用入口
├── prisma/
│   └── schema.prisma                   # 数据库Schema
├── package.json
├── tsconfig.json
├── .env                                # 环境变量
└── README.md
```

---

### 五、环境配置说明

#### 5.1 环境变量 (.env)

```env
# 服务器配置
PORT=3001
NODE_ENV=development

# JWT配置（开发模式可忽略）
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=7d

# 数据库配置（SQLite，嵌入式无需单独服务）
# DATABASE_URL=postgresql://user:password@localhost:5432/shuzhiqiangqing

# AI服务配置
GEMINI_API_KEY=your-gemini-api-key
```

#### 5.2 认证模式切换

- **开发模式** (`NODE_ENV=development`)：认证中间件自动放行，模拟已登录用户
- **生产模式** (`NODE_ENV=production`)：强制JWT验证

---

### 六、分层架构说明

| 层级 | 职责 | 说明 |
|------|------|------|
| **Controller** | 处理HTTP请求 | 参数接收、调用Service、返回响应 |
| **Service** | 业务逻辑处理 | 核心业务规则、调用Repository |
| **Repository** | 数据访问 | 数据库CRUD操作、事务管理 |
| **Database** | 数据持久化 | PostgreSQL存储 |

---

### 七、模块统计

| 模块 | 文件数 | 核心职责 |
|------|--------|----------|
| **Auth** | 4 | 用户认证、Token管理 |
| **User** | 4 | 用户信息管理 |
| **Training** | 5 | 运动计划、训练会话 |
| **Motion Analysis** | 6 | 运动实时分析与矫正 |
| **Stats** | 3 | 数据统计分析 |
| **Community** | 5 | 社交互动功能 |
| **Redemption** | 5 | 积分兑换系统 |
| **AI Service** | 2 | Gemini API调用 |
| **Infrastructure** | 7 | 框架配置与工具 |
| **总计** | **41** | - |

---

### 八、开发实施路径

| 阶段 | 任务 | 状态 |
|------|------|------|
| **Phase 1** | 基础框架搭建 | ✅ Express + TypeScript + Prisma |
| **Phase 2** | 核心业务实现 | ✅ 用户、训练、统计、社区、积分模块 |
| **Phase 3** | JWT认证集成 | ✅ 登录/验证逻辑 |
| **Phase 4** | 参数验证完善 | ✅ Zod验证器集成 |
| **Phase 5** | AI动作矫正 | ✅ MediaPipe Pose姿态检测 |
| **Phase 6** | AI服务集成 | ⚠️ 待实现（Gemini API调用） |
| **Phase 7** | 离线同步功能 | ⚠️ 待实现（本地存储+同步机制） |

---

## 安装与运行

### 前置要求
- Node.js (最新 LTS 版本)
- npm 或 yarn

### 1. 安装依赖

```bash
# 安装前端依赖
npm install

# 安装后端依赖
cd server
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env` 并填入相应配置：

**前端环境变量 (.env)**
```env
GEMINI_API_KEY=your_gemini_api_key
APP_URL=http://localhost:3000
```

**后端环境变量 (server/.env)**
```env
PORT=3001
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
# SQLite 数据库无需配置 DATABASE_URL，使用 schema.prisma 中定义的文件路径
```

### 3. 数据库迁移

```bash
cd server
npx prisma migrate dev
```

### 4. 启动开发服务器

**前端服务**
```bash
npm run dev
```
前端服务将在 http://localhost:3000 启动

**后端服务**
```bash
cd server
npm run dev
```
后端服务将在 http://localhost:3001 启动

---

## 环境配置

### 认证模式切换
- **开发模式** (`NODE_ENV=development`)：认证中间件自动放行
- **生产模式** (`NODE_ENV=production`)：强制JWT验证

### 完整环境变量示例

```env
# 服务器配置
PORT=3001
NODE_ENV=development

# JWT配置
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=7d

# 数据库配置（SQLite，嵌入式无需单独服务）
# 数据库文件会自动创建在 server/prisma/dev.db

# AI服务配置
GEMINI_API_KEY=your-gemini-api-key
```

---

## 部署与运维

### 客户端（移动端）

#### 跨平台框架
- **Flutter 3.x + Dart**
  - 一套代码同时交付 iOS 和 Android，后续可平滑扩展到智能手表通信层。
  - 丰富的组件库，与现有前端界面和交互逻辑可快速衔接。

#### 本地数据库（离线核心）
- **SQLite** (Flutter 插件：`sqflite`)
  - 表结构与服务端 PostgreSQL 严格一致。
  - 记录所有用户数据的本地变更，附带时间戳，作为同步单元。
  - 下乡前预置动作库、训练规则、初始计划等静态数据。

#### 实时动作矫正（完全离线）
- **姿态估计**：`google_mlkit_pose_detection` (Base 模型)
  - 不在设备上预装，首次运行时从 Google Play 服务下载（轻量）。
  - 返回 33 个骨骼关键点，延迟极低，低端机流畅运行。
- **规则引擎**：基于关键点角度、轨迹的本地实时判断（Flutter 内实现）。
- **语音反馈**：`flutter_tts` 调用系统 TTS 引擎，完全离线，无需网络。

#### 体感游戏与实时对战
- **游戏引擎**：**Flame** (Flutter 官方游戏引擎，轻量级 2D/3D)
  - 直接用姿态识别数据（ML Kit）驱动角色运动。
- **联机对战**：
  - **在线**：通过 Socket.IO 连接自建对战服务器（帧同步）。
  - **离线/局域网**：`flutter_p2p_engine` 或内网 Socket.IO，通过手机热点/WiFi 直连对战，无需外网。

---

### 后端服务（自建服务器）

#### 编程语言与框架
- **Node.js + TypeScript**
  - 与前端共享类型定义，减少沟通成本，提高开发速度。
- **Web 框架**：**Fastify**
  - 高性能、低内存开销，插件生态丰富（JWT、文件上传、Swagger 等）。
  - 适合 CRUD 业务逻辑与高并发实时服务。

#### 实时通信
- **Socket.IO**
  - 统一承载两类实时连接：
    1. **社交推送**：点赞、评论、新动态通知。
    2. **体感游戏帧同步**：每 50ms 交换压缩后的骨骼帧数据（用 Protocol Buffers 压缩）。

#### 用户认证
- **JWT (fastify-jwt)**
  - 无状态认证，适合移动端快速验证。
  - 支持邮箱/手机注册，敏感数据所有权隔离。

#### 数据校验与序列化
- **Zod**：前后端共用一套 Schema，保证 API 契约一致性。
- **Protocol Buffers**：用于游戏帧数据的高效压缩与传输。

#### 文件存储
- **MinIO**（自建 S3 兼容存储）
  - 存放用户上传的头像、打卡图片、动作模板视频等。
  - 前端可通过预签名 URL 直接上传/下载，减少服务器压力。

#### 消息推送
- **Firebase Cloud Messaging (FCM)**
  - 完全免费，通过 `firebase-admin` SDK 在 Node.js 中发送。
  - 用于训练计划提醒、社交互动通知等。

#### 数据同步接口
- **`/sync` REST API**
  - 核心同步逻辑：客户端上传 `last_sync` 后本地所有变更记录，服务端返回服务器端新数据。
  - 基于时间戳的增量合并，处理冲突（最后写入胜，积分等采用增量值）。
  - 所有同步数据传输均加密（HTTPS），敏感字段脱敏。

---

### 数据库与缓存

#### 主数据库
- **PostgreSQL 15** (自托管)
  - 存储所有业务数据的权威源。
  - 开启 `pg_cron` 扩展，用于定时任务（如每日自动生成训练计划）。
  - 行级安全策略或应用层过滤，确保数据隔离。
  - 每张业务表均包含 `updated_at` 字段，用于同步和冲突检测。

#### 缓存与辅助
- **Redis**（可选，后期扩展用）
  - Socket.IO 集群适配器（多进程共享状态）。
  - 排行榜缓存、接口限流、防作弊检测。

#### 离线数据库
- **SQLite** (客户端)
  - 字段定义与 PostgreSQL 完全对齐。
  - 本地所有写操作均生成变更标记，待同步时使用。

---

### AI 服务

#### 实时动作矫正与游戏
- **完全端侧运行**：ML Kit Pose (Base) + 本地规则引擎。
- 不依赖云端推理，保证低端机、无网络下的流畅体验。
- **摄像头数据永不离开设备**。

#### 训练计划生成
采用 **本地规则引擎（主力） + 蒸馏小模型（兜底）** 混合方案：

| 模块 | 方案 | 部署位置 | 说明 |
|------|------|----------|------|
| 规则引擎 | 基于体测数据、动作库的专家规则 | 服务器端运行时，或本地预置 | 覆盖 80% 常规计划生成 |
| 蒸馏大模型 | llama.cpp + 1.5B 量化模型 (如 TinyLlama, Qwen2-1.5B) | 自有服务器 | 处理规则未覆盖的个性化需求，通过 HTTP API 调用 |

- **离线可用性**：下乡前将规则引擎编译的逻辑和预生成常用计划存入客户端 SQLite，保证无网络时仍能生成本地计划。
- **成本**：蒸馏模型仅占用部分服务器内存/CPU，无 API 费用。

#### 可选增强（后期迭代）
- **姿态质量分析**：接收脱敏的骨骼关键点序列进行批量周报分析，使用 ONNX Runtime 部署轻量分类模型，不上传视频。

---

### 容器化部署
使用 Docker Compose 编排全部服务：
- `postgres`：主数据库
- `redis`（可选）
- `minio`：文件存储
- `api`：Express 应用（含 Socket.IO）
- `llama`：llama.cpp 推理容器（挂载量化模型文件）

### 反向代理
- **Nginx**
  - 终结 SSL / TLS。
  - 代理到 Express API (`/api`) 和 MinIO 控制台/API。
  - WebSocket 升级支持（`/ws` 路径）。

### 离线包准备
- 三下乡出发前，打包动作库 JSON、预设训练计划档、初始规则集，通过 CI 或者工具写入 App 本地 SQLite。

### 数据脱敏与合规
- **敏感信息加密**：学号、真实姓名、体测原始成绩等使用 AES-256 加密存储在 `private_info` 表，与展示用的脱敏资料表分离。
- **摄像头数据处理**：代码中绝对不调用截图或录屏上传接口；仅用户同意后，本地抽取的 33 个骨骼关键点（脱敏）可在联网时同步至服务器。
- **用户授权**：首次启动弹出协议，明确数据收集范围、使用目的、数据保护措施，记录用户同意时间戳。

---

## 主要文件说明

| 文件/目录 | 说明 |
|----------|------|
| `src/App.tsx` | 应用主入口，路由和状态管理 |
| `src/main.tsx` | 前端应用入口 |
| `src/pages/` | 页面组件目录 |
| `src/components/` | 公共组件目录 |
| `src/context/` | React Context 状态管理 |
| `server/src/index.ts` | 后端服务入口 |
| `server/src/controllers/` | 控制器层 |
| `server/src/services/` | 业务逻辑层 |
| `server/src/repositories/` | 数据访问层 |
| `server/src/validators/` | 参数验证器 |
| `server/prisma/schema.prisma` | 数据库 Schema |
| `capacitor.config.ts` | Capacitor 移动端配置 |
| `vite.config.ts` | Vite 构建配置 |
