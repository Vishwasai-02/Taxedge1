import React, { useRef } from "react";
import {
  Animated,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
} from "react-native";

export interface ScalePressableProps {
  children: React.ReactNode;
  onPress?: () => void;
  scaleTo?: number;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

export const ScalePressable: React.FC<ScalePressableProps> = ({
  children,
  onPress,
  scaleTo = 0.97,
  style,
  disabled = false,
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (disabled) return;
    Animated.spring(scale, {
      toValue: scaleTo,
      useNativeDriver: true,
      friction: 8,
      tension: 100,
    }).start();
  };

  const handlePressOut = () => {
    if (disabled) return;
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,
      tension: 100,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      <Animated.View style={[{ transform: [{ scale }] }, style]}>
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default ScalePressable;
