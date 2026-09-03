import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const NotificationCard: React.FC = () => {
  return (
    <View style={styles.card}>
      <View style={styles.iconCircle}>
        <Ionicons name="notifications-outline" size={18} color="#EA580C" />
      </View>
      <Text style={styles.text}>
        You will receive notifications at every stage of your refund process.
      </Text>
    </View>
  );
};

export const BankGradeSecurityBanner: React.FC = () => {
  return (
    <View style={styles.securityBanner}>
      <Ionicons name="shield-checkmark" size={16} color="#0B1F3A" />
      <Text style={styles.securityText}>
        Your data is secure with bank-grade encryption.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF7ED",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FED7AA",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconCircle: {
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontSize: 12,
    color: "#0B1F3A",
    fontWeight: "500",
    lineHeight: 16,
  },
  securityBanner: {
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 4,
  },
  securityText: {
    fontSize: 12,
    color: "#0B1F3A",
    fontWeight: "500",
  },
});
