import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config, isDevelopment } from '../config/app.config';
import { prisma } from '../utils/prisma';
import { unauthorized } from '../utils/response';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
      };
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isDevelopment) {
    let user = await prisma.user.findFirst({
      select: { id: true, name: true },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'dev@example.com',
          name: '测试用户',
          points: 1250,
        },
        select: { id: true, name: true },
      });
    }

    req.user = user;
    return next();
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return unauthorized(res, '未授权');
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true },
    });

    if (!user) {
      return unauthorized(res, '用户不存在');
    }

    req.user = user;
    next();
  } catch {
    return unauthorized(res, 'Token无效');
  }
};