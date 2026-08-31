import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTheme } from "../../hooks/use-theme";
import { useApplicationStore } from "../../store/applicationStore";
import { AppHeader } from "../../components/AppHeader";
import { StatusTimeline } from "../../components/StatusTimeline";
import { DocumentChecklist } from "../../components/DocumentChecklist";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ApplicationDetailScreen() {
  const colors = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const applications = useApplicationStore((state) => state.applications);
  const uploadDocument = useApplicationStore((state) => state.uploadDocument);
  const payApplication = useApplicationStore((state) => state.payApplication);
  const app = applications.find((a) => a.id === id);

  if (!app) {
    return (
      <View
        style={[styles.errorContainer, { backgroundColor: colors.background }]}
      >
        <AppHeader title="Not Found" showBack />
        <View style={styles.errorContent}>
          <Ionicons name="warning-outline" size={48} color={colors.error} />
          <Text style={[styles.errorText, { color: colors.text }]}>
            Application not found.
          </Text>
        </View>
      </View>
    );
  }

  const handleDocumentUpload = (docName, fileUri) => {
    uploadDocument(app.id, docName, fileUri);
  };

  const handlePayNow = () => {
    Alert.alert(
      "Proceed with Payment",
      `Complete payment of ₹${app.paymentAmount.toLocaleString()} for ${app.serviceName}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Pay Mock Fee",
          onPress: () => {
            payApplication(app.id);
            Alert.alert(
              "Payment Successful",
              "Receipt added to payment history.",
            );
          },
        },
      ],
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title={app.serviceName} showBack />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary Card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.backgroundElement,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.summaryHeader}>
            <View>
              <Text style={[styles.appIdText, { color: colors.textSecondary }]}>
                APPLICATION ID
              </Text>
              <Text style={[styles.appIdVal, { color: colors.text }]}>
                {app.id}
              </Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    app.status === "Completed" ? "#E8F5E9" : colors.orangeLight,
                },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  {
                    color:
                      app.status === "Completed"
                        ? colors.success
                        : colors.orange,
                  },
                ]}
              >
                {app.status}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.repRow}>
            <Ionicons name="person" size={20} color={colors.primary} />
            <View style={styles.repInfo}>
              <Text style={[styles.repLabel, { color: colors.textSecondary }]}>
                Assigned Executive
              </Text>
              <Text style={[styles.repName, { color: colors.text }]}>
                {app.assignedExecutive}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push(`/chat/${app.id}`)}
              style={[styles.chatBtn, { backgroundColor: colors.primary }]}
            >
              <Ionicons name="chatbubble-ellipses" size={16} color="#FFFFFF" />
              <Text style={styles.chatBtnText}>Chat</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment Warning Card */}
        {app.paymentStatus === "Pending" && (
          <View
            style={[
              styles.paymentCard,
              { borderColor: colors.error, backgroundColor: "#FFF5F5" },
            ]}
          >
            <View style={styles.paymentInfo}>
              <Ionicons name="card-outline" size={24} color={colors.error} />
              <View>
                <Text style={[styles.paymentDueTitle, { color: colors.text }]}>
                  Service Fee Pending
                </Text>
                <Text style={[styles.paymentDueAmt, { color: colors.error }]}>
                  ₹{app.paymentAmount.toLocaleString()}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handlePayNow}
              style={[styles.payNowBtn, { backgroundColor: colors.error }]}
            >
              <Text style={styles.payNowText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Status Timeline */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.backgroundElement,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Application Status Timeline
          </Text>
          <StatusTimeline steps={app.timeline} />
        </View>

        {/* Document Checklist */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.backgroundElement,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.checklistHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Document Upload Checklist
            </Text>
            <Text
              style={[styles.checklistProgressText, { color: colors.primary }]}
            >
              {app.documents.filter((d) => d.status === "Uploaded").length} /{" "}
              {app.documents.length} Uploaded
            </Text>
          </View>
          <DocumentChecklist
            documents={app.documents}
            onUpload={handleDocumentUpload}
          />
        </View>

        {/* Submitted Data Summary */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.backgroundElement,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Submitted Form Details
          </Text>
          <View style={styles.formSummaryList}>
            {Object.entries(app.formData).map(([key, val]) => (
              <View key={key} style={styles.summaryItem}>
                <Text
                  style={[styles.summaryKey, { color: colors.textSecondary }]}
                >
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </Text>
                <Text style={[styles.summaryVal, { color: colors.text }]}>
                  {val}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
    paddingBottom: 32,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appIdText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  appIdVal: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: "#00000005",
    marginVertical: 16,
  },
  repRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  repInfo: {
    marginLeft: 12,
    flex: 1,
  },
  repLabel: {
    fontSize: 11,
    fontWeight: "500",
  },
  repName: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: 2,
  },
  chatBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  chatBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
  paymentCard: {
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  paymentDueTitle: {
    fontSize: 13,
    fontWeight: "600",
  },
  paymentDueAmt: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 2,
  },
  payNowBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  payNowText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  checklistHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  checklistProgressText: {
    fontSize: 12,
    fontWeight: "700",
  },
  formSummaryList: {
    gap: 12,
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#00000003",
  },
  summaryKey: {
    fontSize: 13,
    fontWeight: "500",
  },
  summaryVal: {
    fontSize: 14,
    fontWeight: "600",
  },
  errorContainer: {
    flex: 1,
  },
  errorContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  errorText: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 12,
  },
});
