import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Rect } from "react-native-svg";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ApplicationSuccessCardProps {
  applicationId: string;
}

export const ApplicationSuccessCard: React.FC<ApplicationSuccessCardProps> = ({
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
          <Ionicons name="checkmark" size={28} color="#FFFFFF" />
        </View>
      </View>

      {/* Headings */}
      <Text style={styles.title}>Your application has been received!</Text>
      <Text style={styles.subtitle}>
        Your claim has entered the TDS queue for a Tax Executive to verify and file.
      </Text>

      {/* Application ID Pill */}
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
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: "center",
    marginTop: 18,
    marginBottom: 12,
  },
  celebrationWrapper: {
    width: 120,
    height: 64,
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
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#16A34A",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0B1F3A",
    textAlign: "center",
    marginTop: 8,
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 16.5,
    marginTop: 4,
    paddingHorizontal: 12,
    fontWeight: "400",
  },
  idCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1FAE5",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginTop: 12,
  },
  idLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0B1F3A",
  },
  idValue: {
    fontSize: 12.5,
    fontWeight: "800",
    color: "#16A34A",
    letterSpacing: 0.2,
  },
});
