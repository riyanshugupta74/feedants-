import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, typography, spacing, borderRadius } from '../theme';
import { useAuth } from '../hooks/useAuth';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HOW_IT_WORKS = [
  { id: '1', title: 'Discover', desc: 'Find exciting competitions that match your passion.', icon: '🔍' },
  { id: '2', title: 'Participate', desc: 'Submit your entry and pay the nominal fee.', icon: '✍️' },
  { id: '3', title: 'Win Rewards', desc: 'Get judged by experts and win cash prizes.', icon: '🏆' },
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { user, isAuthenticated } = useAuth();

  const showInfo = (title: string, message: string) => {
    Alert.alert(title, message, [{ text: 'Got it' }]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoIconText}>F</Text>
            </View>
            <Text style={styles.logoText}>eedants</Text>
          </View>
          {isAuthenticated ? (
            <Image 
              source={{ uri: (user as any)?.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg' }} 
              style={styles.avatar} 
            />
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginBtn}>
              <Text style={styles.loginBtnText}>Login</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Unleash Your Potential</Text>
            <Text style={styles.heroSubtitle}>
              Join premium competitions, showcase your talent, and win exciting rewards.
            </Text>
            <TouchableOpacity 
              style={styles.heroButton}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('MainTabs', { screen: 'Explore', params: { category: 'All' } })} 
            >
              <Text style={styles.heroButtonText}>Explore Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories Scroll */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
          {['Dance', 'Music', 'Photography', 'Coding', 'Design', 'Art'].map((category, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.categoryPill}
              onPress={() => navigation.navigate('MainTabs', { screen: 'Explore', params: { category } })}
            >
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Trust & Stats Banner */}
        <View style={styles.trustBanner}>
          <Text style={styles.trustBannerIcon}>💸</Text>
          <View>
            <Text style={styles.trustBannerTitle}>Over $10,000 Awarded</Text>
            <Text style={styles.trustBannerSub}>To 500+ creators worldwide this month.</Text>
          </View>
        </View>

        {/* Top Creators Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Creators</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.creatorsContainer}>
          {[1, 2, 3, 4, 5].map((item) => (
            <View key={item} style={styles.creatorCard}>
              <Image source={{ uri: `https://randomuser.me/api/portraits/women/${item * 10}.jpg` }} style={styles.creatorAvatar} />
              <Text style={styles.creatorName}>Creator {item}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Featured Competition */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Competition</Text>
          <Text style={styles.seeAllText}>See All</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.featuredCard}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('CompetitionDetail', { id: '600000000000000000000000' })}
        >
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800' }} 
            style={styles.featuredImage}
          />
          <View style={styles.featuredContent}>
            <View style={styles.tagContainer}>
              <Text style={styles.tagText}>LIVE</Text>
            </View>
            <Text style={styles.featuredCardTitle}>Feedants Classical Dance</Text>
            <Text style={styles.featuredCardSubtitle}>Prize Pool: $1,500</Text>
            
            <View style={styles.cardFooter}>
              <Text style={styles.footerText}>81 Participants joined</Text>
              <View style={styles.joinButton}>
                <Text style={styles.joinButtonText}>View Details</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* How It Works Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>How It Works</Text>
        </View>

        <View style={styles.stepsGrid}>
          {HOW_IT_WORKS.map((step) => (
            <View key={step.id} style={styles.stepCard}>
              <View style={styles.stepIconContainer}>
                <Text style={styles.stepIcon}>{step.icon}</Text>
              </View>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDesc}>{step.desc}</Text>
            </View>
          ))}
        </View>
        
        {/* Footer Section */}
        <View style={styles.footerContainer}>
          <View style={styles.footerLinks}>
            <TouchableOpacity onPress={() => showInfo('About Us', 'Feedants is a premium platform connecting talented creators with life-changing competitions and rewards worldwide.')}>
              <Text style={styles.footerLink}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showInfo('Contact', 'Reach out to our support team 24/7 at support@feedants.com or call 1-800-FEEDANTS.')}>
              <Text style={styles.footerLink}>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showInfo('Terms of Service', 'By using Feedants, you agree to fair play and authentic submissions. All rewards are distributed within 7 days of competition completion.')}>
              <Text style={styles.footerLink}>Terms of Service</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showInfo('Privacy Policy', 'We take your privacy seriously. We never sell your data to third parties. Your payments and submissions are fully encrypted.')}>
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.socialIcon} onPress={() => showInfo('Social', 'Follow us on Facebook for daily updates!')}><Text>📘</Text></TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon} onPress={() => showInfo('Social', 'Follow us on Twitter for real-time announcements!')}><Text>🐦</Text></TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon} onPress={() => showInfo('Social', 'Follow us on Instagram for featured creator spotlights!')}><Text>📸</Text></TouchableOpacity>
          </View>
          <Text style={styles.copyrightText}>© 2026 Feedants. All rights reserved.</Text>
        </View>

        {/* Spacer for bottom navigation */}
        <View style={{ height: 100 }} />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
    marginTop: Platform.OS === 'android' ? spacing.md : 0,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  logoIconText: {
    color: colors.textInverse,
    fontWeight: '900',
    fontSize: 20,
    fontStyle: 'italic',
  },
  logoText: {
    ...typography.h1,
    color: colors.textPrimary,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  loginBtn: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  loginBtnText: {
    ...typography.button,
    color: colors.primary,
    fontSize: 14,
  },
  heroContainer: {
    backgroundColor: '#0D5C63', // Primary brand color
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.xxl,
    elevation: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  heroOverlay: {
    padding: spacing.xl,
    backgroundColor: 'rgba(255,255,255,0.05)', // Glassmorphism hint
  },
  heroTitle: {
    ...typography.h1,
    color: colors.textInverse,
    marginBottom: spacing.sm,
    fontSize: 28,
  },
  heroSubtitle: {
    ...typography.body,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: spacing.xl,
    lineHeight: 22,
  },
  heroButton: {
    backgroundColor: colors.textInverse,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
  },
  heroButtonText: {
    ...typography.button,
    color: colors.primary,
    fontWeight: '700',
  },
  categoriesContainer: {
    paddingBottom: spacing.md,
    marginBottom: spacing.lg,
  },
  categoryPill: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  trustBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 92, 99, 0.08)',
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.xxl,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  trustBannerIcon: {
    fontSize: 28,
    marginRight: spacing.md,
  },
  trustBannerTitle: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: 2,
  },
  trustBannerSub: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  creatorsContainer: {
    paddingBottom: spacing.md,
    marginBottom: spacing.xxl,
  },
  creatorCard: {
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  creatorAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: spacing.xs,
    borderWidth: 2,
    borderColor: colors.border,
  },
  creatorName: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  seeAllText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  featuredCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.xxl,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featuredImage: {
    width: '100%',
    height: 180,
  },
  featuredContent: {
    padding: spacing.lg,
  },
  tagContainer: {
    position: 'absolute',
    top: -165,
    right: 15,
    backgroundColor: colors.error,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    color: colors.textInverse,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  featuredCardTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  featuredCardSubtitle: {
    ...typography.body,
    color: colors.success,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  footerText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  joinButton: {
    backgroundColor: 'rgba(13, 92, 99, 0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  joinButtonText: {
    ...typography.button,
    color: colors.primary,
    fontSize: 12,
  },
  stepsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  stepCard: {
    width: '100%',
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  stepIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(13, 92, 99, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  stepIcon: {
    fontSize: 24,
  },
  stepTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  stepDesc: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  footerContainer: {
    marginTop: spacing.xxl,
    paddingTop: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  footerLink: {
    ...typography.caption,
    color: colors.textSecondary,
    marginHorizontal: spacing.sm,
    marginBottom: spacing.sm,
  },
  socialIcons: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  copyrightText: {
    ...typography.caption,
    color: colors.textTertiary,
    fontSize: 10,
  },
});

export default HomeScreen;
