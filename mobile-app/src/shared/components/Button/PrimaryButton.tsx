import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { Colors } from "../../../design-system/colors";

export type ButtonColorType = "primary" | "orange";

export interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  colorType?: ButtonColorType;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function PrimaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  colorType = "primary",
  style,
  textStyle,
}: PrimaryButtonProps) {
  const backgroundColor = disabled
    ? "#E2E8F0"
    : colorType === "orange"
    ? Colors.orange
    : Colors.primary;

  const textColor = disabled ? "#64748B" : "#FFFFFF";

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.button, { backgroundColor }, style]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <Text style={[styles.text, { color: textColor }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default PrimaryButton;
