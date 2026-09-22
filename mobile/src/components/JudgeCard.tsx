import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';
import { Judge } from '../types';
import { PLACEHOLDER_AVATAR } from '../constants';

interface Props {
  judge: Judge;
}

const JudgeCard: React.FC<Props> = ({ judge }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageError ? PLACEHOLDER_AVATAR : judge.image }}
        style={styles.image}
        onError={() => setImageError(true)}
      />

      <View style={styles.info}>
        <Text style={styles.label}>Judge</Text>
        <Text style={styles.name}>{judge.name}</Text>
        <Text style={styles.title}>{judge.title}</Text>
        <Text style={styles.experience}>{judge.experience}</Text>
      </View>

      {judge.introVideo ? (
        <TouchableOpacity style={styles.videoButton}>
          <View style={styles.playIcon}>
            <Text style={styles.playTriangle}>▶</Text>
          </View>
          <Text style={styles.videoLabel}>Intro Video</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  info: {
    flex: 1,
    marginLeft: spacing.md,
  },
  label: {
    ...typography.caption,
    color: colors.textTertiary,
    marginBottom: 2,
  },
  name: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  title: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  experience: {
    ...typography.caption,
    color: colors.textTertiary,
  },
  videoButton: {
    alignItems: 'center',
    gap: 4,
  },
  playIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.backgroundTertiary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  playTriangle: {
    fontSize: 16,
    color: colors.textPrimary,
    marginLeft: 2,
  },
  videoLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});

export default JudgeCard;
