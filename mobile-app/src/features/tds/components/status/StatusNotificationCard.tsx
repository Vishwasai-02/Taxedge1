import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const StatusNotificationCard: React.FC = () => {
  return (
    <View style={styles.card}>
      <View style={styles.iconCircle}>
        <Ionicons name="notifications-outline" size={18} color="#EA580C" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>You’ll be notified automatically</Text>
        <Text style={styles.description}>
          Push notifications and SMS updates will be sent whenever your refund status changes.
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
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#FED7AA",
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
    lineHeight: 16,
    marginTop: 2,
    fontWeight: "400",
  },
});
