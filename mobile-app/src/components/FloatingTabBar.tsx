import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
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

export const FLOATING_TAB_HEIGHT = 68;
export const FLOATING_TAB_GAP = 12;

const ACTIVE_BG = "rgba(255,255,255,0.97)";
const ACTIVE_FG = "#123B70";
const INACTIVE_FG = "rgba(255,255,255,0.72)";

const HIDDEN_FROM_BAR = new Set(["gst"]);

export interface TabMeta {
  label?: string;
  icon: IconName;
  iconOutline: IconName;
  lucide?: string;
}

const FALLBACK_META: TabMeta = {
  icon: "ellipse",
  iconOutline: "ellipse-outline",
};

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
  applications: { label: "Applications", icon: "grid", iconOutline: "grid-outline", lucide: "LayoutGrid" },
  documents: { label: "Documents", icon: "document-text", iconOutline: "document-text-outline", lucide: "FileText" },
  payments: { label: "Payment", icon: "card", iconOutline: "card-outline", lucide: "CreditCard" },
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
        size={19}
        color={isFocused ? ACTIVE_FG : INACTIVE_FG}
      />
      <Text
        numberOfLines={1}
        style={[
          styles.tabLabel,
          {
            color: isFocused ? ACTIVE_FG : INACTIVE_FG,
            fontWeight: isFocused ? "700" : "500",
          },
        ]}
      >
        {label}
      </Text>
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
          const options = descriptors[route.key].options as
            BottomTabNavigationOptions & { href?: Href | null };
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

    // Glass: translucent navy + hairline highlight.
    backgroundColor: "rgba(9,38,72,0.85)",
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

  tabInactive: {
    flex: 1,
    minWidth: 0,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
  },

  tabActive: {
    flex: 1,
    minWidth: 0,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
    borderRadius: 20,
    backgroundColor: ACTIVE_BG,
  },

  tabLabel: {
    fontSize: 9.5,
    marginTop: 2,
    textAlign: "center",
    letterSpacing: -0.2,
  },
});
