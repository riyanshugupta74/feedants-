import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { participationApi } from '../api/participation';
import { QUERY_KEYS } from '../constants';
import { useAuth } from './useAuth';

/**
 * Hook to check if the current user is registered for a competition.
 */
export const useParticipation = (competitionId: string) => {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [QUERY_KEYS.participation, competitionId],
    queryFn: () => participationApi.getParticipation(competitionId),
    enabled: !!competitionId && isAuthenticated,
    staleTime: 30 * 1000,
  });

  const mutation = useMutation({
    mutationFn: (submissionUrl: string) => participationApi.submitEntry(competitionId, submissionUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.participation, competitionId] });
    },
  });

  return {
    ...query,
    submitParticipation: mutation.mutateAsync,
  };
};
