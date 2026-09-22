import apiClient from './client';
import { ApiResponse, Competition, PaginationInfo, Participation } from '../types';

export const competitionsApi = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
  }): Promise<{
    competitions: Competition[];
    pagination: PaginationInfo;
  }> => {
    const response = await apiClient.get<
      ApiResponse<{
        competitions: Competition[];
        pagination: PaginationInfo;
      }>
    >('/competitions', { params });
    return response.data.data!;
  },

  getById: async (id: string): Promise<{ competition: Competition }> => {
    const response = await apiClient.get<
      ApiResponse<{ competition: Competition }>
    >(`/competitions/${id}`);
    return response.data.data!;
  },

  create: async (data: any): Promise<{ competition: Competition }> => {
    const response = await apiClient.post<
      ApiResponse<{ competition: Competition }>
    >('/competitions', data);
    return response.data.data!;
  },

  submitEntry: async (
    competitionId: string,
    submissionUrl: string
  ): Promise<{ participation: Participation }> => {
    const response = await apiClient.post<
      ApiResponse<{ participation: Participation }>
    >(`/competitions/${competitionId}/submission`, { submissionUrl });
    return response.data.data!;
  },
};
