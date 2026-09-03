import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ChargesEstimateWarningBannerProps {
  assessmentYear?: string;
}

export const ChargesEstimateWarningBanner: React.FC<
  ChargesEstimateWarningBannerProps
> = ({ assessmentYear = "AY 2023–24" }) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconCircle}>
        <Ionicons name="warning-outline" size={20} color="#EA580C" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Estimate pending staff calculation</Text>
        <Text style={styles.description}>
          The exact late fee and interest are confirmed by your Tax Executive
          once your documents are verified. The figures above are indicative for{" "}
          {assessmentYear}.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFEDD5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
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
