import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface StatusBadgeProps {
  label: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ label }) => {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#FFF7ED",
    borderWidth: 1,
    borderColor: "#FED7AA",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    fontWeight: "700",
    color: "#EA580C",
    letterSpacing: 0.1,
  },
});
