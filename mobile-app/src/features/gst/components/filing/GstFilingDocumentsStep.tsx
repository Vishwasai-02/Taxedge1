import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../../../shared/theme";

export interface FilingDocItem {
  id: string;
  name: string;
  status: "Uploaded" | "Pending" | "Under Review" | "Approved";
  iconName: string;
  iconColor: string;
  iconBg: string;
}

const FILING_DOCUMENTS: FilingDocItem[] = [
  {
    id: "sales",
    name: "Sales Invoices (B2B)",
    status: "Uploaded",
    iconName: "document-text",
    iconColor: "#2563EB",
    iconBg: "#E0F2FE",
  },
  {
    id: "purchase",
    name: "Purchase Invoices",
    status: "Uploaded",
    iconName: "file-tray-full",
    iconColor: "#0284C7",
    iconBg: "#E0F2FE",
  },
  {
    id: "expense",
    name: "Expense Invoices",
    status: "Pending",
    iconName: "bar-chart",
    iconColor: "#D97706",
    iconBg: "#FEF3C7",
  },
  {
    id: "credit",
    name: "Credit Notes",
    status: "Pending",
    iconName: "card",
    iconColor: "#0284C7",
    iconBg: "#E0F2FE",
  },
  {
    id: "debit",
    name: "Debit Notes",
    status: "Pending",
    iconName: "clipboard",
    iconColor: "#D97706",
    iconBg: "#FEF3C7",
  },
  {
    id: "bank",
    name: "Bank Statement",
    status: "Under Review",
    iconName: "business",
    iconColor: "#7C3AED",
    iconBg: "#F3E8FF",
  },
  {
    id: "prev-data",
    name: "Previous GST Data",
    status: "Approved",
    iconName: "folder",
    iconColor: "#F59E0B",
    iconBg: "#FEF3C7",
  },
];

export const GstFilingDocumentsStep: React.FC = () => {
  const getBadge = (status: FilingDocItem["status"]) => {
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
      {/* Top Advisory Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerIcon}>📋</Text>
        <Text style={styles.bannerText}>
          Upload documents for <Text style={styles.boldText}>GSTR-3B — July 2026</Text>. Our CA will verify and prepare your return.
        </Text>
      </View>

      {/* Document Items */}
      <View style={styles.list}>
        {FILING_DOCUMENTS.map((doc) => {
          const badge = getBadge(doc.status);
          const isPending = doc.status === "Pending";

          return (
            <View key={doc.id} style={styles.card}>
              <View style={[styles.iconBox, { backgroundColor: doc.iconBg }]}>
                <Ionicons name={doc.iconName as any} size={20} color={doc.iconColor} />
              </View>

              <Text style={styles.docName} numberOfLines={1}>
                {doc.name}
              </Text>

              <View style={[styles.badge, { backgroundColor: badge.bg }]}>
                <Text style={[styles.badgeText, { color: badge.text }]}>
                  {badge.label}
                </Text>
              </View>

              {isPending && (
                <TouchableOpacity
                  style={styles.uploadActionBtn}
                  activeOpacity={0.7}
                  onPress={() => Alert.alert("Upload Document", `Select files for ${doc.name}`)}
                >
                  <Ionicons name="arrow-up-outline" size={16} color="#059669" />
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },
  banner: {
    flexDirection: "row",
    backgroundColor: "#F0FDF4",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#DCFCE7",
    gap: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  bannerIcon: {
    fontSize: 18,
  },
  bannerText: {
    flex: 1,
    fontSize: 12.5,
    color: "#166534",
    lineHeight: 18,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  boldText: {
    fontWeight: "700",
  },
  list: {
    gap: 10,
    marginBottom: 10,
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
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  docName: {
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
    marginRight: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  uploadActionBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
});
