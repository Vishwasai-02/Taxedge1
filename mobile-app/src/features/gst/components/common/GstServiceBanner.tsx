import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface GstServiceBannerProps {
  iconName?: string;
  text: string;
}

export const GstServiceBanner: React.FC<GstServiceBannerProps> = ({
  iconName = "document-text",
  text,
}) => {
  return (
    <View style={styles.banner}>
      <View style={styles.iconBox}>
        <Ionicons name={iconName as any} size={18} color="#2563EB" />
      </View>
      <Text style={styles.bannerText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },
  bannerText: {
    flex: 1,
    fontSize: 12.5,
    color: "#475569",
    lineHeight: 18,
    fontWeight: "500",
  },
});
