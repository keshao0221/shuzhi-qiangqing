import { z } from 'zod';

export const createPostValidator = z.object({
  content: z.string().min(1).max(500),
  image: z.string().url().optional(),
  tag: z.string().max(20).optional(),
  duration: z.string().optional(),
});

export const updatePostValidator = z.object({
  content: z.string().min(1).max(500).optional(),
  image: z.string().url().optional(),
  tag: z.string().max(20).optional(),
});

export const createCommentValidator = z.object({
  postId: z.string().cuid(),
  content: z.string().min(1).max(200),
});

export const likePostValidator = z.object({
  postId: z.string().cuid(),
});

export type CreatePostInput = z.infer<typeof createPostValidator>;
export type UpdatePostInput = z.infer<typeof updatePostValidator>;
export type CreateCommentInput = z.infer<typeof createCommentValidator>;
export type LikePostInput = z.infer<typeof likePostValidator>;