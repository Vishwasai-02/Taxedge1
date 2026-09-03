import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface DraftedResponseCardProps {
  responseText: string;
}

export const DraftedResponseCard: React.FC<DraftedResponseCardProps> = ({
  responseText,
}) => {
  return (
    <View style={styles.card}>
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <View style={styles.iconCircle}>
          <Ionicons name="document-text-outline" size={20} color="#0B1F3A" />
        </View>
        <Text style={styles.cardTitle}>Response drafted by{"\n"}Tax Executive</Text>
      </View>

      <View style={styles.divider} />

      {/* Drafted Letter Content */}
      <Text style={styles.letterText}>{responseText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 5,
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
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#F0F5FA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0B1F3A",
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 12,
  },
  letterText: {
    fontSize: 12.5,
    color: "#334155",
    lineHeight: 19,
    fontWeight: "400",
  },
});
