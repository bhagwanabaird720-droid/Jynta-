import { colors } from '../tokens/colors';

export const lightTheme = {
  background: '#FFFFFF',
  surface: colors.neutral[50],
  border: colors.neutral[200],
  text: colors.neutral[900],
  textMuted: colors.neutral[500],
  ...colors,
} as const;
