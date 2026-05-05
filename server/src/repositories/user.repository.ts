import { prisma } from '../utils/prisma';
import type { User } from '../types';

export const userRepository = {
  findById: (id: string) => prisma.user.findUnique({ where: { id } }),

  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),

  findByPhone: (phone: string) => prisma.user.findUnique({ where: { phone } }),

  findByWechatOpenId: (wechatOpenId: string) =>
    prisma.user.findUnique({ where: { wechatOpenId } }),

  create: (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) =>
    prisma.user.create({ data }),

  update: (id: string, data: Partial<User>) =>
    prisma.user.update({ where: { id }, data }),

  updatePoints: (id: string, points: number) =>
    prisma.user.update({
      where: { id },
      data: { points: { increment: points } }
    }),

  updateWechatInfo: (id: string, nickname: string, avatar: string) =>
    prisma.user.update({
      where: { id },
      data: { wechatNickname: nickname, wechatAvatar: avatar, name: nickname, avatar: avatar },
    }),
};
