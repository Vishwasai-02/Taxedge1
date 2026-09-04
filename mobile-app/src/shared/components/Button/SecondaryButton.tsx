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

export interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function SecondaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
  textStyle,
}: SecondaryButtonProps) {
  const borderColor = disabled ? "#E2E8F0" : Colors.primary;
  const textColor = disabled ? "#94A3B8" : Colors.primary;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.button, { borderColor }, style]}
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
    borderWidth: 1.5,
    backgroundColor: "transparent",
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

export default SecondaryButton;
