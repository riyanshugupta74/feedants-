import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../theme';
import { Participation, SubmissionStatus } from '../types';

interface Props {
  participation?: Participation | null;
}

const MySubmissionCard: React.FC<Props> = ({ participation }) => {
  if (!participation || participation.submissionStatus !== SubmissionStatus.SUBMITTED || !participation.submissionUrl) {
    return null;
  }

  const handleOpenLink = () => {
    Linking.openURL(participation.submissionUrl!).catch((err) => {
      console.error("Couldn't load page", err);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Submission</Text>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Submitted ✓</Text>
          </View>
          <Text style={styles.dateText}>
            {new Date(participation.updatedAt).toLocaleDateString()}
          </Text>
        </View>
        <Text style={styles.description}>
          Your entry has been received and is currently under review.
        </Text>
        <TouchableOpacity style={styles.linkButton} onPress={handleOpenLink}>
          <Text style={styles.linkIcon}>🔗</Text>
          <Text style={styles.linkText} numberOfLines={1} ellipsizeMode="tail">
            {participation.submissionUrl}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  statusBadge: {
    backgroundColor: colors.success + '20', // 20% opacity
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  statusText: {
    ...typography.caption,
    color: colors.success,
    fontWeight: '700',
  },
  dateText: {
    ...typography.caption,
    color: colors.textTertiary,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  linkIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
  linkText: {
    ...typography.body,
    color: colors.primary,
    flex: 1,
  },
});

export default MySubmissionCard;
