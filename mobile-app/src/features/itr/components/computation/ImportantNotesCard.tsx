import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const ImportantNotesCard: React.FC = () => {
  const notes = [
    "Review your income and deductions carefully.",
    "Verify all uploaded documents.",
    "Once approved, the return will be filed with the Income Tax Department.",
    "Changes cannot be made after filing without submitting a Revised ITR.",
  ];

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Ionicons name="alert" size={16} color="#FFFFFF" />
        </View>
        <Text style={styles.title}>Important</Text>
      </View>

      {/* Bullets */}
      <View style={styles.bulletsList}>
        {notes.map((note, index) => (
          <View key={index} style={styles.bulletRow}>
            <View style={styles.orangeDot} />
            <Text style={styles.bulletText}>{note}</Text>
          </View>
        ))}
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
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F97316",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  bulletsList: {
    gap: 8,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  orangeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#F97316",
    marginRight: 8,
    marginTop: 6,
  },
  bulletText: {
    fontSize: 12,
    color: "#0B1F3A",
    lineHeight: 17,
    flex: 1,
    fontWeight: "500",
  },
});
