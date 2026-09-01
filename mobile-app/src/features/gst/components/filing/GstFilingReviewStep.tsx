import React from "react";
import { View, Text, StyleSheet, Platform, TouchableOpacity, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../../../shared/theme";

interface GstFilingReviewStepProps {
  onApprove: () => void;
  onRequestChanges?: () => void;
}

export const GstFilingReviewStep: React.FC<GstFilingReviewStepProps> = ({
  onApprove,
  onRequestChanges,
}) => {
  return (
    <View style={styles.container}>
      {/* Green Status Card: Ready for Review */}
      <View style={styles.readyCard}>
        <View style={styles.readyIconBox}>
          <Ionicons name="checkmark-sharp" size={16} color="#059669" />
        </View>
        <View style={styles.readyTextCol}>
          <Text style={styles.readyHeading}>Ready for Review</Text>
          <Text style={styles.readySub}>Our CA has prepared your GSTR-3B return</Text>
        </View>
      </View>

      {/* 1. Filing Summary Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Filing Summary</Text>
        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Filing Period</Text>
          <Text style={styles.value}>July 2026</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>GSTIN</Text>
          <Text style={styles.value}>29AKHIL1234K1Z5</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Filing Type</Text>
          <Text style={styles.value}>GSTR-3B</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Taxable Turnover</Text>
          <Text style={styles.value}>₹4,25,000</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Output GST (CGST + SGST)</Text>
          <Text style={styles.value}>₹38,250</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Input Tax Credit</Text>
          <Text style={styles.value}>₹22,500</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Net Tax Payable</Text>
          <Text style={styles.value}>₹15,750</Text>
        </View>
      </View>

      {/* 2. Service Fee Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Service Fee</Text>
        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Professional Fee</Text>
          <Text style={styles.value}>₹2,000</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>GST (18%)</Text>
          <Text style={styles.value}>₹360</Text>
        </View>

        {/* Highlighted Total Payable Row */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Payable</Text>
          <Text style={styles.totalValue}>₹2,360</Text>
        </View>
      </View>

      {/* Request Changes Secondary Button */}
      <TouchableOpacity
        style={styles.requestChangesBtn}
        activeOpacity={0.8}
        onPress={
          onRequestChanges ||
          (() => Alert.alert("Request Changes", "Your dedicated CA will contact you."))
        }
      >
        <Text style={styles.requestChangesText}>Request Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    gap: 14,
  },
  readyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: BrandColors.PRIMARY_BLUE,
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  readyIconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  readyTextCol: {
    flex: 1,
  },
  readyHeading: {
    fontSize: 14.5,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  readySub: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 2,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EEF2F6",
  },
  cardTitle: {
    fontSize: 14.5,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    color: "#64748B",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  value: {
    fontSize: 13,
    fontWeight: "600",
    color: BrandColors.TEXT_PRIMARY,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E6F7EF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#059669",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  totalValue: {
    fontSize: 15,
    fontWeight: "800",
    color: "#059669",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  requestChangesBtn: {
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#059669",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 10,
  },
  requestChangesText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#059669",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
});
