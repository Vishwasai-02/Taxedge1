import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const LateFilingHeaderBanner: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Ionicons name="receipt-outline" size={24} color="#EA580C" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.heading}>
          Since this is a late filing, a late fee and interest may apply
        </Text>
        <Text style={styles.subtitle}>
          This is charged by the government and is separate from our service fee.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingTop: 12,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  heading: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0B1F3A",
    letterSpacing: -0.2,
    lineHeight: 22,
  },
  subtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
    lineHeight: 16,
    fontWeight: "400",
  },
});
