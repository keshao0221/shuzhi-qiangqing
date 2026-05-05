import type { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { updateUserValidator } from '../validators/user.validator';
import { success, badRequest } from '../utils/response';

export const userController = {
  async getProfile(req: Request, res: Response) {
    try {
      const user = await userService.getById(req.user!.id);
      success(res, user);
    } catch (err) {
      badRequest(res, (err as Error).message);
    }
  },

  async updateProfile(req: Request, res: Response) {
    try {
      const input = updateUserValidator.parse(req.body);
      const user = await userService.update(req.user!.id, input);
      success(res, user);
    } catch (err) {
      badRequest(res, (err as Error).message);
    }
  },
};
