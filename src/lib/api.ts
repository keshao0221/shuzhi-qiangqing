const API_BASE_URL = import.meta.env.DEV ? '' : (import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3001');

interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data?: T;
}

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

// ==================== 类型定义 ====================

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  points: number;
  height?: number;
  weight?: number;
  age?: number;
  gender?: string;
}

export interface Workout {
  id: string;
  userId: string;
  sportType: string;
  duration: number;
  calories: number;
  distance: number;
  steps: number;
  avgHeartRate?: number;
  status: string;
  createdAt: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets?: string;
  reps?: string;
  time?: string;
  tag: string;
  image: string;
}

export interface Plan {
  id: string;
  name: string;
  icon: string;
  exercises: string[];
  description?: string;
}

export interface Post {
  id: string;
  user: { name: string; avatar: string };
  time: string;
  tag: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  duration?: string;
}

export interface Gift {
  id: string;
  name: string;
  image: string;
  points: number;
  stock: number;
  description?: string;
}

export interface Redemption {
  id: string;
  userId: string;
  giftId: string;
  status: string;
  createdAt: string;
  gift?: Gift;
}

export interface StatsData {
  totalWorkouts: number;
  totalCalories: number;
  totalDistance: number;
  totalSteps: number;
  recentWorkouts: Workout[];
}

export interface WeeklyStatsData {
  workouts: number;
  calories: number;
  distance: number;
  steps: number;
}

export interface LoginInput {
  type: 'email' | 'wechat';
  email?: string;
  password?: string;
  wechatOpenId?: string;
  wechatNickname?: string;
  wechatAvatar?: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  name?: string;
}

export interface UpdateProfileInput {
  name?: string;
  email?: string;
  phone?: string;
  height?: number;
  weight?: number;
  age?: number;
  gender?: string;
  avatar?: string;
}

export interface CreateWorkoutInput {
  sportType: 'running' | 'swimming' | 'yoga' | 'weight_training' | 'other';
  duration?: number;
  calories?: number;
  distance?: number;
  steps?: number;
  avgHeartRate?: number;
}

export interface CreatePostInput {
  content: string;
  image?: string;
  tag?: string;
  duration?: string;
}

// ==================== 用户 API ====================

export async function getCurrentUser() {
  return request<User>('/api/user/profile', {
    credentials: import.meta.env.DEV ? undefined : 'include',
  });
}

export async function login(data: LoginInput) {
  return request<{ user: User; token: string }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function register(data: RegisterInput) {
  return request<{ user: User; token: string }>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateUserProfile(data: UpdateProfileInput) {
  return request<User>('/api/user/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// ==================== 训练 API ====================

export async function getExercises() {
  return request<Exercise[]>('/api/exercises');
}

export async function getPlans() {
  return request<Plan[]>('/api/plans');
}

export async function getWorkouts() {
  return request<Workout[]>('/api/workouts');
}

export async function createWorkout(data: CreateWorkoutInput) {
  return request<Workout>('/api/workouts', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ==================== 统计 API ====================

export async function getStats() {
  return request<StatsData>('/api/stats');
}

export async function getWeeklyStats() {
  return request<WeeklyStatsData>('/api/stats/weekly');
}

// ==================== 社区 API ====================

export async function getPosts() {
  return request<Post[]>('/api/posts');
}

export async function createPost(data: CreatePostInput) {
  return request<Post>('/api/posts', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function likePost(postId: string) {
  return request<{ liked: boolean }>(`/api/posts/${postId}/like`, {
    method: 'POST',
  });
}

// ==================== 积分兑换 API ====================

export async function getGifts() {
  return request<Gift[]>('/api/gifts');
}

export async function redeemGift(giftId: string) {
  return request<{ message: string }>('/api/gifts/redeem', {
    method: 'POST',
    body: JSON.stringify({ giftId }),
  });
}

export async function getRedemptions() {
  return request<Redemption[]>('/api/redemptions');
}