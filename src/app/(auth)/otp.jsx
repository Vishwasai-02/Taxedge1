import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../../hooks/use-theme";
import { useAuthStore } from "../../store/authStore";
import { PrimaryButton } from "../../components/PrimaryButton";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function OTPScreen() {
  const colors = useTheme();
  const router = useRouter();
  const { mobileNumber, login } = useAuthStore();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (!mobileNumber) {
      router.replace("/(auth)/login");
    }
  }, [mobileNumber]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = () => {
    if (otp.length !== 6) {
      setError("Please enter the 6-digit verification code");
      return;
    }

    if (otp !== "123456") {
      setError("Invalid OTP code. Please try again.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // Perform mock login
      login();
      // Check store to see if login loaded a profile or not
      const customer = useAuthStore.getState().customer;
      if (customer) {
        // Registered customer loaded successfully
        Alert.alert("Login Successful", `Welcome back, ${customer.name}!`);
        router.replace("/(main)/home");
      } else {
        // New customer, route to registration
        router.push("/(auth)/register");
      }
    }, 1000);
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30);
      setOtp("");
      setError("");
      Alert.alert("OTP Resent", "A new verification code has been simulated.");
    }
  };

  const renderOtpBoxes = () => {
    return Array.from({ length: 6 }).map((_, i) => {
      const char = otp[i] || "";
      const isCurrent = i === otp.length;
      return (
        <View
          key={i}
          style={[
            styles.otpBox,
            {
              borderColor: error
                ? colors.error
                : isCurrent
                  ? colors.primary
                  : colors.border,
              backgroundColor: colors.background,
            },
          ]}
        >
          <Text style={[styles.otpBoxText, { color: colors.text }]}>
            {char}
          </Text>
        </View>
      );
    });
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
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.back()}
          style={[styles.backBtn, { borderColor: colors.border }]}
        >
          <Ionicons name="arrow-back" size={20} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: colors.text }]}>
            Verification Code
          </Text>
          <Text style={[styles.subTitle, { color: colors.textSecondary }]}>
            Enter the 6-digit OTP sent to +91 {mobileNumber || "XXXXXXXXXX"}
          </Text>
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.backgroundElement,
              borderColor: colors.border,
            },
          ]}
        >
          {/* OTP Box Displays */}
          <View style={styles.otpGrid}>{renderOtpBoxes()}</View>

          {/* Hidden text input to receive keyboard input */}
          <TextInput
            value={otp}
            onChangeText={(text) => {
              setOtp(text.replace(/[^0-9]/g, ""));
              if (error) setError("");
            }}
            keyboardType="number-pad"
            maxLength={6}
            style={styles.hiddenInput}
            autoFocus
          />

          {error ? (
            <Text style={[styles.errorText, { color: colors.error }]}>
              {error}
            </Text>
          ) : null}

          <PrimaryButton
            title="Verify Code"
            onPress={handleVerify}
            loading={loading}
            style={styles.verifyBtn}
          />

          <View style={styles.resendContainer}>
            {timer > 0 ? (
              <Text
                style={[styles.resendText, { color: colors.textSecondary }]}
              >
                Resend code in{" "}
                <Text style={{ color: colors.text, fontWeight: "600" }}>
                  0:{timer < 10 ? `0${timer}` : timer}
                </Text>
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text style={[styles.resendLink, { color: colors.primary }]}>
                  Resend OTP
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.hintContainer}>
            <Text style={[styles.hintText, { color: colors.textSecondary }]}>
              Enter Dev OTP:{" "}
              <Text style={{ fontWeight: "700", color: colors.text }}>
                123456
              </Text>
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
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 50,
    left: 24,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 32,
    marginTop: 40,
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
  card: {
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    position: "relative",
  },
  otpGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "100%",
  },
  otpBox: {
    width: 42,
    height: 52,
    borderRadius: 8,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  otpBoxText: {
    fontSize: 20,
    fontWeight: "700",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: "100%",
    height: 52,
  },
  errorText: {
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 16,
  },
  verifyBtn: {
    marginTop: 8,
  },
  resendContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  resendText: {
    fontSize: 14,
  },
  resendLink: {
    fontSize: 14,
    fontWeight: "700",
  },
  hintContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#00000005",
    alignItems: "center",
  },
  hintText: {
    fontSize: 12,
  },
});
