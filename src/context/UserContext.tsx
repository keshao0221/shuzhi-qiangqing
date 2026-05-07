import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser, updateUserProfile } from '../lib/api';

interface User {
  id: string;
  phone?: string;
  email?: string;
  name: string;
  avatar?: string;
  points: number;
  height?: number;
  weight?: number;
  age?: number;
  gender?: string;
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
  refreshUser: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await getCurrentUser();
      if (response.code === 200 && response.data) {
        setUser(response.data);
        setIsLoggedIn(true);
      } else if (import.meta.env.DEV) {
        const mockUser: User = {
          id: 'cmojbawkc0000xxnhin2v7i2g',
          phone: '13800138000',
          email: 'test@example.com',
          name: 'test01',
          avatar: '',
          points: 1250,
          height: 175,
          weight: 65,
          age: 25,
          gender: '男',
        };
        setUser(mockUser);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('获取用户信息失败:', error);
      if (import.meta.env.DEV) {
        const mockUser: User = {
          id: 'cmojbawkc0000xxnhin2v7i2g',
          phone: '13800138000',
          email: 'test@example.com',
          name: 'test01',
          avatar: '',
          points: 1250,
          height: 175,
          weight: 65,
          age: 25,
          gender: '男',
        };
        setUser(mockUser);
        setIsLoggedIn(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = (userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const refreshUser = async () => {
    await fetchUser();
  };

  const updateUser = async (data: Partial<User>) => {
    try {
      const response = await updateUserProfile(data);
      if (response.code === 200) {
        setUser(prev => prev ? { ...prev, ...data } : null);
      }
    } catch (error) {
      console.error('更新用户信息失败:', error);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
        loading,
        refreshUser,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser 必须在 UserProvider 内部使用');
  }
  return context;
}