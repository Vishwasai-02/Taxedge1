import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface KeepDocumentsReadyCardProps {
  assessmentYear?: string;
}

export const KeepDocumentsReadyCard: React.FC<KeepDocumentsReadyCardProps> = ({
  assessmentYear = "AY 2023–24",
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconCircle}>
        <Ionicons name="information" size={20} color="#FFFFFF" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Keep Documents Ready</Text>
        <Text style={styles.description}>
          Ensure the documents are clear, readable and match the selected
          assessment year ({assessmentYear}).
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#EFF6FF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 4,
    marginBottom: 16,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  description: {
    fontSize: 11.5,
    color: "#475569",
    lineHeight: 16.5,
    marginTop: 3,
    fontWeight: "400",
  },
});
