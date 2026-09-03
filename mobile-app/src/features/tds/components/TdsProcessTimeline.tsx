import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TDS_PROCESS_STEPS } from "../mock/tdsData";

export const TdsProcessTimeline: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>How it works</Text>

      <View style={styles.timelineRow}>
        {TDS_PROCESS_STEPS.map((step, index) => {
          const isLast = index === TDS_PROCESS_STEPS.length - 1;

          return (
            <React.Fragment key={step.id}>
              <View style={styles.stepNode}>
                {/* Number Badge */}
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{step.id}</Text>
                </View>

                {/* Circle Icon Container */}
                <View style={styles.circle}>
                  <Ionicons name={step.iconName} size={20} color="#0B1F3A" />
                </View>

                {/* Label */}
                <Text style={styles.stepLabel}>{step.label}</Text>
              </View>

              {/* Orange Dashed Connector */}
              {!isLast && <View style={styles.connector} />}
            </React.Fragment>
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
    marginBottom: 16,
    letterSpacing: -0.2,
  },
  timelineRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  stepNode: {
    alignItems: "center",
    width: 60,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -6,
    zIndex: 2,
    width: 17,
    height: 17,
    borderRadius: 8.5,
    backgroundColor: "#F97316",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  badgeText: {
    fontSize: 9.5,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  circle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      default: {},
    }),
  },
  stepLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#0B1F3A",
    textAlign: "center",
    lineHeight: 13,
  },
  connector: {
    flex: 1,
    height: 1,
    borderWidth: 0.8,
    borderColor: "#F97316",
    borderStyle: "dashed",
    marginTop: 22,
    marginHorizontal: -4,
  },
});
