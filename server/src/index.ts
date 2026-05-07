import express from 'express';
import cors from 'cors';
import { config } from './config/app.config';
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

app.use(cors({ origin: '*' }));
app.use(express.json());

app.post('/api/auth/login', authController.login);
app.post('/api/auth/register', authController.register);
app.post('/api/auth/wechat/update', authController.updateWechatInfo);

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
