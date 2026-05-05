import type { Request, Response, NextFunction } from 'express';
import { error as sendError } from '../utils/response';
import { logger } from '../utils/logger';

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err);
  sendError(res, err.message || '服务器内部错误');
};
