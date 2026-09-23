import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  SafeAreaView,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';
import { Competition, CompetitionStatus, Participation, SubmissionStatus } from '../types';

interface Props {
  competition: Competition;
  isAuthenticated: boolean;
  isRegistered: boolean;
  participation?: Participation | null;
  isRegistering: boolean;
  onRegister: () => void;
  onUploadSubmission: () => void;
  onLogin: () => void;
}

const PrimaryActionButton: React.FC<Props> = ({
  competition,
  isAuthenticated,
  isRegistered,
  participation,
  isRegistering,
  onRegister,
  onUploadSubmission,
  onLogin,
}) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const status = competition.computedStatus;
  const hasSubmitted = participation?.submissionStatus === SubmissionStatus.SUBMITTED;

  const handleSimulatedPayment = () => {
    setIsProcessingPayment(true);
    // Simulate a network request to the payment gateway (e.g. Razorpay SDK)
    setTimeout(() => {
      setIsProcessingPayment(false);
      setShowPaymentModal(false);
      // On success, trigger the backend registration
      onRegister();
    }, 2000);
  };

  const handleRegisterPress = () => {
    if (competition.entryFee > 0) {
      setShowPaymentModal(true);
    } else {
      onRegister();
    }
  };

  // Determine button state
  const getButtonConfig = (): {
    text: string;
    subText?: string;
    onPress: () => void;
    disabled: boolean;
    variant: 'primary' | 'success' | 'disabled';
  } => {
    if (!isAuthenticated) {
      const feeText = competition.entryFee === 0 ? 'Free' : `₹${competition.entryFee}`;
      return {
        text: `Register Now — ${feeText}`,
        onPress: onLogin,
        disabled: false,
        variant: 'primary',
      };
    }

    if (isRegistering) {
      return {
        text: 'Registering...',
        onPress: () => {},
        disabled: true,
        variant: 'primary',
      };
    }

    if (status === CompetitionStatus.FULL && !isRegistered) {
      return {
        text: 'Competition Full',
        onPress: () => {},
        disabled: true,
        variant: 'disabled',
      };
    }

    if (status === CompetitionStatus.REGISTRATION_CLOSED && !isRegistered) {
      return {
        text: 'Registration Closed',
        onPress: () => {},
        disabled: true,
        variant: 'disabled',
      };
    }

    if (status === CompetitionStatus.RESULT_DECLARED) {
      return {
        text: 'View Results',
        onPress: () => {},
        disabled: false,
        variant: 'primary',
      };
    }

    if (isRegistered) {
      if (status === CompetitionStatus.SUBMISSION_OPEN && !hasSubmitted) {
        return {
          text: 'Upload Submission',
          subText: 'Registered',
          onPress: onUploadSubmission,
          disabled: false,
          variant: 'success',
        };
      }

      if (hasSubmitted) {
        return {
          text: 'Submitted ✓',
          subText: 'Your entry has been received',
          onPress: () => {},
          disabled: true,
          variant: 'success',
        };
      }

      return {
        text: 'Upload Submission',
        subText: 'Registered',
        onPress: onUploadSubmission,
        disabled: false,
        variant: 'success',
      };
    }

    if (status === CompetitionStatus.REGISTRATION_OPEN) {
      const feeText = competition.entryFee === 0 ? 'Free' : `₹${competition.entryFee}`;
      return {
        text: `Register Now — ${feeText}`,
        onPress: handleRegisterPress,
        disabled: false,
        variant: 'primary',
      };
    }

    if (status === CompetitionStatus.UPCOMING) {
      return {
        text: 'Coming Soon',
        onPress: () => {},
        disabled: true,
        variant: 'disabled',
      };
    }

    return {
      text: 'Registration Closed',
      onPress: () => {},
      disabled: true,
      variant: 'disabled',
    };
  };

  const config = getButtonConfig();

  const buttonStyle = [
    styles.button,
    config.variant === 'success' && styles.buttonSuccess,
    config.variant === 'disabled' && styles.buttonDisabled,
    config.disabled && styles.buttonDisabledOpacity,
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={buttonStyle}
        onPress={config.onPress}
        disabled={config.disabled}
        activeOpacity={0.8}
      >
        {isRegistering ? (
          <ActivityIndicator color={colors.textInverse} size="small" />
        ) : (
          <>
            <Text style={styles.buttonText}>{config.text}</Text>
            {config.subText && (
              <Text style={styles.subText}>{config.subText}</Text>
            )}
          </>
        )}
      </TouchableOpacity>

      {/* Payment Modal */}
      <Modal visible={showPaymentModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.checkoutModalContent}>
            <View style={styles.checkoutHeader}>
              <View>
                <Text style={styles.checkoutBrand}>Feedants Pay</Text>
                <Text style={styles.checkoutSub}>Secure Checkout</Text>
              </View>
              <TouchableOpacity onPress={() => setShowPaymentModal(false)}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.checkoutSummary}>
              <Text style={styles.summaryLabel}>{competition.title}</Text>
              <Text style={styles.amountValue}>₹{competition.entryFee}</Text>
            </View>

            <View style={styles.paymentMethods}>
              <Text style={styles.methodsTitle}>Select Payment Method</Text>
              
              <TouchableOpacity style={styles.methodCard} onPress={handleSimulatedPayment}>
                <View style={styles.methodIconWrapper}>
                  <Text style={styles.methodIcon}>💳</Text>
                </View>
                <View>
                  <Text style={styles.methodText}>Credit / Debit Card</Text>
                  <Text style={styles.methodDesc}>Visa, MasterCard, RuPay</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.methodCard} onPress={handleSimulatedPayment}>
                <View style={styles.methodIconWrapper}>
                  <Text style={styles.methodIcon}>📱</Text>
                </View>
                <View>
                  <Text style={styles.methodText}>UPI</Text>
                  <Text style={styles.methodDesc}>GPay, PhonePe, Paytm</Text>
                </View>
              </TouchableOpacity>
            </View>

            {isProcessingPayment && (
              <View style={styles.processingOverlay}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.processingText}>Processing Payment...</Text>
                <Text style={styles.processingSub}>Please do not close this window</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSuccess: {
    backgroundColor: colors.primary,
  },
  buttonDisabled: {
    backgroundColor: colors.textTertiary,
  },
  buttonDisabledOpacity: {
    opacity: 0.7,
  },
  buttonText: {
    ...typography.button,
    color: colors.textInverse,
  },
  subText: {
    ...typography.caption,
    color: colors.textInverse,
    opacity: 0.8,
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  checkoutModalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
    minHeight: 400,
  },
  checkoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  checkoutBrand: {
    ...typography.h3,
    color: colors.primary,
  },
  checkoutSub: {
    ...typography.caption,
    color: colors.textTertiary,
  },
  closeIcon: {
    fontSize: 24,
    color: colors.textSecondary,
    fontWeight: '300',
  },
  checkoutSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.xl,
  },
  summaryLabel: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
  },
  amountValue: {
    ...typography.h2,
    color: colors.primary,
  },
  paymentMethods: {
    marginTop: spacing.xs,
  },
  methodsTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textTertiary,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  methodIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  methodIcon: {
    fontSize: 20,
  },
  methodText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  methodDesc: {
    ...typography.caption,
    color: colors.textTertiary,
    marginTop: 2,
  },
  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.lg,
  },
  processingText: {
    ...typography.h3,
    color: colors.primary,
    marginTop: spacing.md,
  },
  processingSub: {
    ...typography.caption,
    color: colors.textTertiary,
    marginTop: spacing.xs,
  },
});

export default PrimaryActionButton;
