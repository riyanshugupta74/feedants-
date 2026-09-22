import { useQuery } from '@tanstack/react-query';
import { competitionsApi } from '../api/competitions';
import { QUERY_KEYS } from '../constants';

/**
 * Hook to fetch a single competition by ID.
 */
export const useCompetition = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.competition, id],
    queryFn: () => competitionsApi.getById(id),
    enabled: !!id,
    staleTime: 30 * 1000, // 30 seconds
    refetchOnWindowFocus: true,
  });
};

/**
 * Hook to fetch all competitions.
 */
export const useCompetitions = (params?: {
  page?: number;
  limit?: number;
  category?: string;
}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.competitions, params],
    queryFn: () => competitionsApi.getAll(params),
    staleTime: 60 * 1000, // 1 minute
  });
};
