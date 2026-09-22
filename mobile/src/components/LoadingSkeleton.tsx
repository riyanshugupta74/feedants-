import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { colors, spacing, borderRadius } from '../theme';

/**
 * Full-screen loading skeleton that mimics the competition detail layout.
 */
const LoadingSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header skeleton */}
      <View style={styles.section}>
        <View style={styles.headerCard}>
          <ShimmerBlock width="70%" height={20} />
          <View style={{ height: 8 }} />
          <View style={styles.tagsRow}>
            <ShimmerBlock width={60} height={24} radius={4} />
            <ShimmerBlock width={80} height={24} radius={4} />
          </View>
        </View>
      </View>

      {/* Stats skeleton */}
      <View style={styles.section}>
        <View style={styles.statsRow}>
          <View style={styles.statBlock}>
            <ShimmerBlock width={60} height={12} />
            <View style={{ height: 6 }} />
            <ShimmerBlock width={80} height={24} />
          </View>
          <View style={styles.statBlock}>
            <ShimmerBlock width={50} height={12} />
            <View style={{ height: 6 }} />
            <ShimmerBlock width={60} height={24} />
          </View>
          <View style={styles.statBlock}>
            <ShimmerBlock width={100} height={16} />
          </View>
        </View>
        <View style={{ height: 8 }} />
        <ShimmerBlock width="100%" height={6} radius={3} />
      </View>

      {/* Judge skeleton */}
      <View style={[styles.section, styles.judgeRow]}>
        <ShimmerBlock width={70} height={70} radius={35} />
        <View style={styles.judgeInfo}>
          <ShimmerBlock width={40} height={12} />
          <View style={{ height: 4 }} />
          <ShimmerBlock width={120} height={16} />
          <View style={{ height: 4 }} />
          <ShimmerBlock width={150} height={12} />
        </View>
      </View>

      {/* Countdown skeleton */}
      <View style={styles.section}>
        <ShimmerBlock width="100%" height={44} radius={12} />
      </View>

      {/* Dates skeleton */}
      <View style={styles.section}>
        <ShimmerBlock width={130} height={18} />
        <View style={{ height: 12 }} />
        <View style={styles.datesGrid}>
          <ShimmerBlock width="47%" height={60} radius={8} />
          <ShimmerBlock width="47%" height={60} radius={8} />
          <ShimmerBlock width="47%" height={60} radius={8} />
          <ShimmerBlock width="47%" height={60} radius={8} />
        </View>
      </View>

      {/* Winners skeleton */}
      <View style={styles.section}>
        <ShimmerBlock width={140} height={18} />
        <View style={{ height: 12 }} />
        <View style={styles.winnersRow}>
          {[1, 2, 3, 4].map((i) => (
            <View key={i} style={styles.winnerBlock}>
              <ShimmerBlock width={70} height={70} radius={35} />
              <View style={{ height: 6 }} />
              <ShimmerBlock width={60} height={10} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

interface ShimmerProps {
  width: number | string;
  height: number;
  radius?: number;
}

const ShimmerBlock: React.FC<ShimmerProps> = ({
  width,
  height,
  radius = 6,
}) => {
  return (
    <View
      style={[
        styles.shimmer,
        {
          width: width as any,
          height,
          borderRadius: radius,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: spacing.md,
  },
  section: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerCard: {
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBlock: {
    flex: 1,
  },
  judgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  judgeInfo: {
    flex: 1,
  },
  datesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  winnersRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  winnerBlock: {
    alignItems: 'center',
  },
  shimmer: {
    backgroundColor: colors.shimmer,
  },
});

export default LoadingSkeleton;
