import React from "react";
import Svg, { Path, Rect, Circle, G } from "react-native-svg";
import { BrandColors } from "../../../shared/theme";
import { IncomeTypeKey } from "../types/incomeTypes";

interface IncomeTypeIconProps {
  type: IncomeTypeKey;
  isSelected?: boolean;
  size?: number;
}

export const IncomeTypeIcon: React.FC<IncomeTypeIconProps> = ({
  type,
  isSelected = false,
  size = 40,
}) => {
  const primaryColor = isSelected ? "#FFFFFF" : BrandColors.PRIMARY_BLUE;
  const accentColor = BrandColors.PRIMARY_ORANGE;

  switch (type) {
    case "salaried":
      // Business suit with collar and orange necktie
      return (
        <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          {/* Left & Right Suit Lapels */}
          <Path
            d="M8 34V14L15 8L16.5 17L11 34H8Z"
            fill={primaryColor}
          />
          <Path
            d="M32 34V14L25 8L23.5 17L29 34H32Z"
            fill={primaryColor}
          />
          {/* Shoulders */}
          <Path
            d="M15 8L20 12L25 8L23 6H17L15 8Z"
            fill={isSelected ? "rgba(255,255,255,0.7)" : "#CBD5E1"}
          />
          {/* Orange Necktie */}
          <Path
            d="M18.5 12.5H21.5L22.5 16.5L20 18L17.5 16.5L18.5 12.5Z"
            fill={accentColor}
          />
          <Path
            d="M17.8 17.5L20 18.5L22.2 17.5L23.5 28L20 32L16.5 28L17.8 17.5Z"
            fill={accentColor}
          />
        </Svg>
      );

    case "business":
      // Storefront with orange awning roof and navy facade
      return (
        <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          {/* Store Awning (Orange stripes & scalloped edge) */}
          <Path
            d="M6 14L8 8H32L34 14H6Z"
            fill={accentColor}
          />
          <Path
            d="M6 14C6 15.65 7.35 17 9 17C10.65 17 12 15.65 12 14C12 15.65 13.35 17 15 17C16.65 17 18 15.65 18 14C18 15.65 19.35 17 21 17C22.65 17 24 15.65 24 14C24 15.65 25.35 17 27 17C28.65 17 30 15.65 30 14C30 15.65 31.35 17 33 17C33.55 17 34 16.55 34 16V14H6Z"
            fill={accentColor}
          />
          {/* Awning navy decorative stripes */}
          <Path d="M12 8L11 14H15L16 8H12Z" fill={primaryColor} opacity={0.3} />
          <Path d="M24 8L23 14H27L28 8H24Z" fill={primaryColor} opacity={0.3} />
          {/* Store building frame */}
          <Path
            d="M8 17V33H32V17H29V30H11V17H8Z"
            fill={primaryColor}
          />
          {/* Doorway */}
          <Path
            d="M16 20H24V33H16V20Z"
            fill={primaryColor}
          />
          {/* Door Window / Sign */}
          <Rect x="18" y="23" width="4" height="5" rx="1" fill={accentColor} />
        </Svg>
      );

    case "professional":
      // Professional Caduceus / Medical staff with snakes & wings
      return (
        <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          {/* Top orb */}
          <Circle cx="20" cy="7.5" r="2.5" fill={accentColor} />
          {/* Central Staff */}
          <Rect x="19" y="8" width="2" height="26" rx="1" fill={primaryColor} />
          {/* Wings */}
          <Path
            d="M20 12C15 9 10 10 7 13C10 14.5 15 14 20 13.5C25 14 30 14.5 33 13C30 10 25 9 20 12Z"
            fill={accentColor}
          />
          {/* Intertwined Serpents (Caduceus) */}
          <Path
            d="M14 17C14 14.5 20 14.5 20 17.5C20 20.5 13 21 13 25C13 29 20 29.5 20 31.5"
            stroke={primaryColor}
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <Path
            d="M26 17C26 14.5 20 14.5 20 17.5C20 20.5 27 21 27 25C27 29 20 29.5 20 31.5"
            stroke={primaryColor}
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </Svg>
      );

    case "freelancer":
      // Laptop with code / screen
      return (
        <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          {/* Screen Outer */}
          <Rect
            x="9"
            y="9"
            width="22"
            height="15"
            rx="2"
            stroke={primaryColor}
            strokeWidth="2.4"
          />
          {/* Inner Screen Display / Code prompt */}
          <Path
            d="M13 14L16 16.5L13 19"
            stroke={accentColor}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M18 19H25"
            stroke={accentColor}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Laptop Base (Orange accent) */}
          <Path
            d="M5 26.5C5 25.4 5.9 24.5 7 24.5H33C34.1 24.5 35 25.4 35 26.5C35 27.6 34.1 28.5 33 28.5H7C5.9 28.5 5 27.6 5 26.5Z"
            fill={accentColor}
          />
          {/* Trackpad notch */}
          <Rect
            x="17"
            y="25"
            width="6"
            height="1.5"
            rx="0.5"
            fill={isSelected ? BrandColors.PRIMARY_BLUE : "#FFFFFF"}
          />
        </Svg>
      );

    case "trader":
      // Bar chart with orange ascending trendline arrow
      return (
        <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          {/* Chart Bars */}
          <Rect x="7" y="24" width="4.5" height="9" rx="1.5" fill={primaryColor} />
          <Rect x="14" y="19" width="4.5" height="14" rx="1.5" fill={primaryColor} />
          <Rect x="21" y="15" width="4.5" height="18" rx="1.5" fill={primaryColor} />
          <Rect x="28" y="10" width="4.5" height="23" rx="1.5" fill={primaryColor} />
          {/* Orange Ascending Trend Line */}
          <Path
            d="M6 21L14 14L21 17L32 6"
            stroke={accentColor}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Trend Arrowhead */}
          <Path
            d="M26 6H33V13"
            stroke={accentColor}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );

    case "rental":
      // House / Property outline
      return (
        <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          {/* Orange Roof */}
          <Path
            d="M20 6L6 18H10L20 9.5L30 18H34L20 6Z"
            fill={accentColor}
          />
          {/* House Base */}
          <Path
            d="M9 17.5V33H31V17.5L20 8L9 17.5ZM28.5 30.5H11.5V18.5L20 11.2L28.5 18.5V30.5Z"
            fill={primaryColor}
          />
          {/* Door */}
          <Rect x="16.5" y="22" width="7" height="8.5" rx="1" fill={primaryColor} />
          {/* Chimney */}
          <Path d="M26 9.5V14H29V9.5H26Z" fill={accentColor} />
        </Svg>
      );

    case "capital-gains":
      // Document with ₹ rupee badge
      return (
        <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          {/* Document Body */}
          <Path
            d="M8 8C8 6.9 8.9 6 10 6H24L31 13V22H28V14H22V8H11V32H20V34H10C8.9 34 8 33.1 8 32V8Z"
            fill={primaryColor}
          />
          {/* Document internal chart/line */}
          <Path
            d="M13 15L17 19L21 16L24 20"
            stroke={primaryColor}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Rect x="13" y="24" width="7" height="2" rx="1" fill={primaryColor} opacity={0.6} />
          {/* Orange Circle with ₹ Symbol */}
          <Circle cx="28.5" cy="28.5" r="7.5" fill={accentColor} />
          {/* White ₹ Symbol */}
          <Path
            d="M25.5 25.5H31.5M25.5 27.5H30M27.5 25.5V31.5M27.5 27.5C29.5 27.5 30 28.5 29.5 29.8L31.5 31.8"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </Svg>
      );

    case "multiple":
      // Linked Chains in Navy + Orange
      return (
        <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          {/* Top-Left Link (Navy) */}
          <Path
            d="M17.5 13.5L20 11C22.2 8.8 25.8 8.8 28 11C30.2 13.2 30.2 16.8 28 19L25.5 21.5C23.3 23.7 19.7 23.7 17.5 21.5"
            stroke={primaryColor}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Bottom-Right Link (Orange) */}
          <Path
            d="M22.5 26.5L20 29C17.8 31.2 14.2 31.2 12 29C9.8 26.8 9.8 23.2 12 21L14.5 18.5C16.7 16.3 20.3 16.3 22.5 18.5"
            stroke={accentColor}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </Svg>
      );

    default:
      return null;
  }
};
