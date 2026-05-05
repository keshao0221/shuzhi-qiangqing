import { prisma } from '../utils/prisma';
import type { Workout, Exercise } from '../types';

export const workoutRepository = {
  create: (data: Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>) =>
    prisma.workout.create({ data }),
  
  findById: (id: string) => prisma.workout.findUnique({ where: { id } }),
  
  findByUserId: (userId: string, limit = 20, offset = 0) =>
    prisma.workout.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip: offset,
      take: limit,
    }),
  
  update: (id: string, data: Partial<Workout>) =>
    prisma.workout.update({ where: { id }, data }),
  
  delete: (id: string) => prisma.workout.delete({ where: { id } }),
  
  createExercise: (data: Omit<Exercise, 'id' | 'createdAt'>) =>
    prisma.exercise.create({ data }),
  
  findExercises: (limit = 50) =>
    prisma.exercise.findMany({ take: limit }),
  
  findExerciseById: (id: string) =>
    prisma.exercise.findUnique({ where: { id } }),
  
  createPlan: (data: { name: string; icon: string; description?: string }) =>
    prisma.plan.create({ data }),
  
  findPlans: () => prisma.plan.findMany(),
  
  findPlanById: (id: string) => 
    prisma.plan.findUnique({ 
      where: { id },
      include: { exercises: { include: { exercise: true } } }
    }),
};
