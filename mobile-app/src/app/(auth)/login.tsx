import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../hooks/use-theme";
import { useAuthStore } from "../../store/authStore";
import { devAuthService } from "../../features/developmentAuth";
import { PrimaryButton } from "../../components/PrimaryButton";

function GoogleIcon({ size = 20 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
      <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
    </Svg>
  );
}

export default function LoginScreen() {
  const colors = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { mobileNumber, setMobileNumber } = useAuthStore();

  const [mobile, setMobile] = useState(mobileNumber || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (mobileNumber && mobileNumber.length === 10) setMobile(mobileNumber);
  }, [mobileNumber]);

  const handleContinue = () => {
    const clean = mobile.replace(/\D/g, "");
    if (clean.length !== 10) return setError("Please enter a valid 10-digit mobile number");

    setError("");
    setLoading(true);
    setMobileNumber(clean);

    setTimeout(() => {
      setLoading(false);
      // If mobile number exists, route directly to Passcode screen (NO OTP, NO REGISTRATION)
      if (devAuthService.isUserRegistered(clean)) {
        router.push("/(auth)/passcode" as any);
      } else {
        router.push("/(auth)/otp" as any);
      }
    }, 250);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={[s.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={[s.scroll, { paddingTop: Math.max(insets.top + 12, 28), paddingBottom: Math.max(insets.bottom + 16, 28) }]} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={s.wrapper}>
          <View style={s.header}>
            <Image source={require("../../../assets/images/icon.png")} style={s.logo} resizeMode="contain" />
            <Text style={[s.brandTitle, { color: colors.primaryDark }]}>TAXEDGE</Text>
            <Text style={[s.brandSub, { color: colors.textSecondary }]}>FIN SOLUTIONS</Text>
          </View>

          <View style={s.welcome}>
            <Text style={[s.welcomeTitle, { color: colors.text }]}>Welcome Back 👋</Text>
            <Text style={[s.welcomeSub, { color: colors.textSecondary }]}>Login to continue with TaxEdge</Text>
          </View>

          <View style={s.form}>
            <Text style={[s.label, { color: colors.text }]}>Mobile Number</Text>
            <View style={s.phoneRow}>
              <View style={[s.codeBox, { borderColor: isFocused ? "#083B75" : colors.border, backgroundColor: colors.backgroundElement }]}>
                <Text style={[s.codeText, { color: colors.text }]}>+91</Text>
              </View>
              <TextInput
                value={mobile}
                onChangeText={(t) => { setMobile(t.replace(/\D/g, "")); if (error) setError(""); }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter 10-digit mobile number"
                placeholderTextColor={colors.textSecondary}
                keyboardType="phone-pad"
                maxLength={10}
                style={[s.input, { color: colors.text, backgroundColor: colors.backgroundElement, borderColor: error ? colors.error : isFocused ? "#083B75" : colors.border }]}
              />
            </View>

            {error ? <Text style={[s.error, { color: colors.error }]}>{error}</Text> : null}

            <PrimaryButton title="Continue" onPress={handleContinue} loading={loading} colorType="orange" style={s.continueBtn} />

            <View style={s.dividerRow}>
              <View style={[s.dividerLine, { backgroundColor: colors.border }]} />
              <Text style={[s.dividerText, { color: colors.textSecondary }]}>or</Text>
              <View style={[s.dividerLine, { backgroundColor: colors.border }]} />
            </View>

            <TouchableOpacity activeOpacity={0.8} onPress={() => Alert.alert("Google Sign-In", "Google authentication will be available soon.")} style={[s.googleBtn, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
              <GoogleIcon size={20} />
              <Text style={[s.googleText, { color: colors.text }]}>Continue with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: "center", paddingHorizontal: 24 },
  wrapper: { width: "100%", maxWidth: 420, alignSelf: "center" },
  header: { alignItems: "center", marginBottom: 24 },
  logo: { width: 76, height: 76, borderRadius: 20, marginBottom: 12 },
  brandTitle: { fontSize: 26, fontWeight: "800", letterSpacing: 2 },
  brandSub: { fontSize: 12, fontWeight: "700", letterSpacing: 3.5, marginTop: 3 },
  welcome: { alignItems: "center", marginBottom: 24 },
  welcomeTitle: { fontSize: 22, fontWeight: "700", textAlign: "center", marginBottom: 6 },
  welcomeSub: { fontSize: 14, textAlign: "center", lineHeight: 20 },
  form: { width: "100%" },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 8 },
  phoneRow: { flexDirection: "row", alignItems: "center", gap: 10, width: "100%" },
  codeBox: { height: 50, width: 58, borderWidth: 1.5, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  codeText: { fontSize: 15, fontWeight: "600" },
  input: { flex: 1, height: 50, borderWidth: 1.5, borderRadius: 10, paddingHorizontal: 14, fontSize: 15 },
  error: { fontSize: 12.5, marginTop: 6, fontWeight: "600" },
  continueBtn: { marginTop: 18, height: 50 },
  dividerRow: { flexDirection: "row", alignItems: "center", gap: 12, marginVertical: 20 },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { fontSize: 13, fontWeight: "500" },
  googleBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, height: 50, borderRadius: 12, borderWidth: 1.5, elevation: 1 },
  googleText: { fontSize: 15, fontWeight: "600" },
});