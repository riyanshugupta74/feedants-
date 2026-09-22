import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing, borderRadius } from '../theme';
import { competitionsApi } from '../api/competitions';
import { useAuth } from '../hooks/useAuth';

const CATEGORIES = ['Dance', 'Music', 'Photography', 'Coding', 'Design', 'Art'];

const CreateCompetitionScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { isAuthenticated } = useAuth();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Dance');
  const [prizePool, setPrizePool] = useState('');
  const [entryFee, setEntryFee] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('50');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      Alert.alert('Authentication Required', 'Please login to host a competition.');
      return;
    }

    if (!title || !description || !prizePool || !entryFee || !maxParticipants) {
      Alert.alert('Missing Fields', 'Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const newComp = await competitionsApi.create({
        title,
        description,
        category,
        prizePool: Number(prizePool),
        entryFee: Number(entryFee),
        maxParticipants: Number(maxParticipants),
        image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800',
      });

      Alert.alert('Success!', 'Your competition has been published!', [
        { 
          text: 'View Details', 
          onPress: () => {
            // Reset form
            setTitle('');
            setDescription('');
            // Navigate to the newly created competition
            navigation.navigate('CompetitionDetail', { id: newComp.competition._id });
          } 
        }
      ]);
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', error.message || 'Failed to create competition. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Host Competition</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formCard}>
          <Text style={styles.label}>Competition Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. NextGen Coding Challenge"
            placeholderTextColor={colors.textTertiary}
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Category *</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity 
                key={cat} 
                style={[styles.categoryPill, category === cat && styles.categoryPillActive]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[styles.categoryText, category === cat && styles.categoryTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="What is this competition about?"
            placeholderTextColor={colors.textTertiary}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Prize Pool ($) *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 1000"
                placeholderTextColor={colors.textTertiary}
                value={prizePool}
                onChangeText={setPrizePool}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Entry Fee ($) *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 10"
                placeholderTextColor={colors.textTertiary}
                value={entryFee}
                onChangeText={setEntryFee}
                keyboardType="numeric"
              />
            </View>
          </View>

          <Text style={styles.label}>Max Participants *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 100"
            placeholderTextColor={colors.textTertiary}
            value={maxParticipants}
            onChangeText={setMaxParticipants}
            keyboardType="numeric"
          />

          <TouchableOpacity 
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]} 
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color={colors.textInverse} />
            ) : (
              <Text style={styles.submitButtonText}>Publish Competition</Text>
            )}
          </TouchableOpacity>
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
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    marginTop: spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    ...typography.body,
    color: colors.textPrimary,
    backgroundColor: colors.background,
  },
  textArea: {
    minHeight: 100,
  },
  categoryScroll: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  categoryPill: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
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
    ...typography.caption,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  categoryTextActive: {
    color: colors.textInverse,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xxl,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    ...typography.button,
    color: colors.textInverse,
  },
});

export default CreateCompetitionScreen;
