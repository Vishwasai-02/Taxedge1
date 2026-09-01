import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../hooks/use-theme";
import { useAuthStore } from "../../store/authStore";
import { PrimaryButton } from "../../components/PrimaryButton";

function GoogleIcon({ size = 20 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <Path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <Path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <Path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </Svg>
  );
}

export default function LoginScreen() {
  const colors = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const setMobileNumber = useAuthStore((state) => state.setMobileNumber);

  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

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
    }, 800);
  };

  const handleGoogleSignIn = () => {
    Alert.alert(
      "Google Sign-In",
      "Google authentication will be available soon."
    );
  };

  const handleCreateAccount = () => {
    if (mobile.length === 10) {
      setMobileNumber(mobile);
    }
    router.push("/(auth)/register");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          {
            paddingTop: Math.max(insets.top + 12, 28),
            paddingBottom: Math.max(insets.bottom + 16, 28),
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.contentWrapper}>
          {/* Logo & Brand Header */}
          <View style={styles.headerSection}>
            <Image
              source={require("../../../assets/images/icon.png")}
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

          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <Text style={[styles.welcomeTitle, { color: colors.text }]}>
              Welcome Back 
            </Text>
            <Text style={[styles.welcomeSubtitle, { color: colors.textSecondary }]}>
              Login to continue with TaxEdge
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            <Text style={[styles.inputLabel, { color: colors.text }]}>
              Mobile Number
            </Text>

            {/* +91 & Mobile Number Input */}
            <View style={styles.phoneInputRow}>
              <View
                style={[
                  styles.countryCodeBox,
                  {
                    borderColor: isFocused ? colors.primary : colors.border,
                    backgroundColor: colors.backgroundElement,
                  },
                ]}
              >
                <Text style={[styles.countryCodeText, { color: colors.text }]}>
                  +91
                </Text>
              </View>

              <TextInput
                value={mobile}
                onChangeText={(text) => {
                  setMobile(text.replace(/[^0-9]/g, ""));
                  if (error) setError("");
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter 10-digit mobile number"
                placeholderTextColor={colors.textSecondary}
                keyboardType="phone-pad"
                maxLength={10}
                style={[
                  styles.mobileInput,
                  {
                    color: colors.text,
                    backgroundColor: colors.backgroundElement,
                    borderColor: error
                      ? colors.error
                      : isFocused
                      ? colors.primary
                      : colors.border,
                  },
                ]}
              />
            </View>

            {error ? (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {error}
              </Text>
            ) : null}

            {/* Continue Button */}
            <PrimaryButton
              title="Continue"
              onPress={handleContinue}
              loading={loading}
              colorType="orange"
              style={styles.continueBtn}
            />

            {/* Or Divider */}
            <View style={styles.dividerRow}>
              <View
                style={[styles.dividerLine, { backgroundColor: colors.border }]}
              />
              <Text
                style={[styles.dividerText, { color: colors.textSecondary }]}
              >
                or
              </Text>
              <View
                style={[styles.dividerLine, { backgroundColor: colors.border }]}
              />
            </View>

            {/* Continue with Google */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleGoogleSignIn}
              style={[
                styles.googleBtn,
                {
                  backgroundColor: colors.backgroundElement,
                  borderColor: colors.border,
                },
              ]}
            >
              <GoogleIcon size={20} />
              <Text style={[styles.googleBtnText, { color: colors.text }]}>
                Continue with Google
              </Text>
            </TouchableOpacity>

            {/* Create Account Single Line */}
            <View style={styles.createAccountRow}>
              <Text style={[styles.newToText, { color: colors.textSecondary }]}>
                New to TaxEdge?
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleCreateAccount}
                style={styles.createAccountTouch}
              >
                <Text
                  style={[styles.createAccountLink, { color: colors.primary }]}
                >
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>

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
    paddingHorizontal: 24,
  },
  contentWrapper: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  logoImage: {
    width: 76,
    height: 76,
    borderRadius: 20,
    marginBottom: 12,
  },
  brandTitle: {
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: 2,
  },
  brandSubtitle: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 3.5,
    marginTop: 3,
  },
  welcomeSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },
  welcomeSubtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  formSection: {
    width: "100%",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  phoneInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
  },
  countryCodeBox: {
    height: 50,
    width: 58,
    borderWidth: 1.5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  countryCodeText: {
    fontSize: 15,
    fontWeight: "600",
  },
  mobileInput: {
    flex: 1,
    height: 50,
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
  },
  errorText: {
    fontSize: 12,
    marginTop: 6,
    fontWeight: "500",
  },
  continueBtn: {
    marginTop: 18,
    height: 50,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 13,
    fontWeight: "500",
  },
  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: 50,
    borderRadius: 12,
    borderWidth: 1.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  googleBtnText: {
    fontSize: 15,
    fontWeight: "600",
  },
  createAccountRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
    flexWrap: "nowrap",
  },
  newToText: {
    fontSize: 14,
    fontWeight: "500",
  },
  createAccountTouch: {
    marginLeft: 6,
    paddingVertical: 4,
  },
  createAccountLink: {
    fontSize: 14,
    fontWeight: "700",
  },

});
