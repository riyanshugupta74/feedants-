import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_TOKEN_KEY, USER_DATA_KEY } from '../constants';
import { User } from '../types';

/**
 * Auth service for managing JWT tokens and user data in AsyncStorage.
 */
export const authService = {
  /** Get stored JWT token */
  getToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    } catch {
      return null;
    }
  },

  /** Store JWT token */
  setToken: async (token: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
    } catch (error) {
      console.error('Failed to store token:', error);
    }
  },

  /** Get stored user data */
  getUser: async (): Promise<User | null> => {
    try {
      const data = await AsyncStorage.getItem(USER_DATA_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  /** Store user data */
  setUser: async (user: User): Promise<void> => {
    try {
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Failed to store user:', error);
    }
  },

  /** Store both token and user data */
  login: async (token: string, user: User): Promise<void> => {
    await Promise.all([
      authService.setToken(token),
      authService.setUser(user),
    ]);
  },

  /** Clear all auth data */
  logout: async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, USER_DATA_KEY]);
    } catch (error) {
      console.error('Failed to clear auth data:', error);
    }
  },

  /** Check if user is authenticated */
  isAuthenticated: async (): Promise<boolean> => {
    const token = await authService.getToken();
    return !!token;
  },
};
