import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ReturnDetailsData } from "../../types/computation.types";

interface ReturnDetailsCardProps {
  details: ReturnDetailsData;
}

export const ReturnDetailsCard: React.FC<ReturnDetailsCardProps> = ({ details }) => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Ionicons name="person-outline" size={18} color="#0B1F3A" />
        </View>
        <Text style={styles.cardTitle}>Return Details</Text>
      </View>

      {/* 2-Column Content */}
      <View style={styles.twoColumnContainer}>
        {/* Left Column */}
        <View style={styles.column}>
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Application ID</Text>
            <Text style={styles.appIdValue}>{details.applicationId}</Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>ITR Form</Text>
            <Text style={styles.fieldValue}>{details.itrForm}</Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Assessment Year</Text>
            <Text style={styles.fieldValue}>{details.assessmentYear}</Text>
          </View>
        </View>

        {/* Right Column */}
        <View style={styles.column}>
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Income Type</Text>
            <Text style={styles.fieldValue}>{details.incomeType}</Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Status</Text>
            <Text style={styles.statusValue}>{details.status}</Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Prepared By</Text>
            <Text style={styles.fieldValue}>{details.preparedBy}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 14,
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
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
    marginBottom: 14,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#F0F5FA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  twoColumnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    gap: 12,
  },
  fieldGroup: {
    justifyContent: "center",
  },
  fieldLabel: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  appIdValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#16A34A",
  },
  statusValue: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#F97316",
  },
});
