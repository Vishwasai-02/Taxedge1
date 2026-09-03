import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ComputationInfoBanner } from "../components/computation/ComputationInfoBanner";
import { RefundHeroCard } from "../components/computation/RefundHeroCard";
import { TaxSummaryCard } from "../components/computation/TaxSummaryCard";
import { ReturnDetailsCard } from "../components/computation/ReturnDetailsCard";
import { ImportantNotesCard } from "../components/computation/ImportantNotesCard";
import { ConfirmApprovalModal } from "../components/computation/ConfirmApprovalModal";
import { RequestChangesBottomSheet } from "../components/computation/RequestChangesBottomSheet";
import {
  DEFAULT_COMPUTATION_DATA,
  DEFAULT_RETURN_DETAILS,
} from "../mock/computationData";

export const TaxComputationReviewScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    professionId?: string;
    professionTitle?: string;
    applicationId?: string;
    assessmentYear?: string;
    formType?: string;
  }>();

  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRequestSheet, setShowRequestSheet] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const returnDetails = {
    applicationId: params.applicationId || DEFAULT_RETURN_DETAILS.applicationId,
    incomeType: params.professionTitle || DEFAULT_RETURN_DETAILS.incomeType,
    itrForm: params.formType || DEFAULT_RETURN_DETAILS.itrForm,
    assessmentYear: params.assessmentYear || DEFAULT_RETURN_DETAILS.assessmentYear,
    status: DEFAULT_RETURN_DETAILS.status,
    preparedBy: DEFAULT_RETURN_DETAILS.preparedBy,
  };

  const handleApproveAndFile = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowApprovalModal(false);

      // Navigate to Return Filed / E-Verification Screen
      router.replace({
        pathname: "/service/itr-filed" as any,
        params: {
          applicationId: returnDetails.applicationId,
          professionTitle: returnDetails.incomeType,
          formType: returnDetails.itrForm,
          assessmentYear: returnDetails.assessmentYear,
          refundAmount: "₹29,585",
        },
      });
    }, 1200);
  };

  const handleChangesSubmitted = (comments: string, selectedTags: string[]) => {
    setShowRequestSheet(false);
    Alert.alert(
      "Request Sent to Tax Executive",
      "Your feedback has been delivered to your assigned Tax Executive. You will receive an update once the computation is adjusted."
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={20} color="#0B1F3A" />
        </TouchableOpacity>

        <View style={styles.headerTitleGroup}>
          <Text style={styles.headerTitle}>ITR Filing</Text>
          <Text style={styles.headerSubtitle}>Tax Computation Review</Text>
        </View>

        <View style={styles.headerRightSpacer} />
      </View>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 148 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Blue Info Banner */}
        <ComputationInfoBanner />

        {/* Refund / Tax Payable Hero Card */}
        <RefundHeroCard
          isRefund={DEFAULT_COMPUTATION_DATA.isRefund}
          amount={DEFAULT_COMPUTATION_DATA.refundDue || 29585}
        />

        {/* Tax Summary Breakdown Card */}
        <TaxSummaryCard computation={DEFAULT_COMPUTATION_DATA} />

        {/* Return Details Card */}
        <ReturnDetailsCard details={returnDetails} />

        {/* Important Notes Card */}
        <ImportantNotesCard />
      </ScrollView>

      {/* Sticky Bottom Actions */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setShowApprovalModal(true)}
          style={styles.approveButton}
        >
          <Ionicons name="checkmark-circle-outline" size={18} color="#FFFFFF" />
          <Text style={styles.approveButtonText}>Approve & Proceed to Filing</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setShowRequestSheet(true)}
          style={styles.requestButton}
        >
          <Ionicons name="chatbox-ellipses-outline" size={18} color="#0B1F3A" />
          <Text style={styles.requestButtonText}>Request Changes</Text>
        </TouchableOpacity>

        {/* Security & Encryption Trust Banner */}
        <View style={styles.trustBadge}>
          <Ionicons name="lock-closed-outline" size={13} color="#64748B" />
          <Text style={styles.trustText}>
            100% Secure • Your data is encrypted and protected
          </Text>
        </View>
      </View>

      {/* Confirmation Modal */}
      <ConfirmApprovalModal
        visible={showApprovalModal}
        isLoading={isSubmitting}
        onConfirm={handleApproveAndFile}
        onCancel={() => setShowApprovalModal(false)}
      />

      {/* Request Changes Bottom Sheet */}
      <RequestChangesBottomSheet
        visible={showRequestSheet}
        onSubmit={handleChangesSubmitted}
        onClose={() => setShowRequestSheet(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
      default: {},
    }),
  },
  headerTitleGroup: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0B1F3A",
    letterSpacing: -0.2,
  },
  headerSubtitle: {
    fontSize: 12.5,
    fontWeight: "500",
    color: "#0B1F3A",
    marginTop: 2,
  },
  headerRightSpacer: {
    width: 38,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    gap: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
      default: {},
    }),
  },
  approveButton: {
    height: 50,
    borderRadius: 14,
    backgroundColor: "#F97316",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#F97316",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      default: {},
    }),
  },
  approveButtonText: {
    color: "#FFFFFF",
    fontSize: 15.5,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  requestButton: {
    height: 48,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#0B1F3A",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  requestButtonText: {
    color: "#0B1F3A",
    fontSize: 15,
    fontWeight: "700",
  },
  trustBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginTop: 2,
  },
  trustText: {
    fontSize: 11.5,
    color: "#64748B",
    fontWeight: "500",
  },
});

export default TaxComputationReviewScreen;
