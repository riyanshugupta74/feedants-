import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';

const DisclaimerBanner: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>ℹ️</Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Disclaimer:</Text> Only contributions from paid
        participants will be considered for judging.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    marginHorizontal: spacing.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  icon: {
    fontSize: 14,
  },
  text: {
    ...typography.caption,
    color: colors.textSecondary,
    flex: 1,
  },
  bold: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
});

export default DisclaimerBanner;
