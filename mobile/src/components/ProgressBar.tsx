import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';

interface Props {
  progress: number; // 0-1
  color?: string;
  height?: number;
  backgroundColor?: string;
}

const ProgressBar: React.FC<Props> = ({
  progress,
  color = colors.primary,
  height = 6,
  backgroundColor = colors.backgroundTertiary,
}) => {
  const clampedProgress = Math.max(0, Math.min(1, progress));

  return (
    <View style={[styles.container, { height, backgroundColor, borderRadius: height / 2 }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${clampedProgress * 100}%`,
            backgroundColor: color,
            height,
            borderRadius: height / 2,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

export default ProgressBar;
