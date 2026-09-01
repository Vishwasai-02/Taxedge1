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
  Image,
  Alert,
  type TextInputProps,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../../hooks/use-theme";
import { useAuthStore } from "../../store/authStore";
import { PrimaryButton } from "../../components/PrimaryButton";
import type {
  IconName,
  ProfileFormErrors,
  ProfileFormValues,
} from "../../types/domain";

type OtpStep = "otp" | "profile";

export default function OTPScreen() {
  const colors = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { mobileNumber, register, setAvatar } = useAuthStore();

  // Screen step: 'otp' | 'profile'
  const [step, setStep] = useState<OtpStep>("otp");

  // OTP states
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const inputRef = useRef<TextInput>(null);

  // Profile states
  const [avatarUri, setAvatarUriState] = useState<string | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileErrors, setProfileErrors] = useState<ProfileFormErrors>({});
  const [form, setForm] = useState<ProfileFormValues>({
    name: "",
    email: "",
    dob: "",
    pan: "",
    aadhaar: "",
    address: "",
  });

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
      setStep("profile");
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

  const handlePickPhoto = () => {
    Alert.alert("Profile Photo", "Choose an option", [
      {
        text: "Take Photo",
        onPress: async () => {
          const p = await ImagePicker.requestCameraPermissionsAsync();
          if (!p.granted) return Alert.alert("Permission needed", "Camera access is required.");
          const res = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.7 });
          if (!res.canceled && res.assets?.[0]?.uri) setAvatarUriState(res.assets[0].uri);
        },
      },
      {
        text: "Choose from Gallery",
        onPress: async () => {
          const p = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (!p.granted) return Alert.alert("Permission needed", "Gallery access is required.");
          const res = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.7 });
          if (!res.canceled && res.assets?.[0]?.uri) setAvatarUriState(res.assets[0].uri);
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const updateForm = (key: keyof ProfileFormValues, val: string) => {
    setForm((p) => ({ ...p, [key]: val }));
    if (profileErrors[key]) setProfileErrors((p) => ({ ...p, [key]: "" }));
  };

  const handleCreateProfile = () => {
    const errs: ProfileFormErrors = {};
    if (!form.name.trim()) errs.name = "Full name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email is required";
    if (!form.dob.trim()) errs.dob = "Date of birth is required";
    if (!form.pan.trim() || form.pan.length < 10) errs.pan = "Valid 10-digit PAN is required";
    if (!form.aadhaar.trim()) errs.aadhaar = "Aadhaar number is required";
    if (!form.address.trim()) errs.address = "Address is required";

    if (Object.keys(errs).length > 0) {
      setProfileErrors(errs);
      return Alert.alert("Incomplete Form", "Please fill in all required fields.");
    }

    setProfileLoading(true);
    setTimeout(() => {
      setProfileLoading(false);
      register({
        name: form.name,
        email: form.email,
        dob: form.dob,
        pan: form.pan.toUpperCase(),
        aadhaar: form.aadhaar,
        address: form.address,
        customerType: "Individual",
      });
      if (avatarUri) setAvatar(avatarUri);
      router.replace("/(main)/home");
    }, 600);
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

  // STEP 2: CREATE YOUR PROFILE SCREEN
  if (step === "profile") {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={[styles.container, { backgroundColor: colors.backgroundElement }]}
      >
        <ScrollView
          contentContainerStyle={[
            styles.profileScroll,
            { paddingTop: Math.max(insets.top + 12, 24), paddingBottom: insets.bottom + 32 },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back to OTP */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setStep("otp")}
            style={[styles.backBtn, { borderColor: colors.border }]}
          >
            <Ionicons name="chevron-back" size={20} color={colors.text} />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.profileHeader}>
            <Text style={[styles.profileTitle, { color: colors.text }]}>
              Create Your Profile
            </Text>
            <Text style={[styles.profileSubtitle, { color: colors.textSecondary }]}>
              Tell us a little about yourself.
            </Text>
          </View>

          {/* Profile Avatar */}
          <View style={styles.avatarSection}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handlePickPhoto}
              style={styles.avatarWrap}
            >
              <View style={styles.avatarCircle}>
                {avatarUri ? (
                  <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
                ) : (
                  <Ionicons name="person" size={46} color="#6B21A8" />
                )}
              </View>
              <View style={styles.cameraBadge}>
                <Ionicons name="camera" size={13} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.formSection}>
            <Field
              label="Full Name"
              value={form.name}
              onChangeText={(t) => updateForm("name", t)}
              placeholder="Enter your full name"
              error={profileErrors.name}
            />

            <Field
              label="Email Address"
              value={form.email}
              onChangeText={(t) => updateForm("email", t)}
              placeholder="email@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              error={profileErrors.email}
            />

            <Field
              label="Date of Birth"
              value={form.dob}
              onChangeText={(t) => updateForm("dob", t)}
              placeholder="dd-mm-yyyy"
              rightIcon="calendar-outline"
              error={profileErrors.dob}
            />

            <Field
              label="PAN Number"
              value={form.pan}
              onChangeText={(t) => updateForm("pan", t.toUpperCase())}
              placeholder="ABCDE1234F"
              autoCapitalize="characters"
              maxLength={10}
              error={profileErrors.pan}
            />

            <Field
              label="Aadhaar Number"
              value={form.aadhaar}
              onChangeText={(t) => updateForm("aadhaar", t)}
              placeholder="XXXX XXXX XXXX"
              keyboardType="numeric"
              maxLength={14}
              error={profileErrors.aadhaar}
            />

            <Field
              label="Current Address"
              value={form.address}
              onChangeText={(t) => updateForm("address", t)}
              placeholder="Enter your address"
              error={profileErrors.address}
            />

            <PrimaryButton
              title="Create Profile"
              onPress={handleCreateProfile}
              loading={profileLoading}
              style={styles.submitBtn}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  // STEP 1: OTP SCREEN
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
          style={[styles.backBtnAbsolute, { borderColor: colors.border }]}
        >
          <Ionicons name="arrow-back" size={20} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: colors.text }]}>
            Verification Code
          </Text>
          <Text style={[styles.subTitle, { color: colors.textSecondary }]}>
            Enter the 6-digit OTP sent to +91 {mobileNumber || "9876543210"}
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
                  setStep("profile");
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
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

