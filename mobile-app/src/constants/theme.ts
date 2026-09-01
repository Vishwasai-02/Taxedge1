/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import "../global.css";

import { Platform } from "react-native";

export type ThemeName = "light" | "dark";

export interface ThemeColors {
  text: string;
  background: string;
  backgroundElement: string;
  backgroundSelected: string;
  textSecondary: string;
  primary: string;
  primaryDark: string;
  orange: string;
  orangeLight: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}

export const Colors: Record<ThemeName, ThemeColors> = {
  light: {
    text: "#172033",
    background: "#F7F9FC",
    backgroundElement: "#FFFFFF",
    backgroundSelected: "#E2E8F0",
    textSecondary: "#64748B",
    primary: "#083B75",
    primaryDark: "#052750",
    orange: "#F97316",
    orangeLight: "#FFF1E6",
    border: "#E2E8F0",
    success: "#16A34A",
    warning: "#F59E0B",
    error: "#DC2626",
  },
  dark: {
    text: "#F8FAFC",
    background: "#0F172A",
    backgroundElement: "#1E293B",
    backgroundSelected: "#334155",
    textSecondary: "#94A3B8",
    primary: "#38BDF8",
    primaryDark: "#0369A1",
    orange: "#FB923C",
    orangeLight: "#2C1D11",
    border: "#334155",
    success: "#22C55E",
    warning: "#FBBF24",
    error: "#EF4444",
  },
};

export interface FontFamilies {
  sans: string;
  serif: string;
  rounded: string;
  mono: string;
}

export const Fonts: FontFamilies = Platform.select<FontFamilies>({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "var(--font-display)",
    serif: "var(--font-serif)",
    rounded: "var(--font-rounded)",
    mono: "var(--font-mono)",
  },
});

export interface SpacingScale {
  half: number;
  one: number;
  two: number;
  three: number;
  four: number;
  five: number;
  six: number;
}

export const Spacing: SpacingScale = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
};

export const BottomTabInset: number =
  Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
