import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '../../../hooks/use-theme';

export const AuthCard: React.FC<ViewProps> = ({ children, style, ...props }) => {
  const colors = useTheme();
  return (
    <View style={[{ backgroundColor: colors.backgroundElement, borderRadius: 16, padding: 20 }, style]} {...props}>
      {children}
    </View>
  );
};
export default AuthCard;
