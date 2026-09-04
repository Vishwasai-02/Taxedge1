import React from "react";
import { Stack } from "expo-router";

export function LoansNavigator() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="loans" />
      <Stack.Screen name="personal-loan" />
      <Stack.Screen name="business-loan" />
      <Stack.Screen name="home-loan" />
      <Stack.Screen name="working-capital" />
    </Stack>
  );
}

export default LoansNavigator;
