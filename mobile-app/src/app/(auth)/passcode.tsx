import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Image } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuthStore } from "../../store/authStore";
import { PrimaryButton } from "../../components/PrimaryButton";

export default function PasscodeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { mobileNumber, loginWithPasscode } = useAuthStore();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 200);
    return () => clearTimeout(t);
  }, []);

  const phone = mobileNumber ? `+91 ${mobileNumber.slice(0, 5)} ${mobileNumber.slice(5)}` : "+91 XXXXX XXXXX";

  const handleLoginPress = async () => {
    if (passcode.length !== 6) {
      setError("Please enter your 6-digit passcode");
      inputRef.current?.focus();
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await loginWithPasscode(passcode);
      setLoading(false);

      if (res.success) {
        router.replace("/(main)/home" as any);
      } else {
        setError(res.error || "Incorrect passcode. Please try again.");
        setPasscode("");
        inputRef.current?.focus();
      }
    } catch (err) {
      setLoading(false);
      setError("Incorrect passcode. Please try again.");
      setPasscode("");
      inputRef.current?.focus();
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={[s.container, { backgroundColor: "#F8FAFC" }]}>
      <ScrollView contentContainerStyle={[s.scroll, { paddingTop: Math.max(insets.top + 12, 28), paddingBottom: Math.max(insets.bottom + 16, 28) }]} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()} style={[s.backBtn, { top: insets.top + 12 }]}>
          <Ionicons name="arrow-back" size={20} color="#083B75" />
        </TouchableOpacity>

        <View style={s.wrapper}>
          <View style={s.header}>
            <Image source={require("../../../assets/images/icon.png")} style={s.logo} resizeMode="contain" />
            <Text style={s.title}>Welcome Back 👋</Text>
            <Text style={s.sub}>Enter your 6-digit passcode for{"\n"}<Text style={s.phoneHighlight}>{phone}</Text></Text>
          </View>

          {/* Hidden input receiving native mobile keypad input without auto-submitting */}
          <TextInput
            ref={inputRef}
            value={passcode}
            onChangeText={(t) => {
              const c = t.replace(/\D/g, "").slice(0, 6);
              setPasscode(c);
              if (error) setError("");
            }}
            keyboardType="number-pad"
            maxLength={6}
            style={s.hiddenInput}
            autoFocus
          />

          {/* Visual 6 Dots */}
          <TouchableOpacity activeOpacity={1} onPress={() => inputRef.current?.focus()} style={s.dotsTouchable}>
            <View style={s.dotsRow}>
              {Array.from({ length: 6 }).map((_, i) => {
                const filled = i < passcode.length;
                const current = i === passcode.length;
                return (
                  <View key={i} style={[s.dotBox, { borderColor: error ? "#DC2626" : filled || current ? "#083B75" : "#E2E8F0", backgroundColor: filled ? "#083B75" : "#FFFFFF", borderWidth: current ? 2 : 1.5 }]}>
                    {filled ? <View style={s.innerDot} /> : current ? <View style={s.cursor} /> : null}
                  </View>
                );
              })}
            </View>
          </TouchableOpacity>

          {error ? (
            <View style={s.errorBox}>
              <Ionicons name="alert-circle" size={16} color="#DC2626" />
              <Text style={s.errorText}>{error}</Text>
            </View>
          ) : <View style={{ height: 24 }} />}

          {/* Solid Orange Background with White Text Button */}
          <PrimaryButton
            title="Login"
            onPress={handleLoginPress}
            loading={loading}
            colorType="orange"
            style={s.loginBtn}
          />

          <TouchableOpacity activeOpacity={0.75} onPress={() => router.replace("/(auth)/login" as any)} style={s.switchBtn}>
            <Text style={s.switchText}>Log in with a different mobile number</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: "center", paddingHorizontal: 24 },
  backBtn: { position: "absolute", left: 20, width: 40, height: 40, borderRadius: 14, borderWidth: 1.2, borderColor: "#E2E8F0", backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center", zIndex: 10, shadowColor: "#083B75", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  wrapper: { width: "100%", maxWidth: 380, alignSelf: "center" },
  header: { alignItems: "center", marginBottom: 28 },
  logo: { width: 72, height: 72, borderRadius: 18, marginBottom: 12 },
  title: { fontSize: 24, fontWeight: "800", color: "#083B75", letterSpacing: 0.3, marginBottom: 6 },
  sub: { fontSize: 14, color: "#64748B", textAlign: "center", lineHeight: 20 },
  phoneHighlight: { color: "#083B75", fontWeight: "700" },
  hiddenInput: { position: "absolute", opacity: 0, width: 1, height: 1 },
  dotsTouchable: { width: "100%", alignItems: "center", marginVertical: 18 },
  dotsRow: { flexDirection: "row", justifyContent: "center", gap: 12 },
  dotBox: { width: 46, height: 56, borderRadius: 14, justifyContent: "center", alignItems: "center", shadowColor: "#083B75", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  innerDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: "#FFFFFF" },
  cursor: { width: 2, height: 22, backgroundColor: "#EA580C", borderRadius: 1 },
  errorBox: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 20, paddingHorizontal: 12 },
  errorText: { fontSize: 13, color: "#DC2626", fontWeight: "600", textAlign: "center" },
  loginBtn: { height: 52, borderRadius: 14, marginTop: 8 },
  switchBtn: { marginTop: 20, paddingVertical: 6, alignItems: "center" },
  switchText: { fontSize: 13.5, color: "#EA580C", fontWeight: "600" },
});