interface FieldProps
  extends Omit<TextInputProps, "value" | "onChangeText" | "placeholder" | "style"> {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  rightIcon?: IconName;
  error?: string;
}

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  rightIcon,
  error,
  ...props
}: FieldProps) {
  const colors = useTheme();
  return (
    <View style={styles.fieldContainer}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <View
        style={[
          styles.inputBox,
          {
            borderColor: error ? colors.error : "#D1E7DD",
            backgroundColor: colors.backgroundElement,
          },
        ]}
      >
        <TextInput
          style={[styles.input, { color: colors.text }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          {...props}
        />
        {rightIcon && (
          <Ionicons name={rightIcon} size={18} color="#64748B" style={styles.rightIcon} />
        )}
      </View>
      {error ? <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text> : null}
    </View>
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
    borderRadius: 10,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 50,
    left: 24,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1.2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
    marginBottom: 16,
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
  otpTouchable: {
    width: "100%",
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
    width: 1,
    height: 1,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
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

  // Profile View Styles
  profileScroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  profileHeader: {
    marginBottom: 14,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  profileSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  avatarSection: {
    alignItems: "center",
    marginVertical: 16,
  },
  avatarWrap: {
    position: "relative",
  },
  avatarCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 2,
    borderColor: "#10B981",
    backgroundColor: "#D1FAE5",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  cameraBadge: {
    position: "absolute",
    right: -2,
    bottom: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#065F46",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  formSection: {
    gap: 4,
  },
  fieldContainer: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 7,
  },
  inputBox: {
    height: 52,
    borderWidth: 1.5,
    borderRadius: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 15,
    height: "100%",
  },
  rightIcon: {
    marginLeft: 8,
  },
  submitBtn: {
    marginTop: 12,
  },
});
