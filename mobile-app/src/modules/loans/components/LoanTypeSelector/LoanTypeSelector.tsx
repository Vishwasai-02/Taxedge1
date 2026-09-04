import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BrandColors } from "../../../../design-system/colors";

export interface LoanTypeSelectorProps {
  types: string[];
  selectedType: string;
  onSelect: (type: string) => void;
}

export const LoanTypeSelector: React.FC<LoanTypeSelectorProps> = ({
  types,
  selectedType,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      {types.map((type) => {
        const isSelected = selectedType === type;
        return (
          <TouchableOpacity
            key={type}
            activeOpacity={0.8}
            onPress={() => onSelect(type)}
            style={[styles.chip, isSelected && styles.chipSelected]}
          >
            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
              {type}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: BrandColors.BORDER,
    backgroundColor: BrandColors.CARD,
  },
  chipSelected: {
    borderColor: BrandColors.PRIMARY_ORANGE,
    backgroundColor: BrandColors.PRIMARY_LIGHT_ORANGE,
  },
  chipText: {
    fontSize: 14,
    color: BrandColors.TEXT_PRIMARY,
    fontWeight: "500",
  },
  chipTextSelected: {
    color: BrandColors.PRIMARY_ORANGE,
    fontWeight: "700",
  },
});

export default LoanTypeSelector;
