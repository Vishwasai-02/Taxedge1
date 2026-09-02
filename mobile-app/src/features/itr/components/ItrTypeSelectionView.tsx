import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BrandColors, Shadows } from "../../../shared/theme";
import { INCOME_TYPES, IncomeTypeKey, IncomeTypeOption } from "../types/incomeTypes";
import { ItrCategoryHeader } from "./ItrCategoryHeader";
import { IncomeTypeGrid } from "./IncomeTypeGrid";

interface ItrTypeSelectionViewProps {
  onContinue: (selectedOption: IncomeTypeOption) => void;
  serviceTitle?: string;
  serviceDescription?: string;
  initialSelectedId?: IncomeTypeKey;
  buttonText?: string;
}

export const ItrTypeSelectionView: React.FC<ItrTypeSelectionViewProps> = ({
  onContinue,
  serviceTitle = "ITR Filing",
  serviceDescription = "File your Income Tax Return. Safe, accurate, and optimized for maximum refunds.",
  initialSelectedId = "salaried",
  buttonText = "Start Application",
}) => {
  const insets = useSafeAreaInsets();
  const [selectedId, setSelectedId] = useState<IncomeTypeKey | null>(initialSelectedId);

  const handleSelect = (item: IncomeTypeOption) => {
    setSelectedId(item.id);
  };

  const handleContinuePress = () => {
    const selectedOption =
      INCOME_TYPES.find((opt) => opt.id === selectedId) || INCOME_TYPES[0];
    onContinue(selectedOption);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Hero Card */}
        <ItrCategoryHeader
          title={serviceTitle}
          categoryTag="ITR CATEGORY"
          description={serviceDescription}
        />



        {/* 2-Column Responsive Grid */}
        <IncomeTypeGrid
          selectedId={selectedId}
          onSelect={handleSelect}
        />
      </ScrollView>

      {/* Sticky Bottom Full-Width Continue / Start Application Button */}
      <View
        style={[
          styles.bottomButtonContainer,
          { paddingBottom: Math.max(insets.bottom, 14) },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleContinuePress}
          style={styles.continueButton}
        >
          <Text style={styles.continueButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.BACKGROUND,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
  },
  sectionHeader: {
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: BrandColors.PRIMARY_BLUE,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: BrandColors.TEXT_SECONDARY,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  bottomButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingHorizontal: 16,
    paddingTop: 12,
    ...Shadows.md,
  },
  continueButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    justifyContent: "center",
    alignItems: "center",
    ...Shadows.sm,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
    letterSpacing: 0.2,
  },
});
