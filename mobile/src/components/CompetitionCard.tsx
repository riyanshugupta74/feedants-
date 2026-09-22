import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Competition } from '../types';
import { colors, typography, spacing, borderRadius } from '../theme';
import { RootStackParamList } from '../navigation/AppNavigator';

interface CompetitionCardProps {
  competition: Competition;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CompetitionCard: React.FC<CompetitionCardProps> = ({ competition }) => {
  const navigation = useNavigation<NavigationProp>();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'REGISTRATION_OPEN': return colors.success;
      case 'LIVE':
      case 'SUBMISSION_OPEN': return colors.error;
      case 'UPCOMING': return colors.warning;
      case 'FULL': return colors.textTertiary;
      default: return colors.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'REGISTRATION_OPEN': return 'Register Now';
      case 'SUBMISSION_OPEN': return 'Live';
      case 'UPCOMING': return 'Upcoming';
      case 'FULL': return 'Full';
      case 'COMPLETED':
      case 'RESULT_DECLARED': return 'Ended';
      default: return status.replace('_', ' ');
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('CompetitionDetail', { id: competition._id })}
    >
      <Image source={{ uri: competition.image || 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800' }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{competition.category}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(competition.status) }]}>
            <Text style={styles.statusText}>{getStatusText(competition.computedStatus || competition.status)}</Text>
          </View>
        </View>

        <Text style={styles.title} numberOfLines={2}>{competition.title}</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Prize Pool</Text>
            <Text style={styles.statValue}>${competition.prizePool}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Entry</Text>
            <Text style={styles.statValue}>{competition.entryFee === 0 ? 'Free' : `$${competition.entryFee}`}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Spots</Text>
            <Text style={styles.statValue}>{competition.remainingSpots !== undefined ? competition.remainingSpots : (competition.maxParticipants - competition.participantCount)} Left</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.participantsText}>{competition.participantCount} joined</Text>
          <View style={styles.button}>
            <Text style={styles.buttonText}>View Details</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: colors.border,
  },
  content: {
    padding: spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  categoryBadge: {
    backgroundColor: 'rgba(13, 92, 99, 0.1)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  categoryText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  statusText: {
    ...typography.caption,
    color: colors.textInverse,
    fontWeight: '800',
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  stat: {
    alignItems: 'flex-start',
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  statValue: {
    ...typography.body,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  participantsText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  buttonText: {
    ...typography.button,
    color: colors.textInverse,
    fontSize: 12,
  },
});

export default CompetitionCard;
