import { workoutRepository } from '../repositories/workout.repository';
import type { CreateWorkoutInput, CreateExerciseInput } from '../validators/workout.validator';

export const workoutService = {
  async create(userId: string, input: CreateWorkoutInput) {
    return workoutRepository.create({
      userId,
      sportType: input.sportType,
      duration: input.duration || 0,
      calories: input.calories || 0,
      distance: input.distance || 0,
      steps: input.steps || 0,
      avgHeartRate: input.avgHeartRate,
      status: 'completed',
    });
  },

  async getById(id: string) {
    const workout = await workoutRepository.findById(id);
    if (!workout) {
      throw new Error('训练记录不存在');
    }
    return workout;
  },

  async getByUserId(userId: string, limit = 20, offset = 0) {
    return workoutRepository.findByUserId(userId, limit, offset);
  },

  async createExercise(input: CreateExerciseInput) {
    return workoutRepository.createExercise(input);
  },

  async getExercises() {
    return workoutRepository.findExercises();
  },

  async createPlan(name: string, icon: string, exerciseIds: string[], description?: string) {
    const plan = await workoutRepository.createPlan({ name, icon, description });
    
    for (let i = 0; i < exerciseIds.length; i++) {
      await workoutRepository.findExerciseById(exerciseIds[i]);
    }

    return plan;
  },

  async getPlans() {
    return workoutRepository.findPlans();
  },

  async getPlanById(id: string) {
    const plan = await workoutRepository.findPlanById(id);
    if (!plan) {
      throw new Error('计划不存在');
    }
    return plan;
  },
};
