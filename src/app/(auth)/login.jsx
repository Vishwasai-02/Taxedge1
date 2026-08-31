import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../../hooks/use-theme";
import { useAuthStore } from "../../store/authStore";
import { FormInput } from "../../components/FormInput";
import { PrimaryButton } from "../../components/PrimaryButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginScreen() {
  const colors = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const setMobileNumber = useAuthStore((state) => state.setMobileNumber);
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setMobileNumber(mobile);
      router.push("/(auth)/otp");
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        contentContainerStyle={[styles.scrollContainer, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerSection}>
          <Image
            source={require("../../../assets/images/logo.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={[styles.brandTitle, { color: colors.primaryDark }]}>
            TAXEDGE
          </Text>
          <Text style={[styles.brandSubtitle, { color: colors.textSecondary }]}>
            FIN SOLUTIONS
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
          <Text style={[styles.welcomeText, { color: colors.text }]}>
            Welcome Back
          </Text>
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            Enter your mobile number to log in or register.
          </Text>

          <View style={styles.phoneInputRow}>
            <View
              style={[
                styles.countryCodeBox,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                },
              ]}
            >
              <Text style={[styles.countryCodeText, { color: colors.text }]}>
                +91
              </Text>
            </View>
            <View style={styles.inputFlex}>
              <FormInput
                label="Mobile Number"
                value={mobile}
                onChangeText={(text) => {
                  setMobile(text.replace(/[^0-9]/g, ""));
                  if (error) setError("");
                }}
                placeholder="Enter 10-digit number"
                keyboardType="phone-pad"
                maxLength={10}
                error={error}
              />
            </View>
          </View>

          <PrimaryButton
            title="Continue"
            onPress={handleContinue}
            loading={loading}
            style={styles.continueBtn}
          />

          <View style={styles.hintContainer}>
            <Text style={[styles.hintText, { color: colors.textSecondary }]}>
              For testing, use{" "}
              <Text style={{ fontWeight: "700", color: colors.text }}>
                9876543210
              </Text>{" "}
              to load a mock profile, or any other number to register as a new
              client.
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoImage: {
    width: 90,
    height: 90,
    borderRadius: 24,
    marginBottom: 16,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 2,
  },
  brandSubtitle: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 4,
    marginTop: 4,
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
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "700",
  },
  infoText: {
    fontSize: 14,
    marginTop: 6,
    marginBottom: 20,
    lineHeight: 20,
  },
  phoneInputRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    width: "100%",
  },
  countryCodeBox: {
    height: 50,
    width: 60,
    borderWidth: 1.5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24, // aligns with FormInput label offset
  },
  countryCodeText: {
    fontSize: 15,
    fontWeight: "600",
  },
  inputFlex: {
    flex: 1,
  },
  continueBtn: {
    marginTop: 16,
  },
  hintContainer: {
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#00000005",
  },
  hintText: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
});
