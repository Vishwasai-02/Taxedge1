import { Tabs } from "expo-router";
import { useTheme } from "../../hooks/use-theme";
import { FloatingTabBar } from "../../components/FloatingTabBar";

/**
 * The default tab bar is replaced by <FloatingTabBar> through the `tabBar`
 * prop, so routing still comes from expo-router / React Navigation - there is
 * no second navigation system. Screens keep their own names and paths.
 *
 * Every screen wraps its content in <ScreenLayout>, which supplies the shared
 * header and the bottom padding that clears the floating bar.
 */
export default function MainLayout() {
  const colors = useTheme();

  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        // Screens own their bottom clearance through SCREEN_BOTTOM_PADDING,
        // so the scene itself is full-bleed and never resizes between tabs.
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="applications" options={{ title: "Applications" }} />
      <Tabs.Screen name="documents" options={{ title: "Documents" }} />
      <Tabs.Screen name="payments" options={{ title: "Payments" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      {/* Nested route: reachable by navigation, not shown in the tab bar. */}
      <Tabs.Screen name="gst" options={{ href: null }} />
      {/* Exclude adjacent style files from route registration */}
      <Tabs.Screen name="home.styles" options={{ href: null }} />
      <Tabs.Screen name="applications.styles" options={{ href: null }} />
      <Tabs.Screen name="documents.styles" options={{ href: null }} />
      <Tabs.Screen name="payments.styles" options={{ href: null }} />
      <Tabs.Screen name="profile.styles" options={{ href: null }} />
    </Tabs>
  );
}
