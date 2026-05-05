import type { Request, Response } from 'express';
import { workoutService } from '../services/workout.service';
import { createWorkoutValidator, createExerciseValidator } from '../validators/workout.validator';
import { success, created, badRequest } from '../utils/response';

export const workoutController = {
  async create(req: Request, res: Response) {
    try {
      const input = createWorkoutValidator.parse(req.body);
      const workout = await workoutService.create(req.user!.id, input);
      created(res, workout);
    } catch (err) {
      badRequest(res, (err as Error).message);
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const workout = await workoutService.getById(req.params.id);
      success(res, workout);
    } catch (err) {
      badRequest(res, (err as Error).message);
    }
  },

  async getByUser(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 20;
      const offset = parseInt(req.query.offset as string) || 0;
      const workouts = await workoutService.getByUserId(req.user!.id, limit, offset);
      success(res, workouts);
    } catch (err) {
      badRequest(res, (err as Error).message);
    }
  },

  async createExercise(req: Request, res: Response) {
    try {
      const input = createExerciseValidator.parse(req.body);
      const exercise = await workoutService.createExercise(input);
      created(res, exercise);
    } catch (err) {
      badRequest(res, (err as Error).message);
    }
  },

  async getExercises(req: Request, res: Response) {
    try {
      const exercises = await workoutService.getExercises();
      success(res, exercises);
    } catch (err) {
      badRequest(res, (err as Error).message);
    }
  },

  async getPlans(req: Request, res: Response) {
    try {
      const plans = await workoutService.getPlans();
      success(res, plans);
    } catch (err) {
      badRequest(res, (err as Error).message);
    }
  },

  async getPlanById(req: Request, res: Response) {
    try {
      const plan = await workoutService.getPlanById(req.params.id);
      success(res, plan);
    } catch (err) {
      badRequest(res, (err as Error).message);
    }
  },
};
