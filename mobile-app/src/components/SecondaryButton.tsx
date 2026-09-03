import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { useTheme } from "../hooks/use-theme";

export interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function SecondaryButton({
  title,
  onPress,
  disabled = false,
  style,
  textStyle,
}: SecondaryButtonProps) {
  const colors = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          borderColor: colors.border,
          backgroundColor: "transparent",
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: disabled ? colors.textSecondary : colors.primary },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    width: "100%",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
