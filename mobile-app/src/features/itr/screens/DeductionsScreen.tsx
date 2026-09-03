import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TaxDeductionsCard } from "../components/deductions/TaxDeductionsCard";
import { AdditionalInformationCard } from "../components/deductions/AdditionalInformationCard";
import {
  DeductionsFormData,
  DeductionsFormErrors,
  PreviousFilingOption,
} from "../types/deductions.types";

interface DeductionsScreenProps {
  onContinue?: (data: DeductionsFormData) => void;
}

export const DeductionsScreen: React.FC<DeductionsScreenProps> = ({
  onContinue,
}) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    professionId?: string;
    professionTitle?: string;
    panNumber?: string;
    aadhaarNumber?: string;
    assessmentYear?: string;
    incomeAmount?: string;
    serviceType?: string;
    serviceTitle?: string;
  }>();

  const serviceTitle = params.serviceTitle || "ITR Filing";
  const assessmentYearParam = params.assessmentYear;

  const [formData, setFormData] = useState<DeductionsFormData>({
    sec80c: "",
    sec80d: "",
    homeLoan24b: "",
    educationLoan80e: "",
    otherDeductions: "",
    previousFilingOption: "previous_itr",
  });

  const [errors, setErrors] = useState<DeductionsFormErrors>({});

  const handleFormChange = (updated: Partial<DeductionsFormData>) => {
    setFormData((prev) => ({ ...prev, ...updated }));
    // Clear error for field
    if (updated.sec80c !== undefined) {
      setErrors((prev) => ({ ...prev, sec80c: undefined }));
    }
    if (updated.sec80d !== undefined) {
      setErrors((prev) => ({ ...prev, sec80d: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: DeductionsFormErrors = {};

    // Validate 80C: Mandatory, max 150000
    if (!formData.sec80c.trim()) {
      newErrors.sec80c = "This field is required.";
    } else {
      const val80c = Number(formData.sec80c);
      if (isNaN(val80c) || val80c < 0) {
        newErrors.sec80c = "Enter a valid amount.";
      } else if (val80c > 150000) {
        newErrors.sec80c = "80C deduction cannot exceed ₹1,50,000.";
      }
    }

    // Validate 80D: Mandatory
    if (!formData.sec80d.trim()) {
      newErrors.sec80d = "This field is required.";
    } else {
      const val80d = Number(formData.sec80d);
      if (isNaN(val80d) || val80d < 0) {
        newErrors.sec80d = "Enter a valid amount.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    const isValid = validateForm();
    if (!isValid) return;

    if (onContinue) {
      onContinue(formData);
    } else {
      // Continue to Step 4 of the workflow
      router.push({
        pathname: "/service/itr-documents" as any,
        params: {
          ...params,
          sec80c: formData.sec80c,
          sec80d: formData.sec80d,
          homeLoan24b: formData.homeLoan24b,
          educationLoan80e: formData.educationLoan80e,
          otherDeductions: formData.otherDeductions,
          previousFilingOption: formData.previousFilingOption,
        },
      });
    }
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
          <Text style={styles.headerTitle}>{serviceTitle}</Text>
          <Text style={styles.headerSubtitle}>
            {assessmentYearParam ? `Deductions • ${assessmentYearParam}` : "Step 3 of 5"}
          </Text>
        </View>

        <View style={styles.headerRightSpacer} />
      </View>

      {/* Progress Bar (60%) */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarFill} />
      </View>

      {/* Main Scrollable Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 88 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Page Title & Subtitle */}
        <View style={styles.pageTitleContainer}>
          <Text style={styles.pageTitle}>
            Deductions & Additional Information
          </Text>
          <Text style={styles.pageSubtitle}>
            Enter your eligible deductions to calculate your taxable income accurately.
          </Text>
        </View>

        {/* Section 1: Tax Deductions */}
        <TaxDeductionsCard
          formData={formData}
          errors={errors}
          onChange={handleFormChange}
        />

        {/* Section 2: Additional Information */}
        <AdditionalInformationCard
          selectedOption={formData.previousFilingOption}
          onSelect={(opt) => handleFormChange({ previousFilingOption: opt })}
        />
      </ScrollView>

      {/* Sticky Bottom Action Button */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 14) },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleContinue}
          style={styles.continueButton}
        >
          <Text style={styles.continueButtonText}>
            Continue to Documents
          </Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
  },
  header: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: "#FFFFFF",
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
    fontWeight: "600",
    color: "#0B1F3A",
    marginTop: 2,
  },
  headerRightSpacer: {
    width: 38,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: "#E5E7EB",
    width: "100%",
  },
  progressBarFill: {
    height: "100%",
    width: "60%",
    backgroundColor: "#F97316",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  pageTitleContainer: {
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: "#0B1F3A",
    letterSpacing: -0.3,
  },
  pageSubtitle: {
    fontSize: 13.5,
    color: "#64748B",
    marginTop: 4,
    lineHeight: 19,
    fontWeight: "400",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
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
  continueButton: {
    height: 52,
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
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  buttonIcon: {
    marginLeft: 2,
  },
});

export default DeductionsScreen;
