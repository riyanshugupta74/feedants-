import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing, borderRadius } from '../theme';
import { useAuth } from '../hooks/useAuth';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const SETTINGS_MENU = [
  { id: '1', title: 'Edit Profile', route: 'EditProfile', icon: '✏️' },
  { id: '2', title: 'My Submissions', route: 'MySubmissions', icon: '📤' },
  { id: '3', title: 'Referral Program', route: 'Referral', icon: '🎁' },
  { id: '4', title: 'Notifications', route: 'Notifications', icon: '🔔' },
  { id: '5', title: 'Settings', route: 'Settings', icon: '⚙️' },
];

const ProfileScreen = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigation = useNavigation<any>();

  const handleLogin = () => {
    navigation.navigate('Login');
  };
  
  const handleMenuPress = (route: string) => {
    navigation.navigate(route);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {!isAuthenticated ? (
          <View style={styles.unauthContainer}>
            <View style={styles.unauthIconContainer}>
              <Text style={styles.unauthIcon}>👋</Text>
            </View>
            <Text style={styles.unauthTitle}>Join Feedants</Text>
            <Text style={styles.unauthSubtext}>
              Create a free account or log in to track your competitions, manage rewards, and invite friends.
            </Text>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.8}>
              <Text style={styles.loginButtonText}>Login / Sign Up</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.profileContainer}>
            
            {/* Top Profile Card */}
            <View style={styles.heroCard}>
              <View style={styles.heroHeader}>
                <View style={styles.avatarContainer}>
                  <Image 
                    source={{ uri: (user as any)?.avatar || 'https://via.placeholder.com/150/0D5C63/FFFFFF?text=Avatar' }} 
                    style={styles.avatar} 
                  />
                  <TouchableOpacity style={styles.editAvatarBtn}>
                    <Text style={styles.editAvatarIcon}>📷</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.heroInfo}>
                  <Text style={styles.userName}>{user?.name}</Text>
                  <Text style={styles.userEmail}>{user?.email}</Text>
                  <View style={styles.roleBadge}>
                    <Text style={styles.roleText}>{(user as any)?.role === 'admin' ? 'Administrator' : 'Creator'}</Text>
                  </View>
                </View>
              </View>

              {/* Stats Row */}
              <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>Competitions</Text>
                  <Text style={styles.statValue}>3</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>Earnings</Text>
                  <Text style={styles.statValue}>₹{user?.referralEarnings || 0}</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>Rank</Text>
                  <Text style={styles.statValue}>#42</Text>
                </View>
              </View>
            </View>

            {/* Referral Banner */}
            <View style={styles.referralBanner}>
              <Text style={styles.referralIcon}>🎁</Text>
              <View style={styles.referralTextContainer}>
                <Text style={styles.referralTitle}>Invite Friends, Earn Cash!</Text>
                <Text style={styles.referralSub}>Your Code: <Text style={styles.referralCode}>{user?.referralCode || 'FEED2026'}</Text></Text>
              </View>
              <TouchableOpacity style={styles.copyBtn}>
                <Text style={styles.copyBtnText}>Copy</Text>
              </TouchableOpacity>
            </View>

            {/* Menu List */}
            <View style={styles.menuContainer}>
              <Text style={styles.sectionTitle}>Account</Text>
              {SETTINGS_MENU.map((item, index) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={[styles.menuItem, index === SETTINGS_MENU.length - 1 && styles.menuItemLast]}
                  onPress={() => handleMenuPress(item.route)}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIconContainer}>
                      <Text style={styles.menuIcon}>{item.icon}</Text>
                    </View>
                    <Text style={styles.menuText}>{item.title}</Text>
                  </View>
                  <Text style={styles.menuChevron}>›</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={logout} activeOpacity={0.7}>
              <Text style={styles.logoutButtonText}>Log Out</Text>
            </TouchableOpacity>
            
            <Text style={styles.versionText}>Feedants App v1.0.0</Text>
          </View>
        )}
        
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
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  headerTitle: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  container: {
    padding: spacing.md,
    flexGrow: 1,
  },
  unauthContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxl,
  },
  unauthIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(13, 92, 99, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  unauthIcon: {
    fontSize: 40,
  },
  unauthTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  unauthSubtext: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 22,
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xxl,
    borderRadius: borderRadius.lg,
    width: '100%',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loginButtonText: {
    ...typography.button,
    color: colors.textInverse,
  },
  profileContainer: {
    width: '100%',
  },
  heroCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.background,
    marginRight: spacing.lg,
    position: 'relative',
    borderWidth: 2,
    borderColor: 'rgba(13, 92, 99, 0.2)',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: colors.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  editAvatarIcon: {
    fontSize: 12,
  },
  heroInfo: {
    flex: 1,
  },
  userName: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  userEmail: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  roleBadge: {
    backgroundColor: 'rgba(13, 92, 99, 0.1)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 4,
  },
  roleText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.border,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    ...typography.h3,
    color: colors.primary,
  },
  referralBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.textPrimary,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xl,
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  referralIcon: {
    fontSize: 28,
    marginRight: spacing.md,
  },
  referralTextContainer: {
    flex: 1,
  },
  referralTitle: {
    ...typography.body,
    fontWeight: '700',
    color: colors.textInverse,
    marginBottom: 2,
  },
  referralSub: {
    ...typography.caption,
    color: colors.textTertiary,
  },
  referralCode: {
    fontWeight: '700',
    color: colors.primaryLight,
  },
  copyBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  copyBtnText: {
    ...typography.button,
    color: colors.textInverse,
    fontSize: 12,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  menuContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.sm,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(13, 92, 99, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  menuIcon: {
    fontSize: 16,
  },
  menuText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  menuChevron: {
    fontSize: 20,
    color: colors.textTertiary,
  },
  logoutButton: {
    backgroundColor: colors.errorLight,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.2)',
  },
  logoutButtonText: {
    ...typography.button,
    color: colors.error,
  },
  versionText: {
    ...typography.caption,
    color: colors.textTertiary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
});

export default ProfileScreen;
