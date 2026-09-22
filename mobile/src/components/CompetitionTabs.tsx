import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';
import { Competition } from '../types';

interface Props {
  competition: Competition;
}

type TabKey = 'about' | 'judging' | 'rules';

const CompetitionTabs: React.FC<Props> = ({ competition }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('about');
  const [expanded, setExpanded] = useState(false);

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'about', label: 'About Competition' },
    { key: 'judging', label: 'Judging Parameters' },
    { key: 'rules', label: 'Rules & Eligibility' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <View style={styles.contentContainer}>
            <Text
              style={styles.contentText}
              numberOfLines={expanded ? undefined : 4}
            >
              {competition.aboutCompetition || competition.description}
            </Text>
            <TouchableOpacity
              onPress={() => setExpanded(!expanded)}
              style={styles.viewMoreBtn}
            >
              <Text style={styles.viewMoreText}>
                {expanded ? 'View less' : 'View more'}{' '}
                {expanded ? '▲' : '▼'}
              </Text>
            </TouchableOpacity>
          </View>
        );

      case 'judging':
        return (
          <View style={styles.contentContainer}>
            {competition.judgingParameters.map((param, index) => (
              <View key={index} style={styles.paramItem}>
                <View style={styles.paramHeader}>
                  <Text style={styles.paramName}>{param.name}</Text>
                  <Text style={styles.paramWeightage}>{param.weightage}%</Text>
                </View>
                <Text style={styles.paramDescription}>{param.description}</Text>
              </View>
            ))}
          </View>
        );

      case 'rules':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.subSectionTitle}>Rules</Text>
            {competition.rules.map((rule, index) => (
              <View key={index} style={styles.ruleItem}>
                <Text style={styles.ruleBullet}>•</Text>
                <Text style={styles.ruleText}>{rule}</Text>
              </View>
            ))}

            <Text style={[styles.subSectionTitle, { marginTop: spacing.lg }]}>
              Eligibility
            </Text>
            {competition.eligibility.map((item, index) => (
              <View key={index} style={styles.ruleItem}>
                <Text style={styles.ruleBullet}>•</Text>
                <Text style={styles.ruleText}>{item}</Text>
              </View>
            ))}
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* Tab Bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabBar}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              activeTab === tab.key && styles.tabActive,
            ]}
            onPress={() => {
              setActiveTab(tab.key);
              setExpanded(false);
            }}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.tabTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content */}
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    paddingBottom: spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.tabIndicator,
  },
  tabText: {
    ...typography.tab,
    color: colors.tabInactive,
  },
  tabTextActive: {
    ...typography.tabActive,
    color: colors.tabActive,
  },
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  contentText: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  viewMoreBtn: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  viewMoreText: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '500',
  },
  paramItem: {
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  paramHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xxs,
  },
  paramName: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  paramWeightage: {
    ...typography.bodyBold,
    color: colors.primary,
  },
  paramDescription: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  subSectionTitle: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  ruleItem: {
    flexDirection: 'row',
    paddingVertical: spacing.xxs,
    gap: spacing.sm,
  },
  ruleBullet: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: 1,
  },
  ruleText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    flex: 1,
  },
});

export default CompetitionTabs;
