import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation, RouteProp, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing } from '../theme';
import { competitionsApi } from '../api/competitions';
import { Competition } from '../types';
import CompetitionCard from '../components/CompetitionCard';
import { RootStackParamList } from '../navigation/AppNavigator';

type ExploreRouteProp = RouteProp<RootStackParamList, 'MainTabs'>;

const CATEGORIES = ['All', 'Dance', 'Music', 'Photography', 'Coding', 'Design', 'Art'];

const ExploreScreen = () => {
  const route = useRoute<ExploreRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  const initialCategory = route.params?.params?.category || 'All';
  
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // When navigated to with a category param, update active category
  useEffect(() => {
    if (route.params?.params?.category) {
      setActiveCategory(route.params.params.category);
    }
  }, [route.params?.params?.category]);

  const fetchCompetitions = async () => {
    try {
      setError(null);
      const params = activeCategory !== 'All' ? { category: activeCategory } : undefined;
      const data = await competitionsApi.getAll(params);
      setCompetitions(data.competitions);
    } catch (err: any) {
      console.error('Error fetching competitions:', err);
      setError('Failed to load competitions. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchCompetitions();
    }, [activeCategory])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchCompetitions();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Competitions</Text>
      </View>
      
      {/* Category Filter */}
      <View style={styles.categoriesWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity 
              key={category} 
              style={[
                styles.categoryPill, 
                activeCategory === category && styles.categoryPillActive
              ]}
              onPress={() => setActiveCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                activeCategory === category && styles.categoryTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView 
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
      >
        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Finding competitions...</Text>
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={fetchCompetitions}>
              <Text style={styles.retryBtnText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : competitions.length === 0 ? (
          <View style={styles.centerContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>No Competitions Found</Text>
            <Text style={styles.emptySub}>We couldn't find any competitions in the {activeCategory} category right now. Check back later!</Text>
          </View>
        ) : (
          competitions.map((comp) => (
            <CompetitionCard key={comp._id} competition={comp} />
          ))
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
  categoriesWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  categoriesContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    paddingTop: spacing.xs,
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
  categoryPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  categoryTextActive: {
    color: colors.textInverse,
  },
  listContainer: {
    padding: spacing.md,
    flexGrow: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: spacing.xl,
  },
  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  errorText: {
    ...typography.body,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  retryBtn: {
    backgroundColor: 'rgba(13, 92, 99, 0.1)',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 8,
  },
  retryBtnText: {
    ...typography.button,
    color: colors.primary,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  emptySub: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default ExploreScreen;
