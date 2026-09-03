import React from "react";
import { View, Text, StyleSheet } from "react-native";

export type BadgeVariant = "closed" | "eligible" | "selected";

interface EligibilityBadgeProps {
  variant: BadgeVariant;
}

export const EligibilityBadge: React.FC<EligibilityBadgeProps> = ({ variant }) => {
  if (variant === "selected") {
    return (
      <View style={[styles.badge, styles.selectedBadge]}>
        <Text style={[styles.text, styles.selectedText]}>Selected</Text>
      </View>
    );
  }

  if (variant === "eligible") {
    return (
      <View style={[styles.badge, styles.eligibleBadge]}>
        <Text style={[styles.text, styles.eligibleText]}>Eligible</Text>
      </View>
    );
  }

  return (
    <View style={[styles.badge, styles.closedBadge]}>
      <Text style={[styles.text, styles.closedText]}>Closed</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 4.5,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.1,
  },
  selectedBadge: {
    backgroundColor: "#EA580C",
  },
  selectedText: {
    color: "#FFFFFF",
  },
  eligibleBadge: {
    backgroundColor: "#FFF7ED",
    borderWidth: 1,
    borderColor: "#FDBA74",
  },
  eligibleText: {
    color: "#EA580C",
  },
  closedBadge: {
    backgroundColor: "#F1F5F9",
  },
  closedText: {
    color: "#64748B",
  },
});
