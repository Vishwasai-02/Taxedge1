import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SERVICES = [
  "GST Registration",
  "ITR Filing",
  "Business Loans",
  "Compliance",
];

export function ServicePills() {
  return (
    <View style={styles.container}>
      {SERVICES.map((service) => (
        <View key={service} style={styles.pill}>
          <Text style={styles.pillText}>{service}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    width: "100%",
  },
  pill: {
    backgroundColor: "#E6F4FE",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 18,
    alignSelf: "flex-start",
  },
  pillText: {
    color: "#0052FF",
    fontSize: 12.5,
    fontWeight: "600",
    letterSpacing: -0.1,
  },
});
