import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const WhatHappensNextCard: React.FC = () => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Ionicons name="notifications-outline" size={18} color="#0B1F3A" />
        </View>
        <Text style={styles.cardTitle}>What happens next</Text>
      </View>

      <Text style={styles.description}>
        A Tax Executive will verify your documents, prepare the return and send you the computation to review and approve. You will get a notification at each stage.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
      default: {},
    }),
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#EAF1FE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  description: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 19,
    fontWeight: "400",
  },
});
