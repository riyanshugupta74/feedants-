import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/auth';
import { authService } from '../services/authService';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, referredByCode?: string) => Promise<void>;
  updateProfile: (data: { name?: string; email?: string; phone?: string; profileImage?: string; }) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load stored auth on mount
  useEffect(() => {
    const loadAuth = async () => {
      try {
        const token = await authService.getToken();
        if (token) {
          const storedUser = await authService.getUser();
          if (storedUser) {
            setUser(storedUser);
          } else {
            // Token exists but no user data — fetch from API
            try {
              const { user: fetchedUser } = await authApi.getMe();
              setUser(fetchedUser);
              await authService.setUser(fetchedUser);
            } catch {
              // Token invalid — clear
              await authService.logout();
            }
          }
        }
      } catch {
        // Ignore
      } finally {
        setIsLoading(false);
      }
    };

    loadAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const { user: loggedInUser, token } = await authApi.login({
        email,
        password,
      });
      await authService.login(token, loggedInUser);
      setUser(loggedInUser);
    } catch (err: any) {
      const message = err.message || 'Login failed';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string, referredByCode?: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const { user: newUser, token } = await authApi.register({
          name,
          email,
          password,
          referredByCode,
        });
        await authService.login(token, newUser);
        setUser(newUser);
      } catch (err: any) {
        const message = err.message || 'Registration failed';
        setError(message);
        throw new Error(message);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updateProfile = useCallback(
    async (data: { name?: string; email?: string; phone?: string; profileImage?: string; }) => {
      try {
        setIsLoading(true);
        setError(null);
        const { user: updatedUser } = await authApi.updateProfile(data);
        setUser(updatedUser);
        await authService.setUser(updatedUser);
      } catch (err: any) {
        const message = err.message || 'Profile update failed';
        setError(message);
        throw new Error(message);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        updateProfile,
        logout,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
