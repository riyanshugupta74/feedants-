import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';
import { useCountdown } from '../hooks/useCountdown';

interface Props {
  registrationEnd: string;
  competitionId: string;
}

const CountdownTimer: React.FC<Props> = ({ registrationEnd, competitionId }) => {
  const countdown = useCountdown(registrationEnd, competitionId);

  if (countdown.isExpired) {
    return (
      <View style={[styles.container, styles.expiredContainer]}>
        <Text style={styles.label}>Registration closed</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.clockIcon}>⏱️</Text>
        <Text style={styles.label}>Registration closes in</Text>
      </View>

      <Text style={styles.countdown}>{countdown.formattedString}</Text>

      <View style={styles.hurryContainer}>
        <Text style={styles.hurryIcon}>⏰</Text>
        <Text style={styles.hurryText}>Hurry up!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.countdownBg,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
  },
  expiredContainer: {
    justifyContent: 'center',
    backgroundColor: colors.textTertiary,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  clockIcon: {
    fontSize: 14,
  },
  label: {
    ...typography.caption,
    color: colors.countdownText,
    fontWeight: '500',
  },
  countdown: {
    ...typography.countdown,
    color: colors.countdownText,
    flex: 1.5,
    textAlign: 'center',
  },
  hurryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  hurryIcon: {
    fontSize: 12,
  },
  hurryText: {
    ...typography.caption,
    color: colors.countdownText,
    fontWeight: '600',
  },
});

export default CountdownTimer;
