import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../../shared/theme";

interface GstSubmitStepProps {
  appId?: string;
}

export const GstSubmitStep: React.FC<GstSubmitStepProps> = ({
  appId = "APP-GST-89214",
}) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.successIconBox}>
        <Ionicons name="checkmark-circle" size={64} color="#059669" />
      </View>

      <Text style={styles.title}>Application Submitted!</Text>
      <Text style={styles.subtitle}>
        Your GST Registration request has been registered successfully with TaxEdge Fin Solutions.
      </Text>

      <View style={styles.refCard}>
        <Text style={styles.refLabel}>Application Reference Number</Text>
        <Text style={styles.refValue}>{appId}</Text>
        <Text style={styles.refSub}>Keep this reference ID for future status inquiries.</Text>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="time-outline" size={20} color="#0284C7" />
        <View style={styles.infoContent}>
          <Text style={styles.infoHeading}>Estimated Turnaround</Text>
          <Text style={styles.infoDesc}>
            Our certified CA will review your documents and submit to the GST Portal within 2-3 business days.
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.homeBtn}
        activeOpacity={0.8}
        onPress={() => router.replace("/service/gst")}
      >
        <Text style={styles.homeBtnText}>Return to GST Services</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    alignItems: "center",
  },
  successIconBox: {
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
    marginBottom: 6,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  subtitle: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  refCard: {
    width: "100%",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEF2F6",
    marginBottom: 16,
  },
  refLabel: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 4,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  refValue: {
    fontSize: 18,
    fontWeight: "800",
    color: BrandColors.PRIMARY_BLUE,
    letterSpacing: 0.5,
    marginBottom: 6,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  refSub: {
    fontSize: 11,
    color: "#94A3B8",
    textAlign: "center",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  infoCard: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#EFF6FF",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    gap: 12,
    marginBottom: 24,
  },
  infoContent: {
    flex: 1,
  },
  infoHeading: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E40AF",
    marginBottom: 2,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  infoDesc: {
    fontSize: 12,
    color: "#3B82F6",
    lineHeight: 16,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  homeBtn: {
    width: "100%",
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  homeBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
});
