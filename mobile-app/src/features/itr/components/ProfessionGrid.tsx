import React from "react";
import { View, StyleSheet } from "react-native";
import { ProfessionOption } from "../types/profession.types";
import { ProfessionCard } from "./ProfessionCard";

interface ProfessionGridProps {
  options: ProfessionOption[];
  selectedId: string | null;
  onSelect: (item: ProfessionOption) => void;
}

export const ProfessionGrid: React.FC<ProfessionGridProps> = ({
  options,
  selectedId,
  onSelect,
}) => {
  return (
    <View style={styles.grid}>
      {options.map((option) => (
        <ProfessionCard
          key={option.id}
          item={option}
          isSelected={selectedId === option.id}
          onSelect={onSelect}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 14,
  },
});
