import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface NoticeExplanationCardProps {
  iconName: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}

export const NoticeExplanationCard: React.FC<NoticeExplanationCardProps> = ({
  iconName,
  title,
  description,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.iconCircle}>
          <Ionicons name={iconName} size={18} color="#2563EB" />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
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
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
      default: {},
    }),
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  title: {
    fontSize: 14.5,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  description: {
    fontSize: 12.5,
    color: "#475569",
    lineHeight: 18,
    fontWeight: "400",
  },
});
