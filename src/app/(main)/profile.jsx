import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useTheme } from "../../hooks/use-theme";
import { useAuthStore } from "../../store/authStore";
import { AppHeader } from "../../components/AppHeader";
import { SecondaryButton } from "../../components/SecondaryButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const colors = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { customer, logout, setAvatar } = useAuthStore();
  const [pickingPhoto, setPickingPhoto] = useState(false);
  const [showKycModal, setShowKycModal] = useState(false);
  const [showPersonalModal, setShowPersonalModal] = useState(false);

  /* Profile photo: gallery or camera, stored on the customer record. */
  const pickFromLibrary = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert(
        "Permission needed",
        "Allow photo access to choose a profile picture.",
      );
      return;
    }
    setPickingPhoto(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      if (!result.canceled && result.assets?.[0]?.uri) {
        setAvatar(result.assets[0].uri);
      }
    } finally {
      setPickingPhoto(false);
    }
  };

  const takePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permission needed", "Allow camera access to take a photo.");
      return;
    }
    setPickingPhoto(true);
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      if (!result.canceled && result.assets?.[0]?.uri) {
        setAvatar(result.assets[0].uri);
      }
    } finally {
      setPickingPhoto(false);
    }
  };

  const handleChangePhoto = () => {
    const options = [
      { text: "Take Photo", onPress: takePhoto },
      { text: "Choose from Gallery", onPress: pickFromLibrary },
    ];
    if (customer?.avatarUri) {
      options.push({
        text: "Remove Photo",
        style: "destructive",
        onPress: () => setAvatar(null),
      });
    }
    options.push({ text: "Cancel", style: "cancel" });
    Alert.alert("Profile Photo", "Choose a picture for your profile", options);
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out of TaxEdge?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          logout();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  const handleHelpSupport = () => {
    Alert.alert(
      "Help & Support",
      "Need assistance? You can email us at support@taxedge.com or call our toll-free line at 1800-TAX-EDGE.\n\nOur executives are available Mon-Sat, 9AM - 6PM.",
      [{ text: "OK" }],
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="My Profile" showBack={false} />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Avatar Card */}
        <View
          style={[
            styles.profileCard,
            {
              backgroundColor: colors.backgroundElement,
              borderColor: colors.border,
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleChangePhoto}
            style={styles.avatarWrap}
          >
            <View
              style={[
                styles.avatarBg,
                {
                  backgroundColor: colors.orangeLight,
                  borderColor: colors.backgroundElement,
                },
              ]}
            >
              {customer?.avatarUri ? (
                <Image
                  source={{ uri: customer.avatarUri }}
                  style={styles.avatarImage}
                  resizeMode="cover"
                />
              ) : (
                <Text style={[styles.avatarText, { color: colors.orange }]}>
                  {customer?.name ? customer.name.charAt(0) : "C"}
                </Text>
              )}

              {pickingPhoto && (
                <View style={styles.avatarLoading}>
                  <ActivityIndicator size="small" color="#FFFFFF" />
                </View>
              )}
            </View>

            <View
              style={[
                styles.cameraBadge,
                {
                  backgroundColor: colors.primary,
                  borderColor: colors.backgroundElement,
                },
              ]}
            >
              <Ionicons name="camera" size={14} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
          <Text style={[styles.profileName, { color: colors.text }]}>
            {customer?.name || "Customer Profile"}
          </Text>
          <Text style={[styles.profileType, { color: colors.primary }]}>
            {customer?.customerType || "Client"}
          </Text>

          <View
            style={[styles.idBadge, { backgroundColor: colors.background }]}
          >
            <Text style={[styles.idLabel, { color: colors.textSecondary }]}>
              CUSTOMER ID:{" "}
            </Text>
            <Text style={[styles.idVal, { color: colors.text }]}>
              {customer?.customerId || "N/A"}
            </Text>
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.menuList}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowPersonalModal(true)}
            style={[
              styles.menuItem,
              {
                backgroundColor: colors.backgroundElement,
                borderColor: colors.border,
              },
            ]}
          >
            <Ionicons name="person-outline" size={20} color={colors.primary} />
            <Text style={[styles.menuText, { color: colors.text }]}>
              Personal Information
            </Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowKycModal(true)}
            style={[
              styles.menuItem,
              {
                backgroundColor: colors.backgroundElement,
                borderColor: colors.border,
              },
            ]}
          >
            <Ionicons
              name="shield-checkmark-outline"
              size={20}
              color={colors.primary}
            />
            <Text style={[styles.menuText, { color: colors.text }]}>
              KYC Details (PAN & Aadhaar)
            </Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/(main)/applications")}
            style={[
              styles.menuItem,
              {
                backgroundColor: colors.backgroundElement,
                borderColor: colors.border,
              },
            ]}
          >
            <Ionicons
              name="folder-open-outline"
              size={20}
              color={colors.primary}
            />
            <Text style={[styles.menuText, { color: colors.text }]}>
              My Applications
            </Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/(main)/payments")}
            style={[
              styles.menuItem,
              {
                backgroundColor: colors.backgroundElement,
                borderColor: colors.border,
              },
            ]}
          >
            <Ionicons name="card-outline" size={20} color={colors.primary} />
            <Text style={[styles.menuText, { color: colors.text }]}>
              Payment History
            </Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleHelpSupport}
            style={[
              styles.menuItem,
              {
                backgroundColor: colors.backgroundElement,
                borderColor: colors.border,
              },
            ]}
          >
            <Ionicons
              name="help-circle-outline"
              size={20}
              color={colors.primary}
            />
            <Text style={[styles.menuText, { color: colors.text }]}>
              Help & Support
            </Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleLogout}
          style={[styles.logoutBtn, { borderColor: colors.error }]}
        >
          <Ionicons name="log-out-outline" size={20} color={colors.error} />
          <Text style={[styles.logoutText, { color: colors.error }]}>
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Personal Info Modal */}
      <Modal
        visible={showPersonalModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPersonalModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: colors.backgroundElement },
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Personal Information
            </Text>

            <View style={styles.modalBody}>
              <View style={styles.infoRow}>
                <Text style={[styles.infoKey, { color: colors.textSecondary }]}>
                  Full Name
                </Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {customer?.name}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoKey, { color: colors.textSecondary }]}>
                  Phone Number
                </Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  +91 {customer?.mobile}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoKey, { color: colors.textSecondary }]}>
                  Email Address
                </Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {customer?.email}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoKey, { color: colors.textSecondary }]}>
                  Date of Birth
                </Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {customer?.dob}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoKey, { color: colors.textSecondary }]}>
                  Address
                </Text>
                <Text
                  style={[styles.infoValue, { color: colors.text }]}
                  numberOfLines={3}
                >
                  {customer?.address}
                </Text>
              </View>
            </View>

            <SecondaryButton
              title="Close"
              onPress={() => setShowPersonalModal(false)}
            />
          </View>
        </View>
      </Modal>

      {/* KYC Modal */}
      <Modal
        visible={showKycModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowKycModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: colors.backgroundElement },
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              KYC Details Verification
            </Text>

            <View style={styles.modalBody}>
              <View style={styles.infoRow}>
                <Text style={[styles.infoKey, { color: colors.textSecondary }]}>
                  PAN Number
                </Text>
                <Text
                  style={[
                    styles.infoValue,
                    { color: colors.text, fontWeight: "700" },
                  ]}
                >
                  {customer?.pan
                    ? `${customer.pan.substring(0, 5)}****${customer.pan.substring(9)}`
                    : "N/A"}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoKey, { color: colors.textSecondary }]}>
                  Aadhaar Number
                </Text>
                <Text
                  style={[
                    styles.infoValue,
                    { color: colors.text, fontWeight: "700" },
                  ]}
                >
                  {customer?.aadhaar
                    ? `**** **** ${customer.aadhaar.substring(8)}`
                    : "N/A"}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoKey, { color: colors.textSecondary }]}>
                  Verification Status
                </Text>
                <View style={styles.statusLabelContainer}>
                  <Ionicons
                    name="checkmark-circle"
                    size={16}
                    color={colors.success}
                  />
                  <Text
                    style={[styles.statusLabelText, { color: colors.success }]}
                  >
                    VERIFIED ✓
                  </Text>
                </View>
              </View>
            </View>

            <SecondaryButton
              title="Close"
              onPress={() => setShowKycModal(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  profileCard: {
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarWrap: {
    marginBottom: 12,
  },
  avatarBg: {
    width: 84,
    height: 84,
    borderRadius: 42,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 3,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarLoading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraBadge: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2.5,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "800",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "700",
  },
  profileType: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    marginTop: 4,
  },
  idBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 16,
  },
  idLabel: {
    fontSize: 10,
    fontWeight: "700",
  },
  idVal: {
    fontSize: 11,
    fontWeight: "700",
  },
  menuList: {
    gap: 12,
  },
  menuItem: {
    height: 54,
    borderRadius: 12,
    borderWidth: 1.5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  menuText: {
    flex: 1,
    marginLeft: 14,
    fontSize: 14,
    fontWeight: "600",
  },
  logoutBtn: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 320,
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  modalBody: {
    gap: 12,
  },
  infoRow: {
    flexDirection: "column",
    gap: 4,
  },
  infoKey: {
    fontSize: 12,
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  statusLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  statusLabelText: {
    fontSize: 12,
    fontWeight: "800",
  },
});
