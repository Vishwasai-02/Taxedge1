import React, { useState } from "react";
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
  Modal,
  ActivityIndicator,
  type TextInputProps,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../hooks/use-theme";
import { useAuthStore } from "../../store/authStore";
import type { IconName, ProfileFormValues } from "../../types/domain";

/**
 * The signup form: the customer profile fields plus the credentials collected
 * on this screen. `password` and `confirmPassword` stay local - they are not
 * part of CustomerProfile and are never written to the store.
 */
interface SignupForm extends ProfileFormValues {
  customerType: string;
  password: string;
  confirmPassword: string;
}

type SignupErrors = Partial<Record<keyof SignupForm, string>>;

export default function CreateProfileScreen() {
  const colors = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { register, setAvatar } = useAuthStore();

  // Profile states
  const [avatarUri, setAvatarUriState] = useState<string | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileErrors, setProfileErrors] = useState<SignupErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCustomerTypeModal, setShowCustomerTypeModal] = useState(false);
  const [pickerYear, setPickerYear] = useState(2000);
  const [pickerMonth, setPickerMonth] = useState(0);
  const [pickerDay, setPickerDay] = useState(1);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const CUSTOMER_TYPES = [
    "Individual",
    "Salaried",
    "Business",
    "Proprietorship",
    "Partnership",
    "LLP",
    "Private Limited",
    "Company",
    "Freelancer / Consultant",
  ];

  const [form, setForm] = useState<SignupForm>({
    name: "",
    email: "",
    customerType: "",
    password: "",
    confirmPassword: "",
    dob: "",
    pan: "",
    aadhaar: "",
    address: "",
  });

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

  const updateForm = (key: keyof SignupForm, val: string) => {
    setForm((p) => ({ ...p, [key]: val }));
    if (profileErrors[key]) setProfileErrors((p) => ({ ...p, [key]: "" }));
  };

  const handleDobChange = (text: string) => {
    const digits = text.replace(/[^0-9]/g, "");
    let formatted = digits;
    if (digits.length > 2 && digits.length <= 4) {
      formatted = `${digits.slice(0, 2)}-${digits.slice(2)}`;
    } else if (digits.length > 4) {
      formatted = `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4, 8)}`;
    }
    updateForm("dob", formatted);
  };

  const openCalendarModal = () => {
    if (form.dob) {
      const parts = form.dob.split("-");
      if (parts.length === 3) {
        const d = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10) - 1;
        const y = parseInt(parts[2], 10);
        if (!isNaN(d) && !isNaN(m) && !isNaN(y) && y >= 1930 && y <= 2030) {
          setPickerDay(d);
          setPickerMonth(m);
          setPickerYear(y);
        }
      }
    }
    setShowDatePicker(true);
  };

  const confirmCalendarDate = () => {
    const dayStr = String(pickerDay).padStart(2, "0");
    const monthStr = String(pickerMonth + 1).padStart(2, "0");
    const yearStr = String(pickerYear);
    updateForm("dob", `${dayStr}-${monthStr}-${yearStr}`);
    setShowDatePicker(false);
  };

  const handleCreateProfile = () => {
    const errs: SignupErrors = {};
    if (!form.name.trim()) errs.name = "Full name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email is required";
    if (!form.customerType) errs.customerType = "Customer type is required";
    if (!form.password) {
      errs.password = "Password is required";
    } else if (form.password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }
    if (!form.confirmPassword) {
      errs.confirmPassword = "Confirm password is required";
    } else if (form.password !== form.confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
    }
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
        name: form.name.trim(),
        email: form.email.trim(),
        customerType: form.customerType,
        dob: form.dob.trim(),
        pan: form.pan.trim().toUpperCase(),
        aadhaar: form.aadhaar.trim(),
        address: form.address.trim(),
      });
      if (avatarUri) setAvatar(avatarUri);
      router.replace("/(main)/home");
    }, 600);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      style={[styles.container, { backgroundColor: "#F8FAFC" }]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.profileScroll,
          { paddingBottom: Math.max(insets.bottom + 60, 80) },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets={true}
      >
        {/* Top Wave Header */}
        <View style={styles.waveHeaderWrapper}>
          <Svg
            height={195}
            width="100%"
            viewBox="0 0 375 195"
            style={StyleSheet.absoluteFill}
            preserveAspectRatio="none"
          >
            {/* Navy Blue Curved Base */}
            <Path
              d="M0,0 L375,0 L375,130 C310,180 230,175 140,145 C60,118 20,135 0,150 Z"
              fill="#00204A"
            />
            {/* Orange Wave on Top Right */}
            <Path
              d="M250,0 C290,40 335,65 375,68 L375,0 Z"
              fill="#F97316"
            />
          </Svg>

          {/* Back Arrow & Header Titles */}
          <View
            style={[
              styles.waveHeaderContent,
              { paddingTop: Math.max(insets.top + 8, 24) },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.back()}
              style={styles.backBtnWhite}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.headerTextGroup}>
              <Text style={styles.headerTitleWhite}>Create Account</Text>

            </View>
          </View>
        </View>

        {/* Avatar Section Overlapping Wave */}
        <View style={styles.avatarSection}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handlePickPhoto}
            style={styles.avatarWrap}
          >
            <View style={styles.avatarOuterRing}>
              <View style={styles.avatarInnerCircle}>
                {avatarUri ? (
                  <Image
                    source={{ uri: avatarUri }}
                    style={styles.avatarImage}
                  />
                ) : (
                  <Ionicons name="camera" size={38} color="#00204A" />
                )}
              </View>
            </View>
            <View style={styles.avatarPlusBadge}>
              <Ionicons name="add" size={18} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Form Fields Section */}
        <View style={styles.formSection}>
          {/* 1. Full Name */}
          <Field
            leftIcon="person-outline"
            value={form.name}
            onChangeText={(t) => updateForm("name", t)}
            placeholder="Full Name"
            error={profileErrors.name}
          />

          {/* 2. Email ID */}
          <Field
            leftIcon="mail-outline"
            value={form.email}
            onChangeText={(t) => updateForm("email", t)}
            placeholder="Email ID"
            keyboardType="email-address"
            autoCapitalize="none"
            error={profileErrors.email}
          />

          {/* 3. PAN Number */}
          <Field
            leftIcon="card-outline"
            value={form.pan}
            onChangeText={(t) => updateForm("pan", t.toUpperCase())}
            placeholder="PAN Number"
            autoCapitalize="characters"
            maxLength={10}
            error={profileErrors.pan}
          />

          {/* 4. Aadhaar Number */}
          <Field
            leftIcon="newspaper-outline"
            value={form.aadhaar}
            onChangeText={(t) => updateForm("aadhaar", t)}
            placeholder="Aadhaar Number"
            keyboardType="numeric"
            maxLength={14}
            error={profileErrors.aadhaar}
          />

          {/* 5. Date of Birth */}
          <Field
            leftIcon="calendar-outline"
            value={form.dob}
            onChangeText={handleDobChange}
            placeholder="Date of Birth (DD-MM-YYYY)"
            keyboardType="number-pad"
            maxLength={10}
            rightIcon="calendar-outline"
            onRightIconPress={openCalendarModal}
            error={profileErrors.dob}
          />

          {/* 6. Customer Type Dropdown */}
          <View style={styles.fieldContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowCustomerTypeModal(true)}
              style={[
                styles.inputBox,
                profileErrors.customerType ? { borderColor: "#DC2626" } : null,
              ]}
            >
              <Ionicons
                name="briefcase-outline"
                size={20}
                color="#F97316"
                style={styles.leftIcon}
              />
              <Text
                style={[
                  styles.dropdownText,
                  !form.customerType && { color: "#94A3B8" },
                ]}
              >
                {form.customerType || "Customer Type"}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setShowCustomerTypeModal(true)}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                style={styles.rightIconTouch}
              >
                <Ionicons
                  name="chevron-down"
                  size={20}
                  color="#64748B"
                />
              </TouchableOpacity>
            </TouchableOpacity>
            {profileErrors.customerType ? (
              <Text style={styles.errorText}>{profileErrors.customerType}</Text>
            ) : null}
          </View>

          {/* 7. Current Address */}
          <Field
            leftIcon="location-outline"
            value={form.address}
            onChangeText={(t) => updateForm("address", t)}
            placeholder="Current Address"
            error={profileErrors.address}
          />

          {/* 8. Create Password */}
          <Field
            leftIcon="lock-closed-outline"
            value={form.password}
            onChangeText={(t) => updateForm("password", t)}
            placeholder="Create Password (min 6 characters)"
            secureTextEntry={!showPassword}
            rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
            onRightIconPress={() => setShowPassword((prev) => !prev)}
            error={profileErrors.password}
          />

          {/* 9. Confirm Password */}
          <Field
            leftIcon="lock-closed-outline"
            value={form.confirmPassword}
            onChangeText={(t) => updateForm("confirmPassword", t)}
            placeholder="Confirm Password"
            secureTextEntry={!showConfirmPassword}
            rightIcon={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
            onRightIconPress={() => setShowConfirmPassword((prev) => !prev)}
            error={profileErrors.confirmPassword}
          />

          {/* Register CTA Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleCreateProfile}
            disabled={profileLoading}
            style={styles.submitBtnOrange}
          >
            {profileLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.submitBtnText}>Register</Text>
            )}
          </TouchableOpacity>

          {/* Already have an account? Login */}
          <View style={styles.loginRow}>
            <Text style={styles.alreadyText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
              <Text style={styles.loginLinkText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Calendar Modal */}
      <Modal
        visible={showDatePicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.calendarModalContent,
              { backgroundColor: colors.backgroundElement },
            ]}
          >
            {/* Modal Header */}
            <View style={styles.calendarHeader}>
              <Text style={[styles.calendarTitle, { color: "#083B75" }]}>
                Select Date of Birth
              </Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name="close"
                  size={22}
                  color="#64748B"
                />
              </TouchableOpacity>
            </View>

            {/* Month & Year Bar */}
            <View style={styles.monthYearNav}>
              <TouchableOpacity
                onPress={() => {
                  if (pickerMonth === 0) {
                    setPickerMonth(11);
                    setPickerYear((y) => y - 1);
                  } else {
                    setPickerMonth((m) => m - 1);
                  }
                }}
                style={styles.navArrow}
              >
                <Ionicons name="chevron-back" size={18} color="#083B75" />
              </TouchableOpacity>

              <View style={styles.monthYearDisplay}>
                <Text style={[styles.monthYearText, { color: "#083B75" }]}>
                  {months[pickerMonth]} {pickerYear}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  if (pickerMonth === 11) {
                    setPickerMonth(0);
                    setPickerYear((y) => y + 1);
                  } else {
                    setPickerMonth((m) => m + 1);
                  }
                }}
                style={styles.navArrow}
              >
                <Ionicons name="chevron-forward" size={18} color="#083B75" />
              </TouchableOpacity>
            </View>

            {/* Fast Year Switcher Chips */}
            <View style={styles.yearQuickRow}>
              {[-10, -5, +5, +10].map((offset) => (
                <TouchableOpacity
                  key={offset}
                  onPress={() => setPickerYear((y) => y + offset)}
                  style={styles.yearChip}
                >
                  <Text style={styles.yearChipText}>
                    {offset > 0 ? `+${offset}` : offset} Yrs
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Weekday headers */}
            <View style={styles.weekdaysRow}>
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <Text key={d} style={styles.weekdayText}>
                  {d}
                </Text>
              ))}
            </View>

            {/* Days Grid */}
            <View style={styles.daysGrid}>
              {Array.from({
                length: new Date(pickerYear, pickerMonth, 1).getDay(),
              }).map((_, i) => (
                <View key={`empty-${i}`} style={styles.dayCellEmpty} />
              ))}

              {Array.from({
                length: new Date(pickerYear, pickerMonth + 1, 0).getDate(),
              }).map((_, i) => {
                const dayNum = i + 1;
                const isSelected = pickerDay === dayNum;
                return (
                  <TouchableOpacity
                    key={`day-${dayNum}`}
                    onPress={() => setPickerDay(dayNum)}
                    style={[
                      styles.dayCell,
                      isSelected && {
                        backgroundColor: "#083B75",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayCellText,
                        {
                          color: isSelected
                            ? "#FFFFFF"
                            : colors.text,
                        },
                      ]}
                    >
                      {dayNum}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Modal Action Buttons */}
            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                onPress={() => setShowDatePicker(false)}
                style={[
                  styles.modalCancelBtn,
                  { borderColor: "#BFDBFE" },
                ]}
              >
                <Text style={[styles.modalCancelText, { color: colors.text }]}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={confirmCalendarDate}
                style={[
                  styles.modalConfirmBtn,
                  { backgroundColor: "#F97316" },
                ]}
              >
                <Text style={styles.modalConfirmText}>Apply Date</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Customer Type Selection Modal */}
      <Modal
        visible={showCustomerTypeModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCustomerTypeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.customerTypeModalContent}>
            <View style={styles.calendarHeader}>
              <Text style={[styles.calendarTitle, { color: "#00204A" }]}>
                Select Customer Type
              </Text>
              <TouchableOpacity
                onPress={() => setShowCustomerTypeModal(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close" size={22} color="#64748B" />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={{ maxHeight: 380 }}
              showsVerticalScrollIndicator={false}
            >
              {CUSTOMER_TYPES.map((type) => {
                const isSelected = form.customerType === type;
                return (
                  <TouchableOpacity
                    key={type}
                    activeOpacity={0.7}
                    onPress={() => {
                      updateForm("customerType", type);
                      setShowCustomerTypeModal(false);
                    }}
                    style={[
                      styles.customerTypeOption,
                      isSelected && styles.customerTypeOptionSelected,
                    ]}
                  >
                    <View style={styles.customerTypeOptionLeft}>
                      <Ionicons
                        name={isSelected ? "checkmark-circle" : "ellipse-outline"}
                        size={20}
                        color={isSelected ? "#F97316" : "#94A3B8"}
                        style={{ marginRight: 12 }}
                      />
                      <Text
                        style={[
                          styles.customerTypeOptionText,
                          isSelected && styles.customerTypeOptionTextSelected,
                        ]}
                      >
                        {type}
                      </Text>
                    </View>
                    {isSelected && (
                      <View style={styles.selectedBadge}>
                        <Text style={styles.selectedBadgeText}>Selected</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );;
}

interface FieldProps
  extends Omit<
    TextInputProps,
    "value" | "onChangeText" | "placeholder" | "style"
  > {
  label?: string;
  leftIcon?: IconName;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  rightIcon?: IconName;
  onRightIconPress?: () => void;
  error?: string;
}

function Field({
  label,
  leftIcon,
  value,
  onChangeText,
  placeholder,
  rightIcon,
  onRightIconPress,
  error,
  keyboardType,
  maxLength,
  ...props
}: FieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.fieldContainer}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        style={[
          styles.inputBox,
          {
            borderColor: error
              ? "#DC2626"
              : isFocused
              ? "#F97316"
              : "#E2E8F0",
            borderWidth: isFocused ? 1.5 : 1,
          },
        ]}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color="#F97316"
            style={styles.leftIcon}
          />
        )}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          keyboardType={keyboardType}
          maxLength={maxLength}
          {...props}
        />
        {rightIcon &&
          (onRightIconPress ? (
            <TouchableOpacity
              onPress={onRightIconPress}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.rightIconTouch}
            >
              <Ionicons name={rightIcon} size={20} color="#64748B" />
            </TouchableOpacity>
          ) : (
            <Ionicons
              name={rightIcon}
              size={18}
              color="#64748B"
              style={styles.rightIcon}
            />
          ))}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
  profileScroll: {
    flexGrow: 1,
  },
  waveHeaderWrapper: {
    height: 195,
    width: "100%",
    position: "relative",
  },
  waveHeaderContent: {
    paddingHorizontal: 20,
  },
  backBtnWhite: {
    width: 40,
    height: 40,
    justifyContent: "center",
    marginBottom: 4,
  },
  headerTextGroup: {
    marginTop: 2,
  },
  headerTitleWhite: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.3,
  },
  avatarSection: {
    alignItems: "center",
    marginTop: -45,
    marginBottom: 16,
    zIndex: 10,
  },
  avatarWrap: {
    position: "relative",
  },
  avatarOuterRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 1.5,
    borderColor: "#94A3B8",
    borderStyle: "dashed",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#00204A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarInnerCircle: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarPlusBadge: {
    position: "absolute",
    right: 2,
    bottom: 2,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#F97316",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  formSection: {
    gap: 2,
    paddingHorizontal: 20,
  },
  fieldContainer: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    color: "#0F274A",
  },
  inputBox: {
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  leftIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    height: "100%",
    color: "#0F172A",
  },
  rightIcon: {
    marginLeft: 8,
  },
  rightIconTouch: {
    marginLeft: 8,
    padding: 4,
  },
  submitBtnOrange: {
    backgroundColor: "#F97316",
    height: 54,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  submitBtnText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingBottom: 20,
  },
  alreadyText: {
    fontSize: 14,
    color: "#0F274A",
    fontWeight: "500",
  },
  loginLinkText: {
    fontSize: 14,
    color: "#F97316",
    fontWeight: "700",
  },
  dropdownText: {
    flex: 1,
    fontSize: 15,
    color: "#0F172A",
    fontWeight: "500",
  },
  customerTypeModalContent: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  customerTypeOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 4,
  },
  customerTypeOptionSelected: {
    backgroundColor: "#FFF7ED",
  },
  customerTypeOptionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  customerTypeOptionText: {
    fontSize: 15,
    color: "#334155",
    fontWeight: "500",
  },
  customerTypeOptionTextSelected: {
    color: "#F97316",
    fontWeight: "700",
  },
  selectedBadge: {
    backgroundColor: "#FFEDD5",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  selectedBadgeText: {
    fontSize: 11,
    color: "#EA580C",
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  calendarModalContent: {
    width: "100%",
    maxWidth: 360,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  monthYearNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F0F4FA",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  navArrow: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: "#E2EDFB",
  },
  monthYearDisplay: {
    alignItems: "center",
  },
  monthYearText: {
    fontSize: 16,
    fontWeight: "700",
  },
  yearQuickRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
    gap: 6,
  },
  yearChip: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  yearChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#083B75",
  },
  weekdaysRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  weekdayText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
    width: 38,
    textAlign: "center",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginBottom: 18,
  },
  dayCellEmpty: {
    width: "14.28%",
    height: 38,
  },
  dayCell: {
    width: "14.28%",
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  dayCellText: {
    fontSize: 14,
    fontWeight: "600",
  },
  modalButtonsRow: {
    flexDirection: "row",
    gap: 12,
  },
  modalCancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  modalCancelText: {
    fontSize: 15,
    fontWeight: "600",
  },
  modalConfirmBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  modalConfirmText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
