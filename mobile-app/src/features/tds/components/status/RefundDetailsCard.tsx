import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TdsRefundStatusDetails } from "../../types/status.types";

interface RefundDetailsCardProps {
  details: TdsRefundStatusDetails;
}

export const RefundDetailsCard: React.FC<RefundDetailsCardProps> = ({ details }) => {
  const rows = [
    {
      id: "appId",
      label: "Application ID",
      value: details.applicationId,
      iconName: "id-card-outline" as const,
      isOrange: false,
    },
    {
      id: "filedOn",
      label: "Filed On",
      value: details.filedOn,
      iconName: "calendar-outline" as const,
      isOrange: false,
    },
    {
      id: "refund",
      label: "Estimated Refund",
      value: details.estimatedRefund,
      iconName: "cash-outline" as const,
      isOrange: true,
    },
    {
      id: "refundTo",
      label: "Refund To",
      value: details.refundToBank,
      iconName: "business-outline" as const,
      isOrange: false,
    },
    {
      id: "time",
      label: "Expected Processing Time",
      value: details.expectedProcessingTime,
      iconName: "time-outline" as const,
      isOrange: false,
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
                <Ionicons
                  name={row.iconName}
                  size={18}
                  color={row.isOrange ? "#F97316" : "#0B1F3A"}
                />
              </View>
              <Text style={styles.label}>{row.label}</Text>
            </View>

            <Text
              style={[
                styles.value,
                row.isOrange ? styles.orangeValue : styles.normalValue,
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
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 11,
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
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#F0F5FA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  label: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
  },
  value: {
    fontSize: 13.5,
    fontWeight: "800",
  },
  normalValue: {
    color: "#0B1F3A",
  },
  orangeValue: {
    color: "#F97316",
    fontSize: 15,
  },
});
