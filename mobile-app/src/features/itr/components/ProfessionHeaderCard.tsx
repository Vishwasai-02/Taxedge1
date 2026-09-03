import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const ProfessionHeaderCard: React.FC = () => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.iconContainer}>
          <Ionicons name="calculator" size={24} color="#F97316" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>ITR Filing</Text>
          <Text style={styles.subtitle}>ITR CATEGORY</Text>
        </View>
      </View>
      <Text style={styles.description}>
        We'll recommend the right ITR form for you.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      default: {},
    }),
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0B1F3A",
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#0B1F3A",
    letterSpacing: 0.8,
    marginTop: 2,
    textTransform: "uppercase",
  },
  description: {
    fontSize: 13.5,
    color: "#64748B",
    marginTop: 14,
    lineHeight: 19,
    fontWeight: "400",
  },
});
