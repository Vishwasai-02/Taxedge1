import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TDS_NEXT_STEPS } from "../../mock/statusData";

export const NextStepsTimeline: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Next Steps</Text>

      <View style={styles.timelineList}>
        {TDS_NEXT_STEPS.map((step, index) => {
          const isFirst = index === 0;
          const isSecond = index === 1;
          const isLast = index === TDS_NEXT_STEPS.length - 1;

          return (
            <View key={step.id} style={styles.timelineRow}>
              {/* Left Indicator Column */}
              <View style={styles.indicatorColumn}>
                {isFirst ? (
                  <View style={styles.completedNode}>
                    <Ionicons name="checkmark" size={13} color="#FFFFFF" />
                  </View>
                ) : (
                  <View
                    style={[
                      styles.numberNode,
                      isSecond ? styles.activeNumberNode : styles.upcomingNumberNode,
                    ]}
                  >
                    <Text
                      style={[
                        styles.numberNodeText,
                        isSecond ? styles.activeNumberText : styles.upcomingNumberText,
                      ]}
                    >
                      {step.id}
                    </Text>
                  </View>
                )}

                {/* Vertical Connector Line */}
                {!isLast && (
                  <View
                    style={[
                      styles.verticalLine,
                      isFirst ? styles.orangeLine : styles.greyLine,
                    ]}
                  />
                )}
              </View>

              {/* Right Content Card */}
              <View style={styles.contentColumn}>
                {isFirst ? (
                  <View style={styles.compactFirstStep}>
                    <View style={styles.firstStepNumberBadge}>
                      <Text style={styles.firstStepNumberText}>1</Text>
                    </View>
                    <View style={styles.firstStepTextGroup}>
                      <Text style={styles.firstStepTitle}>{step.title}</Text>
                      <Text style={styles.completedStatusText}>Completed</Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.bubbleCard}>
                    <Text style={styles.cardTitle}>{step.title}</Text>
                    <Text style={styles.cardStatus}>Upcoming</Text>
                    {step.description ? (
                      <Text style={styles.cardDescription}>
                        {step.description}
                      </Text>
                    ) : null}
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0B1F3A",
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  timelineList: {
    paddingLeft: 4,
  },
  timelineRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  indicatorColumn: {
    alignItems: "center",
    width: 32,
    marginRight: 10,
  },
  completedNode: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#EA580C",
    justifyContent: "center",
    alignItems: "center",
  },
  numberNode: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
  },
  activeNumberNode: {
    borderColor: "#EA580C",
    backgroundColor: "#FFFFFF",
  },
  upcomingNumberNode: {
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
  },
  numberNodeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  activeNumberText: {
    color: "#EA580C",
  },
  upcomingNumberText: {
    color: "#64748B",
  },
  verticalLine: {
    width: 2,
    height: 60,
    marginTop: 4,
  },
  orangeLine: {
    backgroundColor: "#EA580C",
  },
  greyLine: {
    backgroundColor: "#E2E8F0",
  },
  contentColumn: {
    flex: 1,
  },
  compactFirstStep: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
  },
  firstStepNumberBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  firstStepNumberText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2563EB",
  },
  firstStepTextGroup: {
    flex: 1,
  },
  firstStepTitle: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  completedStatusText: {
    fontSize: 11.5,
    fontWeight: "700",
    color: "#16A34A",
    marginTop: 1,
  },
  bubbleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 12,
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
  cardTitle: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  cardStatus: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 1.5,
    fontWeight: "500",
  },
  cardDescription: {
    fontSize: 11.5,
    color: "#475569",
    lineHeight: 16,
    marginTop: 4,
  },
});
