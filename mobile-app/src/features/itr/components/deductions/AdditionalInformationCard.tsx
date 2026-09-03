import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PreviousFilingOption } from "../../types/deductions.types";
import { PreviousFilingOptionCard } from "./PreviousFilingOptionCard";

interface AdditionalInformationCardProps {
  selectedOption: PreviousFilingOption;
  onSelect: (option: PreviousFilingOption) => void;
}

export const AdditionalInformationCard: React.FC<AdditionalInformationCardProps> = ({
  selectedOption,
  onSelect,
}) => {
  return (
    <View style={styles.card}>
      {/* Card Header with Orange Document Icon */}
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Ionicons name="document-text" size={20} color="#F97316" />
        </View>
        <View style={styles.headerTextGroup}>
          <Text style={styles.cardTitle}>Additional Information</Text>
          <Text style={styles.cardSubtitle}>
            Select the option that applies to your tax filing.
          </Text>
        </View>
      </View>

      {/* Question */}
      <Text style={styles.questionText}>
        Do you have any previous ITR or Income Tax Notice?{" "}
        <Text style={styles.requiredStar}>*</Text>
      </Text>

      {/* 3 Option Cards */}
      <View style={styles.optionsList}>
        <PreviousFilingOptionCard
          id="previous_itr"
          title="Previous Year ITR Available"
          subtitle="We will use it to pre-verify your filing details."
          iconType="calendar"
          isSelected={selectedOption === "previous_itr"}
          onSelect={onSelect}
        />

        <PreviousFilingOptionCard
          id="tax_notice"
          title="Received Income Tax Notice"
          subtitle="Upload the notice later for expert review."
          iconType="notice"
          isSelected={selectedOption === "tax_notice"}
          onSelect={onSelect}
        />

        <PreviousFilingOptionCard
          id="none"
          title="No Previous ITR or Tax Notice"
          subtitle="Proceed with a fresh tax filing."
          iconType="fresh"
          isSelected={selectedOption === "none"}
          onSelect={onSelect}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
      default: {},
    }),
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  headerTextGroup: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  cardSubtitle: {
    fontSize: 11.5,
    color: "#64748B",
    marginTop: 2,
    fontWeight: "500",
  },
  questionText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0B1F3A",
    marginBottom: 12,
    marginTop: 4,
  },
  requiredStar: {
    color: "#DC2626",
    fontWeight: "700",
  },
  optionsList: {
    width: "100%",
  },
});
