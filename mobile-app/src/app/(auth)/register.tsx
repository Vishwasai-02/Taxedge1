import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
import { BrandColors } from "../../shared/theme";
import { useAuthStore } from "../../store/authStore";
import { PrimaryButton } from "../../components/PrimaryButton";
import { styles } from "./register.styles";
import type {
  IconName,
  ProfileFormErrors,
  ProfileFormValues,
} from "../../types/domain";

export default function RegisterScreen() {
  const colors = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { register, setAvatar } = useAuthStore();

  const [avatarUri, setAvatarUriState] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ProfileFormValues>({
    name: "",
    email: "",
    dob: "",
    pan: "",
    aadhaar: "",
    address: "",
  });
  const [errors, setErrors] = useState<ProfileFormErrors>({});

  const update = (key: keyof ProfileFormValues, val: string) => {
    setForm((p) => ({ ...p, [key]: val }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: "" }));
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

  const handleSubmit = async () => {
    const errs: ProfileFormErrors = {};
    if (!form.name.trim()) errs.name = "Full name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email is required";
    if (!form.dob.trim()) errs.dob = "Date of birth is required";
    if (!form.pan.trim() || form.pan.length < 10) errs.pan = "Valid 10-digit PAN is required";
    if (!form.aadhaar.trim()) errs.aadhaar = "Aadhaar number is required";
    if (!form.address.trim()) errs.address = "Address is required";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return Alert.alert("Incomplete Form", "Please fill in all required fields.");
    }

    setLoading(true);
    try {
      const res = await register({
        name: form.name,
        email: form.email,
        dob: form.dob,
        pan: form.pan.toUpperCase(),
        aadhaar: form.aadhaar,
        address: form.address,
        customerType: "Individual",
      });
      setLoading(false);
      if (res.success) {
        if (avatarUri) setAvatar(avatarUri);
        router.replace("/(main)/home" as any);
      } else {
        Alert.alert("Registration Error", res.error || "Failed to create profile.");
      }
    } catch (err) {
      setLoading(false);
      Alert.alert("Registration Error", "An unexpected error occurred.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.container, { backgroundColor: colors.backgroundElement }]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 32 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          style={[styles.backBtn, { borderColor: colors.border }]}
        >
          <Ionicons name="chevron-back" size={20} color={colors.text} />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Create Your Profile</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Tell us a little about yourself.
          </Text>
        </View>

        {/* Profile Avatar */}
        <View style={styles.avatarSection}>
          <TouchableOpacity activeOpacity={0.85} onPress={handlePickPhoto} style={styles.avatarWrap}>
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
        <View style={styles.form}>
          <Field
            label="Full Name"
            value={form.name}
            onChangeText={(t) => update("name", t)}
            placeholder="Enter your full name"
            error={errors.name}
          />

          <Field
            label="Email Address"
            value={form.email}
            onChangeText={(t) => update("email", t)}
            placeholder="email@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <Field
            label="Date of Birth"
            value={form.dob}
            onChangeText={(t) => update("dob", t)}
            placeholder="dd-mm-yyyy"
            rightIcon="calendar-outline"
            error={errors.dob}
          />

          <Field
            label="PAN Number"
            value={form.pan}
            onChangeText={(t) => update("pan", t.toUpperCase())}
            placeholder="ABCDE1234F"
            autoCapitalize="characters"
            maxLength={10}
            error={errors.pan}
          />

          <Field
            label="Aadhaar Number"
            value={form.aadhaar}
            onChangeText={(t) => update("aadhaar", t)}
            placeholder="XXXX XXXX XXXX"
            keyboardType="numeric"
            maxLength={14}
            error={errors.aadhaar}
          />

          <Field
            label="Current Address"
            value={form.address}
            onChangeText={(t) => update("address", t)}
            placeholder="Enter your address"
            error={errors.address}
          />

          <PrimaryButton
            title="Create Profile"
            onPress={handleSubmit}
            loading={loading}
            style={styles.submitBtn}
          />
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
            borderColor: error ? colors.error : BrandColors.BORDER,
            backgroundColor: colors.backgroundElement,
          },
        ]}
      >
        <TextInput
          style={[styles.input, { color: colors.text }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={BrandColors.TEXT_MUTED}
          {...props}
        />
        {rightIcon && (
          <Ionicons name={rightIcon} size={18} color={BrandColors.TEXT_SECONDARY} style={styles.rightIcon} />
        )}
      </View>
      {error ? <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text> : null}
    </View>
  );
}

