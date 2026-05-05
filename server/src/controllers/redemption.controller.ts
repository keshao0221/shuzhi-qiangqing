import type { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { success, created, badRequest } from '../utils/response';

export const redemptionController = {
  async getGifts(req: Request, res: Response) {
    try {
      const gifts = await prisma.gift.findMany();
      success(res, gifts);
    } catch (err) {
      badRequest(res, (err as Error).message);
    }
  },

  async redeemGift(req: Request, res: Response) {
    try {
      const { giftId } = req.body;
      const userId = req.user!.id;

      const gift = await prisma.gift.findUnique({ where: { id: giftId } });
      if (!gift) {
        return badRequest(res, '礼品不存在');
      }

      if (gift.stock <= 0) {
        return badRequest(res, '礼品已售罄');
      }

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user || user.points < gift.points) {
        return badRequest(res, '积分不足');
      }

      await prisma.$transaction([
        prisma.user.update({
          where: { id: userId },
          data: { points: { decrement: gift.points } },
        }),
        prisma.gift.update({
          where: { id: giftId },
          data: { stock: { decrement: 1 } },
        }),
        prisma.redemption.create({
          data: { userId, giftId },
        }),
        prisma.pointsHistory.create({
          data: {
            userId,
            type: 'redeem',
            amount: -gift.points,
            description: `兑换礼品: ${gift.name}`,
          },
        }),
      ]);

      created(res, { message: '兑换成功' });
    } catch (err) {
      badRequest(res, (err as Error).message);
    }
  },

  async getRedemptionHistory(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const redemptions = await prisma.redemption.findMany({
        where: { userId },
        include: { gift: true },
        orderBy: { createdAt: 'desc' },
      });
      success(res, redemptions);
    } catch (err) {
      badRequest(res, (err as Error).message);
    }
  },

  async getPointsHistory(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const history = await prisma.pointsHistory.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
      success(res, history);
    } catch (err) {
      badRequest(res, (err as Error).message);
    }
  },
};
