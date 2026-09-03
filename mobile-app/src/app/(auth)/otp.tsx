import React, { useState, useEffect, useRef } from "react";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../../hooks/use-theme";
import { useAuthStore } from "../../store/authStore";
import { PrimaryButton } from "../../components/PrimaryButton";

/**
 * Step one of signup: confirm the code sent to the mobile number. Entering the
 * sixth digit - or pressing Verify - pushes on to /(auth)/create-profile, which
 * owns the profile form and the registration itself.
 */
export default function OTPScreen() {
  const colors = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { mobileNumber } = useAuthStore();

  // OTP states
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const inputRef = useRef<TextInput>(null);


  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerifyOtp = () => {
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/(auth)/create-profile");
    }, 250);
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30);
      setOtp("");
      setError("");
      Alert.alert("OTP Resent", "A new verification code has been sent.");
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
                  ? "#0F2E5C"
                  : "#E8EDF3",
              borderWidth: isCurrent ? 1.8 : 1.4,
              backgroundColor: isCurrent ? "#FFFFFF" : "#F5F7FA",
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
      style={[styles.container, { backgroundColor: "#F5F7FA" }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets={true}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.back()}
          style={[styles.backBtnAbsolute, { top: insets.top + 12 }]}
        >
          <Ionicons name="arrow-back" size={20} color="#083B75" />
        </TouchableOpacity>

        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: "#083B75" }]}>
            Verification Code
          </Text>
          <Text style={[styles.subTitle, { color: colors.textSecondary }]}>
            Enter the 6-digit OTP sent to +91 {mobileNumber || "9876543210"}
          </Text>
        </View>

        <View
          style={styles.card}
        >
          {/* OTP Box Displays */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => inputRef.current?.focus()}
            style={styles.otpTouchable}
          >
            <View style={styles.otpGrid}>{renderOtpBoxes()}</View>
          </TouchableOpacity>

          {/* Hidden text input */}
          <TextInput
            ref={inputRef}
            value={otp}
            onChangeText={(text) => {
              const clean = text.replace(/[^0-9]/g, "");
              setOtp(clean);
              if (error) setError("");
              if (clean.length === 6) {
                setTimeout(() => {
                  router.push("/(auth)/create-profile");
                }, 200);
              }
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
            onPress={handleVerifyOtp}
            loading={loading}
            colorType="orange"
            style={styles.verifyBtn}
          />

          <View style={styles.resendContainer}>
            {timer > 0 ? (
              <Text
                style={[styles.resendText, { color: colors.textSecondary }]}
              >
                Resend code in{" "}
                <Text style={{ color: "#0F2E5C", fontWeight: "700" }}>
                  0:{timer < 10 ? `0${timer}` : timer}
                </Text>
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text style={[styles.resendLink, { color: "#F97316" }]}>
                  Resend OTP
                </Text>
              </TouchableOpacity>
            )}
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
  backBtnAbsolute: {
    width: 40,
    height: 40,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E4E9F0",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 24,
    backgroundColor: "#FFFFFF",
    shadowColor: "#083B75",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  subTitle: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 21,
  },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#EDF1F6",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 22,
    paddingVertical: 26,
    shadowColor: "#083B75",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 16,
    elevation: 4,
    position: "relative",
  },
  otpTouchable: {
    width: "100%",
  },
  otpGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    width: "100%",
  },
  otpBox: {
    width: 46,
    height: 56,
    borderRadius: 14,
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
    width: 1,
    height: 1,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
  verifyBtn: {
    marginTop: 4,
    height: 58,
    borderRadius: 14,
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 4,
  },
  resendContainer: {
    marginTop: 22,
    alignItems: "center",
  },
  resendText: {
    fontSize: 14.5,
    fontWeight: "500",
  },
  resendLink: {
    fontSize: 14,
    fontWeight: "700",
  },
});
