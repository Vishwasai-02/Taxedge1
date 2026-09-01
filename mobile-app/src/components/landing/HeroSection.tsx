import React from "react";
import { View, Image, StyleSheet } from "react-native";

export function HeroSection() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/taxedge-hero.png")}
        style={styles.heroImage}
        resizeMode="cover"
      />
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
  },
  heroImage: {
    width: "100%",
    aspectRatio: 473 / 410,
  },
});
