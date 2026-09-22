import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';
import { Reward } from '../types';

interface Props {
  rewards: Reward[];
}

const POSITION_ICONS: Record<number, string> = {
  1: '🥇',
  2: '🥈',
  3: '🥉',
  4: '⭐',
  5: '⭐',
  6: '⭐',
};

const RewardsList: React.FC<Props> = ({ rewards }) => {
  if (!rewards || rewards.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Rewards</Text>
        <Text style={styles.subtitle}>(All Positions)</Text>
      </View>

      <View style={styles.list}>
        {rewards.map((reward, index) => (
          <View
            key={index}
            style={[
              styles.rewardItem,
              index !== rewards.length - 1 && styles.rewardBorder,
            ]}
          >
            <View style={styles.rewardLeft}>
              <Text style={styles.positionIcon}>
                {POSITION_ICONS[reward.position] || '⭐'}
              </Text>
              <Text style={styles.rewardLabel}>{reward.label}</Text>
            </View>
            <Text style={styles.rewardAmount}>₹ {reward.amount}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textTertiary,
  },
  list: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  rewardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
  },
  rewardBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  rewardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  positionIcon: {
    fontSize: 20,
    width: 28,
    textAlign: 'center',
  },
  rewardLabel: {
    ...typography.body,
    color: colors.textPrimary,
  },
  rewardAmount: {
    ...typography.currencySmall,
    color: colors.primary,
  },
});

export default RewardsList;
