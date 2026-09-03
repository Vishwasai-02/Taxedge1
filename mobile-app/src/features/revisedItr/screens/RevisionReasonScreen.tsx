import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RevisedItrHeader } from "../components/common/RevisedItrHeader";
import { RevisionReasonCard } from "../components/reason/RevisionReasonCard";
import { REVISION_REASONS } from "../mock/revisedItrData";
import { RevisionReasonId } from "../types/revisedItr.types";

export const RevisionReasonScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    acknowledgementNumber?: string;
    assessmentYear?: string;
  }>();

  // "missed_income" is selected by default matching the reference screenshot
  const [selectedReason, setSelectedReason] =
    useState<RevisionReasonId>("missed_income");
  const [otherReasonText, setOtherReasonText] = useState("");
  const [otherError, setOtherError] = useState<string | null>(null);

  const selectedReasonObj = REVISION_REASONS.find((r) => r.id === selectedReason);

  const handleContinue = () => {
    if (selectedReason === "other" && !otherReasonText.trim()) {
      setOtherError("Please specify the reason for revision.");
      return;
    }

    setOtherError(null);

    // Navigate to Screen 3: Update Changed Details
    router.push({
      pathname: "/service/revised-itr-update" as any,
      params: {
        acknowledgementNumber: params.acknowledgementNumber,
        assessmentYear: params.assessmentYear || "AY 2025–26",
        revisionReason: selectedReason,
        otherReasonText: selectedReason === "other" ? otherReasonText : undefined,
      },
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Header */}
      <RevisedItrHeader subtitle="Reason for Revision" />

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
          <Text style={styles.pageTitle}>What needs to be corrected?</Text>
          <Text style={styles.pageSubtitle}>
            This helps your Tax Executive understand what changed without a
            long written explanation.
          </Text>
        </View>

        {/* 4 Revision Reason Cards */}
        {REVISION_REASONS.map((item) => (
          <RevisionReasonCard
            key={item.id}
            item={item}
            isSelected={selectedReason === item.id}
            onSelect={(id) => {
              setSelectedReason(id);
              if (otherError) setOtherError(null);
            }}
          />
        ))}

        {/* Conditional Textarea for "Other" */}
        {selectedReason === "other" && (
          <View style={styles.otherInputGroup}>
            <Text style={styles.otherInputLabel}>
              Please describe what needs to be changed{" "}
              <Text style={styles.requiredStar}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.otherTextInput,
                otherError ? styles.inputError : null,
              ]}
              placeholder="Provide a brief explanation of the corrections needed..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={3}
              value={otherReasonText}
              onChangeText={(text) => {
                setOtherReasonText(text);
                if (otherError) setOtherError(null);
              }}
            />
            {otherError ? (
              <Text style={styles.errorText}>{otherError}</Text>
            ) : null}
          </View>
        )}

        {/* Bottom Current Selection Info Box */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconCircle}>
            <Ionicons name="information" size={18} color="#FFFFFF" />
          </View>
          <Text style={styles.infoText}>
            Currently selected:{" "}
            <Text style={styles.boldText}>
              {selectedReasonObj?.title || "Missed income"}
            </Text>
            . You can change this later if needed.
          </Text>
        </View>
      </ScrollView>

      {/* Sticky Bottom Action Button */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleContinue}
          style={styles.continueButton}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
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
  otherInputGroup: {
    marginBottom: 16,
  },
  otherInputLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0B1F3A",
    marginBottom: 6,
  },
  requiredStar: {
    color: "#DC2626",
  },
  otherTextInput: {
    minHeight: 80,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 12,
    fontSize: 13.5,
    color: "#0B1F3A",
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "#DC2626",
  },
  errorText: {
    fontSize: 11.5,
    color: "#DC2626",
    marginTop: 4,
    fontWeight: "500",
  },
  infoCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 16,
  },
  infoIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 11.5,
    color: "#475569",
    lineHeight: 16,
    fontWeight: "400",
  },
  boldText: {
    fontWeight: "700",
    color: "#0B1F3A",
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
  continueButton: {
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
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});

export default RevisionReasonScreen;
