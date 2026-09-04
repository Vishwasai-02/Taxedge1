import { useColorScheme } from "./useColorScheme";
import { Colors } from "../constants/theme";

export function useTheme() {
  const scheme = useColorScheme();
  const colors = Colors[scheme];

  return {
    colors,
    isDark: scheme === "dark",
    scheme,
  };
}

export default useTheme;
