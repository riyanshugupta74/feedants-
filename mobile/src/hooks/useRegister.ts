import { useMutation, useQueryClient } from '@tanstack/react-query';
import { participationApi } from '../api/participation';
import { QUERY_KEYS } from '../constants';
import { Alert } from 'react-native';

/**
 * Hook for registering the user for a competition.
 * Automatically invalidates competition and participation queries on success.
 */
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (competitionId: string) =>
      participationApi.register(competitionId),
    onSuccess: (_data, competitionId) => {
      // Invalidate both competition detail and participation status
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.competition, competitionId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.participation, competitionId],
      });
      Alert.alert('Success! 🎉', 'You have been registered for the competition!');
    },
    onError: (error: any) => {
      const message =
        error.message || 'Failed to register. Please try again.';
      Alert.alert('Registration Failed', message);
    },
  });
};

/**
 * Hook for cancelling registration.
 */
export const useCancelRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (competitionId: string) =>
      participationApi.cancelRegistration(competitionId),
    onSuccess: (_data, competitionId) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.competition, competitionId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.participation, competitionId],
      });
      Alert.alert('Cancelled', 'Your registration has been cancelled.');
    },
    onError: (error: any) => {
      Alert.alert(
        'Error',
        error.message || 'Failed to cancel registration.'
      );
    },
  });
};

/**
 * Hook for submitting a competition entry.
 */
export const useSubmitEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      competitionId,
      submissionUrl,
    }: {
      competitionId: string;
      submissionUrl: string;
    }) => participationApi.submitEntry(competitionId, submissionUrl),
    onSuccess: (_data, { competitionId }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.participation, competitionId],
      });
      Alert.alert('Success! 🎉', 'Your submission has been uploaded!');
    },
    onError: (error: any) => {
      Alert.alert(
        'Submission Failed',
        error.message || 'Failed to submit. Please try again.'
      );
    },
  });
};
