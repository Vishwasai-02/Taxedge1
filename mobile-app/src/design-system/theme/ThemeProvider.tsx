import React, { createContext, useContext, useMemo } from "react";
import { useColorScheme } from "react-native";
import { Colors } from "../colors";
import { Typography } from "../typography";
import { Spacing } from "../spacing";
import { Shadows } from "../shadows";
import { BorderRadius, BorderWidth } from "../borders";

export interface Theme {
  colors: typeof Colors;
  typography: typeof Typography;
  spacing: typeof Spacing;
  shadows: typeof Shadows;
  borderRadius: typeof BorderRadius;
  borderWidth: typeof BorderWidth;
  isDark: boolean;
}

const defaultTheme: Theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  shadows: Shadows,
  borderRadius: BorderRadius,
  borderWidth: BorderWidth,
  isDark: false,
};

const ThemeContext = createContext<Theme>(defaultTheme);

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const theme = useMemo<Theme>(() => {
    return {
      colors: Colors,
      typography: Typography,
      spacing: Spacing,
      shadows: Shadows,
      borderRadius: BorderRadius,
      borderWidth: BorderWidth,
      isDark,
    };
  }, [isDark]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): Theme => {
  return useContext(ThemeContext);
};

export default ThemeProvider;
