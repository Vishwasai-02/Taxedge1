import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const TdsInfoBanner: React.FC = () => {
  return (
    <View style={styles.banner}>
      <View style={styles.iconCircle}>
        <Ionicons name="information" size={20} color="#EA580C" />
      </View>

      <Text style={styles.text}>
        Only the documents relevant to your refund claim will be requested in the next steps.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#FFF7ED",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FED7AA",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    marginBottom: 10,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#FED7AA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  text: {
    flex: 1,
    fontSize: 12.5,
    color: "#0B1F3A",
    lineHeight: 17,
    fontWeight: "500",
  },
});
