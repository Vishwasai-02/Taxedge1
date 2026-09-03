import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Rect, Path } from "react-native-svg";
import Ionicons from "@expo/vector-icons/Ionicons";

interface VerifiedSplashScreenProps {
  acknowledgementNumber?: string;
  onDone?: () => void;
}

export const VerifiedSplashScreen: React.FC<VerifiedSplashScreenProps> = ({
  acknowledgementNumber = "284419260902411",
  onDone,
}) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleFinish = () => {
    if (onDone) {
      onDone();
    } else {
      router.replace("/(main)/home" as any);
    }
  };

  const handleTaxServices = () => {
    router.replace("/service/itr" as any);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + 20 }]}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1F3A" />

      {/* Confetti & Glowing Animated Checkmark */}
      <View style={styles.centerSection}>
        <View style={styles.celebrationContainer}>
          <Svg width={220} height={160} viewBox="0 0 220 160" style={styles.confettiSvg}>
            <Rect x={30} y={20} width={6} height={6} rx={1.5} fill="#F97316" transform="rotate(35, 30, 20)" />
            <Circle cx={60} cy={45} r={3} fill="#FED7AA" />
            <Rect x={20} y={90} width={7} height={4} rx={1.5} fill="#F97316" transform="rotate(-25, 20, 90)" />
            <Circle cx={50} cy={130} r={3.5} fill="#FFFFFF" />

            <Rect x={180} y={20} width={6} height={6} rx={1.5} fill="#FED7AA" transform="rotate(-35, 180, 20)" />
            <Circle cx={160} cy={45} r={3} fill="#F97316" />
            <Rect x={190} y={90} width={7} height={4} rx={1.5} fill="#FFFFFF" transform="rotate(25, 190, 90)" />
            <Circle cx={170} cy={130} r={3.5} fill="#F97316" />
          </Svg>

          {/* Glowing Orange Outer Circles */}
          <View style={styles.pulseOuterCircle}>
            <View style={styles.pulseMiddleCircle}>
              <View style={styles.orangeCoreCircle}>
                <Ionicons name="checkmark-done" size={44} color="#0B1F3A" />
              </View>
            </View>
          </View>
        </View>

        {/* Orange Heading */}
        <Text style={styles.verifiedHeading}>E-VERIFIED SUCCESSFULLY</Text>

        {/* Subtitle */}
        <Text style={styles.verifiedSub}>
          Your Income Tax Return for AY 2026-27 is 100% verified & acknowledged by the Income Tax Department.
        </Text>

        {/* Verification Metadata Card */}
        <View style={styles.metadataCard}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Acknowledgement No</Text>
            <Text style={styles.metaValue}>{acknowledgementNumber}</Text>
          </View>

          <View style={styles.metaDivider} />

          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Verification Mode</Text>
            <Text style={styles.metaValue}>Aadhaar OTP (EVC)</Text>
          </View>

          <View style={styles.metaDivider} />

          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Status</Text>
            <View style={styles.statusPill}>
              <Ionicons name="checkmark-circle" size={14} color="#16A34A" />
              <Text style={styles.statusText}>Successfully E-Verified</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Bottom CTA Buttons */}
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleFinish}
          style={styles.primaryOrangeButton}
        >
          <Text style={styles.primaryButtonText}>Go to Home Dashboard</Text>
          <Ionicons name="arrow-forward" size={18} color="#0B1F3A" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleTaxServices}
          style={styles.secondaryNavyButton}
        >
          <Text style={styles.secondaryButtonText}>Back to Tax Services</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1F3A",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  centerSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  celebrationContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 160,
    width: 220,
    position: "relative",
    marginBottom: 10,
  },
  confettiSvg: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  pulseOuterCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(249, 115, 22, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  pulseMiddleCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(249, 115, 22, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  orangeCoreCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#F97316",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#F97316",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
      default: {},
    }),
  },
  verifiedHeading: {
    fontSize: 22,
    fontWeight: "900",
    color: "#F97316",
    letterSpacing: 0.5,
    textAlign: "center",
    marginTop: 10,
  },
  verifiedSub: {
    fontSize: 13,
    color: "#CBD5E1",
    textAlign: "center",
    lineHeight: 18,
    marginTop: 8,
    paddingHorizontal: 16,
    fontWeight: "400",
  },
  metadataCard: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    marginTop: 24,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  metaDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    marginVertical: 4,
  },
  metaLabel: {
    fontSize: 12.5,
    color: "#94A3B8",
    fontWeight: "500",
  },
  metaValue: {
    fontSize: 13,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(22, 163, 74, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11.5,
    color: "#4ADE80",
    fontWeight: "700",
  },
  bottomButtonsContainer: {
    width: "100%",
    gap: 10,
  },
  primaryOrangeButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: "#F97316",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#F97316",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
      default: {},
    }),
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0B1F3A",
    letterSpacing: 0.2,
  },
  secondaryNavyButton: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 14.5,
    fontWeight: "700",
    color: "#CBD5E1",
  },
});
