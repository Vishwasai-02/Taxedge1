/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors, type ThemeColors, type ThemeName } from "../constants/theme";
import { useColorScheme } from "./use-color-scheme";

export function useTheme(): ThemeColors {
  const scheme = useColorScheme();
  const theme: ThemeName = scheme === "dark" ? "dark" : "light";

  return Colors[theme];
}
