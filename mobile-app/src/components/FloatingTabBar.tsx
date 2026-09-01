import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { Href } from "expo-router";
import type {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from "expo-router/js-tabs";

import type { IconName } from "../types/domain";

/**
 * Floating glass tab bar.
 *
 * Passed to expo-router's <Tabs tabBar={...}> so it REPLACES the default bar
 * rather than adding a second navigation system - routing, state and history
 * all still come from React Navigation via the `state` / `navigation` props.
 *
 * Icons only - no text is drawn. The active tab is marked by a white capsule
 * that springs across as the route changes; each tab's name is exposed to
 * screen readers through accessibilityLabel instead.
 *
 * Layout is entirely flex-based: every tab is `flex: 1`, so the row divides the
 * bar evenly whatever the tab count and nothing can overflow on a narrow device.
 *
 * NOTE: swapping in expo-blur is a two-line change once it is installed -
 * import { BlurView } from "expo-blur" and replace the <View style={styles.bar}>
 * with <BlurView intensity={40} tint="dark" style={styles.bar}>. Same for
 * lucide-react-native: replace <Ionicons .../> in TabItem with the lucide icon
 * named in TAB_META.lucide.
 */

export const FLOATING_TAB_HEIGHT = 64;
export const FLOATING_TAB_GAP = 12;

const ACTIVE_BG = "rgba(255,255,255,0.97)";
const ACTIVE_FG = "#123B70";
const INACTIVE_FG = "rgba(255,255,255,0.72)";

/* Per-route presentation. `lucide` records the intended lucide icon so the
   swap is mechanical once that package is available. */
/* Routes that exist but are not tabs. */
const HIDDEN_FROM_BAR = new Set(["gst"]);

export interface TabMeta {
  label?: string;
  icon: IconName;
  iconOutline: IconName;
  /** Intended lucide icon, recorded so the swap stays mechanical. */
  lucide?: string;
}

const FALLBACK_META: TabMeta = {
  icon: "ellipse",
  iconOutline: "ellipse-outline",
};

/* A folder route may register as "gst" or "gst/index" depending on how it is
   declared, so try both spellings before falling back to a generic icon.
   A tab is never dropped for a missing entry - that is how GST Index vanished. */
function metaFor(routeName: string): TabMeta {
  return (
    TAB_META[routeName] ??
    TAB_META[routeName.replace(/\/index$/, "")] ??
    TAB_META[routeName.split("/")[0]] ??
    FALLBACK_META
  );
}

const TAB_META: Record<string, TabMeta> = {
  home: { label: "Home", icon: "home", iconOutline: "home-outline", lucide: "House" },
  services: { label: "Services", icon: "grid", iconOutline: "grid-outline", lucide: "LayoutGrid" },
  applications: { label: "Applications", icon: "document-text", iconOutline: "document-text-outline", lucide: "FileText" },
  payments: { label: "Payments", icon: "card", iconOutline: "card-outline", lucide: "CreditCard" },
  profile: { label: "Profile", icon: "person", iconOutline: "person-outline", lucide: "User" },
  gst: { label: "GST Index", icon: "book", iconOutline: "book-outline", lucide: "BookOpen" },
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SPRING = { damping: 18, stiffness: 190, mass: 0.7 };

type TabRoute = BottomTabBarProps["state"]["routes"][number];

interface TabItemProps {
  route: TabRoute;
  isFocused: boolean;
  label: string;
  meta: TabMeta;
  onPress: () => void;
  onLongPress: () => void;
}

function TabItem({
  route,
  isFocused,
  label,
  meta,
  onPress,
  onLongPress,
}: TabItemProps) {
  const pressed = useSharedValue(0);

  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(1 - pressed.value * 0.1, SPRING) }],
  }));

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={label}
      testID={`tab-${route.name}`}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={() => {
        pressed.value = 1;
      }}
      onPressOut={() => {
        pressed.value = 0;
      }}
      layout={LinearTransition.springify().damping(20).stiffness(180)}
      style={[isFocused ? styles.tabActive : styles.tabInactive, pressStyle]}
    >
      <Ionicons
        name={isFocused ? meta.icon : meta.iconOutline}
        size={21}
        color={isFocused ? ACTIVE_FG : INACTIVE_FG}
      />

      {/* Icons only - the label is carried by accessibilityLabel, not drawn. */}
    </AnimatedPressable>
  );
}

export function FloatingTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      pointerEvents="box-none"
      style={[styles.wrap, { bottom: Math.max(insets.bottom, 10) + FLOATING_TAB_GAP }]}
    >
      <View style={styles.bar}>
        <View style={styles.sheen} pointerEvents="none" />

        {state.routes.map((route, index) => {
          // `href` is an expo-router addition on top of the navigator options.
          const options = descriptors[route.key].options as
            BottomTabNavigationOptions & { href?: Href | null };
          // Skip routes expo-router has hidden, and the GST index, which is
          // reachable from the menu and the Quick Services tile instead.
          if (options.href === null) return null;
          if (HIDDEN_FROM_BAR.has(route.name.split("/")[0])) return null;

          const meta = metaFor(route.name);

          const isFocused = state.index === index;
          const label = meta.label ?? options.title ?? route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({ type: "tabLongPress", target: route.key });
          };

          return (
            <TabItem
              key={route.key}
              route={route}
              meta={meta}
              label={label}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    zIndex: 100,
    elevation: 100,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    height: FLOATING_TAB_HEIGHT,
    paddingHorizontal: 6,
    borderRadius: FLOATING_TAB_HEIGHT / 2,
    overflow: "hidden",

    // Glass: translucent navy + hairline highlight. Replace with BlurView
    // once expo-blur is installed; the colours below already read as glass.
    backgroundColor: "rgba(9,38,72,0.72)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.24)",

    shadowColor: "#04203F",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 14,
  },
  sheen: {
    position: "absolute",
    top: 0,
    left: 24,
    right: 24,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.22)",
  },

  /* Inactive tabs divide the leftover space, so the row always fits. */
  tabInactive: {
    flex: 1,
    minWidth: 0,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },

  /* The active capsule sizes to its content and shrinks before it overflows. */
  tabActive: {
    flex: 1,
    minWidth: 0,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 23,
    backgroundColor: ACTIVE_BG,
  },
});
