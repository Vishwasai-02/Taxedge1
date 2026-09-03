import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AssessmentYearItem } from "../types/previousYear.types";
import { AssessmentYearCard } from "./AssessmentYearCard";

interface AssessmentYearSelectorProps {
  items: AssessmentYearItem[];
  selectedId: string;
  onSelectYear: (id: string) => void;
}

export const AssessmentYearSelector: React.FC<AssessmentYearSelectorProps> = ({
  items,
  selectedId,
  onSelectYear,
}) => {
  return (
    <View style={styles.container}>
      {/* Top Information Card */}
      <View style={styles.topInfoCard}>
        <View style={styles.calendarIconCircle}>
          <Ionicons name="calendar" size={24} color="#F97316" />
        </View>

        <View style={styles.topInfoTextGroup}>
          <Text style={styles.topInfoTitle}>Choose Assessment Year</Text>
          <Text style={styles.topInfoDescription}>
            Only assessment years that are eligible for filing are shown below.
          </Text>
        </View>
      </View>

      {/* Cards List */}
      <View style={styles.cardsList}>
        {items.map((item) => (
          <AssessmentYearCard
            key={item.id}
            item={item}
            isSelected={selectedId === item.id}
            onSelect={onSelectYear}
          />
        ))}
      </View>

      {/* Bottom Eligibility Information Card */}
      <View style={styles.noticeCard}>
        <View style={styles.noticeIconCircle}>
          <Ionicons name="information" size={20} color="#FFFFFF" />
        </View>

        <View style={styles.noticeTextGroup}>
          <Text style={styles.noticeTitle}>Eligibility Information</Text>
          <Text style={styles.noticeDescription}>
            Assessment years are displayed based on the current Income Tax
            Department filing rules. Closed years cannot be selected.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 14,
  },
  topInfoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
      },
      android: {
        elevation: 1,
      },
      default: {},
    }),
  },
  calendarIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  topInfoTextGroup: {
    flex: 1,
  },
  topInfoTitle: {
    fontSize: 15.5,
    fontWeight: "800",
    color: "#0B1F3A",
    letterSpacing: -0.2,
  },
  topInfoDescription: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 3,
    lineHeight: 16,
  },
  cardsList: {
    marginBottom: 4,
  },
  noticeCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  noticeIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
  },
  noticeTextGroup: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  noticeDescription: {
    fontSize: 11.5,
    color: "#475569",
    lineHeight: 16.5,
    marginTop: 3,
  },
});
