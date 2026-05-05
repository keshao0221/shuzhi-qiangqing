# 数智强青 - 后端模块架构文档

## 一、架构概述

本文档描述数智强青项目的后端模块架构设计，采用分层架构模式，遵循单一职责原则，确保高内聚低耦合。

### 技术栈

| 分类 | 技术 | 说明 |
|------|------|------|
| **框架** | Express.js + TypeScript | Node.js Web 框架 |
| **数据库** | PostgreSQL + Prisma | 关系型数据库 + ORM |
| **缓存** | Redis | 会话缓存、热点数据 |
| **认证** | JWT | JSON Web Token |
| **验证** | Zod | TypeScript 表单验证 |
| **API文档** | Swagger/OpenAPI | 接口文档生成 |

---

## 二、模块划分

### 2.1 认证模块 (Auth Module)

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

### 2.2 用户模块 (User Module)

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

### 2.3 训练模块 (Training Module)

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

### 2.4 运动分析模块 (Motion Analysis Module)

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

### 2.5 统计模块 (Stats Module)

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

### 2.5 社区模块 (Community Module)

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

### 2.6 积分兑换模块 (Redemption Module)

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

### 2.7 AI服务模块 (AI Service Module)

**职责**：调用外部AI服务

```
src/
├── services/
│   └── gemini.service.ts    # Gemini API调用封装
└── config/
    └── ai.config.ts         # AI服务配置
```

**核心功能**：
- 个性化运动建议
- 健康数据分析
- 运动姿势矫正分析

---

### 2.8 基础设施模块 (Infrastructure)

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

## 三、模块间依赖关系

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

## 四、完整目录结构

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

## 五、环境配置说明

### 5.1 环境变量 (.env)

```env
# 服务器配置
PORT=3001
NODE_ENV=development

# JWT配置（开发模式可忽略）
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=7d

# 数据库配置
DATABASE_URL=postgresql://user:password@localhost:5432/shuzhiqiangqing

# Redis配置
REDIS_URL=redis://localhost:6379

# AI服务配置
GEMINI_API_KEY=your-gemini-api-key
```

### 5.2 认证模式切换

- **开发模式** (`NODE_ENV=development`)：认证中间件自动放行，模拟已登录用户
- **生产模式** (`NODE_ENV=production`)：强制JWT验证

---

## 六、分层架构说明

| 层级 | 职责 | 说明 |
|------|------|------|
| **Controller** | 处理HTTP请求 | 参数接收、调用Service、返回响应 |
| **Service** | 业务逻辑处理 | 核心业务规则、调用Repository |
| **Repository** | 数据访问 | 数据库CRUD操作、事务管理 |
| **Database** | 数据持久化 | PostgreSQL存储 |

---

## 七、模块统计

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

## 八、开发实施路径

| 阶段 | 任务 | 说明 |
|------|------|------|
| **Phase 1** | 基础框架搭建 | Express + TypeScript + Prisma |
| **Phase 2** | 核心业务实现 | 用户、训练、统计模块 |
| **Phase 3** | JWT认证集成 | 登录/验证逻辑 |
| **Phase 4** | 安全加固 | Redis黑名单、Rate Limit |
| **Phase 5** | AI功能集成 | Gemini API调用 |

---

**文档版本**: v1.0  
**创建日期**: 2026-04-28  
**适用项目**: 数智强青 - AI辅助青少年体质健康干预平台