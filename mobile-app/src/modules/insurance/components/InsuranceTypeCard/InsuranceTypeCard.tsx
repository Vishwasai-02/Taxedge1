import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../../../../hooks/use-theme';
import type { InsuranceCategory } from '../../types/insurance.types';

interface InsuranceTypeCardProps {
  category: InsuranceCategory;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

export const InsuranceTypeCard: React.FC<InsuranceTypeCardProps> = ({
  title,
  subtitle,
  icon,
  onPress,
}) => {
  const colors = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
        <Ionicons name={icon} size={28} color={colors.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  textContainer: { flex: 1 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 2 },
  subtitle: { fontSize: 13 },
});
