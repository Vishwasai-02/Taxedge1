import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ReusableStepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  iconName: "briefcase-outline" | "document-text-outline" | "calculator-outline";
  trailingLabel?: string;
}

export const ReusableStepCard: React.FC<ReusableStepCardProps> = ({
  stepNumber,
  title,
  description,
  iconName,
  trailingLabel = "Same as ITR Filing",
}) => {
  return (
    <View style={styles.card}>
      {/* Icon */}
      <View style={styles.iconBox}>
        <Ionicons name={iconName} size={22} color="#EA580C" />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <View style={styles.trailingBadge}>
            <Text style={styles.trailingBadgeText}>{trailingLabel}</Text>
          </View>
        </View>

        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "flex-start",
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
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  title: {
    fontSize: 14.5,
    fontWeight: "700",
    color: "#0B1F3A",
    flex: 1,
  },
  trailingBadge: {
    backgroundColor: "#FFF7ED",
    borderWidth: 1,
    borderColor: "#FED7AA",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  trailingBadgeText: {
    fontSize: 10.5,
    fontWeight: "700",
    color: "#EA580C",
  },
  description: {
    fontSize: 11.5,
    color: "#64748B",
    lineHeight: 16,
    marginTop: 4,
    fontWeight: "400",
  },
});
