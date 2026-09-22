import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors, typography, spacing } from '../theme';

const TABS: Record<string, { label: string; icon: string }> = {
  Home: { label: 'Home', icon: '🏠' },
  Explore: { label: 'Explore', icon: '🔍' },
  Create: { label: '', icon: '➕' },
  Competitions: { label: 'Competitions', icon: '🏆' },
  Profile: { label: 'Profile', icon: '👤' },
};

const BottomNavigation: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.floatingWrapper}>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const tabInfo = TABS[route.name] || { label: route.name, icon: '❓' };
          const isCreate = route.name === 'Create';

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          if (isCreate) {
            return (
              <TouchableOpacity
                key={route.key}
                style={styles.createButton}
                onPress={onPress}
                activeOpacity={0.8}
              >
                <View style={styles.createCircle}>
                  <Text style={styles.createIcon}>{tabInfo.icon}</Text>
                </View>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tab}
              onPress={onPress}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, isFocused && styles.iconContainerActive]}>
                <Text style={[styles.tabIcon, isFocused && styles.tabIconActive]}>
                  {tabInfo.icon}
                </Text>
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  isFocused && styles.tabLabelActive,
                ]}
              >
                {tabInfo.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingWrapper: {
    position: 'absolute',
    bottom: spacing.md,
    left: spacing.md,
    right: spacing.md,
    backgroundColor: 'transparent',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.surface,
    borderRadius: 32,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    elevation: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: spacing.xs,
  },
  iconContainer: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 4,
  },
  iconContainerActive: {
    backgroundColor: 'rgba(13, 92, 99, 0.1)', // Light primary color background
  },
  tabIcon: {
    fontSize: 20,
    opacity: 0.6,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.textTertiary,
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  createButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: -spacing.xl,
  },
  createCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    borderWidth: 4,
    borderColor: colors.background, // Creates a cut-out effect
  },
  createIcon: {
    fontSize: 24,
    color: colors.textInverse,
  },
});

export default BottomNavigation;
