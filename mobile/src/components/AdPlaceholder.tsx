import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';

const AdPlaceholder: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.adIcon}>📢</Text>
      <Text style={styles.adText}>Ad Here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    paddingVertical: spacing.lg,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderStyle: 'dashed',
    gap: spacing.sm,
  },
  adIcon: {
    fontSize: 16,
    opacity: 0.5,
  },
  adText: {
    ...typography.body,
    color: colors.textTertiary,
  },
});

export default AdPlaceholder;
