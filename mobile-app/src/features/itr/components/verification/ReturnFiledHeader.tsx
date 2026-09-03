import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Rect } from "react-native-svg";
import Ionicons from "@expo/vector-icons/Ionicons";

export const ReturnFiledHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Left Celebration Badge with Confetti */}
      <View style={styles.badgeWrapper}>
        <Svg width={90} height={90} viewBox="0 0 90 90" style={styles.confettiSvg}>
          <Rect x={10} y={15} width={4} height={4} rx={1} fill="#F97316" transform="rotate(25, 10, 15)" />
          <Circle cx={22} cy={28} r={2} fill="#0B1F3A" />
          <Rect x={8} y={55} width={4} height={3} rx={1} fill="#16A34A" transform="rotate(-15, 8, 55)" />
          <Circle cx={20} cy={72} r={2} fill="#F97316" />

          <Rect x={76} y={15} width={4} height={4} rx={1} fill="#0B1F3A" transform="rotate(-30, 76, 15)" />
          <Circle cx={68} cy={28} r={2} fill="#16A34A" />
          <Rect x={78} y={55} width={4} height={3} rx={1} fill="#F97316" transform="rotate(20, 78, 55)" />
          <Circle cx={70} cy={72} r={2} fill="#0B1F3A" />
        </Svg>

        <View style={styles.outerCircle}>
          <View style={styles.innerCircle}>
            <Ionicons name="checkmark" size={26} color="#FFFFFF" />
          </View>
        </View>
      </View>

      {/* Right Text Details */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Your ITR has been filed!</Text>
        <Text style={styles.description}>
          Please e-verify to complete the process. A return that is never e-verified is treated as not filed at all.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 10,
  },
  badgeWrapper: {
    width: 86,
    height: 86,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginRight: 10,
  },
  confettiSvg: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  outerCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#BBF7D0",
  },
  innerCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#16A34A",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0B1F3A",
    letterSpacing: -0.2,
  },
  description: {
    fontSize: 12,
    color: "#64748B",
    lineHeight: 17,
    marginTop: 4,
    fontWeight: "400",
  },
});
