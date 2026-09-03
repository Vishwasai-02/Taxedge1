import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Svg, { Path, Rect, Circle, Line } from "react-native-svg";
import { PreviousFilingOption } from "../../types/deductions.types";

interface PreviousFilingOptionCardProps {
  id: PreviousFilingOption;
  title: string;
  subtitle: string;
  iconType: "calendar" | "notice" | "fresh";
  isSelected: boolean;
  onSelect: (id: PreviousFilingOption) => void;
}

export const PreviousFilingOptionCard: React.FC<PreviousFilingOptionCardProps> = ({
  id,
  title,
  subtitle,
  iconType,
  isSelected,
  onSelect,
}) => {
  const renderIcon = () => {
    switch (iconType) {
      case "calendar":
        return (
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Rect x={3} y={5} width={18} height={16} rx={2} stroke="#0B1F3A" strokeWidth={1.8} />
            <Line x1={3} y1={10} x2={21} y2={10} stroke="#0B1F3A" strokeWidth={1.8} />
            <Line x1={8} y1={2} x2={8} y2={6} stroke="#0B1F3A" strokeWidth={1.8} strokeLinecap="round" />
            <Line x1={16} y1={2} x2={16} y2={6} stroke="#0B1F3A" strokeWidth={1.8} strokeLinecap="round" />
            <Circle cx={7.5} cy={13.5} r={1} fill="#F97316" />
            <Circle cx={12} cy={13.5} r={1} fill="#0B1F3A" />
            <Circle cx={16.5} cy={13.5} r={1} fill="#0B1F3A" />
            <Circle cx={7.5} cy={17.5} r={1} fill="#0B1F3A" />
            <Circle cx={12} cy={17.5} r={1} fill="#0B1F3A" />
            <Circle cx={16.5} cy={17.5} r={1} fill="#0B1F3A" />
          </Svg>
        );

      case "notice":
        return (
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
              stroke="#0B1F3A"
              strokeWidth={1.8}
            />
            <Path d="M14 2V8H20" stroke="#0B1F3A" strokeWidth={1.8} />
            <Line x1={8} y1={11} x2={12} y2={11} stroke="#0B1F3A" strokeWidth={1.5} strokeLinecap="round" />
            <Line x1={8} y1={14} x2={11} y2={14} stroke="#0B1F3A" strokeWidth={1.5} strokeLinecap="round" />
            {/* Warning triangle badge */}
            <Path
              d="M16.5 13L21 21H12L16.5 13Z"
              fill="#F97316"
              stroke="#FFFFFF"
              strokeWidth={1}
              strokeLinejoin="round"
            />
            <Line x1={16.5} y1={16} x2={16.5} y2={18} stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" />
            <Circle cx={16.5} cy={19.5} r={0.6} fill="#FFFFFF" />
          </Svg>
        );

      case "fresh":
        return (
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
              stroke="#0B1F3A"
              strokeWidth={1.8}
            />
            <Path d="M14 2V8H20" stroke="#0B1F3A" strokeWidth={1.8} />
            <Line x1={8} y1={11} x2={13} y2={11} stroke="#0B1F3A" strokeWidth={1.5} strokeLinecap="round" />
            <Line x1={8} y1={14} x2={11} y2={14} stroke="#0B1F3A" strokeWidth={1.5} strokeLinecap="round" />
            {/* Plus circular badge */}
            <Circle cx={17} cy={17} r={4.5} fill="#0B1F3A" />
            <Line x1={17} y1={14.5} x2={17} y2={19.5} stroke="#FFFFFF" strokeWidth={1.2} strokeLinecap="round" />
            <Line x1={14.5} y1={17} x2={19.5} y2={17} stroke="#FFFFFF" strokeWidth={1.2} strokeLinecap="round" />
          </Svg>
        );
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onSelect(id)}
      style={[
        styles.card,
        isSelected ? styles.selectedCard : styles.unselectedCard,
      ]}
    >
      <View style={styles.leftGroup}>
        <View style={styles.iconContainer}>{renderIcon()}</View>
        <View style={styles.textGroup}>
          <Text
            style={[
              styles.title,
              isSelected ? styles.selectedTitle : styles.unselectedTitle,
            ]}
          >
            {title}
          </Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      {/* Radio Indicator */}
      <View
        style={[
          styles.radioCircle,
          isSelected && styles.radioCircleSelected,
        ]}
      >
        {isSelected && (
          <Ionicons name="checkmark" size={13} color="#FFFFFF" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
      default: {},
    }),
  },
  unselectedCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.2,
    borderColor: "#E5E7EB",
  },
  selectedCard: {
    backgroundColor: "#FFF7ED",
    borderWidth: 1.8,
    borderColor: "#F97316",
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F8F9FB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textGroup: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: -0.1,
  },
  unselectedTitle: {
    color: "#0B1F3A",
  },
  selectedTitle: {
    color: "#0B1F3A",
  },
  subtitle: {
    fontSize: 11.5,
    color: "#64748B",
    marginTop: 2.5,
    lineHeight: 16,
    fontWeight: "500",
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  radioCircleSelected: {
    borderColor: "#F97316",
    backgroundColor: "#F97316",
  },
});
