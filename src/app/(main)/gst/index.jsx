import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../../hooks/use-theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function GstScreen() {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top, paddingBottom: insets.bottom }] }>
      <Text style={{ color: colors.text, fontSize: 24 }}>GST Service</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
