import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const RevisedRefundHeroCard: React.FC = () => {
  return (
    <View style={styles.card}>
      <View style={styles.iconCircle}>
        <Text style={styles.rupeeIcon}>₹</Text>
      </View>

      <View style={styles.textGroup}>
        <Text style={styles.label}>Revised refund due</Text>
        <Text style={styles.amount}>₹12,458</Text>
        <Text style={styles.subtitle}>Down from ₹18,346 on the original return</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F0FDF4",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#DCFCE7",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  rupeeIcon: {
    fontSize: 22,
    fontWeight: "800",
    color: "#16A34A",
  },
  textGroup: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#16A34A",
  },
  amount: {
    fontSize: 24,
    fontWeight: "900",
    color: "#0B1F3A",
    letterSpacing: -0.5,
    marginTop: 2,
  },
  subtitle: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
    fontWeight: "400",
  },
});
