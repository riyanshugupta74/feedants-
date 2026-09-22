import { TextStyle } from 'react-native';

/**
 * Feedants Design System — Typography
 */
export const typography: Record<string, TextStyle> = {
  // ─── Headings ───────────────────────────────────────────
  h1: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },
  h4: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },

  // ─── Body ───────────────────────────────────────────────
  bodyLarge: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
  },
  bodySmall: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20,
  },
  bodyBold: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
  },

  // ─── Labels ─────────────────────────────────────────────
  label: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },
  labelSmall: {
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: 0.5,
  },

  // ─── Caption ────────────────────────────────────────────
  caption: {
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 16,
  },

  // ─── Currency ───────────────────────────────────────────
  currencyLarge: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  currencyMedium: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 26,
  },
  currencySmall: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
  },

  // ─── Button ─────────────────────────────────────────────
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  buttonSmall: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 20,
  },

  // ─── Countdown ──────────────────────────────────────────
  countdown: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    letterSpacing: 1,
  },

  // ─── Tab ────────────────────────────────────────────────
  tab: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 20,
  },
  tabActive: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 20,
  },
};

export type TypographyKey = keyof typeof typography;
