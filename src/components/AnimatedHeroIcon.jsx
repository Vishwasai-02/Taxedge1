import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";

/**
 * Decorative badge for the home header.
 * A soft halo pulses outward while the glyph inside cycles through the
 * core service icons with a fade + scale cross-dissolve.
 */
const CYCLE_ICONS = ["receipt", "calculator", "wallet", "shield-checkmark", "business"];

const SWAP_INTERVAL = 2200;
const FADE_OUT = 240;
const FADE_IN = 280;

export function AnimatedHeroIcon({ size = 56, color = "#FFFFFF" }) {
  const [index, setIndex] = useState(0);

  const halo = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const swapTimeout = useRef(null);

  useEffect(() => {
    halo.value = withRepeat(
      withTiming(1, { duration: 1900, easing: Easing.out(Easing.ease) }),
      -1,
      false
    );
  }, [halo]);

  useEffect(() => {
    const interval = setInterval(() => {
      opacity.value = withTiming(0, { duration: FADE_OUT });
      scale.value = withTiming(0.55, { duration: FADE_OUT });

      swapTimeout.current = setTimeout(() => {
        setIndex((i) => (i + 1) % CYCLE_ICONS.length);
        opacity.value = withTiming(1, { duration: FADE_IN });
        scale.value = withTiming(1, { duration: FADE_IN, easing: Easing.out(Easing.back(1.6)) });
      }, FADE_OUT + 20);
    }, SWAP_INTERVAL);

    return () => {
      clearInterval(interval);
      if (swapTimeout.current) clearTimeout(swapTimeout.current);
    };
  }, [opacity, scale]);

  const haloStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + halo.value * 0.5 }],
    opacity: 0.32 * (1 - halo.value),
  }));

  const glyphStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const ring = { width: size, height: size, borderRadius: size / 2 };

  return (
    <View style={[styles.wrap, ring]} pointerEvents="none">
      <Animated.View style={[styles.halo, ring, haloStyle]} />
      <View style={[styles.badge, ring]}>
        <Animated.View style={glyphStyle}>
          <Ionicons name={CYCLE_ICONS[index]} size={size * 0.44} color={color} />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    justifyContent: "center",
    alignItems: "center",
  },
  halo: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
  },
  badge: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.16)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.28)",
  },
});
