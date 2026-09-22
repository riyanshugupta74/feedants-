import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';
import { Competition, CompetitionStatus } from '../types';

interface Props {
  competition: Competition;
}

const CompetitionHeader: React.FC<Props> = ({ competition }) => {
  const isRegistered =
    competition.computedStatus === CompetitionStatus.REGISTRATION_OPEN;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.title}>{competition.title}</Text>
        <View style={styles.registeredBadge}>
          <Text style={styles.registeredIcon}>✓</Text>
          <Text style={styles.registeredText}>Registered</Text>
        </View>
      </View>

      <View style={styles.tagsRow}>
        {competition.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
        {competition.winnerCertificate && (
          <View style={styles.certificateRow}>
            <Text style={styles.certificateIcon}>🏆</Text>
            <Text style={styles.certificateText}>Winners get certificate</Text>
          </View>
        )}
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
    borderRadius: borderRadius.lg,
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    flex: 1,
    marginRight: spacing.sm,
  },
  registeredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.registeredBg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  registeredIcon: {
    color: colors.registeredText,
    fontSize: 14,
    fontWeight: '700',
  },
  registeredText: {
    ...typography.labelSmall,
    color: colors.registeredText,
    fontWeight: '600',
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tag: {
    backgroundColor: colors.backgroundTertiary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  tagText: {
    ...typography.labelSmall,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  certificateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  certificateIcon: {
    fontSize: 14,
  },
  certificateText: {
    ...typography.labelSmall,
    color: colors.textSecondary,
  },
});

export default CompetitionHeader;
