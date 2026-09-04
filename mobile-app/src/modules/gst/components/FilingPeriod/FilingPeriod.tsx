import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BrandColors } from "../../../../design-system/colors";

export interface FilingPeriodProps {
  period: string;
  selected: boolean;
  onSelect: (period: string) => void;
}

export const FilingPeriod: React.FC<FilingPeriodProps> = ({
  period,
  selected,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onSelect(period)}
      style={[
        styles.chip,
        selected && styles.chipSelected,
      ]}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
        {period}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: BrandColors.BORDER,
    backgroundColor: BrandColors.CARD,
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelected: {
    borderColor: BrandColors.PRIMARY_BLUE_ACCENT,
    backgroundColor: BrandColors.PRIMARY_LIGHT_BLUE,
  },
  chipText: {
    fontSize: 14,
    color: BrandColors.TEXT_PRIMARY,
    fontWeight: "500",
  },
  chipTextSelected: {
    color: BrandColors.PRIMARY_BLUE_ACCENT,
    fontWeight: "700",
  },
});

export default FilingPeriod;
