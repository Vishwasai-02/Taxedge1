import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { CATEGORY_DEFINITIONS } from "../store/documentVaultStore";

interface CategoryHeaderTabsProps {
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryHeaderTabs: React.FC<CategoryHeaderTabsProps> = ({
  selectedCategoryId,
  onSelectCategory,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {CATEGORY_DEFINITIONS.map((cat) => {
          const isSelected = selectedCategoryId === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              activeOpacity={0.75}
              onPress={() => onSelectCategory(cat.id)}
              style={[
                styles.tabPill,
                isSelected ? styles.tabPillActive : styles.tabPillInactive,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  isSelected ? styles.tabTextActive : styles.tabTextInactive,
                ]}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
  },
  scrollContent: {
    gap: 8,
    paddingHorizontal: 2,
  },
  tabPill: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1.2,
  },
  tabPillActive: {
    backgroundColor: "#FFF1E6",
    borderColor: "#F97316",
  },
  tabPillInactive: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
  },
  tabText: {
    fontSize: 12.5,
    fontWeight: "700",
  },
  tabTextActive: {
    color: "#EA580C",
  },
  tabTextInactive: {
    color: "#64748B",
  },
});
