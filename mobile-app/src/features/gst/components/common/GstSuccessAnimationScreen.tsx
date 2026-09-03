import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../../../shared/theme";

interface GstSuccessAnimationScreenProps {
  title: string;
  subtitle: string;
  iconType?: "checkmark" | "certificate" | "reprint";
  onBackPress?: () => void;
}

export const GstSuccessAnimationScreen: React.FC<GstSuccessAnimationScreenProps> = ({
  title,
  subtitle,
  iconType = "checkmark",
  onBackPress,
}) => {
  const router = useRouter();

  // Animation values
  const scaleAnim = useRef(new Animated.Value(0.6)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const rippleAnim = useRef(new Animated.Value(0.8)).current;
  const rippleOpacity = useRef(new Animated.Value(0.4)).current;
  const contentAnim = useRef(new Animated.Value(20)).current;
  const btnScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(contentAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.parallel([
          Animated.timing(rippleAnim, {
            toValue: 1.3,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(rippleOpacity, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, []);

  const handlePress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.replace("/service/gst");
    }
  };

  const onPressIn = () => {
    Animated.spring(btnScale, { toValue: 0.97, useNativeDriver: true }).start();
  };

  const onPressOut = () => {
    Animated.spring(btnScale, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrap}>
        {/* Animated Icon Circle with Concentric Blue Ripples */}
        <View style={styles.iconContainer}>
          {/* Ripple Ring 1 */}
          <Animated.View
            style={[
              styles.rippleRing,
              styles.rippleOuter,
              {
                transform: [{ scale: rippleAnim }],
                opacity: rippleOpacity,
              },
            ]}
          />
          {/* Ripple Ring 2 */}
          <View style={[styles.rippleRing, styles.rippleMiddle]} />
          {/* Ripple Ring 3 */}
          <View style={[styles.rippleRing, styles.rippleInner]} />

          {/* Main Visual Circle */}
          <Animated.View
            style={[
              styles.mainIconCircle,
              {
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim,
              },
            ]}
          >
            {iconType === "certificate" ? (
              <View style={styles.certIconContainer}>
                <Ionicons name="document-text" size={48} color="#2563EB" />
                <View style={styles.certBadge}>
                  <Ionicons name="arrow-down" size={16} color="#FFFFFF" />
                </View>
              </View>
            ) : iconType === "reprint" ? (
              <View style={styles.reprintContainer}>
                <Ionicons name="checkmark-circle" size={56} color="#2563EB" />
                <View style={styles.planeIcon}>
                  <Ionicons name="paper-plane" size={20} color="#3B82F6" />
                </View>
              </View>
            ) : (
              <Ionicons name="checkmark" size={46} color="#2563EB" />
            )}
          </Animated.View>
        </View>

        {/* Text Content */}
        <Animated.View
          style={[
            styles.textCol,
            {
              transform: [{ translateY: contentAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </Animated.View>
      </View>

      {/* Single-Line Centered Orange CTA Button */}
      <Animated.View style={{ transform: [{ scale: btnScale }], width: "100%" }}>
        <TouchableOpacity
          style={styles.orangeBtn}
          activeOpacity={0.9}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={handlePress}
        >
          <Text style={styles.btnText}>Back to GST Services</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 24,
    paddingVertical: 36,
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  iconContainer: {
    width: 180,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
  },
  rippleRing: {
    position: "absolute",
    borderRadius: 999,
  },
  rippleOuter: {
    width: 170,
    height: 170,
    backgroundColor: "#DBEAFE",
  },
  rippleMiddle: {
    width: 140,
    height: 140,
    backgroundColor: "#EFF6FF",
  },
  rippleInner: {
    width: 110,
    height: 110,
    backgroundColor: "#F0F7FF",
  },
  mainIconCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#3B82F6",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  certIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  certBadge: {
    position: "absolute",
    right: -6,
    bottom: -6,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },
  reprintContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  planeIcon: {
    position: "absolute",
    right: -14,
    top: -14,
  },
  textCol: {
    alignItems: "center",
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: BrandColors.TEXT_PRIMARY,
    textAlign: "center",
    marginBottom: 12,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  subtitle: {
    fontSize: 13.5,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 20,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  orangeBtn: {
    width: "100%",
    height: 54,
    borderRadius: 27,
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: BrandColors.PRIMARY_ORANGE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
});
