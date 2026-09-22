import apiClient from './client';
import { ApiResponse, AuthResponse } from '../types';

export const authApi = {
  register: async (data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/register',
      data
    );
    return response.data.data!;
  },

  login: async (data: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      data
    );
    return response.data.data!;
  },

  getMe: async (): Promise<{ user: AuthResponse['user'] }> => {
    const response = await apiClient.get<
      ApiResponse<{ user: AuthResponse['user'] }>
    >('/auth/me');
    return response.data.data!;
  },

  updateProfile: async (data: {
    name?: string;
    email?: string;
    phone?: string;
    profileImage?: string;
  }): Promise<{ user: AuthResponse['user'] }> => {
    const response = await apiClient.put<
      ApiResponse<{ user: AuthResponse['user'] }>
    >('/auth/profile', data);
    return response.data.data!;
  },
};
