import React from "react";
import { Stack } from "expo-router";

export function GSTNavigator() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="gst" />
      <Stack.Screen name="gst-registration" />
      <Stack.Screen name="gst-filing" />
      <Stack.Screen name="gst-compliance" />
      <Stack.Screen name="gst-amendment" />
      <Stack.Screen name="gst-cancellation" />
      <Stack.Screen name="gst-certificate" />
    </Stack>
  );
}

export default GSTNavigator;
