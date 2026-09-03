import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TDS_REQUIRED_DOCUMENTS } from "../mock/tdsData";
import { TdsDocumentItem } from "../types/tds.types";

export const TdsDocumentsGrid: React.FC = () => {
  const renderIcon = (type: TdsDocumentItem["iconType"]) => {
    switch (type) {
      case "card":
        return <Ionicons name="card-outline" size={18} color="#0B1F3A" />;
      case "aadhaar":
        return <Ionicons name="finger-print-outline" size={18} color="#0B1F3A" />;
      case "form16":
        return <Ionicons name="document-text-outline" size={18} color="#0B1F3A" />;
      case "chart":
        return <Ionicons name="bar-chart-outline" size={18} color="#0B1F3A" />;
      case "document":
        return <Ionicons name="newspaper-outline" size={18} color="#0B1F3A" />;
      case "bank":
        return <Ionicons name="business-outline" size={18} color="#0B1F3A" />;
      case "salary":
        return <Ionicons name="receipt-outline" size={18} color="#0B1F3A" />;
      case "more":
        return <Ionicons name="add-circle-outline" size={20} color="#F97316" />;
      default:
        return <Ionicons name="document-outline" size={18} color="#0B1F3A" />;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Documents Required</Text>

      <View style={styles.grid}>
        {TDS_REQUIRED_DOCUMENTS.map((doc) => {
          if (doc.isMore) {
            return (
              <View key={doc.id} style={[styles.card, styles.moreCard]}>
                <View style={styles.moreIconWrapper}>
                  {renderIcon(doc.iconType)}
                </View>
                <Text style={styles.moreText}>More</Text>
              </View>
            );
          }

          return (
            <View key={doc.id} style={styles.card}>
              <View style={styles.iconBox}>
                {renderIcon(doc.iconType)}
              </View>
              <Text style={styles.docTitle} numberOfLines={2}>
                {doc.title}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0B1F3A",
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  card: {
    width: "48.3%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    minHeight: 56,
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.02,
        shadowRadius: 3,
      },
      android: {
        elevation: 1,
      },
      default: {},
    }),
  },
  moreCard: {
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FED7AA",
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
  moreIconWrapper: {
    marginRight: 8,
  },
  docTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0B1F3A",
    flex: 1,
    lineHeight: 15,
  },
  moreText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#F97316",
  },
});
