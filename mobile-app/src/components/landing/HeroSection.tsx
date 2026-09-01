import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export function HeroSection() {
  return (
    <View style={styles.container}>
      {/* 1. Base Layer: Hero Image */}
      <Image
        source={require("../../../assets/images/taxedge-hero.png")}
        style={styles.heroImage}
        resizeMode="cover"
      />

      {/* 2. Top-Left Layer: TaxEdge Logo */}
      <View style={styles.brandingContainer}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.brandTextContainer}>
          <Text style={styles.brandTitle}>TAXEDGE</Text>
          <Text style={styles.brandSubtitle}>FIN SOLUTIONS</Text>
        </View>
      </View>

      {/* 3. Bottom-Left Layer: "Expert CA & Tax Professionals" Pill Badge */}
      <View style={styles.expertBadge}>
        <View style={styles.orangeDot} />
        <Text style={styles.badgeText}>Expert CA & Tax Professionals</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    position: "relative",
  },
  heroImage: {
    width: "100%",
    aspectRatio: 473 / 410,
  },
  brandingContainer: {
    position: "absolute",
    top: 12,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logo: {
    width: 38,
    height: 38,
    borderRadius: 8,
  },
  brandTextContainer: {
    justifyContent: "center",
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#082042",
    letterSpacing: 1.5,
  },
  brandSubtitle: {
    fontSize: 7,
    fontWeight: "700",
    color: "#475569",
    letterSpacing: 2.2,
    marginTop: 1,
  },
  expertBadge: {
    position: "absolute",
    bottom: 12,
    left: 16,
    backgroundColor: "#0A2244",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  orangeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#F97316",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: -0.1,
  },
});
