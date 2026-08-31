import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../../hooks/use-theme";
import { useAuthStore } from "../../store/authStore";
import { FormInput } from "../../components/FormInput";
import { PrimaryButton } from "../../components/PrimaryButton";
import Ionicons from "@expo/vector-icons/Ionicons";

const CUSTOMER_TYPES = [
  "Individual",
  "Salaried Professional",
  "Business Owner",
  "Proprietorship",
  "Partnership Firm",
  "LLP (Limited Liability Partnership)",
  "Private Limited Company",
  "Freelancer / Consultant",
];

export default function RegisterScreen() {
  const colors = useTheme();
  const router = useRouter();
  const register = useAuthStore((state) => state.register);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [pan, setPan] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [address, setAddress] = useState("");
  const [customerType, setCustomerType] = useState("");

  // UI state
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Full name is required";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Valid email is required";
    if (!dob.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(dob))
      newErrors.dob = "DOB required (YYYY-MM-DD)";
    // Simple PAN validation
    const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
    if (!pan.trim()) {
      newErrors.pan = "PAN is required";
    } else if (!panRegex.test(pan.toUpperCase())) {
      newErrors.pan = "Invalid PAN format (e.g. ABCDE1234F)";
    }

    if (!aadhaar.trim() || aadhaar.replace(/\s/g, "").length !== 12) {
      newErrors.aadhaar = "Aadhaar requires 12 digits";
    }

    if (!address.trim()) newErrors.address = "Address is required";
    if (!customerType) newErrors.customerType = "Please select a customer type";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (!validateForm()) {
      Alert.alert(
        "Incomplete Fields",
        "Please correct the highlighted issues.",
      );
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      register({
        name,
        email,
        dob,
        pan: pan.toUpperCase(),
        aadhaar: aadhaar.replace(/\s/g, ""),
        address,
        customerType,
      });
      const newCust = useAuthStore.getState().customer;
      Alert.alert(
        "Registration Successful",
        `Customer ID created: ${newCust?.customerId}`,
      );
      router.replace("/(main)/home");
    }, 1200);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: colors.text }]}>
            Personal Profile
          </Text>
          <Text style={[styles.subTitle, { color: colors.textSecondary }]}>
            Complete your registration to unlock GST, ITR, Loans, & Insurance
            services.
          </Text>
        </View>

        <View
          style={[
            styles.formCard,
            {
              backgroundColor: colors.backgroundElement,
              borderColor: colors.border,
            },
          ]}
        >
          <FormInput
            label="Full Name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
            }}
            placeholder="As in PAN Card"
            required
            error={errors.name}
          />

          <FormInput
            label="Email Address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
            }}
            placeholder="e.g. your@example.com"
            keyboardType="email-address"
            required
            error={errors.email}
          />

          <FormInput
            label="Date of Birth"
            value={dob}
            onChangeText={(text) => {
              setDob(text);
              if (errors.dob) setErrors((prev) => ({ ...prev, dob: "" }));
            }}
            placeholder="YYYY-MM-DD"
            required
            error={errors.dob}
          />

          <FormInput
            label="PAN Number"
            value={pan}
            onChangeText={(text) => {
              setPan(text);
              if (errors.pan) setErrors((prev) => ({ ...prev, pan: "" }));
            }}
            placeholder="ABCDE1234F"
            maxLength={10}
            required
            error={errors.pan}
          />

          <FormInput
            label="Aadhaar Number"
            value={aadhaar}
            onChangeText={(text) => {
              setAadhaar(text);
              if (errors.aadhaar)
                setErrors((prev) => ({ ...prev, aadhaar: "" }));
            }}
            placeholder="12-digit Aadhaar"
            keyboardType="numeric"
            maxLength={14} // to accommodate spaces if formatted
            required
            error={errors.aadhaar}
          />

          <FormInput
            label="Residential / Business Address"
            value={address}
            onChangeText={(text) => {
              setAddress(text);
              if (errors.address)
                setErrors((prev) => ({ ...prev, address: "" }));
            }}
            placeholder="Complete postal address"
            required
            error={errors.address}
          />

          {/* Customer Type Dropdown */}
          <View style={styles.dropdownContainer}>
            <Text style={[styles.dropdownLabel, { color: colors.text }]}>
              Customer Profile Type{" "}
              <Text style={{ color: colors.error }}>*</Text>
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowTypeModal(true)}
              style={[
                styles.dropdownBox,
                {
                  backgroundColor: colors.background,
                  borderColor: errors.customerType
                    ? colors.error
                    : colors.border,
                },
              ]}
            >
              <Text
                style={{
                  color: customerType ? colors.text : colors.textSecondary,
                }}
              >
                {customerType || "Select Profile Type"}
              </Text>
              <Ionicons
                name="chevron-down"
                size={18}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
            {errors.customerType && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.customerType}
              </Text>
            )}
          </View>

          <PrimaryButton
            title="Complete Registration"
            onPress={handleRegister}
            loading={loading}
            style={styles.submitBtn}
            colorType="orange"
          />
        </View>
      </ScrollView>

      {/* Customer Type Picker Modal */}
      <Modal
        visible={showTypeModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTypeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: colors.backgroundElement },
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Select Customer Type
            </Text>

            <ScrollView style={styles.modalScroll}>
              {CUSTOMER_TYPES.map((type, idx) => {
                const isSelected = customerType === type;
                return (
                  <TouchableOpacity
                    key={idx}
                    activeOpacity={0.8}
                    onPress={() => {
                      setCustomerType(type);
                      setShowTypeModal(false);
                      if (errors.customerType)
                        setErrors((prev) => ({ ...prev, customerType: "" }));
                    }}
                    style={[
                      styles.modalOptionItem,
                      {
                        backgroundColor: isSelected
                          ? colors.orangeLight
                          : "transparent",
                        borderBottomColor: colors.border,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.modalOptionText,
                        {
                          color: isSelected ? colors.orange : colors.text,
                          fontWeight: isSelected ? "700" : "500",
                        },
                      ]}
                    >
                      {type}
                    </Text>
                    {isSelected && (
                      <Ionicons
                        name="checkmark"
                        size={18}
                        color={colors.orange}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowTypeModal(false)}
              style={[styles.modalCloseBtn, { borderTopColor: colors.border }]}
            >
              <Text
                style={[
                  styles.modalCloseBtnText,
                  { color: colors.textSecondary },
                ]}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 50,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  subTitle: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },
  formCard: {
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 32,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdownLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  dropdownBox: {
    height: 50,
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
  submitBtn: {
    marginTop: 8,
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
    maxHeight: 400,
    borderRadius: 16,
    overflow: "hidden",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    padding: 16,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  modalScroll: {
    flexGrow: 0,
  },
  modalOptionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  modalOptionText: {
    fontSize: 15,
  },
  modalCloseBtn: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
  },
  modalCloseBtnText: {
    fontWeight: "600",
    fontSize: 15,
  },
});
