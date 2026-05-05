import type { Request, Response } from 'express';
import { communityService } from '../services/community.service';
import { success, created, badRequest } from '../utils/response';

export const communityController = {
  async createPost(req: Request, res: Response) {
    try {
      const { content, image, tag, duration } = req.body;
      const post = await communityService.createPost(req.user!.id, content, image, tag, duration);
      created(res, post);
    } catch (err) {
      badRequest(res, (err as Error).message);
    }
  },

  async getPosts(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 20;
      const offset = parseInt(req.query.offset as string) || 0;
      const posts = await communityService.getPosts(limit, offset);
      success(res, posts);
    } catch (err) {
      badRequest(res, (err as Error).message);
    }
  },

  async getPostById(req: Request, res: Response) {
    try {
      const post = await communityService.getPostById(req.params.id);
      success(res, post);
    } catch (err) {
      badRequest(res, (err as Error).message);
    }
  },

  async likePost(req: Request, res: Response) {
    try {
      const result = await communityService.likePost(req.user!.id, req.params.id);
      success(res, result);
    } catch (err) {
      badRequest(res, (err as Error).message);
    }
  },

  async createComment(req: Request, res: Response) {
    try {
      const { content } = req.body;
      const comment = await communityService.createComment(req.user!.id, req.params.id, content);
      created(res, comment);
    } catch (err) {
      badRequest(res, (err as Error).message);
    }
  },

  async getComments(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 20;
      const comments = await communityService.getComments(req.params.id, limit);
      success(res, comments);
    } catch (err) {
      badRequest(res, (err as Error).message);
    }
  },
};
