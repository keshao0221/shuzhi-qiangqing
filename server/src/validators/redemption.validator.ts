import { z } from 'zod';

export const redeemGiftValidator = z.object({
  giftId: z.string().cuid(),
});

export const createGiftValidator = z.object({
  name: z.string().min(1).max(50),
  image: z.string().url(),
  points: z.number().positive(),
  stock: z.number().nonnegative().default(0),
  description: z.string().max(200).optional(),
});

export const updateGiftValidator = z.object({
  name: z.string().min(1).max(50).optional(),
  image: z.string().url().optional(),
  points: z.number().positive().optional(),
  stock: z.number().nonnegative().optional(),
  description: z.string().max(200).optional(),
});

export const getPointsHistoryValidator = z.object({
  type: z.enum(['earn', 'redeem', 'all']).optional().default('all'),
  limit: z.number().positive().optional().default(20),
  offset: z.number().nonnegative().optional().default(0),
});

export type RedeemGiftInput = z.infer<typeof redeemGiftValidator>;
export type CreateGiftInput = z.infer<typeof createGiftValidator>;
export type UpdateGiftInput = z.infer<typeof updateGiftValidator>;
export type GetPointsHistoryInput = z.infer<typeof getPointsHistoryValidator>;