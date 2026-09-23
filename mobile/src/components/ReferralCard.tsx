import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';
import * as Clipboard from 'expo-clipboard';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

interface Props {
  referralCode?: string;
}

const ReferralCard: React.FC<Props> = ({ referralCode }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const referralLink = `https://feedants.com/r/${referralCode || 'referral123'}`;

  const handleCopyLink = async () => {
    try {
      await Clipboard.setStringAsync(referralLink);
      Alert.alert('Copied!', 'Referral link copied to clipboard.');
    } catch {
      Alert.alert('Error', 'Failed to copy link.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.iconContainer}>
          <Text style={styles.giftIcon}>🎁</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Refer & Earn more discount</Text>
          <View style={styles.linkRow}>
            <View style={styles.linkBox}>
              <Text style={styles.linkText} numberOfLines={1}>
                {referralLink}
              </Text>
            </View>
            <TouchableOpacity style={styles.copyBtn} onPress={handleCopyLink}>
              <Text style={styles.copyBtnText}>Copy Link</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.referBtn}
          onPress={() => navigation.navigate('Referral')}
        >
          <Text style={styles.referBtnText}>Refer Now</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.earningsText}>
        You earn <Text style={styles.earningsHighlight}>₹10</Text> for every signup
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.primaryMuted,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  giftIcon: {
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  linkBox: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  linkText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  copyBtn: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  copyBtnText: {
    ...typography.labelSmall,
    color: colors.primary,
    fontWeight: '600',
  },
  referBtn: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  referBtnText: {
    ...typography.buttonSmall,
    color: colors.textInverse,
  },
  earningsText: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'right',
    marginTop: spacing.xs,
  },
  earningsHighlight: {
    color: colors.primary,
    fontWeight: '700',
  },
});

export default ReferralCard;
