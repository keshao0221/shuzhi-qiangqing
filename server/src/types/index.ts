export interface User {
  id: string;
  phone?: string;
  wechatOpenId?: string;
  name: string;
  avatar?: string;
  points: number;
  height?: number;
  weight?: number;
  age?: number;
  gender?: string;
  createdAt: Date;
  updatedAt: Date;
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
  createdAt: Date;
  updatedAt: Date;
}

export interface Exercise {
  id: string;
  name: string;
  sets?: string;
  reps?: string;
  time?: string;
  tag: string;
  image: string;
  completed?: boolean;
}

export interface Plan {
  id: string;
  name: string;
  exercises: string[];
  icon: string;
  active?: boolean;
}

export interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  time: string;
  tag: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  duration?: string;
}

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  content: string;
  createdAt: Date;
}

export interface Gift {
  id: string;
  name: string;
  image: string;
  points: number;
  stock: number;
  description?: string;
}

export interface PointsHistory {
  id: string;
  userId: string;
  type: string;
  amount: number;
  description: string;
  createdAt: Date;
}

export interface MotionRecord {
  id: string;
  workoutId: string;
  timestamp: Date;
  accelerationX: number;
  accelerationY: number;
  accelerationZ: number;
  heartRate?: number;
  calories: number;
  steps: number;
}
