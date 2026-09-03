import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const VerificationStatusCard: React.FC = () => {
  return (
    <View style={styles.card}>
      <View style={styles.iconCircle}>
        <Ionicons name="search" size={20} color="#FFFFFF" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Currently Under Verification</Text>
        <Text style={styles.description}>
          Our Tax Executive is reviewing your submitted documents and validating the refund computation.
          {"\n\n"}
          You don’t need to take any action at this stage.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF7ED",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FED7AA",
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#EA580C",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14.5,
    fontWeight: "700",
    color: "#EA580C",
  },
  description: {
    fontSize: 12,
    color: "#0B1F3A",
    lineHeight: 17,
    marginTop: 4,
    fontWeight: "400",
  },
});
