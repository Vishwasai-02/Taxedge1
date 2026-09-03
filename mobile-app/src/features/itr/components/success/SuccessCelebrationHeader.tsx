import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Rect, Path } from "react-native-svg";
import Ionicons from "@expo/vector-icons/Ionicons";

interface SuccessCelebrationHeaderProps {
  applicationId: string;
}

export const SuccessCelebrationHeader: React.FC<SuccessCelebrationHeaderProps> = ({
  applicationId,
}) => {
  return (
    <View style={styles.container}>
      {/* Confetti & Success Circle */}
      <View style={styles.badgeWrapper}>
        {/* Confetti Elements */}
        <Svg width={140} height={90} viewBox="0 0 140 90" style={styles.confettiSvg}>
          <Rect x={20} y={15} width={4} height={4} rx={1} fill="#F97316" transform="rotate(25, 20, 15)" />
          <Circle cx={35} cy={30} r={2} fill="#0B1F3A" />
          <Rect x={15} y={45} width={5} height={3} rx={1} fill="#16A34A" transform="rotate(-15, 15, 45)" />
          <Circle cx={30} cy={65} r={2.5} fill="#F97316" />

          <Rect x={115} y={15} width={4} height={4} rx={1} fill="#0B1F3A" transform="rotate(-30, 115, 15)" />
          <Circle cx={105} cy={32} r={2} fill="#16A34A" />
          <Rect x={120} y={45} width={5} height={3} rx={1} fill="#F97316" transform="rotate(20, 120, 45)" />
          <Circle cx={110} cy={65} r={2.5} fill="#0B1F3A" />
        </Svg>

        {/* Green Success Circle */}
        <View style={styles.successOuterCircle}>
          <View style={styles.successInnerCircle}>
            <Ionicons name="checkmark" size={32} color="#16A34A" />
          </View>
        </View>
      </View>

      {/* Main Title */}
      <Text style={styles.title}>Your application has been received!</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Your return has entered the ITR queue for a Tax Executive to pick up and verify.
      </Text>

      {/* Application ID Pill Card */}
      <View style={styles.idCard}>
        <Text style={styles.idLabel}>Application ID </Text>
        <Text style={styles.idValue}>{applicationId}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 6,
  },
  badgeWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: 90,
    width: 140,
    position: "relative",
  },
  confettiSvg: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  successOuterCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#E8F8EE",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#DCFCE7",
  },
  successInnerCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 21,
    fontWeight: "800",
    color: "#0B1F3A",
    textAlign: "center",
    letterSpacing: -0.3,
    marginTop: 12,
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 18,
    marginTop: 6,
    paddingHorizontal: 24,
    fontWeight: "400",
  },
  idCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#D1FAE5",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 7,
    marginTop: 14,
  },
  idLabel: {
    fontSize: 12.5,
    fontWeight: "600",
    color: "#0B1F3A",
  },
  idValue: {
    fontSize: 13,
    fontWeight: "800",
    color: "#16A34A",
    letterSpacing: 0.3,
  },
});
