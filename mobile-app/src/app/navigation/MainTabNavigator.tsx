import React from "react";
import { Tabs } from "expo-router";

export function MainTabNavigator() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="applications" />
      <Tabs.Screen name="documents" />
      <Tabs.Screen name="payments" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

export default MainTabNavigator;
