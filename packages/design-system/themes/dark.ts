import { colors } from '../tokens/colors';

export const darkTheme = {
  background: colors.neutral[900],
  surface: colors.neutral[800],
  border: colors.neutral[700],
  text: colors.neutral[50],
  textMuted: colors.neutral[400],
  ...colors,
} as const;
