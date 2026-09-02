import React from "react";
import { View, Text, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../../../shared/theme";

interface GstPaymentSuccessStepProps {
  amount?: string;
  serviceName?: string;
  onViewReceipt: () => void;
  onViewApplication: () => void;
}

export const GstPaymentSuccessStep: React.FC<GstPaymentSuccessStepProps> = ({
  amount = "₹2,344",
  serviceName = "GST Registration",
  onViewReceipt,
  onViewApplication,
}) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Green Hero Card */}
      <View style={styles.heroCard}>
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={32} color={BrandColors.PRIMARY_ORANGE} />
        </View>

        <Text style={styles.heroTitle}>Payment Successful!</Text>
        <Text style={styles.heroSubtitle}>Your payment has been received successfully.</Text>

        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Amount Paid</Text>
          <Text style={styles.amountValue}>{amount}</Text>
        </View>
      </View>

      {/* Transaction Details Card */}
      <View style={styles.detailsCard}>
        <Text style={styles.detailsHeading}>Transaction Details</Text>
        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Transaction ID</Text>
          <Text style={styles.value}>TXN202608190001</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Service</Text>
          <Text style={styles.value}>{serviceName}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Payment Method</Text>
          <Text style={styles.value}>UPI — pavan@ybl</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Date & Time</Text>
          <Text style={styles.value}>19 Aug 2026, 4:22 PM</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.statusBadge}>
            <Ionicons name="checkbox" size={14} color={BrandColors.PRIMARY_ORANGE} />
            <Text style={styles.statusText}>Successful</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons: View Receipt / View Application */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.receiptBtn}
          activeOpacity={0.8}
          onPress={onViewReceipt}
        >
          <Ionicons name="download-outline" size={16} color={BrandColors.PRIMARY_ORANGE} />
          <Text style={styles.receiptBtnText}>View Receipt</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.applicationBtn}
          activeOpacity={0.85}
          onPress={onViewApplication}
        >
          <Text style={styles.applicationBtnText}>View Application</Text>
        </TouchableOpacity>
      </View>

      {/* Back to Home Link */}
      <TouchableOpacity
        style={styles.homeLink}
        activeOpacity={0.7}
        onPress={() => router.replace("/service/gst")}
      >
        <Text style={styles.homeLinkText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 4,
    paddingBottom: 16,
    justifyContent: "space-between",
  },
  heroCard: {
    backgroundColor: BrandColors.PRIMARY_BLUE,
    borderRadius: 24,
    paddingVertical: 26,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 14,
  },
  checkCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  heroSubtitle: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.85)",
    marginBottom: 16,
    textAlign: "center",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  amountCard: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  amountLabel: {
    fontSize: 11.5,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 4,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  amountValue: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#EEF2F6",
    marginBottom: 20,
  },
  detailsHeading: {
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
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "700",
    color: BrandColors.PRIMARY_ORANGE,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  receiptBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: BrandColors.PRIMARY_ORANGE,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  receiptBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: BrandColors.PRIMARY_ORANGE,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  applicationBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: BrandColors.PRIMARY_ORANGE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  applicationBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  homeLink: {
    alignItems: "center",
    paddingVertical: 8,
  },
  homeLinkText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
});
