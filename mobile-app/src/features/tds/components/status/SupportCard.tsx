import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

interface SupportCardProps {
  onContactExecutive?: () => void;
  onContactSupport?: () => void;
}

export const SupportCard: React.FC<SupportCardProps> = ({
  onContactExecutive,
  onContactSupport,
}) => {
  const router = useRouter();

  const handleExecutive = () => {
    if (onContactExecutive) {
      onContactExecutive();
    } else {
      router.push("/chat/support" as any);
    }
  };

  const handleSupport = () => {
    if (onContactSupport) {
      onContactSupport();
    } else {
      router.push("/chat/support" as any);
    }
  };

  return (
    <View style={styles.card}>
      {/* Left Info */}
      <View style={styles.leftGroup}>
        <View style={styles.iconCircle}>
          <Ionicons name="headset-outline" size={20} color="#0B1F3A" />
        </View>

        <View style={styles.textGroup}>
          <Text style={styles.title}>Need Help?</Text>
          <Text style={styles.subtitle}>
            Contact your assigned Tax Executive or reach our support team for assistance.
          </Text>
        </View>
      </View>

      {/* Right Buttons */}
      <View style={styles.buttonsColumn}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleExecutive}
          style={styles.executiveButton}
        >
          <Ionicons name="person-outline" size={14} color="#FFFFFF" />
          <Text style={styles.executiveText}>Contact Executive</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleSupport}
          style={styles.supportButton}
        >
          <Ionicons name="headset-outline" size={14} color="#F97316" />
          <Text style={styles.supportText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
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
  leftGroup: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
    marginRight: 8,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F0F5FA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginTop: 2,
  },
  textGroup: {
    flex: 1,
  },
  title: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  subtitle: {
    fontSize: 10.5,
    color: "#64748B",
    marginTop: 2,
    lineHeight: 14,
  },
  buttonsColumn: {
    gap: 6,
  },
  executiveButton: {
    height: 32,
    backgroundColor: "#F97316",
    borderRadius: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  executiveText: {
    color: "#FFFFFF",
    fontSize: 11.5,
    fontWeight: "700",
  },
  supportButton: {
    height: 32,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.2,
    borderColor: "#F97316",
    borderRadius: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  supportText: {
    color: "#F97316",
    fontSize: 11.5,
    fontWeight: "700",
  },
});
