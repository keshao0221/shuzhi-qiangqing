// API 工具函数
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3001';

// 统一响应格式
interface ApiResponse<T = any> {
  code: number;
  message: string;
  data?: T;
}

// 通用请求函数
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API 调用失败:', error);
    return {
      code: 500,
      message: '网络请求失败',
    };
  }
}

// ==================== 用户 API ====================

// 获取当前用户信息
export async function getCurrentUser() {
  if (import.meta.env.DEV) {
    return request('/api/user/profile');
  }
  return request('/api/user/profile', {
    credentials: 'include',
  });
}

// 登录
export async function login(data: { type: 'email' | 'wechat'; email?: string; password?: string; wechatOpenId?: string; wechatNickname?: string; wechatAvatar?: string }) {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// 注册
export async function register(data: { email: string; password: string; name?: string }) {
  return request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// 更新用户信息
export async function updateUserProfile(data: {
  name?: string;
  email?: string;
  phone?: string;
  height?: number;
  weight?: number;
  age?: number;
  gender?: string;
  avatar?: string;
}) {
  return request('/api/user/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// ==================== 训练 API ====================

// 获取运动列表
export async function getExercises() {
  return request('/api/exercises');
}

// 获取训练计划
export async function getPlans() {
  return request('/api/plans');
}

// 获取用户训练记录
export async function getWorkouts() {
  return request('/api/workouts');
}

// 创建训练记录
export async function createWorkout(data: any) {
  return request('/api/workouts', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ==================== 统计 API ====================

// 获取用户统计数据
export async function getStats() {
  return request('/api/stats');
}

// ==================== 社区 API ====================

// 获取帖子列表
export async function getPosts() {
  return request('/api/posts');
}

// 创建帖子
export async function createPost(data: any) {
  return request('/api/posts', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// 点赞帖子
export async function likePost(postId: string) {
  return request(`/api/posts/${postId}/like`, {
    method: 'POST',
  });
}

// ==================== 积分兑换 API ====================

// 获取礼品列表
export async function getGifts() {
  return request('/api/gifts');
}

// 兑换礼品
export async function redeemGift(giftId: string) {
  return request('/api/gifts/redeem', {
    method: 'POST',
    body: JSON.stringify({ giftId }),
  });
}

// 获取兑换记录
export async function getRedemptions() {
  return request('/api/redemptions');
}