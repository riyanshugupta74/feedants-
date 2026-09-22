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
      return {
        text: 'Login to Register',
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
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Complete Payment</Text>
              <TouchableOpacity onPress={() => setShowPaymentModal(false)}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.paymentSummary}>
              <Text style={styles.summaryLabel}>Competition</Text>
              <Text style={styles.summaryValue}>{competition.title}</Text>
            </View>
            
            <View style={styles.paymentSummary}>
              <Text style={styles.summaryLabel}>Total Amount</Text>
              <Text style={styles.amountValue}>₹{competition.entryFee}</Text>
            </View>

            <View style={styles.paymentMethods}>
              <Text style={styles.methodsTitle}>Simulated Methods</Text>
              
              <TouchableOpacity style={styles.methodCard} onPress={handleSimulatedPayment}>
                <Text style={styles.methodIcon}>💳</Text>
                <Text style={styles.methodText}>Credit / Debit Card</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.methodCard} onPress={handleSimulatedPayment}>
                <Text style={styles.methodIcon}>📱</Text>
                <Text style={styles.methodText}>UPI (GPay, PhonePe)</Text>
              </TouchableOpacity>
            </View>

            {isProcessingPayment && (
              <View style={styles.processingOverlay}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.processingText}>Processing Payment...</Text>
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
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
    minHeight: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  modalTitle: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  closeIcon: {
    fontSize: 24,
    color: colors.textSecondary,
    fontWeight: '300',
  },
  paymentSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  summaryLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  summaryValue: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    maxWidth: '60%',
  },
  amountValue: {
    ...typography.h2,
    color: colors.primary,
  },
  paymentMethods: {
    marginTop: spacing.xl,
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
  methodIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  methodText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.lg,
  },
  processingText: {
    ...typography.h3,
    color: colors.primary,
    marginTop: spacing.md,
  },
});

export default PrimaryActionButton;
