import React from "react";
import { View, StyleSheet } from "react-native";
import { INCOME_TYPES, IncomeTypeOption, IncomeTypeKey } from "../types/incomeTypes";
import { IncomeTypeCard } from "./IncomeTypeCard";

interface IncomeTypeGridProps {
  selectedId: IncomeTypeKey | null;
  onSelect: (item: IncomeTypeOption) => void;
}

export const IncomeTypeGrid: React.FC<IncomeTypeGridProps> = ({
  selectedId,
  onSelect,
}) => {
  // Render rows of 2 columns
  const rows: IncomeTypeOption[][] = [];
  for (let i = 0; i < INCOME_TYPES.length; i += 2) {
    rows.push(INCOME_TYPES.slice(i, i + 2));
  }

  return (
    <View style={styles.gridContainer}>
      {rows.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((item) => (
            <IncomeTypeCard
              key={item.id}
              item={item}
              isSelected={selectedId === item.id}
              onPress={() => onSelect(item)}
            />
          ))}
          {/* In case of odd count, render placeholder */}
          {row.length === 1 && <View style={styles.placeholderCard} />}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    gap: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  placeholderCard: {
    flex: 1,
  },
});
