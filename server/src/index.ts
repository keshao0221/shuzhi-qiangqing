import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { config, isDevelopment } from './config/app.config';
import { authMiddleware } from './middleware/auth.middleware';
import { errorMiddleware } from './middleware/error.middleware';
import { authController } from './controllers/auth.controller';
import { userController } from './controllers/user.controller';
import { workoutController } from './controllers/workout.controller';
import { statsController } from './controllers/stats.controller';
import { communityController } from './controllers/community.controller';
import { redemptionController } from './controllers/redemption.controller';
import { logger } from './utils/logger';

const app = express();

app.use(cors({
  origin: isDevelopment ? ['http://localhost:3000', 'http://localhost:5173'] : (process.env.CORS_ORIGIN || '*'),
  credentials: true,
}));
app.use(express.json());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { code: 429, message: '请求过于频繁，请稍后再试' },
});

const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: { code: 429, message: '请求过于频繁，请稍后再试' },
});

app.use('/api', generalLimiter);

app.post('/api/auth/login', authLimiter, authController.login);
app.post('/api/auth/register', authLimiter, authController.register);
app.post('/api/auth/wechat/update', authLimiter, authController.updateWechatInfo);

app.get('/api/user/profile', authMiddleware, userController.getProfile);
app.put('/api/user/profile', authMiddleware, userController.updateProfile);

app.post('/api/workouts', authMiddleware, workoutController.create);
app.get('/api/workouts/:id', authMiddleware, workoutController.getById);
app.get('/api/workouts', authMiddleware, workoutController.getByUser);

app.post('/api/exercises', authMiddleware, workoutController.createExercise);
app.get('/api/exercises', authMiddleware, workoutController.getExercises);

app.get('/api/plans', authMiddleware, workoutController.getPlans);
app.get('/api/plans/:id', authMiddleware, workoutController.getPlanById);

app.get('/api/stats', authMiddleware, statsController.getUserStats);
app.get('/api/stats/weekly', authMiddleware, statsController.getWeeklyStats);

app.post('/api/posts', authMiddleware, communityController.createPost);
app.get('/api/posts', authMiddleware, communityController.getPosts);
app.get('/api/posts/:id', authMiddleware, communityController.getPostById);
app.post('/api/posts/:id/like', authMiddleware, communityController.likePost);
app.post('/api/posts/:id/comments', authMiddleware, communityController.createComment);
app.get('/api/posts/:id/comments', authMiddleware, communityController.getComments);

app.get('/api/gifts', authMiddleware, redemptionController.getGifts);
app.post('/api/gifts/redeem', authMiddleware, redemptionController.redeemGift);
app.get('/api/redemptions', authMiddleware, redemptionController.getRedemptionHistory);
app.get('/api/points/history', authMiddleware, redemptionController.getPointsHistory);

app.use(errorMiddleware);

app.listen(config.port, '0.0.0.0', () => {
  logger.info(`Server running on port ${config.port} (accessible from network)`);
});
