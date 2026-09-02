import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../../shared/theme";
import { GstServiceBanner } from "../components/common/GstServiceBanner";
import { GstSelectModal } from "../components/common/GstSelectModal";
import { GstSuccessAnimationScreen } from "../components/common/GstSuccessAnimationScreen";

const CERTIFICATE_REQUEST_TYPES = [
  "Download Existing Certificate",
  "Request Reprint",
];

export default function GstCertificateScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const gstin = "29PAVAN1234K1Z5";
  const registeredMobile = "+91 98XXXXXX23";
  const registeredEmail = "pavan@ybl";

  const [requestType, setRequestType] = useState<"Download Existing Certificate" | "Request Reprint" | "">("Download Existing Certificate");
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const getButtonText = () => {
    if (isProcessing) return "Processing...";
    if (requestType === "Request Reprint") return "Request Reprint";
    return "Download Certificate";
  };

  const handleAction = () => {
    if (!requestType) {
      setError("Please select a request type.");
      Alert.alert("Selection Required", "Please choose whether to download existing certificate or request reprint.");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
    }, 800);
  };

  if (isCompleted) {
    if (requestType === "Download Existing Certificate") {
      return (
        <GstSuccessAnimationScreen
          iconType="certificate"
          title="Certificate Ready!"
          subtitle="Your requested certificate is ready for download."
        />
      );
    }
    return (
      <GstSuccessAnimationScreen
        iconType="reprint"
        title="Reprint Requested!"
        subtitle="Your certificate reprint request has been submitted successfully.&#10;&#10;We will send the reprinted certificate to your registered email."
      />
    );
  }

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={[styles.headerBar, { paddingTop: Math.max(insets.top, 12) + 6 }]}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color={BrandColors.TEXT_PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>GST Certificate</Text>
        <View style={styles.placeholderBox} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={true}
        overScrollMode="always"
      >
        {/* Top Info Banner */}
        <GstServiceBanner
          iconName="ribbon"
          text="Retrieve your already-issued certificate"
        />

        {/* GSTIN (Read-Only) */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>GSTIN</Text>
          <TextInput
            style={[styles.input, styles.readOnlyInput]}
            value={gstin}
            editable={false}
          />
        </View>

        {/* Registered Mobile / Email */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Registered Mobile / Email</Text>
          <View style={styles.contactCard}>
            <Text style={styles.contactValue}>{registeredMobile}</Text>
            <Text style={styles.contactValue}>{registeredEmail}</Text>
            <Text style={styles.contactSubText}>
              Used only to confirm identity before releasing the download
            </Text>
          </View>
        </View>

        {/* Request Type Dropdown */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Request Type <Text style={styles.star}>*</Text></Text>
          <TouchableOpacity
            style={[styles.selectBox, error && styles.inputError]}
            activeOpacity={0.7}
            onPress={() => setShowTypeModal(true)}
          >
            <Text style={[styles.selectText, !requestType && styles.placeholderText]}>
              {requestType || "Select Request Type"}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#64748B" />
          </TouchableOpacity>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        {/* Illustration Preview Graphic */}
        <View style={styles.illustrationWrap}>
          <View style={styles.docGraphic}>
            <Ionicons name="document-text-outline" size={60} color="#BFDBFE" />
            <View style={styles.sealBadge}>
              <Ionicons name="ribbon" size={20} color="#2563EB" />
            </View>
          </View>
        </View>

        {/* Dynamic Orange CTA Button */}
        <TouchableOpacity
          style={styles.actionOrangeBtn}
          activeOpacity={0.85}
          onPress={handleAction}
          disabled={isProcessing}
        >
          <Text style={styles.actionOrangeBtnText}>{getButtonText()}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Request Type Modal */}
      <GstSelectModal
        visible={showTypeModal}
        title="Select Request Type"
        options={CERTIFICATE_REQUEST_TYPES}
        selectedValue={requestType}
        onSelect={(v) => {
          setRequestType(v as any);
          setError("");
        }}
        onClose={() => setShowTypeModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FFFFFF" },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    width: 38,
    height: 38,
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
  scrollContent: { padding: 16, paddingBottom: 120, gap: 14 },
  fieldGroup: { gap: 6 },
  label: { fontSize: 13, fontWeight: "600", color: BrandColors.TEXT_PRIMARY },
  star: { color: "#EF4444" },
  input: {
    height: 48,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 14,
    fontSize: 14,
    color: BrandColors.TEXT_PRIMARY,
  },
  readOnlyInput: {
    backgroundColor: "#F1F5F9",
    color: "#475569",
    fontWeight: "600",
  },
  contactCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 14,
    gap: 4,
  },
  contactValue: {
    fontSize: 13.5,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
  },
  contactSubText: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 4,
  },
  selectBox: {
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectText: { fontSize: 14, fontWeight: "600", color: BrandColors.TEXT_PRIMARY },
  placeholderText: { color: "#94A3B8", fontWeight: "400" },
  inputError: { borderColor: "#EF4444", backgroundColor: "#FEF2F2" },
  errorText: { fontSize: 11.5, color: "#DC2626", fontWeight: "500" },
  illustrationWrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
  },
  docGraphic: {
    alignItems: "center",
    justifyContent: "center",
  },
  sealBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
  },
  actionOrangeBtn: {
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
    marginTop: 8,
  },
  actionOrangeBtnText: { fontSize: 15, fontWeight: "700", color: "#FFFFFF" },
});
