import { z } from 'zod';

export const updateUserValidator = z.object({
  name: z.string().optional(),
  avatar: z.string().optional(),
  height: z.number().positive().optional(),
  weight: z.number().positive().optional(),
  age: z.number().positive().optional(),
  gender: z.enum(['male', 'female']).optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserValidator>;
