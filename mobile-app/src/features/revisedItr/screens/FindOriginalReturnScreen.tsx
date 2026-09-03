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
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RevisedItrHeader } from "../components/common/RevisedItrHeader";
import { ReturnSummaryCard } from "../components/find/ReturnSummaryCard";
import { MOCK_ORIGINAL_RETURN } from "../mock/revisedItrData";
import { OriginalReturnDetails } from "../types/revisedItr.types";

export const FindOriginalReturnScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [ackNumber, setAckNumber] = useState("284419250714208");
  const [assessmentYear, setAssessmentYear] = useState("AY 2025–26");
  const [showAyDropdown, setShowAyDropdown] = useState(false);
  const [foundReturn, setFoundReturn] = useState<OriginalReturnDetails | null>(
    MOCK_ORIGINAL_RETURN
  );
  const [error, setError] = useState<string | null>(null);

  const ayOptions = ["AY 2025–26", "AY 2024–25", "AY 2023–24"];

  const handleFindReturn = () => {
    // 15-digit numeric validation
    const cleaned = ackNumber.trim();
    if (!cleaned) {
      setError("Please enter the 15-digit Acknowledgement Number.");
      return;
    }
    if (!/^\d{15}$/.test(cleaned)) {
      setError("Acknowledgement Number must be exactly 15 digits.");
      return;
    }

    setError(null);
    setFoundReturn({
      ...MOCK_ORIGINAL_RETURN,
      acknowledgementNumber: cleaned,
      assessmentYear,
    });
  };

  const handleContinue = () => {
    if (!foundReturn) {
      handleFindReturn();
      return;
    }

    // Navigate to Screen 2: Reason for Revision
    router.push({
      pathname: "/service/revised-itr-reason" as any,
      params: {
        acknowledgementNumber: foundReturn.acknowledgementNumber,
        assessmentYear: foundReturn.assessmentYear,
      },
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Header */}
      <RevisedItrHeader subtitle="Find Original Return" />

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
          <Text style={styles.pageTitle}>Let’s find your original return</Text>
          <Text style={styles.pageSubtitle}>
            The Income Tax Department requires a revision to be linked to the
            exact original filing.
          </Text>
        </View>

        {/* Input: Acknowledgement Number */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            Original ITR Acknowledgement Number <Text style={styles.requiredStar}>*</Text>
          </Text>
          <TextInput
            style={[styles.textInput, error ? styles.inputError : null]}
            placeholder="Enter 15-digit acknowledgement number"
            placeholderTextColor="#94A3B8"
            keyboardType="number-pad"
            maxLength={15}
            value={ackNumber}
            onChangeText={(val) => {
              setAckNumber(val);
              if (error) setError(null);
            }}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        {/* Input: Assessment Year Dropdown */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            Assessment Year it was filed for <Text style={styles.requiredStar}>*</Text>
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowAyDropdown(!showAyDropdown)}
            style={styles.dropdownSelector}
          >
            <Text style={styles.dropdownValue}>{assessmentYear}</Text>
            <Ionicons
              name={showAyDropdown ? "chevron-up" : "chevron-down"}
              size={18}
              color="#64748B"
            />
          </TouchableOpacity>

          {showAyDropdown && (
            <View style={styles.dropdownMenu}>
              {ayOptions.map((opt) => (
                <TouchableOpacity
                  key={opt}
                  activeOpacity={0.7}
                  onPress={() => {
                    setAssessmentYear(opt);
                    setShowAyDropdown(false);
                  }}
                  style={styles.dropdownItem}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      assessmentYear === opt ? styles.dropdownItemActive : null,
                    ]}
                  >
                    {opt}
                  </Text>
                  {assessmentYear === opt && (
                    <Ionicons name="checkmark" size={16} color="#F97316" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconCircle}>
            <Ionicons name="information" size={18} color="#FFFFFF" />
          </View>
          <Text style={styles.infoText}>
            You can find the acknowledgement number in your previously filed ITR
            acknowledgement.
          </Text>
        </View>

        {/* Return Summary Card if Found */}
        {foundReturn && <ReturnSummaryCard details={foundReturn} />}
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
          onPress={foundReturn ? handleContinue : handleFindReturn}
          style={styles.ctaButton}
        >
          <Text style={styles.ctaButtonText}>
            {foundReturn ? "Continue" : "Find My Return"}
          </Text>
          {foundReturn && (
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          )}
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
    marginBottom: 18,
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
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0B1F3A",
    marginBottom: 6,
  },
  requiredStar: {
    color: "#DC2626",
  },
  textInput: {
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#0B1F3A",
    fontWeight: "600",
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
  dropdownSelector: {
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownValue: {
    fontSize: 14,
    color: "#0B1F3A",
    fontWeight: "600",
  },
  dropdownMenu: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginTop: 6,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      default: {},
    }),
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  dropdownItemText: {
    fontSize: 13.5,
    color: "#0B1F3A",
    fontWeight: "500",
  },
  dropdownItemActive: {
    color: "#F97316",
    fontWeight: "700",
  },
  infoCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 8,
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
  ctaButton: {
    height: 52,
    borderRadius: 16,
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
  ctaButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});

export default FindOriginalReturnScreen;
