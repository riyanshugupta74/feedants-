import React from 'react';
import { View, ScrollView, StyleSheet, RefreshControl, Modal, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

import { colors, spacing } from '../theme';
import {
  LanguageToggle,
  CompetitionHeader,
  CompetitionStats,
  JudgeCard,
  CountdownTimer,
  ImportantDates,
  PreviousWinners,
  CompetitionTabs,
  RewardsList,
  DisclaimerBanner,
  PaymentInfo,
  ReferralCard,
  UserFeedbackCard,
  AdPlaceholder,
  PrimaryActionButton,
  BottomNavigation,
  LoadingSkeleton,
  ErrorState,
  MySubmissionCard,
} from '../components';

import { useCompetition } from '../hooks/useCompetition';
import { useParticipation } from '../hooks/useParticipation';
import { useAuth } from '../hooks/useAuth';
import { useRegister, useSubmitEntry } from '../hooks/useRegister';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CompetitionDetail'>;

const CompetitionDetailScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<any>();
  
  // For demo purposes, if no ID is passed, we fetch the first one or use a fallback ID
  // In a real app, this would always come from route params
  const competitionId = route.params?.id || '600000000000000000000000';

  const { isAuthenticated, user } = useAuth();
  
  const {
    data: competitionData,
    isLoading: isLoadingComp,
    isError: isCompError,
    error: compError,
    refetch: refetchComp,
    isRefetching,
  } = useCompetition(competitionId);

  const {
    data: participationData,
  } = useParticipation(competitionId);

  const registerMutation = useRegister();
  const submitMutation = useSubmitEntry();

  const [showSubmissionModal, setShowSubmissionModal] = React.useState(false);
  const [submissionUrl, setSubmissionUrl] = React.useState('');

  const handleRegister = () => {
    registerMutation.mutate(competitionId);
  };

  const handleOpenSubmissionModal = () => {
    setShowSubmissionModal(true);
  };

  const handleUploadSubmission = () => {
    if (!submissionUrl.trim()) return;
    
    submitMutation.mutate({
      competitionId,
      submissionUrl,
    }, {
      onSuccess: () => {
        setShowSubmissionModal(false);
        setSubmissionUrl('');
      }
    });
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  if (isLoadingComp && !competitionData) {
    return <LoadingSkeleton />;
  }

  if (isCompError || !competitionData) {
    return (
      <ErrorState
        message={compError?.message || 'Failed to load competition details'}
        onRetry={refetchComp}
      />
    );
  }

  const competition = competitionData.competition;
  const isRegistered = participationData?.isRegistered || false;
  const participation = participationData?.participation;

  return (
    <View style={styles.container}>
      <LanguageToggle onGoBack={() => navigation.canGoBack() ? navigation.goBack() : null} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetchComp}
            colors={[colors.primary]}
          />
        }
      >
        <CompetitionHeader competition={competition} />
        <CompetitionStats competition={competition} />
        
        {competition.judge && <JudgeCard judge={competition.judge} />}
        
        <CountdownTimer 
          registrationEnd={competition.registrationEnd} 
          competitionId={competition._id}
        />
        
        <ImportantDates
          registrationEnd={competition.registrationEnd}
          submissionStart={competition.submissionStart}
          submissionEnd={competition.submissionEnd}
          resultDate={competition.resultDate}
        />
        
        <PreviousWinners winners={competition.previousWinners} />
        
        <MySubmissionCard participation={participation} />
        
        <CompetitionTabs competition={competition} />
        
        <RewardsList rewards={competition.rewards} />
        
        <View style={styles.disclaimerContainer}>
          <DisclaimerBanner />
        </View>
        
        <PaymentInfo />
        
        <ReferralCard referralCode={user?.referralCode} />
        
        <UserFeedbackCard />
        
        <AdPlaceholder />
        
        {/* Bottom padding for scroll area */}
        <View style={{ height: spacing.xxxl }} />
      </ScrollView>

      <PrimaryActionButton
        competition={competition}
        isAuthenticated={isAuthenticated}
        isRegistered={isRegistered}
        participation={participation}
        isRegistering={registerMutation.isPending}
        onRegister={handleRegister}
        onUploadSubmission={handleOpenSubmissionModal}
        onLogin={handleLogin}
      />

      {/* Submission Modal */}
      <Modal visible={showSubmissionModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Upload Submission</Text>
              <TouchableOpacity onPress={() => setShowSubmissionModal(false)}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalDesc}>
              Paste a link to your work (e.g., Google Drive, YouTube, GitHub, or Portfolio).
              Make sure the link is publicly accessible.
            </Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Submission URL</Text>
              <TextInput
                style={styles.input}
                value={submissionUrl}
                onChangeText={setSubmissionUrl}
                placeholder="https://..."
                keyboardType="url"
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity 
              style={[styles.submitBtn, (!submissionUrl.trim() || submitMutation.isPending) && styles.submitBtnDisabled]}
              onPress={handleUploadSubmission}
              disabled={!submissionUrl.trim() || submitMutation.isPending}
            >
              {submitMutation.isPending ? (
                <ActivityIndicator color={colors.textInverse} />
              ) : (
                <Text style={styles.submitBtnText}>Submit Entry</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary, // Slightly off-white background as in screenshot
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.lg,
  },
  disclaimerContainer: {
    marginTop: spacing.md,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  closeIcon: {
    fontSize: 24,
    color: colors.textSecondary,
  },
  modalDesc: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: spacing.xl,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    fontSize: 16,
    color: colors.textPrimary,
    backgroundColor: colors.backgroundSecondary,
  },
  submitBtn: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitBtnDisabled: {
    opacity: 0.5,
  },
  submitBtnText: {
    color: colors.textInverse,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default CompetitionDetailScreen;
