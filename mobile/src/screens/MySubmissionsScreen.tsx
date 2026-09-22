import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, typography, spacing, borderRadius } from '../theme';
import apiClient from '../api/client';
import { ParticipationStatus, SubmissionStatus } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MySubmissions'>;

interface PopulatedParticipation {
  _id: string;
  competitionId: {
    _id: string;
    title: string;
    category: string;
    image: string;
    entryFee: number;
    prizePool: number;
  };
  status: ParticipationStatus;
  submissionStatus: SubmissionStatus;
  joinedAt: string;
}

const MySubmissionsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [participations, setParticipations] = useState<PopulatedParticipation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await apiClient.get('/auth/submissions');
        setParticipations(response.data.data.participations);
      } catch (error) {
        console.error('Failed to fetch submissions', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  const renderItem = ({ item }: { item: PopulatedParticipation }) => {
    const competition = item.competitionId;
    
    // Safety check in case competition was deleted
    if (!competition) return null;

    let statusColor = colors.primary;
    let statusText = 'Registered';

    if (item.submissionStatus === SubmissionStatus.SUBMITTED) {
      statusColor = colors.success;
      statusText = 'Submitted';
    } else if (item.submissionStatus === SubmissionStatus.UNDER_REVIEW) {
      statusColor = colors.warning;
      statusText = 'Under Review';
    }

    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('CompetitionDetail', { id: competition._id })}
        activeOpacity={0.8}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.category}>{competition.category}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>{statusText}</Text>
          </View>
        </View>
        
        <Text style={styles.title} numberOfLines={2}>{competition.title}</Text>
        
        <View style={styles.cardFooter}>
          <View>
            <Text style={styles.footerLabel}>Joined</Text>
            <Text style={styles.footerValue}>{new Date(item.joinedAt).toLocaleDateString()}</Text>
          </View>
          <View style={styles.footerRight}>
            <Text style={styles.footerLabel}>Prize Pool</Text>
            <Text style={styles.prizeValue}>₹{competition.prizePool.toLocaleString()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Submissions</Text>
        <View style={{ width: 60 }} />
      </View>

      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : participations.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyIcon}>📝</Text>
          <Text style={styles.emptyTitle}>No Submissions Yet</Text>
          <Text style={styles.emptySubtext}>
            You haven't registered for any competitions. Head over to the Explore tab to find one!
          </Text>
          <TouchableOpacity 
            style={styles.exploreButton}
            onPress={() => navigation.navigate('MainTabs', { screen: 'Explore' })}
          >
            <Text style={styles.exploreButtonText}>Explore Competitions</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={participations}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxl,
  },
  listContainer: {
    padding: spacing.md,
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  category: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  statusText: {
    ...typography.caption,
    fontWeight: '700',
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  footerValue: {
    ...typography.bodySmall,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  footerRight: {
    alignItems: 'flex-end',
  },
  prizeValue: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '700',
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
  emptySubtext: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  exploreButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
  },
  exploreButtonText: {
    ...typography.button,
    color: colors.textInverse,
  },
});

export default MySubmissionsScreen;
