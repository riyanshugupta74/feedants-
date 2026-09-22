import { useState, useEffect, useRef, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { calculateCountdown, CountdownResult } from '../utils/formatDate';
import { QUERY_KEYS } from '../constants';

/**
 * Custom hook for a live countdown timer.
 *
 * Updates every second and triggers competition refetch when expired.
 */
export const useCountdown = (
  targetDate: string | undefined,
  competitionId?: string
): CountdownResult & { formattedString: string } => {
  const [countdown, setCountdown] = useState<CountdownResult>(
    targetDate
      ? calculateCountdown(targetDate)
      : { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, totalSeconds: 0 }
  );

  const queryClient = useQueryClient();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasExpiredRef = useRef(false);

  const tick = useCallback(() => {
    if (!targetDate) return;

    const result = calculateCountdown(targetDate);
    setCountdown(result);

    if (result.isExpired && !hasExpiredRef.current) {
      hasExpiredRef.current = true;

      // Stop the timer
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      // Refetch competition data to update UI
      if (competitionId) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.competition, competitionId],
        });
      }
    }
  }, [targetDate, competitionId, queryClient]);

  useEffect(() => {
    if (!targetDate) return;

    hasExpiredRef.current = false;

    // Initial calculation
    tick();

    // Set up 1-second interval
    intervalRef.current = setInterval(tick, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [targetDate, tick]);

  // Format countdown string like "01d : 06h : 28m : 32s"
  const pad = (n: number) => n.toString().padStart(2, '0');
  const formattedString = countdown.isExpired
    ? '00d : 00h : 00m : 00s'
    : `${pad(countdown.days)}d : ${pad(countdown.hours)}h : ${pad(countdown.minutes)}m : ${pad(countdown.seconds)}s`;

  return {
    ...countdown,
    formattedString,
  };
};
