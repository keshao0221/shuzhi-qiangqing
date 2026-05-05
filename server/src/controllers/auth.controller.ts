import type { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { loginValidator, registerValidator, updateWechatInfoValidator } from '../validators/auth.validator';
import { success, created, badRequest } from '../utils/response';

export const authController = {
  async login(req: Request, res: Response) {
    try {
      const input = loginValidator.parse(req.body);
      const result = await authService.login(input);
      success(res, { user: result.user, token: result.token });
    } catch (err) {
      badRequest(res, (err as Error).message);
    }
  },

  async register(req: Request, res: Response) {
    try {
      const input = registerValidator.parse(req.body);
      const result = await authService.register(input);
      created(res, { user: result.user, token: result.token });
    } catch (err) {
      badRequest(res, (err as Error).message);
    }
  },

  async updateWechatInfo(req: Request, res: Response) {
    try {
      const input = updateWechatInfoValidator.parse(req.body);
      const user = await authService.updateWechatInfo(input);
      success(res, { user });
    } catch (err) {
      badRequest(res, (err as Error).message);
    }
  },
};
