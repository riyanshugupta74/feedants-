import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Share,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, typography, spacing, borderRadius } from '../theme';
import { useAuth } from '../hooks/useAuth';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Referral'>;

const ReferralScreen: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  const referralCode = user?.referralCode || 'FEED2026';
  const earnings = user?.referralEarnings || 0;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join Feedants and compete with me! Use my referral code: ${referralCode} to get a bonus on your first entry.`,
      });
    } catch (error) {
      console.error('Error sharing', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Refer & Earn</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <Text style={styles.heroIcon}>🎁</Text>
          <Text style={styles.heroTitle}>Invite Friends & Earn Cash</Text>
          <Text style={styles.heroSubtext}>
            Get ₹50 directly added to your Feedants wallet for every friend who joins and participates in their first competition using your code.
          </Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total Earnings</Text>
            <Text style={styles.statValue}>₹{earnings}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Friends Joined</Text>
            <Text style={styles.statValue}>{Math.floor(earnings / 50)}</Text>
          </View>
        </View>

        {/* Code Section */}
        <View style={styles.codeSection}>
          <Text style={styles.sectionTitle}>Your Referral Code</Text>
          <View style={styles.codeBox}>
            <Text style={styles.codeText}>{referralCode}</Text>
            <TouchableOpacity style={styles.copyBtn}>
              <Text style={styles.copyBtnText}>Copy</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareButtonText}>Share via WhatsApp / Socials</Text>
        </TouchableOpacity>

        {/* How it works */}
        <View style={styles.howItWorks}>
          <Text style={styles.sectionTitle}>How it works</Text>
          
          <View style={styles.step}>
            <View style={styles.stepNum}><Text style={styles.stepNumText}>1</Text></View>
            <Text style={styles.stepText}>Share your unique code with your friends.</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepNum}><Text style={styles.stepNumText}>2</Text></View>
            <Text style={styles.stepText}>They sign up and enter your code during registration.</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepNum}><Text style={styles.stepNumText}>3</Text></View>
            <Text style={styles.stepText}>They participate in their first competition.</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepNum}><Text style={styles.stepNumText}>4</Text></View>
            <Text style={styles.stepText}>You both get ₹50 credited to your accounts!</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  backButton: {
    padding: spacing.xs,
    width: 60,
  },
  backButtonText: {
    ...typography.body,
    color: colors.primary,
  },
  container: {
    padding: spacing.xl,
  },
  heroContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  heroIcon: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  heroTitle: {
    ...typography.h1,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  heroSubtext: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xxl,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    height: '100%',
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  statValue: {
    ...typography.h2,
    color: colors.primary,
  },
  codeSection: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  codeBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  codeText: {
    ...typography.h2,
    color: colors.primary,
    letterSpacing: 2,
  },
  copyBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  copyBtnText: {
    ...typography.button,
    color: colors.textInverse,
    fontSize: 12,
  },
  shareButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginBottom: spacing.xxxl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  shareButtonText: {
    ...typography.button,
    color: colors.textInverse,
  },
  howItWorks: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  stepNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  stepNumText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 12,
  },
  stepText: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
  },
});

export default ReferralScreen;
