import { z } from 'zod';

export const loginValidator = z.object({
  type: z.enum(['email', 'wechat']),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  wechatOpenId: z.string().optional(),
  wechatNickname: z.string().optional(),
  wechatAvatar: z.string().optional(),
});

export const registerValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export const updateWechatInfoValidator = z.object({
  userId: z.string(),
  wechatNickname: z.string(),
  wechatAvatar: z.string(),
});

export type LoginInput = z.infer<typeof loginValidator>;
export type RegisterInput = z.infer<typeof registerValidator>;
export type UpdateWechatInfoInput = z.infer<typeof updateWechatInfoValidator>;
