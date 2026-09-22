import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, typography, spacing, borderRadius } from '../theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Notifications'>;

const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  
  const [pushAll, setPushAll] = useState(true);
  const [emailAll, setEmailAll] = useState(true);
  
  const [pushMatches, setPushMatches] = useState(true);
  const [pushResults, setPushResults] = useState(true);
  const [pushUpdates, setPushUpdates] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Global Preferences</Text>
          
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingTitle}>Push Notifications</Text>
              <Text style={styles.settingDesc}>Receive alerts on your device</Text>
            </View>
            <Switch
              value={pushAll}
              onValueChange={setPushAll}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingTitle}>Email Notifications</Text>
              <Text style={styles.settingDesc}>Receive updates in your inbox</Text>
            </View>
            <Switch
              value={emailAll}
              onValueChange={setEmailAll}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
        </View>

        <View style={[styles.section, { opacity: pushAll ? 1 : 0.5 }]} pointerEvents={pushAll ? 'auto' : 'none'}>
          <Text style={styles.sectionTitle}>Push Alerts (Detailed)</Text>
          
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingTitle}>Competition Deadlines</Text>
              <Text style={styles.settingDesc}>Alerts 24h before submission ends</Text>
            </View>
            <Switch
              value={pushMatches}
              onValueChange={setPushMatches}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingTitle}>Result Declarations</Text>
              <Text style={styles.settingDesc}>When winners are announced</Text>
            </View>
            <Switch
              value={pushResults}
              onValueChange={setPushResults}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingTitle}>Platform Updates</Text>
              <Text style={styles.settingDesc}>New features and promotions</Text>
            </View>
            <Switch
              value={pushUpdates}
              onValueChange={setPushUpdates}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
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
    padding: spacing.md,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.sm,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    letterSpacing: 0.5,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  settingTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  settingDesc: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing.lg,
  },
});

export default NotificationsScreen;
