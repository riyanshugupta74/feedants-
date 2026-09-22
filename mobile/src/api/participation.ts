import apiClient from './client';
import { ApiResponse, Participation } from '../types';

export const participationApi = {
  register: async (
    competitionId: string
  ): Promise<{ participation: Participation; competition: any }> => {
    const response = await apiClient.post<
      ApiResponse<{ participation: Participation; competition: any }>
    >(`/competitions/${competitionId}/register`);
    return response.data.data!;
  },

  getParticipation: async (
    competitionId: string
  ): Promise<{
    isRegistered: boolean;
    participation: Participation | null;
  }> => {
    const response = await apiClient.get<
      ApiResponse<{
        isRegistered: boolean;
        participation: Participation | null;
      }>
    >(`/competitions/${competitionId}/participation`);
    return response.data.data!;
  },

  cancelRegistration: async (competitionId: string): Promise<void> => {
    await apiClient.delete(`/competitions/${competitionId}/register`);
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
