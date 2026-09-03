import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TaxNoticeHeader } from "../components/common/TaxNoticeHeader";
import { DraftedResponseCard } from "../components/review/DraftedResponseCard";
import { MOCK_DRAFT_RESPONSE_TEXT } from "../mock/taxNoticeData";

export const ReviewNoticeResponseScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    noticeNumber?: string;
    assessmentYear?: string;
  }>();

  // Checked by default matching reference screenshot
  const [isChecked, setIsChecked] = useState(true);

  const handleEditRequest = () => {
    Alert.alert(
      "Request Edits",
      "Please describe the edits you would like our Tax Executive to make in this response.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Send to Executive",
          onPress: () => Alert.alert("Sent", "Your edit request has been sent to your Tax Executive."),
        },
      ]
    );
  };

  const handleApproveAndSubmit = () => {
    if (!isChecked) {
      Alert.alert(
        "Confirmation Required",
        "Please confirm that you have reviewed the response before submitting."
      );
      return;
    }

    // Navigate to Screen 5: Notice Status
    router.push({
      pathname: "/service/tax-notice-status" as any,
      params: {
        noticeNumber: params.noticeNumber || "CPC/2526/A3/284419260",
        assessmentYear: params.assessmentYear || "AY 2025–26",
      },
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Header */}
      <TaxNoticeHeader subtitle="Review Response" />

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Please review our response</Text>
          <Text style={styles.pageSubtitle}>
            Your Tax Executive has prepared the following response to the Income
            Tax Department.
          </Text>
        </View>

        {/* Drafted Response Letter */}
        <DraftedResponseCard responseText={MOCK_DRAFT_RESPONSE_TEXT} />

        {/* Checkbox Section */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsChecked(!isChecked)}
          style={styles.checkboxRow}
        >
          <View style={[styles.checkbox, isChecked ? styles.checkboxActive : null]}>
            {isChecked && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
          </View>
          <Text style={styles.checkboxLabel}>
            I have reviewed the response and confirm that the details are correct.
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Sticky Action Buttons */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleEditRequest}
            style={styles.editButton}
          >
            <Text style={styles.editButtonText}>Edit Request</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleApproveAndSubmit}
            style={styles.approveButton}
          >
            <Text style={styles.approveButtonText}>Approve & Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  titleSection: {
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0B1F3A",
    letterSpacing: -0.2,
  },
  pageSubtitle: {
    fontSize: 12.5,
    color: "#64748B",
    marginTop: 4,
    lineHeight: 18,
    fontWeight: "400",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingHorizontal: 2,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginTop: 1,
  },
  checkboxActive: {
    borderColor: "#F97316",
    backgroundColor: "#F97316",
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 12.5,
    color: "#0B1F3A",
    fontWeight: "600",
    lineHeight: 18,
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
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
      default: {},
    }),
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 12,
  },
  editButton: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#FED7AA",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  editButtonText: {
    color: "#EA580C",
    fontSize: 15,
    fontWeight: "700",
  },
  approveButton: {
    flex: 1.4,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#F97316",
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});

export default ReviewNoticeResponseScreen;
