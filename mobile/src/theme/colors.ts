/**
 * Feedants Design System — Color Palette
 *
 * Derived from the Feedants Competition Details screenshot.
 * Primary teal/dark-green with warm accents.
 */
export const colors = {
  // ─── Primary ────────────────────────────────────────────
  primary: '#0D5C63',
  primaryDark: '#084248',
  primaryLight: '#E8F5F5',
  primaryMuted: '#B2D8D8',

  // ─── Secondary / Accent ─────────────────────────────────
  secondary: '#FF6B35',
  secondaryLight: '#FFF3ED',

  // ─── Background ─────────────────────────────────────────
  background: '#FFFFFF',
  backgroundSecondary: '#F8F9FA',
  backgroundTertiary: '#F0F2F5',

  // ─── Surface / Cards ────────────────────────────────────
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  surfaceMuted: '#F5F6F8',

  // ─── Text ───────────────────────────────────────────────
  textPrimary: '#1A1A2E',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textInverse: '#FFFFFF',
  textAccent: '#0D5C63',

  // ─── Border ─────────────────────────────────────────────
  border: '#E5E7EB',
  borderLight: '#F0F0F0',
  borderDark: '#D1D5DB',

  // ─── Status ─────────────────────────────────────────────
  success: '#10B981',
  successLight: '#ECFDF5',
  warning: '#F59E0B',
  warningLight: '#FFFBEB',
  error: '#EF4444',
  errorLight: '#FEF2F2',
  info: '#3B82F6',
  infoLight: '#EFF6FF',

  // ─── Rewards ────────────────────────────────────────────
  gold: '#FFD700',
  silver: '#C0C0C0',
  bronze: '#CD7F32',

  // ─── Countdown ──────────────────────────────────────────
  countdownBg: '#0D5C63',
  countdownText: '#FFFFFF',

  // ─── Registration Badge ─────────────────────────────────
  registeredBg: '#ECFDF5',
  registeredText: '#10B981',

  // ─── Tab ────────────────────────────────────────────────
  tabActive: '#0D5C63',
  tabInactive: '#9CA3AF',
  tabIndicator: '#0D5C63',

  // ─── Shadow ─────────────────────────────────────────────
  shadow: 'rgba(0, 0, 0, 0.08)',
  shadowDark: 'rgba(0, 0, 0, 0.15)',

  // ─── Misc ───────────────────────────────────────────────
  overlay: 'rgba(0, 0, 0, 0.5)',
  shimmer: '#E8E8E8',
  shimmerHighlight: '#F5F5F5',
  divider: '#E5E7EB',
};

export type ColorKey = keyof typeof colors;
