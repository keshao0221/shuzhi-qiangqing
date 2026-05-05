import { z } from 'zod';

export const createWorkoutValidator = z.object({
  sportType: z.enum(['running', 'swimming', 'yoga', 'weight_training', 'other']),
  duration: z.number().optional(),
  calories: z.number().optional(),
  distance: z.number().optional(),
  steps: z.number().optional(),
  avgHeartRate: z.number().optional(),
});

export const createExerciseValidator = z.object({
  name: z.string(),
  sets: z.string().optional(),
  reps: z.string().optional(),
  time: z.string().optional(),
  tag: z.string(),
  image: z.string(),
});

export type CreateWorkoutInput = z.infer<typeof createWorkoutValidator>;
export type CreateExerciseInput = z.infer<typeof createExerciseValidator>;
