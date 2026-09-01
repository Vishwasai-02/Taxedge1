import React from "react";
import { View, Text, StyleSheet, Platform, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../../shared/theme";

export interface GstChecklistItem {
  id: string;
  name: string;
  status: "Approved" | "Uploaded" | "Under Review" | "Pending";
  iconName: string;
  iconBg: string;
  iconColor: string;
}

const CHECKLIST_ITEMS: GstChecklistItem[] = [
  {
    id: "pan",
    name: "PAN Card",
    status: "Approved",
    iconName: "card",
    iconBg: "#E0F2FE",
    iconColor: "#0284C7",
  },
  {
    id: "aadhaar",
    name: "Aadhaar Card",
    status: "Approved",
    iconName: "finger-print",
    iconBg: "#F3E8FF",
    iconColor: "#7E22CE",
  },
  {
    id: "business-proof",
    name: "Business Proof",
    status: "Uploaded",
    iconName: "document-text",
    iconBg: "#E0F2FE",
    iconColor: "#2563EB",
  },
  {
    id: "address-proof",
    name: "Address Proof",
    status: "Under Review",
    iconName: "home",
    iconBg: "#FEF3C7",
    iconColor: "#D97706",
  },
  {
    id: "bank-statement",
    name: "Bank Passbook / Statem...",
    status: "Pending",
    iconName: "business",
    iconBg: "#F1F5F9",
    iconColor: "#64748B",
  },
  {
    id: "electricity",
    name: "Electricity Bill",
    status: "Pending",
    iconName: "flash",
    iconBg: "#FEF2F2",
    iconColor: "#EA580C",
  },
  {
    id: "rental",
    name: "Rental Agreement",
    status: "Pending",
    iconName: "receipt",
    iconBg: "#F1F5F9",
    iconColor: "#64748B",
  },
  {
    id: "photo",
    name: "Photograph (Passport ...",
    status: "Uploaded",
    iconName: "image",
    iconBg: "#DCFCE7",
    iconColor: "#16A34A",
  },
  {
    id: "dsc",
    name: "DSC (if applicable)",
    status: "Pending",
    iconName: "lock-closed",
    iconBg: "#FEF3C7",
    iconColor: "#D97706",
  },
];

export const GstDocumentChecklistStep: React.FC = () => {
  const getBadgeStyle = (status: GstChecklistItem["status"]) => {
    switch (status) {
      case "Approved":
        return { bg: "#E6F7EF", text: "#059669", label: "● Approved" };
      case "Uploaded":
        return { bg: "#EFF6FF", text: "#2563EB", label: "● Uploaded" };
      case "Under Review":
        return { bg: "#F5F3FF", text: "#7C3AED", label: "● Under Review" };
      case "Pending":
      default:
        return { bg: "#FFFBEB", text: "#D97706", label: "● Pending" };
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress Info Header */}
      <View style={styles.progressHeader}>
        <Text style={styles.progressTitle}>
          Upload the following documents to continue.{" "}
          <Text style={styles.progressCount}>4/9 Done</Text>
        </Text>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
      </View>

      {/* 9 Checklist Items */}
      <View style={styles.list}>
        {CHECKLIST_ITEMS.map((item) => {
          const badge = getBadgeStyle(item.status);
          return (
            <View key={item.id} style={styles.card}>
              <View style={[styles.iconBox, { backgroundColor: item.iconBg }]}>
                <Ionicons name={item.iconName as any} size={20} color={item.iconColor} />
              </View>
              <Text style={styles.name} numberOfLines={1}>
                {item.name}
              </Text>
              <View style={[styles.badge, { backgroundColor: badge.bg }]}>
                <Text style={[styles.badgeText, { color: badge.text }]}>
                  {badge.label}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
  },
  progressHeader: {
    marginBottom: 14,
  },
  progressTitle: {
    fontSize: 13.5,
    color: "#334155",
    fontWeight: "500",
    marginBottom: 8,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  progressCount: {
    color: "#059669",
    fontWeight: "700",
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E2E8F0",
    overflow: "hidden",
  },
  progressFill: {
    width: "45%",
    height: "100%",
    backgroundColor: "#059669",
    borderRadius: 3,
  },
  list: {
    gap: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 13,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEF2F6",
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  name: {
    flex: 1,
    fontSize: 13.5,
    fontWeight: "600",
    color: BrandColors.TEXT_PRIMARY,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
});
