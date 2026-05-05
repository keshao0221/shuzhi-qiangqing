import jwt from 'jsonwebtoken';
import { config } from '../config/app.config';
import { userRepository } from '../repositories/user.repository';
import type { LoginInput, RegisterInput, UpdateWechatInfoInput } from '../validators/auth.validator';

export const authService = {
  async login(input: LoginInput) {
    let user;

    if (input.type === 'email') {
      user = await userRepository.findByEmail(input.email!);
      if (!user) {
        throw new Error('用户不存在，请先注册');
      }
      // 验证密码（暂时跳过验证码逻辑）
      // if (input.password !== '123456') {
      //   throw new Error('验证码错误');
      // }
    } else {
      user = await userRepository.findByWechatOpenId(input.wechatOpenId!);
      if (!user) {
        user = await userRepository.create({
          wechatOpenId: input.wechatOpenId!,
          name: input.wechatNickname || '微信用户',
          avatar: input.wechatAvatar || '',
          points: 0,
        });
      }
    }

    const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });

    return { user, token };
  },

  async register(input: RegisterInput) {
    const existing = await userRepository.findByEmail(input.email);
    if (existing) {
      throw new Error('用户已存在');
    }

    const user = await userRepository.create({
      email: input.email,
      name: input.name || `用户${input.email.split('@')[0]}`,
      points: 100,
    });

    const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });

    return { user, token };
  },

  async updateWechatInfo(input: UpdateWechatInfoInput) {
    const user = await userRepository.updateWechatInfo(
      input.userId,
      input.wechatNickname,
      input.wechatAvatar
    );
    return user;
  },

  verifyToken(token: string) {
    return jwt.verify(token, config.jwtSecret);
  },
};
