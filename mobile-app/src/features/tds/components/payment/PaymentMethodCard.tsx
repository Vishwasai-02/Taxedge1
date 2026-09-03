import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PaymentOptionItem } from "../../types/payment.types";

interface PaymentMethodCardProps {
  item: PaymentOptionItem;
  isSelected: boolean;
  onSelect: (id: PaymentOptionItem["id"]) => void;
  disabled?: boolean;
}

export const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  item,
  isSelected,
  onSelect,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => !disabled && onSelect(item.id)}
      disabled={disabled}
      style={[
        styles.card,
        isSelected ? styles.cardSelected : styles.cardUnselected,
        disabled && styles.cardDisabled,
      ]}
    >
      {/* Icon Box */}
      <View style={[styles.iconBox, isSelected ? styles.iconBoxSelected : null]}>
        <Ionicons
          name={item.iconName}
          size={20}
          color={isSelected ? "#F97316" : "#0B1F3A"}
        />
      </View>

      {/* Text Group */}
      <View style={styles.textGroup}>
        <Text style={styles.title}>{item.title}</Text>
        {item.subtitle ? (
          <Text style={styles.subtitle} numberOfLines={2}>
            {item.subtitle}
          </Text>
        ) : null}
      </View>

      {/* Radio Circle */}
      <View
        style={[
          styles.radioOuter,
          isSelected ? styles.radioOuterSelected : styles.radioOuterUnselected,
        ]}
      >
        {isSelected && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1.5,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.02,
        shadowRadius: 3,
      },
      android: {
        elevation: 1,
      },
      default: {},
    }),
  },
  cardSelected: {
    borderColor: "#F97316",
    backgroundColor: "#FFF7ED",
  },
  cardUnselected: {
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  cardDisabled: {
    opacity: 0.75,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#F0F5FA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  iconBoxSelected: {
    backgroundColor: "#FFEDD5",
  },
  textGroup: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  subtitle: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
    lineHeight: 14,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  radioOuterSelected: {
    borderColor: "#F97316",
  },
  radioOuterUnselected: {
    borderColor: "#CBD5E1",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#F97316",
  },
});
