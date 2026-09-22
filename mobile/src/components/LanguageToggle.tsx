import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';

interface Props {
  onGoBack: () => void;
}

const LanguageToggle: React.FC<Props> = ({ onGoBack }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onGoBack}>
        <Text style={styles.backArrow}>←</Text>
        <Text style={styles.backText}>Go back</Text>
      </TouchableOpacity>

      <View style={styles.languageContainer}>
        <TouchableOpacity style={[styles.langBtn, styles.langBtnActive]}>
          <Text style={[styles.langText, styles.langTextActive]}>ENG</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.langBtn}>
          <Text style={styles.langText}>हिंदी</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  backArrow: {
    fontSize: 20,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  backText: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  languageContainer: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundTertiary,
    borderRadius: borderRadius.full,
    padding: 2,
  },
  langBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  langBtnActive: {
    backgroundColor: colors.primary,
  },
  langText: {
    ...typography.labelSmall,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  langTextActive: {
    color: colors.textInverse,
  },
});

export default LanguageToggle;
