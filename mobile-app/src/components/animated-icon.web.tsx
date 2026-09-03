import React, { useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";

export interface AnimatedSplashOverlayProps {
  onFinish?: () => void;
}

export function AnimatedSplashOverlay({ onFinish }: AnimatedSplashOverlayProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish?.();
    }, 2650);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return null;
}

export function AnimatedIcon() {
  return (
    <View style={styles.iconFallbackContainer}>
      <Image
        style={styles.iconFallbackImage}
        source={require("../../assets/images/logo.png")}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconFallbackContainer: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  iconFallbackImage: {
    width: 60,
    height: 60,
  },
});
