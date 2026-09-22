import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';
import { Competition } from '../types';
import ProgressBar from './ProgressBar';

interface Props {
  competition: Competition;
}

const CompetitionStats: React.FC<Props> = ({ competition }) => {
  const progress = competition.participantCount / competition.maxParticipants;
  const booked = competition.participantCount;
  const total = competition.maxParticipants;

  return (
    <View style={styles.container}>
      <View style={styles.statsRow}>
        {/* Prize Pool */}
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Prize Pool</Text>
          <Text style={styles.statValue}>₹ {competition.prizePool.toLocaleString('en-IN')}</Text>
        </View>

        {/* Entry Fee */}
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Entry Fee</Text>
          <Text style={styles.statValue}>₹ {competition.entryFee}</Text>
        </View>

        {/* Spots Left */}
        <View style={styles.spotsContainer}>
          <View style={styles.spotsRow}>
            <Text style={styles.spotsIcon}>👥</Text>
            <Text style={styles.spotsText}>
              Only{' '}
              <Text style={styles.spotsHighlight}>{competition.remainingSpots} spots left</Text>
            </Text>
          </View>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <ProgressBar progress={progress} />
        <Text style={styles.progressText}>
          {booked} / {total} Booked
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderTopWidth: 0,
    borderBottomLeftRadius: borderRadius.lg,
    borderBottomRightRadius: borderRadius.lg,
    marginHorizontal: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xxs,
  },
  statValue: {
    ...typography.currencyMedium,
    color: colors.textPrimary,
  },
  spotsContainer: {
    flex: 1.2,
    alignItems: 'flex-end',
  },
  spotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  spotsIcon: {
    fontSize: 14,
  },
  spotsText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  spotsHighlight: {
    color: colors.primary,
    fontWeight: '600',
  },
  progressContainer: {
    marginTop: spacing.xs,
  },
  progressText: {
    ...typography.caption,
    color: colors.textTertiary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});

export default CompetitionStats;
