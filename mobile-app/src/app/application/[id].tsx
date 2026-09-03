import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTheme } from "../../hooks/use-theme";
import { Spacing } from "../../shared/theme";
import { useApplicationStore } from "../../store/applicationStore";
import { AppHeader } from "../../components/AppHeader";
import { StatusTimeline } from "../../components/StatusTimeline";
import { DocumentChecklist } from "../../components/DocumentChecklist";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./[id].styles";

export default function ApplicationDetailScreen() {
  const colors = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const applications = useApplicationStore((state) => state.applications);
  const uploadDocument = useApplicationStore((state) => state.uploadDocument);
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

  const handleDocumentUpload = (docName: string, fileUri: string) => {
    uploadDocument(app.id, docName, fileUri);
  };

  const handlePayNow = () => {
    router.push({ pathname: "/payment/[id]", params: { id: app.id } });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title={app.serviceName} showBack />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + Spacing.xl }]}
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

