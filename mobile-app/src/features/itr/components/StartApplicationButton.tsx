import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface StartApplicationButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export const StartApplicationButton: React.FC<StartApplicationButtonProps> = ({
  onPress,
  disabled = false,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, 14),
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.button,
          disabled ? styles.disabledButton : styles.enabledButton,
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            disabled ? styles.disabledButtonText : styles.enabledButtonText,
          ]}
        >
          Start Application
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
      default: {},
    }),
  },
  button: {
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  enabledButton: {
    backgroundColor: "#F97316",
    ...Platform.select({
      ios: {
        shadowColor: "#F97316",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      default: {},
    }),
  },
  disabledButton: {
    backgroundColor: "#FED7AA",
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  enabledButtonText: {
    color: "#FFFFFF",
  },
  disabledButtonText: {
    color: "#FFFFFF",
    opacity: 0.9,
  },
});
