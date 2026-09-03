import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { TdsHeroIllustration } from "./TdsHeroIllustration";

export const TdsHeroCard: React.FC = () => {
  return (
    <View style={styles.card}>
      <View style={styles.contentLeft}>
        <View style={styles.tagPill}>
          <Text style={styles.tagText}>Income Tax Services</Text>
        </View>

        <Text style={styles.title}>TDS Refund</Text>

        <Text style={styles.description}>
          Claim your excess TDS deducted by your employer, bank, or other deductors.
          Our tax experts will prepare and file your refund request to maximize
          the eligible refund.
        </Text>
      </View>

      <View style={styles.illustrationWrapper}>
        <TdsHeroIllustration />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0B1F3A",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
      default: {},
    }),
  },
  contentLeft: {
    flex: 1,
    paddingRight: 6,
  },
  tagPill: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  tagText: {
    color: "#CBD5E1",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  title: {
    fontSize: 23,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.4,
  },
  description: {
    fontSize: 11.5,
    color: "#CBD5E1",
    lineHeight: 16.5,
    marginTop: 6,
    fontWeight: "400",
  },
  illustrationWrapper: {
    width: 125,
    height: 125,
    justifyContent: "center",
    alignItems: "center",
  },
});
