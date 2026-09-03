import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Rect } from "react-native-svg";
import Ionicons from "@expo/vector-icons/Ionicons";

interface PreviousYearSuccessCardProps {
  applicationId: string;
}

export const PreviousYearSuccessCard: React.FC<PreviousYearSuccessCardProps> = ({
  applicationId,
}) => {
  return (
    <View style={styles.card}>
      {/* Celebration & Confetti */}
      <View style={styles.celebrationWrapper}>
        <Svg width={120} height={70} viewBox="0 0 120 70" style={styles.confettiSvg}>
          <Rect x={15} y={10} width={4} height={4} rx={1} fill="#F97316" transform="rotate(25, 15, 10)" />
          <Circle cx={28} cy={22} r={2} fill="#0B1F3A" />
          <Rect x={10} y={40} width={5} height={3} rx={1} fill="#16A34A" transform="rotate(-15, 10, 40)" />
          <Circle cx={24} cy={55} r={2} fill="#F97316" />

          <Rect x={100} y={10} width={4} height={4} rx={1} fill="#0B1F3A" transform="rotate(-30, 100, 10)" />
          <Circle cx={92} cy={24} r={2} fill="#16A34A" />
          <Rect x={105} y={40} width={5} height={3} rx={1} fill="#F97316" transform="rotate(20, 105, 40)" />
          <Circle cx={96} cy={55} r={2} fill="#0B1F3A" />
        </Svg>

        <View style={styles.outerCircle}>
          <Ionicons name="checkmark" size={30} color="#FFFFFF" />
        </View>
      </View>

      {/* Headings */}
      <Text style={styles.title}>Your application has been received!</Text>
      <Text style={styles.subtitle}>
        Your Previous Year ITR request has been successfully submitted and
        assigned to a Tax Executive for verification and filing.
      </Text>

      {/* Application ID Pill Badge */}
      <View style={styles.idCard}>
        <Text style={styles.idLabel}>Application ID </Text>
        <Text style={styles.idValue}>{applicationId}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F0FDF4",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DCFCE7",
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    marginTop: 14,
    marginBottom: 14,
  },
  celebrationWrapper: {
    width: 120,
    height: 68,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  confettiSvg: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  outerCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#16A34A",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 19,
    fontWeight: "800",
    color: "#0B1F3A",
    textAlign: "center",
    marginTop: 10,
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 16.5,
    marginTop: 4,
    paddingHorizontal: 6,
    fontWeight: "400",
  },
  idCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1FAE5",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
    marginTop: 14,
  },
  idLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0B1F3A",
  },
  idValue: {
    fontSize: 13,
    fontWeight: "800",
    color: "#16A34A",
    letterSpacing: 0.2,
  },
});
