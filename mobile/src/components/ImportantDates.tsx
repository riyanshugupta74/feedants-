import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';
import { formatDateTime } from '../utils/formatDate';

interface Props {
  registrationEnd: string;
  submissionStart: string;
  submissionEnd: string;
  resultDate: string;
}

const ImportantDates: React.FC<Props> = ({
  registrationEnd,
  submissionStart,
  submissionEnd,
  resultDate,
}) => {
  const regEnd = formatDateTime(registrationEnd);
  const subStart = formatDateTime(submissionStart);
  const subEnd = formatDateTime(submissionEnd);
  const result = formatDateTime(resultDate);

  const dates = [
    { icon: '📋', label: 'Register Before', date: regEnd.date, time: regEnd.time },
    { icon: '📤', label: 'Submission Starts', date: subStart.date, time: subStart.time },
    { icon: '⏳', label: 'Submission Ends', date: subEnd.date, time: subEnd.time },
    { icon: '🏅', label: 'Result Date', date: result.date, time: result.time },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Important Dates</Text>

      <View style={styles.grid}>
        {dates.map((item, index) => (
          <View key={index} style={styles.dateCard}>
            <Text style={styles.icon}>{item.icon}</Text>
            <View style={styles.dateInfo}>
              <Text style={styles.dateLabel}>{item.label}</Text>
              <Text style={styles.dateValue}>{item.date}</Text>
              <Text style={styles.timeValue}>{item.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  dateCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '47%',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  icon: {
    fontSize: 20,
    marginTop: 2,
  },
  dateInfo: {},
  dateLabel: {
    ...typography.caption,
    color: colors.textTertiary,
    marginBottom: 2,
  },
  dateValue: {
    ...typography.bodyBold,
    color: colors.primary,
  },
  timeValue: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});

export default ImportantDates;
