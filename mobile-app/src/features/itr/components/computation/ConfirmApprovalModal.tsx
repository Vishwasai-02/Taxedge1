import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ConfirmApprovalModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ConfirmApprovalModal: React.FC<ConfirmApprovalModalProps> = ({
  visible,
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  const [agreed, setAgreed] = useState(false);

  const handleClose = () => {
    if (isLoading) return;
    setAgreed(false);
    onCancel();
  };

  const handleConfirmPress = () => {
    if (!agreed || isLoading) return;
    onConfirm();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.dialogCard}>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.iconCircle}>
                  <Ionicons name="checkmark-done-circle" size={24} color="#F97316" />
                </View>
                <Text style={styles.title}>Confirm Approval</Text>
              </View>

              {/* Message */}
              <Text style={styles.message}>
                I confirm that I have reviewed the tax computation and approve TaxEdge to file my Income Tax Return on my behalf.
              </Text>

              {/* Checkbox */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setAgreed(!agreed)}
                style={styles.checkboxRow}
              >
                <View
                  style={[
                    styles.checkbox,
                    agreed && styles.checkboxChecked,
                  ]}
                >
                  {agreed && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                </View>
                <Text style={styles.checkboxLabel}>
                  I agree and confirm the above.
                </Text>
              </TouchableOpacity>

              {/* Buttons */}
              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleClose}
                  disabled={isLoading}
                  style={styles.cancelButton}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={handleConfirmPress}
                  disabled={!agreed || isLoading}
                  style={[
                    styles.approveButton,
                    (!agreed || isLoading) && styles.approveButtonDisabled,
                  ]}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={styles.approveButtonText}>Approve & File</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(11, 31, 58, 0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  dialogCard: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
      default: {},
    }),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  message: {
    fontSize: 13,
    color: "#475569",
    lineHeight: 18,
    marginBottom: 16,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 18,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.8,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: "#F97316",
    borderColor: "#F97316",
  },
  checkboxLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0B1F3A",
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#64748B",
  },
  approveButton: {
    flex: 1.2,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#F97316",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#F97316",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      default: {},
    }),
  },
  approveButtonDisabled: {
    backgroundColor: "#FDBA74",
    opacity: 0.8,
  },
  approveButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
