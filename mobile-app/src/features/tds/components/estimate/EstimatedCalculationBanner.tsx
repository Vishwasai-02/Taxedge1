import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const EstimatedCalculationBanner: React.FC = () => {
  return (
    <View style={styles.banner}>
      <View style={styles.iconCircle}>
        <Ionicons name="information-circle-outline" size={24} color="#EA580C" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Estimated Calculation</Text>
        <Text style={styles.description}>
          This is only an estimated refund based on the documents provided. The
          final refund amount is determined by the Income Tax Department after
          processing your return.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#FFF7ED",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FED7AA",
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 16,
    marginBottom: 16,
  },
  iconCircle: {
    marginRight: 10,
    marginTop: 1,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#EA580C",
  },
  description: {
    fontSize: 11.5,
    color: "#0B1F3A",
    lineHeight: 16.5,
    marginTop: 3,
    fontWeight: "400",
  },
});
