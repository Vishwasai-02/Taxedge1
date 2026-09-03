import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../shared/theme";
import { PaymentOrderSummaryCard } from "../../features/gst/components/payment/PaymentOrderSummaryCard";
import {
  PaymentMethodSelector,
  PaymentMethodType,
  CardFormData,
  NetBankingFormData,
} from "../../features/gst/components/payment/PaymentMethodSelector";
import { GstPaymentSuccessStep } from "../../features/gst/components/payment/GstPaymentSuccessStep";
import { GstPaymentReceiptStep } from "../../features/gst/components/payment/GstPaymentReceiptStep";
import { GstApplicationStatusStep } from "../../features/gst/components/GstApplicationStatusStep";
import { GstValidators } from "../../features/gst/utils/gstValidators";

type PaymentScreenView = "checkout" | "success" | "receipt" | "status";

export default function PaymentsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [currentView, setCurrentView] = useState<PaymentScreenView>("checkout");
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>("upi");

  // Inputs for all payment methods
  const [upiId, setUpiId] = useState("pavan@ybl");
  const [upiError, setUpiError] = useState("");

  const [cardData, setCardData] = useState<CardFormData>({
    cardNumber: "4532 8921 7843 1209",
    cardHolder: "Pavan Kalyan",
    expiry: "08/28",
    cvv: "892",
  });
  const [cardErrors, setCardErrors] = useState<Record<string, string>>({});

  const [netBankingData, setNetBankingData] = useState<NetBankingFormData>({
    selectedBank: "HDFC Bank",
    customerId: "HDFC984210",
  });
  const [netBankingErrors, setNetBankingErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBack = () => {
    if (currentView === "receipt" || currentView === "status") {
      setCurrentView("success");
    } else if (currentView === "success") {
      setCurrentView("checkout");
    } else {
      router.back();
    }
  };

  const handlePay = () => {
    let isValid = false;

    if (selectedMethod === "upi") {
      if (!GstValidators.isValidUpi(upiId)) {
        setUpiError("Enter a valid UPI ID (e.g. pavan@ybl / yourname@bank)");
        return;
      }
      setUpiError("");
      isValid = true;
    } else if (selectedMethod === "debit" || selectedMethod === "credit") {
      const errs = GstValidators.validateCard(cardData);
      setCardErrors(errs);
      if (Object.keys(errs).length > 0) return;
      isValid = true;
    } else if (selectedMethod === "netbanking") {
      const errs = GstValidators.validateNetBanking(netBankingData);
      setNetBankingErrors(errs);
      if (Object.keys(errs).length > 0) return;
      isValid = true;
    }

    if (!isValid) {
      Alert.alert("Validation Error", "Please fill in all required payment details.");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentView("success");
    }, 1000);
  };

  return (
    <View style={[styles.root, { paddingTop: Math.max(insets.top, 12) }]}>
      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity activeOpacity={0.7} onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={20} color={BrandColors.TEXT_PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {currentView === "receipt" ? "Payment Receipt" : currentView === "status" ? "Application Status" : "Complete Payment"}
        </Text>
        <View style={styles.placeholderBox} />
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={true}
        overScrollMode="always"
        nestedScrollEnabled={true}
      >
        {currentView === "checkout" && (
          <>
            <PaymentOrderSummaryCard
              serviceTitle="GST Registration"
              businessSubtitle="Pavan Enterprises • Bengaluru"
              professionalFee="₹1,986"
              gstAmount="₹358"
              discountAmount="₹0"
              totalAmount="₹2,344"
            />

            <PaymentMethodSelector
              selectedMethod={selectedMethod}
              onSelectMethod={(m) => {
                setSelectedMethod(m);
                setUpiError("");
                setCardErrors({});
                setNetBankingErrors({});
              }}
              upiId={upiId}
              onChangeUpiId={(id) => {
                setUpiId(id);
                setUpiError("");
              }}
              upiError={upiError}
              cardData={cardData}
              onChangeCardData={(f) => {
                setCardData((prev: CardFormData) => ({ ...prev, ...f }));
                setCardErrors((prev) => {
                  const next = { ...prev };
                  Object.keys(f).forEach((k) => delete next[k]);
                  return next;
                });
              }}
              cardErrors={cardErrors}
              netBankingData={netBankingData}
              onChangeNetBankingData={(f) => {
                setNetBankingData((prev: NetBankingFormData) => ({ ...prev, ...f }));
                setNetBankingErrors((prev) => {
                  const next = { ...prev };
                  Object.keys(f).forEach((k) => delete next[k]);
                  return next;
                });
              }}
              netBankingErrors={netBankingErrors}
            />

            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handlePay}
                style={styles.payBtn}
                disabled={isProcessing}
              >
                <Text style={styles.payBtnText}>
                  {isProcessing ? "Processing..." : "Pay Securely ₹2,344"}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {currentView === "success" && (
          <GstPaymentSuccessStep
            amount="₹2,344"
            serviceName="GST Registration"
            onViewReceipt={() => setCurrentView("receipt")}
            onViewApplication={() => setCurrentView("status")}
          />
        )}

        {currentView === "receipt" && (
          <GstPaymentReceiptStep
            amount="₹2,344"
            serviceName="GST Registration Service"
            invoiceNo="INV-2026-00001"
          />
        )}

        {currentView === "status" && <GstApplicationStatusStep />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F8FAFC" },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  placeholderBox: { width: 38 },
  scrollView: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 240,
    gap: 16,
    flexGrow: 1,
  },
  buttonWrapper: { marginTop: 4, marginBottom: 8 },
  payBtn: {
    height: 52,
    borderRadius: 26,
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: BrandColors.PRIMARY_ORANGE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  payBtnText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
});
