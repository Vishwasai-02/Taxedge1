import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";

interface GetStartedButtonProps {
  onPress: () => void;
}

export function GetStartedButton({ onPress }: GetStartedButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.button}
    >
      <Text style={styles.buttonText}>Get Started</Text>
      <View style={styles.arrowContainer}>
        <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
          <Path
            d="M5 12h14M12 5l7 7-7 7"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#F97316",
    height: 50,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  arrowContainer: {
    position: "absolute",
    right: 18,
  },
});
