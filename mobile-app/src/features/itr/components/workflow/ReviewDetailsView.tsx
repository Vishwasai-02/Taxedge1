import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from "react-native";
import { BrandColors, Shadows } from "../../../../shared/theme";
import {
  PersonalDetailsData,
  IncomeDetailsData,
  DeductionsData,
  WorkflowDocumentItem,
} from "../../types/workflowTypes";
import { DocumentStatusBadge } from "./DocumentStatusBadge";

interface ReviewDetailsViewProps {
  personalDetails: PersonalDetailsData;
  incomeDetails: IncomeDetailsData;
  deductions: DeductionsData;
  documents: WorkflowDocumentItem[];
  onApproveAndProceed: () => void;
}

export const ReviewDetailsView: React.FC<ReviewDetailsViewProps> = ({
  personalDetails,
  incomeDetails,
  deductions,
  documents,
  onApproveAndProceed,
}) => {
  // Numeric calculations
  const grossSalary = Number(incomeDetails.grossSalary.replace(/[^0-9]/g, "") || "0");
  const businessIncome = Number(incomeDetails.businessIncome.replace(/[^0-9]/g, "") || "0");
  const rentalIncome = Number(incomeDetails.rentalIncome.replace(/[^0-9]/g, "") || "0");
  const stcg = Number(incomeDetails.stcg.replace(/[^0-9]/g, "") || "0");
  const ltcg = Number(incomeDetails.ltcg.replace(/[^0-9]/g, "") || "0");
  const otherIncome = Number(incomeDetails.otherIncome.replace(/[^0-9]/g, "") || "0");

  const totalGrossIncome =
    grossSalary + businessIncome + rentalIncome + stcg + ltcg + otherIncome;

  const sec80c = Number(deductions.sec80c.replace(/[^0-9]/g, "") || "0");
  const sec80d = Number(deductions.sec80d.replace(/[^0-9]/g, "") || "0");
  const homeLoan24b = Number(deductions.homeLoan24b.replace(/[^0-9]/g, "") || "0");
  const educationLoan80e = Number(deductions.educationLoan80e.replace(/[^0-9]/g, "") || "0");
  const otherDeductions = Number(deductions.otherDeductions.replace(/[^0-9]/g, "") || "0");

  const totalDeductions =
    sec80c + sec80d + homeLoan24b + educationLoan80e + otherDeductions;

  const taxableIncome = Math.max(0, totalGrossIncome - totalDeductions);
  const estimatedTaxPayable = Math.round(taxableIncome * 0.103);
  const tdsPaid = 0;
  const netPayableOrRefund = estimatedTaxPayable - tdsPaid;

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      {/* 1. Personal Details */}
      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardSectionTitle}>Personal Details</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>PAN Number</Text>
          <Text style={styles.rowValue}>{personalDetails.panNumber || "-"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Aadhaar Number</Text>
          <Text style={styles.rowValue}>{personalDetails.aadhaarNumber || "-"}</Text>
        </View>
        <View style={[styles.row, { borderBottomWidth: 0 }]}>
          <Text style={styles.rowLabel}>Assessment Year</Text>
          <Text style={styles.rowValue}>{personalDetails.assessmentYear || "-"}</Text>
        </View>
      </View>

      {/* 2. Income Details */}
      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardSectionTitle}>Income Details</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Gross Salary</Text>
          <Text style={styles.rowValue}>₹{grossSalary.toLocaleString("en-IN")}</Text>
        </View>
        {businessIncome > 0 && (
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Business Income</Text>
            <Text style={styles.rowValue}>₹{businessIncome.toLocaleString("en-IN")}</Text>
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Rental Income</Text>
          <Text style={styles.rowValue}>₹{rentalIncome.toLocaleString("en-IN")}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Other Income</Text>
          <Text style={styles.rowValue}>₹{otherIncome.toLocaleString("en-IN")}</Text>
        </View>
        <View style={[styles.row, styles.highlightRow]}>
          <Text style={styles.totalLabel}>Total Income</Text>
          <Text style={styles.totalValue}>₹{totalGrossIncome.toLocaleString("en-IN")}</Text>
        </View>
      </View>

      {/* 3. Deductions (Chapter VI-A) */}
      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardSectionTitle}>Deductions (Chapter VI-A)</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>80C Investments</Text>
          <Text style={styles.rowValue}>₹{sec80c.toLocaleString("en-IN")}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>80D Health Insurance</Text>
          <Text style={styles.rowValue}>₹{sec80d.toLocaleString("en-IN")}</Text>
        </View>
        <View style={[styles.row, styles.highlightRow]}>
          <Text style={styles.totalLabel}>Total Deductions</Text>
          <Text style={styles.totalValue}>₹{totalDeductions.toLocaleString("en-IN")}</Text>
        </View>
      </View>

      {/* 4. Tax Computation (Estimated) Card - Navy/Orange branding matching Screenshot 3 */}
      <View style={styles.computationCard}>
        <View style={styles.computationHeader}>
          <Text style={styles.computationTitle}>Tax Computation (Estimated)</Text>
        </View>
        <View style={styles.compBody}>
          <View style={styles.compRow}>
            <Text style={styles.compLabel}>Gross Total Income</Text>
            <Text style={styles.compValue}>₹{totalGrossIncome.toLocaleString("en-IN")}</Text>
          </View>
          <View style={styles.compRow}>
            <Text style={styles.compLabel}>Less: Deductions</Text>
            <Text style={styles.compValue}>₹{totalDeductions.toLocaleString("en-IN")}</Text>
          </View>
          <View style={styles.compRow}>
            <Text style={styles.compLabel}>Taxable Income</Text>
            <Text style={styles.compValue}>₹{taxableIncome.toLocaleString("en-IN")}</Text>
          </View>
          <View style={styles.compRow}>
            <Text style={styles.compLabel}>Tax Payable</Text>
            <Text style={styles.compValue}>₹{estimatedTaxPayable.toLocaleString("en-IN")}</Text>
          </View>
          <View style={styles.compRow}>
            <Text style={styles.compLabel}>TDS Already Paid</Text>
            <Text style={styles.compValue}>₹{tdsPaid.toLocaleString("en-IN")}</Text>
          </View>
          <View style={styles.compFinalRow}>
            <Text style={styles.compFinalLabel}>Net Tax Payable / Refund</Text>
            <Text style={styles.compFinalValue}>
              {netPayableOrRefund >= 0
                ? `₹${netPayableOrRefund.toLocaleString("en-IN")} Payable`
                : `₹${Math.abs(netPayableOrRefund).toLocaleString("en-IN")} Refund`}
            </Text>
          </View>
        </View>
      </View>

      {/* 5. Professional Fee Card */}
      <View style={styles.feeCard}>
        <View>
          <Text style={styles.feeLabel}>Professional Fee</Text>
          <Text style={styles.feeAmount}>₹3,540</Text>
          <Text style={styles.feeSub}>Incl. GST (18%)</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.feeStartText}>Starting from</Text>
          <Text style={styles.feeBasePrice}>₹3,000 + GST</Text>
        </View>
      </View>

      {/* 6. Uploaded Documents List */}
      <View style={styles.card}>
        <Text style={styles.cardSectionTitle}>Uploaded Documents ({documents.length})</Text>
        {documents.map((doc) => (
          <View key={doc.id} style={styles.docSummaryRow}>
            <Text style={styles.docSummaryName} numberOfLines={1}>
              {doc.name}
            </Text>
            <DocumentStatusBadge status={doc.status} />
          </View>
        ))}
      </View>

      {/* Bottom Button */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onApproveAndProceed}
        style={styles.primaryBtn}
      >
        <Text style={styles.primaryBtnText}>Approve & Proceed to Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: BrandColors.BORDER,
    marginBottom: 16,
    ...Shadows.sm,
  },
  cardHeaderRow: {
    marginBottom: 12,
  },
  cardSectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: BrandColors.PRIMARY_BLUE,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  rowLabel: {
    fontSize: 13.5,
    color: BrandColors.TEXT_SECONDARY,
  },
  rowValue: {
    fontSize: 14,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
  },
  highlightRow: {
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 8,
    borderRadius: 8,
    marginTop: 4,
    borderBottomWidth: 0,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "800",
    color: BrandColors.PRIMARY_BLUE,
  },
  totalValue: {
    fontSize: 15,
    fontWeight: "800",
    color: BrandColors.PRIMARY_BLUE,
  },
  computationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: BrandColors.PRIMARY_BLUE,
    overflow: "hidden",
    marginBottom: 16,
    ...Shadows.sm,
  },
  computationHeader: {
    backgroundColor: BrandColors.PRIMARY_BLUE,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  computationTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  compBody: {
    padding: 16,
  },
  compRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  compLabel: {
    fontSize: 13.5,
    color: BrandColors.TEXT_SECONDARY,
  },
  compValue: {
    fontSize: 14,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
  },
  compFinalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: BrandColors.PRIMARY_LIGHT_BLUE,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 8,
  },
  compFinalLabel: {
    fontSize: 14,
    fontWeight: "800",
    color: BrandColors.PRIMARY_BLUE,
  },
  compFinalValue: {
    fontSize: 15,
    fontWeight: "800",
    color: BrandColors.PRIMARY_ORANGE,
  },
  feeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: BrandColors.BORDER,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    ...Shadows.sm,
  },
  feeLabel: {
    fontSize: 13,
    color: BrandColors.TEXT_SECONDARY,
  },
  feeAmount: {
    fontSize: 24,
    fontWeight: "800",
    color: BrandColors.PRIMARY_BLUE,
    marginTop: 2,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  feeSub: {
    fontSize: 11.5,
    color: BrandColors.TEXT_MUTED,
    marginTop: 2,
  },
  feeStartText: {
    fontSize: 12,
    color: BrandColors.TEXT_MUTED,
  },
  feeBasePrice: {
    fontSize: 14,
    fontWeight: "700",
    color: BrandColors.PRIMARY_ORANGE,
    marginTop: 2,
  },
  docSummaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  docSummaryName: {
    fontSize: 13.5,
    fontWeight: "600",
    color: BrandColors.TEXT_PRIMARY,
    flex: 1,
    marginRight: 10,
  },
  primaryBtn: {
    height: 52,
    borderRadius: 14,
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    ...Shadows.sm,
  },
  primaryBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
});
