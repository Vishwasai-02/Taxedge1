import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FilingVerificationData } from "../../types/verification.types";

interface FilingDetailsCardProps {
  data: FilingVerificationData;
}

export const FilingDetailsCard: React.FC<FilingDetailsCardProps> = ({ data }) => {
  const rows = [
    {
      id: "ack",
      icon: "ribbon-outline" as const,
      label: "Acknowledgement number",
      value: data.acknowledgementNumber,
      isHighlight: false,
    },
    {
      id: "filed",
      icon: "calendar-outline" as const,
      label: "Filed on",
      value: data.filedDate,
      isHighlight: false,
    },
    {
      id: "form",
      icon: "document-text-outline" as const,
      label: "Form",
      value: `${data.itrForm} • ${data.assessmentYear}`,
      isHighlight: false,
    },
    {
      id: "refund",
      icon: "cash-outline" as const,
      label: data.isRefund ? "Refund claimed" : "Tax paid",
      value: data.refundClaimed,
      isHighlight: true,
    },
  ];

  return (
    <View style={styles.card}>
      {rows.map((row, index) => {
        const isLast = index === rows.length - 1;

        return (
          <View
            key={row.id}
            style={[styles.row, !isLast && styles.rowBorder]}
          >
            <View style={styles.leftGroup}>
              <View style={styles.iconBox}>
                <Ionicons name={row.icon} size={18} color="#0B1F3A" />
              </View>
              <Text style={styles.label}>{row.label}</Text>
            </View>

            <Text
              style={[
                styles.value,
                row.isHighlight ? styles.highlightValue : styles.normalValue,
              ]}
            >
              {row.value}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 16,
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    borderStyle: "dashed",
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#F0F5FA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  label: {
    fontSize: 13.5,
    color: "#64748B",
    fontWeight: "500",
  },
  value: {
    fontSize: 14,
    fontWeight: "800",
  },
  normalValue: {
    color: "#0B1F3A",
  },
  highlightValue: {
    color: "#16A34A",
    fontSize: 15,
  },
});
