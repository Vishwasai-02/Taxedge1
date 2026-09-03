import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../../../shared/theme";

interface GstCancellationConfirmModalProps {
  visible: boolean;
  gstin: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const GstCancellationConfirmModal: React.FC<GstCancellationConfirmModalProps> = ({
  visible,
  gstin,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Warning Icon Box */}
          <View style={styles.iconCircle}>
            <Ionicons name="warning-outline" size={32} color={BrandColors.PRIMARY_ORANGE} />
          </View>

          {/* Heading */}
          <Text style={styles.title}>Confirm GST Cancellation Request</Text>

          {/* Body Text */}
          <Text style={styles.bodyText}>
            You are about to submit a request to cancel GSTIN{" "}
            <Text style={styles.boldText}>{gstin}</Text>.
          </Text>

          <Text style={styles.warningSubText}>This action cannot be undone.</Text>
          <Text style={styles.bodyText}>Are you sure you want to proceed?</Text>

          {/* Action Buttons Stack */}
          <View style={styles.btnStack}>
            <TouchableOpacity
              style={styles.cancelBtn}
              activeOpacity={0.8}
              onPress={onCancel}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmBtn}
              activeOpacity={0.85}
              onPress={onConfirm}
            >
              <Text style={styles.confirmBtnText}>Confirm Cancellation Request</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 24,
    alignItems: "center",
    width: "100%",
    maxWidth: 340,
    gap: 8,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FEF0E6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: "800",
    color: BrandColors.TEXT_PRIMARY,
    textAlign: "center",
    marginBottom: 4,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  bodyText: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 18,
  },
  boldText: {
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
  },
  warningSubText: {
    fontSize: 12.5,
    fontWeight: "600",
    color: "#D97706",
    textAlign: "center",
    marginVertical: 2,
  },
  btnStack: {
    width: "100%",
    gap: 10,
    marginTop: 14,
  },
  cancelBtn: {
    width: "100%",
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#64748B",
  },
  confirmBtn: {
    width: "100%",
    height: 48,
    borderRadius: 24,
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: BrandColors.PRIMARY_ORANGE,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  confirmBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
