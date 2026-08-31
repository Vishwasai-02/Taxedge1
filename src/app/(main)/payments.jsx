import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../../hooks/use-theme";
import { useApplicationStore } from "../../store/applicationStore";
import { useNotificationStore } from "../../store/notificationStore";
import { AppHeader } from "../../components/AppHeader";
import { PrimaryButton } from "../../components/PrimaryButton";
import { SecondaryButton } from "../../components/SecondaryButton";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function PaymentsScreen() {
  const colors = useTheme();
  const router = useRouter();
  const applications = useApplicationStore((state) => state.applications);
  const payApplication = useApplicationStore((state) => state.payApplication);
  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  );

  // Filter and calculate payments dynamically from applications store
  const pendingPayments = applications.filter(
    (app) => app.paymentStatus === "Pending" && app.paymentAmount > 0,
  );
  const paidPayments = applications.filter(
    (app) => app.paymentStatus === "Paid" && app.paymentAmount > 0,
  );
  const totalDue = pendingPayments.reduce(
    (sum, app) => sum + app.paymentAmount,
    0,
  );

  // Payment modal state
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayPress = (appId) => {
    setSelectedAppId(appId);
    setShowCheckoutModal(true);
  };

  const handleConfirmPayment = () => {
    if (!selectedAppId) return;
    const app = applications.find((a) => a.id === selectedAppId);
    if (!app) return;

    setIsProcessing(true);
    setTimeout(() => {
      // Complete payment in store
      payApplication(selectedAppId);
      // Add notification
      addNotification(
        "Payment Successful",
        `Received ₹${app.paymentAmount.toLocaleString()} for ${app.serviceName} (${app.id}).`,
        "payment",
      );

      setIsProcessing(false);
      setShowCheckoutModal(false);
      setSelectedAppId(null);
      Alert.alert(
        "Payment Success",
        "Receipt has been added to your payment history.",
      );
    }, 2000);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="Payments & Billing" showBack={false} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Total Due Banner */}
        <View
          style={[
            styles.dueBanner,
            { backgroundColor: colors.orangeLight, borderColor: colors.orange },
          ]}
        >
          <View>
            <Text style={[styles.dueLabel, { color: colors.textSecondary }]}>
              TOTAL DUE FEES
            </Text>
            <Text style={[styles.dueValue, { color: colors.orange }]}>
              ₹{totalDue.toLocaleString()}
            </Text>
          </View>
          <Ionicons name="receipt-outline" size={32} color={colors.orange} />
        </View>

        {/* Pending Invoices */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Pending Invoices
        </Text>
        <View style={styles.invoicesList}>
          {pendingPayments.length === 0 ? (
            <View
              style={[
                styles.emptyCard,
                {
                  backgroundColor: colors.backgroundElement,
                  borderColor: colors.border,
                },
              ]}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={32}
                color={colors.success}
              />
              <Text
                style={[styles.emptyText, { color: colors.text, marginTop: 8 }]}
              >
                All Settled!
              </Text>
              <Text style={[styles.emptySub, { color: colors.textSecondary }]}>
                You have no pending payments at this time.
              </Text>
            </View>
          ) : (
            pendingPayments.map((app) => (
              <View
                key={app.id}
                style={[
                  styles.invoiceCard,
                  {
                    backgroundColor: colors.backgroundElement,
                    borderColor: colors.border,
                  },
                ]}
              >
                <View style={styles.invoiceMain}>
                  <View style={styles.invoiceInfo}>
                    <Text style={[styles.invoiceName, { color: colors.text }]}>
                      {app.serviceName}
                    </Text>
                    <Text
                      style={[
                        styles.invoiceId,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {app.id}
                    </Text>
                  </View>
                  <Text style={[styles.invoiceAmt, { color: colors.text }]}>
                    ₹{app.paymentAmount.toLocaleString()}
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handlePayPress(app.id)}
                  style={[styles.payNowBtn, { backgroundColor: colors.orange }]}
                >
                  <Text style={styles.payNowBtnText}>Pay Now</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        {/* Payment History */}
        <Text
          style={[styles.sectionTitle, { color: colors.text, marginTop: 24 }]}
        >
          Payment History
        </Text>
        <View style={styles.historyList}>
          {paidPayments.length === 0 ? (
            <View
              style={[
                styles.emptyCard,
                {
                  backgroundColor: colors.backgroundElement,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={[styles.emptySub, { color: colors.textSecondary }]}>
                No payment history records found.
              </Text>
            </View>
          ) : (
            paidPayments.map((app) => (
              <View
                key={app.id}
                style={[
                  styles.historyCard,
                  {
                    backgroundColor: colors.backgroundElement,
                    borderColor: colors.border,
                  },
                ]}
              >
                <View style={styles.historyLeft}>
                  <View
                    style={[
                      styles.successIconBg,
                      { backgroundColor: "#DCFCE7" },
                    ]}
                  >
                    <Ionicons
                      name="checkmark"
                      size={18}
                      color={colors.success}
                    />
                  </View>
                  <View style={styles.historyInfo}>
                    <Text style={[styles.historyName, { color: colors.text }]}>
                      {app.serviceName}
                    </Text>
                    <Text
                      style={[
                        styles.historyId,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {app.id}
                    </Text>
                  </View>
                </View>
                <View style={styles.historyRight}>
                  <Text style={[styles.historyAmt, { color: colors.success }]}>
                    ₹{app.paymentAmount.toLocaleString()}
                  </Text>
                  <Text
                    style={[
                      styles.historyStatus,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Paid
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Checkout Simulator Modal */}
      <Modal
        visible={showCheckoutModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCheckoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: colors.backgroundElement },
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              TaxEdge Checkout
            </Text>

            <View style={styles.checkoutSummary}>
              <Text
                style={[styles.summaryLabel, { color: colors.textSecondary }]}
              >
                Service
              </Text>
              <Text
                style={[styles.summaryVal, { color: colors.text }]}
                numberOfLines={1}
              >
                {applications.find((a) => a.id === selectedAppId)?.serviceName}
              </Text>
              <View style={styles.modalDivider} />
              <Text
                style={[styles.summaryLabel, { color: colors.textSecondary }]}
              >
                Total Amount
              </Text>
              <Text style={[styles.summaryTotalAmt, { color: colors.primary }]}>
                ₹
                {applications
                  .find((a) => a.id === selectedAppId)
                  ?.paymentAmount.toLocaleString()}
              </Text>
            </View>

            <Text style={[styles.paymentMethodTitle, { color: colors.text }]}>
              Select Payment Mode
            </Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setPaymentMethod("UPI")}
              style={[
                styles.methodItem,
                {
                  borderColor:
                    paymentMethod === "UPI" ? colors.primary : colors.border,
                  backgroundColor:
                    paymentMethod === "UPI" ? colors.background : "transparent",
                },
              ]}
            >
              <Ionicons
                name="phone-portrait-outline"
                size={20}
                color={colors.primary}
              />
              <Text style={[styles.methodText, { color: colors.text }]}>
                UPI / GooglePay / PhonePe
              </Text>
              {paymentMethod === "UPI" && (
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color={colors.primary}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setPaymentMethod("CARD")}
              style={[
                styles.methodItem,
                {
                  borderColor:
                    paymentMethod === "CARD" ? colors.primary : colors.border,
                  backgroundColor:
                    paymentMethod === "CARD"
                      ? colors.background
                      : "transparent",
                },
              ]}
            >
              <Ionicons name="card-outline" size={20} color={colors.primary} />
              <Text style={[styles.methodText, { color: colors.text }]}>
                Debit / Credit Card
              </Text>
              {paymentMethod === "CARD" && (
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color={colors.primary}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setPaymentMethod("NETBANKING")}
              style={[
                styles.methodItem,
                {
                  borderColor:
                    paymentMethod === "NETBANKING"
                      ? colors.primary
                      : colors.border,
                  backgroundColor:
                    paymentMethod === "NETBANKING"
                      ? colors.background
                      : "transparent",
                },
              ]}
            >
              <Ionicons
                name="business-outline"
                size={20}
                color={colors.primary}
              />
              <Text style={[styles.methodText, { color: colors.text }]}>
                Net Banking
              </Text>
              {paymentMethod === "NETBANKING" && (
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color={colors.primary}
                />
              )}
            </TouchableOpacity>

            {isProcessing ? (
              <View style={styles.processingState}>
                <ActivityIndicator size="large" color={colors.orange} />
                <Text style={[styles.processingText, { color: colors.text }]}>
                  Simulating Gateway Authentication...
                </Text>
              </View>
            ) : (
              <View style={styles.modalBtnRow}>
                <SecondaryButton
                  title="Cancel"
                  onPress={() => setShowCheckoutModal(false)}
                  style={{ flex: 1 }}
                />

                <PrimaryButton
                  title="Pay Now"
                  onPress={handleConfirmPayment}
                  colorType="orange"
                  style={{ flex: 1 }}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  dueBanner: {
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  dueLabel: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  dueValue: {
    fontSize: 28,
    fontWeight: "800",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  invoicesList: {
    gap: 12,
  },
  invoiceCard: {
    borderRadius: 14,
    borderWidth: 1.5,
    padding: 16,
  },
  invoiceMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  invoiceInfo: {
    flex: 1,
    marginRight: 12,
  },
  invoiceName: {
    fontSize: 15,
    fontWeight: "700",
  },
  invoiceId: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: "500",
  },
  invoiceAmt: {
    fontSize: 18,
    fontWeight: "800",
  },
  payNowBtn: {
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  payNowBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
  historyList: {
    gap: 10,
  },
  historyCard: {
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  historyLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  successIconBg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  historyInfo: {
    marginLeft: 12,
    flex: 1,
  },
  historyName: {
    fontSize: 14,
    fontWeight: "600",
  },
  historyId: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: "500",
  },
  historyRight: {
    alignItems: "flex-end",
  },
  historyAmt: {
    fontSize: 15,
    fontWeight: "700",
  },
  historyStatus: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 2,
  },
  emptyCard: {
    borderRadius: 12,
    borderWidth: 1.5,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 15,
    fontWeight: "700",
  },
  emptySub: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 340,
    borderRadius: 16,
    padding: 20,
    gap: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  checkoutSummary: {
    backgroundColor: "#00000003",
    padding: 14,
    borderRadius: 10,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: "500",
  },
  summaryVal: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 2,
  },
  modalDivider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 8,
  },
  summaryTotalAmt: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 2,
  },
  paymentMethodTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 8,
  },
  methodItem: {
    height: 48,
    borderWidth: 1.5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 10,
  },
  methodText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
  },
  processingState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    gap: 10,
  },
  processingText: {
    fontSize: 13,
    fontWeight: "600",
  },
  modalBtnRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
});
