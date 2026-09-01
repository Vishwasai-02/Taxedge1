import React from "react";
import { View, Text, StyleSheet, Platform, TouchableOpacity, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../../../shared/theme";

interface GstPaymentReceiptStepProps {
  amount?: string;
  serviceName?: string;
  invoiceNo?: string;
}

export const GstPaymentReceiptStep: React.FC<GstPaymentReceiptStepProps> = ({
  amount = "₹5,900",
  serviceName = "GST Registration Service",
  invoiceNo = "INV-2026-00001",
}) => {
  return (
    <View style={styles.container}>
      {/* Receipt Invoice Card */}
      <View style={styles.receiptCard}>
        {/* Top Company Banner */}
        <View style={styles.companyBanner}>
          <View style={styles.teBadge}>
            <Text style={styles.teBadgeText}>TE</Text>
          </View>
          <View style={styles.companyTextCol}>
            <Text style={styles.companyName}>TaxEdge Fin Solutions</Text>
            <Text style={styles.companyGst}>GST: 29TAXEDGE1234K1Z5</Text>
          </View>
        </View>

        {/* Invoice & Date */}
        <View style={styles.invoiceMetaRow}>
          <View>
            <Text style={styles.metaLabel}>INVOICE</Text>
            <Text style={styles.metaValue}>{invoiceNo}</Text>
          </View>
          <View style={styles.metaRightCol}>
            <Text style={styles.metaLabel}>Date</Text>
            <Text style={styles.metaValue}>19 Aug 2026</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Billed To */}
        <View style={styles.billedToSection}>
          <Text style={styles.metaLabel}>BILLED TO</Text>
          <Text style={styles.customerName}>Akhil Kumar</Text>
          <Text style={styles.customerAddress}>
            Akhil Enterprises, MG Road, Bengaluru 560001
          </Text>
          <Text style={styles.customerPan}>PAN: AKHIL1234K</Text>
        </View>

        <View style={styles.divider} />

        {/* Table Description & Amount */}
        <View style={styles.tableHeaderRow}>
          <Text style={styles.tableHeaderLabel}>DESCRIPTION</Text>
          <Text style={styles.tableHeaderLabel}>AMOUNT</Text>
        </View>

        <View style={styles.tableItemRow}>
          <View style={styles.descCol}>
            <Text style={styles.itemTitle}>{serviceName}</Text>
            <Text style={styles.itemSubtitle}>Professional consultancy fee</Text>
          </View>
          <Text style={styles.itemAmount}>₹5,000</Text>
        </View>

        <View style={styles.divider} />

        {/* Subtotal & Taxes */}
        <View style={styles.calcRow}>
          <Text style={styles.calcLabel}>Sub Total</Text>
          <Text style={styles.calcValue}>₹5,000</Text>
        </View>
        <View style={styles.calcRow}>
          <Text style={styles.calcLabel}>GST (18%)</Text>
          <Text style={styles.calcValue}>₹900</Text>
        </View>
        <View style={styles.calcRow}>
          <Text style={styles.calcLabel}>Discount</Text>
          <Text style={styles.calcValue}>₹0</Text>
        </View>

        {/* Total Paid Row */}
        <View style={styles.totalPaidRow}>
          <Text style={styles.totalPaidLabel}>Total Paid</Text>
          <Text style={styles.totalPaidValue}>{amount}</Text>
        </View>

        {/* Transaction Summary Footer */}
        <View style={styles.txnFooterRow}>
          <View>
            <Text style={styles.metaLabel}>Transaction ID</Text>
            <Text style={styles.footerTxnValue}>TXN202608190001</Text>
          </View>
          <View style={styles.metaRightCol}>
            <Text style={styles.metaLabel}>Payment Method</Text>
            <Text style={styles.footerTxnValue}>UPI</Text>
          </View>
        </View>

        {/* Verified Banner */}
        <View style={styles.verifiedBanner}>
          <Ionicons name="checkmark" size={14} color="#059669" />
          <Text style={styles.verifiedText}>Payment Verified & Received</Text>
        </View>
      </View>

      {/* Download & Share Actions */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.downloadBtn}
          activeOpacity={0.8}
          onPress={() => Alert.alert("Download PDF", "Invoice PDF downloaded successfully.")}
        >
          <Ionicons name="download-outline" size={16} color="#059669" />
          <Text style={styles.downloadBtnText}>Download PDF</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.shareBtn}
          activeOpacity={0.85}
          onPress={() => Alert.alert("Share Receipt", "Receipt share link generated.")}
        >
          <Ionicons name="share-social-outline" size={16} color="#FFFFFF" />
          <Text style={styles.shareBtnText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    paddingBottom: 24,
  },
  receiptCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#EEF2F6",
    marginBottom: 16,
  },
  companyBanner: {
    backgroundColor: "#059669",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  teBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  teBadgeText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  companyTextCol: {
    flex: 1,
  },
  companyName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  companyGst: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 1,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  invoiceMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  metaLabel: {
    fontSize: 10.5,
    fontWeight: "700",
    color: "#94A3B8",
    letterSpacing: 0.5,
  },
  metaValue: {
    fontSize: 13,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
    marginTop: 2,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  metaRightCol: {
    alignItems: "flex-end",
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginHorizontal: 16,
    marginVertical: 10,
  },
  billedToSection: {
    paddingHorizontal: 16,
  },
  customerName: {
    fontSize: 13.5,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
    marginTop: 2,
  },
  customerAddress: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 1,
  },
  customerPan: {
    fontSize: 12,
    fontWeight: "600",
    color: BrandColors.TEXT_PRIMARY,
    marginTop: 2,
  },
  tableHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  tableHeaderLabel: {
    fontSize: 10.5,
    fontWeight: "700",
    color: "#94A3B8",
    letterSpacing: 0.5,
  },
  tableItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 4,
  },
  descCol: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
  },
  itemSubtitle: {
    fontSize: 11,
    color: "#64748B",
  },
  itemAmount: {
    fontSize: 13.5,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
  },
  calcRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  calcLabel: {
    fontSize: 12.5,
    color: "#64748B",
  },
  calcValue: {
    fontSize: 12.5,
    fontWeight: "600",
    color: BrandColors.TEXT_PRIMARY,
  },
  totalPaidRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F0FDF4",
    marginHorizontal: 16,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 8,
  },
  totalPaidLabel: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#059669",
  },
  totalPaidValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#059669",
  },
  txnFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  footerTxnValue: {
    fontSize: 12,
    fontWeight: "600",
    color: BrandColors.TEXT_PRIMARY,
    marginTop: 2,
  },
  verifiedBanner: {
    flexDirection: "row",
    backgroundColor: "#F0FDF4",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: "#DCFCE7",
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#059669",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  downloadBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#059669",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  downloadBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#059669",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  shareBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#059669",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  shareBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
});
