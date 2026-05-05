import { userRepository } from '../repositories/user.repository';
import type { UpdateUserInput } from '../validators/user.validator';

export const userService = {
  async getById(id: string) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error('用户不存在');
    }
    return user;
  },

  async update(id: string, input: UpdateUserInput) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error('用户不存在');
    }
    return userRepository.update(id, input);
  },

  async updatePoints(userId: string, points: number, description: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error('用户不存在');
    }
    
    await userRepository.updatePoints(userId, points);
    
    return { success: true, points: user.points + points };
  },
};
