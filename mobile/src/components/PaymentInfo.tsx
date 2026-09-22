import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';

const PaymentInfo: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Prize money info */}
      <View style={styles.row}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>▶</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.infoTitle}>How will you receive{'\n'}prize money?</Text>
          <Text style={styles.infoSubtitle}>Watch video to know more</Text>
        </View>

        <View style={styles.dividerVertical} />

        <View style={styles.paymentBlock}>
          <View style={styles.paymentRow}>
            <Text style={styles.checkIcon}>✓</Text>
            <Text style={styles.paymentText}>Refund policy</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.lockIcon}>🔒</Text>
            <Text style={styles.paymentText}>Secure payments powered by</Text>
          </View>
          <Text style={styles.razorpay}>Razorpay</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.textPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  icon: {
    color: colors.textInverse,
    fontSize: 14,
    marginLeft: 2,
  },
  infoBlock: {
    flex: 1,
  },
  infoTitle: {
    ...typography.bodySmall,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  infoSubtitle: {
    ...typography.caption,
    color: colors.textTertiary,
  },
  dividerVertical: {
    width: 1,
    height: '100%',
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  paymentBlock: {
    flex: 1,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  checkIcon: {
    color: colors.success,
    fontSize: 12,
    fontWeight: '700',
  },
  lockIcon: {
    fontSize: 11,
  },
  paymentText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  razorpay: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '700',
    marginLeft: spacing.lg,
  },
});

export default PaymentInfo;
