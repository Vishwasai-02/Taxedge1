import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../../../design-system/colors";
import { formatCurrencyINR } from "../../../../shared/formatters/currencyFormatter";
import type { CompanyTypeOption } from "../../services/companyRegistrationService";

export interface CompanyTypeCardProps {
  item: CompanyTypeOption;
  selected: boolean;
  onSelect: (item: CompanyTypeOption) => void;
}

export const CompanyTypeCard: React.FC<CompanyTypeCardProps> = ({
  item,
  selected,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onSelect(item)}
      style={[
        styles.card,
        selected && styles.cardSelected,
      ]}
    >
      <View style={styles.headerRow}>
        <View style={styles.titleCol}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <Ionicons
          name={selected ? "checkmark-circle" : "ellipse-outline"}
          size={24}
          color={selected ? BrandColors.PRIMARY_ORANGE : BrandColors.TEXT_MUTED}
        />
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={14} color={BrandColors.TEXT_SECONDARY} />
          <Text style={styles.metaText}>{item.timeline}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="people-outline" size={14} color={BrandColors.TEXT_SECONDARY} />
          <Text style={styles.metaText}>Min {item.minMembers} Members</Text>
        </View>
        <Text style={styles.feeText}>{formatCurrencyINR(item.fee)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: BrandColors.CARD,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1.5,
    borderColor: BrandColors.BORDER,
    marginBottom: 12,
  },
  cardSelected: {
    borderColor: BrandColors.PRIMARY_BLUE_ACCENT,
    backgroundColor: BrandColors.PRIMARY_LIGHT_BLUE,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  titleCol: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
  },
  description: {
    fontSize: 13,
    color: BrandColors.TEXT_SECONDARY,
    marginTop: 4,
    lineHeight: 18,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: BrandColors.TEXT_SECONDARY,
    fontWeight: "500",
  },
  feeText: {
    fontSize: 15,
    fontWeight: "700",
    color: BrandColors.PRIMARY_ORANGE,
  },
});

export default CompanyTypeCard;
