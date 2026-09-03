import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { NoticeStatusDetails } from "../../types/taxNotice.types";

interface NoticeFilingDetailsCardProps {
  details: NoticeStatusDetails;
}

export const NoticeFilingDetailsCard: React.FC<NoticeFilingDetailsCardProps> = ({
  details,
}) => {
  const rows = [
    { label: "Notice Number", value: details.noticeNumber },
    { label: "Section", value: details.section },
    { label: "Submitted On", value: details.submittedOn },
    { label: "Acknowledgement No", value: details.acknowledgementNo },
    { label: "Assigned Tax Executive", value: details.assignedTaxExecutive },
    {
      label: "Current Status",
      value: details.currentStatus,
      isBadge: true,
    },
  ];

  return (
    <View style={styles.card}>
      {rows.map((row, index) => {
        const isLast = index === rows.length - 1;

        return (
          <View key={row.label} style={[styles.row, !isLast && styles.rowBorder]}>
            <Text style={styles.label}>{row.label}</Text>

            {row.isBadge ? (
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>{row.value}</Text>
              </View>
            ) : (
              <Text style={styles.value}>{row.value}</Text>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 14,
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
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
    paddingVertical: 10,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  label: {
    fontSize: 12.5,
    color: "#64748B",
    fontWeight: "500",
  },
  value: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  statusBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 3.5,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 11.5,
    fontWeight: "700",
    color: "#16A34A",
  },
});
