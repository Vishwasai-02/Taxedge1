import { Image } from "expo-image";
import * as SplashScreen from "expo-splash-screen";
import React, { useState } from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import Animated, { Easing, Keyframe } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

const INITIAL_SCALE_FACTOR = Dimensions.get("screen").height / 90;
const DURATION = 3500;

export function AnimatedSplashOverlay() {
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const splashKeyframe = new Keyframe({
    0: {
      opacity: 1,
      transform: [{ scale: 1 }],
    },
    30: {
      opacity: 1,
      transform: [{ scale: 1.05 }],
    },
    100: {
      opacity: 0,
      transform: [{ scale: 0.95 }],
      easing: Easing.out(Easing.ease),
    },
  });

  const renderContent = () => (
    <View style={styles.splashContent}>
      <Image
        style={styles.splashLogo}
        source={require("../../assets/images/logo.png")}
        contentFit="contain"
      />
      <Text style={styles.splashTitle}>TAXEDGE</Text>
      <Text style={styles.splashSubtitle}>FIN SOLUTIONS</Text>
      
      {/* Orange accent line */}
      <View style={styles.accentLine} />

      <Text style={styles.splashFooter}>GST  •  ITR  •  LOANS  •  INSURANCE</Text>
    </View>
  );

  return animate ? (
    <Animated.View
      entering={splashKeyframe.duration(DURATION).withCallback((finished) => {
        "worklet";
        if (finished) {
          scheduleOnRN(setVisible, false);
        }
      })}
      style={styles.splashOverlay}
    >
      {renderContent()}
    </Animated.View>
  ) : (
    <View
      onLayout={() => {
        SplashScreen.hideAsync().finally(() => {
          setAnimate(true);
        });
      }}
      style={styles.splashOverlay}
    >
      {renderContent()}
    </View>
  );
}

const keyframe = new Keyframe({
  0: {
    transform: [{ scale: INITIAL_SCALE_FACTOR }],
  },
  100: {
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

const logoKeyframe = new Keyframe({
  0: {
    transform: [{ scale: 1.3 }],
    opacity: 0,
  },
  40: {
    transform: [{ scale: 1.3 }],
    opacity: 0,
    easing: Easing.elastic(0.7),
  },
  100: {
    opacity: 1,
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

const glowKeyframe = new Keyframe({
  0: {
    transform: [{ rotateZ: "0deg" }],
  },
  100: {
    transform: [{ rotateZ: "7200deg" }],
  },
});

export function AnimatedIcon() {
  return (
    <View style={styles.iconContainer}>
      <Animated.View
        entering={glowKeyframe.duration(60 * 1000 * 4)}
        style={styles.glow}
      >
        <Image
          style={styles.glow}
          source={require("../../assets/images/logo-glow.png")}
        />
      </Animated.View>

      <Animated.View
        entering={keyframe.duration(DURATION)}
        style={styles.background}
      />
      <Animated.View
        style={styles.imageContainer}
        entering={logoKeyframe.duration(DURATION)}
      >
        <Image
          style={styles.image}
          source={require("../../assets/images/logo.png")}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  glow: {
    width: 201,
    height: 201,
    position: "absolute",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 128,
    height: 128,
    zIndex: 100,
  },
  image: {
    width: 76,
    height: 71,
  },
  background: {
    borderRadius: 40,
    experimental_backgroundImage: `linear-gradient(180deg, #3C9FFE, #0274DF)`,
    width: 128,
    height: 128,
    position: "absolute",
  },
  splashOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "#083B75", // Deep Dark Blue Background
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  splashContent: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  splashLogo: {
    width: 130,
    height: 130,
    borderRadius: 28,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  splashTitle: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 4,
  },
  splashSubtitle: {
    color: "#F97316", // Accent Orange Color
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 6,
    marginTop: 6,
    paddingLeft: 6, // to balance the letterSpacing offset on the right
  },
  accentLine: {
    width: 60,
    height: 3,
    backgroundColor: "#F97316",
    borderRadius: 1.5,
    marginTop: 20,
    marginBottom: 20,
  },
  splashFooter: {
    color: "#CBD5E1",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
    position: "absolute",
    bottom: 50,
  },
});
