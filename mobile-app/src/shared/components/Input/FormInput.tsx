import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  type KeyboardTypeOptions,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from "react-native";
import { Colors } from "../../../design-system/colors";

export interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  maxLength?: number;
  error?: string | null;
  required?: boolean;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

export function FormInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  secureTextEntry = false,
  maxLength,
  error,
  required = false,
  style,
  inputStyle,
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, { color: Colors.text }]}>
        {label} {required && <Text style={{ color: Colors.error }}>*</Text>}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textSecondary}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          styles.input,
          {
            color: Colors.text,
            backgroundColor: "#F8FAFC",
            borderColor: error
              ? Colors.error
              : isFocused
              ? Colors.primary
              : Colors.border,
          },
          inputStyle,
        ]}
      />

      {error && (
        <Text style={[styles.errorText, { color: Colors.error }]}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    height: 50,
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
});

export default FormInput;
