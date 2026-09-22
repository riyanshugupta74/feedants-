import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';
import { PreviousWinner } from '../types';
import { PLACEHOLDER_AVATAR } from '../constants';

interface Props {
  winners: PreviousWinner[];
}

const PreviousWinners: React.FC<Props> = ({ winners }) => {
  if (!winners || winners.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Previous Winners</Text>

      <FlatList
        data={winners}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <WinnerCard winner={item} />}
        ItemSeparatorComponent={() => <View style={{ width: spacing.md }} />}
      />
    </View>
  );
};

const WinnerCard: React.FC<{ winner: PreviousWinner }> = ({ winner }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <TouchableOpacity style={styles.winnerCard} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageError ? PLACEHOLDER_AVATAR : winner.image }}
          style={styles.winnerImage}
          onError={() => setImageError(true)}
        />
        {winner.videoUrl ? (
          <View style={styles.playOverlay}>
            <Text style={styles.playIcon}>▶</Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.winnerName} numberOfLines={1}>
        {winner.name}
      </Text>
      <Text style={styles.winnerPosition}>{winner.position}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
  },
  winnerCard: {
    alignItems: 'center',
    width: 90,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: spacing.xs,
  },
  winnerImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  playOverlay: {
    position: 'absolute',
    right: -4,
    bottom: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    color: colors.textInverse,
    fontSize: 10,
    marginLeft: 1,
  },
  winnerName: {
    ...typography.labelSmall,
    color: colors.textPrimary,
    fontWeight: '600',
    textAlign: 'center',
  },
  winnerPosition: {
    ...typography.caption,
    color: colors.textTertiary,
    textAlign: 'center',
  },
});

export default PreviousWinners;
