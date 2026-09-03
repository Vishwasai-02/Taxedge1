import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TaxNoticeSummaryData } from "../../types/taxNotice.types";

interface NoticeMetadataCardProps {
  summary: TaxNoticeSummaryData;
}

export const NoticeMetadataCard: React.FC<NoticeMetadataCardProps> = ({ summary }) => {
  return (
    <View style={styles.card}>
      {/* Row 1: Notice Type */}
      <View style={styles.row}>
        <View style={styles.labelCol}>
          <Ionicons name="document-text-outline" size={18} color="#64748B" />
          <Text style={styles.labelText}>Notice Type</Text>
        </View>
        <Text style={styles.valueText}>{summary.noticeType}</Text>
      </View>

      <View style={styles.divider} />

      {/* Row 2: Section */}
      <View style={styles.row}>
        <View style={styles.labelCol}>
          <Ionicons name="time-outline" size={18} color="#64748B" />
          <Text style={styles.labelText}>Section</Text>
        </View>
        <Text style={styles.valueText}>{summary.section}</Text>
      </View>

      <View style={styles.divider} />

      {/* Row 3: Issued Date */}
      <View style={styles.row}>
        <View style={styles.labelCol}>
          <Ionicons name="calendar-outline" size={18} color="#64748B" />
          <Text style={styles.labelText}>Issued Date</Text>
        </View>
        <Text style={styles.valueText}>{summary.issuedDate}</Text>
      </View>

      <View style={styles.divider} />

      {/* Row 4: Response Due Date */}
      <View style={styles.row}>
        <View style={styles.labelCol}>
          <Ionicons name="calendar-outline" size={18} color="#64748B" />
          <Text style={styles.labelText}>Response{"\n"}Due Date</Text>
        </View>
        <View style={styles.rightAlignedGroup}>
          <Text style={styles.valueText}>{summary.responseDueDate}</Text>
          <Text style={styles.daysLeftText}>{summary.daysLeft} days left</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Row 5: Risk Level */}
      <View style={styles.row}>
        <View style={styles.labelCol}>
          <Ionicons name="warning-outline" size={18} color="#EA580C" />
          <Text style={styles.labelText}>Risk Level</Text>
        </View>
        <View style={styles.riskBadge}>
          <Text style={styles.riskBadgeText}>{summary.riskLevel}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
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
    paddingVertical: 9,
  },
  labelCol: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  labelText: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
  },
  valueText: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  rightAlignedGroup: {
    alignItems: "flex-end",
  },
  daysLeftText: {
    fontSize: 11.5,
    fontWeight: "700",
    color: "#EA580C",
    marginTop: 2,
  },
  riskBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 3.5,
    borderRadius: 8,
  },
  riskBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#16A34A",
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
  },
});
