import type { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { success, badRequest } from '../utils/response';

export const statsController = {
  async getUserStats(req: Request, res: Response) {
    try {
      const userId = req.user!.id;

      const [totalWorkouts, totals, recentWorkouts] = await Promise.all([
        prisma.workout.count({ where: { userId } }),
        prisma.workout.aggregate({
          where: { userId },
          _sum: { calories: true, distance: true, steps: true },
        }),
        prisma.workout.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
          take: 7,
        }),
      ]);

      success(res, {
        totalWorkouts,
        totalCalories: totals._sum.calories || 0,
        totalDistance: totals._sum.distance || 0,
        totalSteps: totals._sum.steps || 0,
        recentWorkouts,
      });
    } catch (err) {
      badRequest(res, (err as Error).message);
    }
  },

  async getWeeklyStats(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const weeklyData = await prisma.workout.aggregate({
        where: { 
          userId,
          createdAt: { gte: startOfWeek }
        },
        _sum: { calories: true, distance: true, steps: true },
        _count: { id: true },
      });

      success(res, {
        workouts: weeklyData._count.id,
        calories: weeklyData._sum.calories || 0,
        distance: weeklyData._sum.distance || 0,
        steps: weeklyData._sum.steps || 0,
      });
    } catch (err) {
      badRequest(res, (err as Error).message);
    }
  },
};
