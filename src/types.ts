export type Page = 'login' | 'training' | 'stats' | 'community' | 'profile' | 'fun' | 'workout_session' | 'redemption' | 'settings';

export interface Exercise {
  id: string;
  name: string;
  sets?: string;
  reps?: string;
  time?: string;
  tag: string;
  image: string;
  completed: boolean;
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