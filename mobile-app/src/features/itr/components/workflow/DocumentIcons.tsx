import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path, Rect, Circle } from "react-native-svg";
import { BrandColors } from "../../../../shared/theme";
import { WorkflowDocumentItem } from "../../types/workflowTypes";

interface DocumentIconProps {
  type: WorkflowDocumentItem["iconType"];
  size?: number;
}

export const DocumentIcon: React.FC<DocumentIconProps> = ({
  type,
  size = 34,
}) => {
  const renderIcon = () => {
    switch (type) {
      case "pan":
        // PAN ID Card Vector
        return (
          <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
            <Rect x="4" y="8" width="28" height="20" rx="3.5" fill="#EAF1FE" stroke={BrandColors.PRIMARY_BLUE} strokeWidth="1.6" />
            <Rect x="8" y="12" width="7" height="8" rx="1.5" fill={BrandColors.PRIMARY_BLUE} />
            <Circle cx="11.5" cy="15" r="2" fill="#FFFFFF" />
            <Path d="M8.5 19.5C8.5 18 10 17.5 11.5 17.5C13 17.5 14.5 18 14.5 19.5" fill="#FFFFFF" />
            <Path d="M18 13H28M18 17H26M18 21H24" stroke={BrandColors.PRIMARY_BLUE} strokeWidth="1.6" strokeLinecap="round" />
          </Svg>
        );

      case "aadhaar":
        // Aadhaar ID Vector
        return (
          <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
            <Rect x="5" y="7" width="26" height="22" rx="3.5" fill="#F1F5F9" stroke={BrandColors.PRIMARY_BLUE} strokeWidth="1.6" />
            <Circle cx="18" cy="15" r="4.5" fill={BrandColors.PRIMARY_BLUE} />
            <Path d="M11 25C11 22 14 21 18 21C22 21 25 22 25 25" fill={BrandColors.PRIMARY_BLUE} />
            <Rect x="9" y="10" width="18" height="2" rx="1" fill={BrandColors.PRIMARY_ORANGE} />
          </Svg>
        );

      case "form16":
      case "form16a":
        // Form 16 Sheet Vector
        return (
          <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
            <Path d="M9 6C9 4.9 9.9 4 11 4H21L27 10V30C27 31.1 26.1 32 25 32H11C9.9 32 9 31.1 9 30V6Z" fill="#F8FAFC" stroke={BrandColors.PRIMARY_BLUE} strokeWidth="1.6" />
            <Path d="M21 4V10H27" stroke={BrandColors.PRIMARY_BLUE} strokeWidth="1.6" strokeLinejoin="round" />
            <Path d="M14 15H22M14 19H22M14 23H19" stroke={BrandColors.PRIMARY_BLUE} strokeWidth="1.6" strokeLinecap="round" />
            <Circle cx="23" cy="24" r="2.5" fill={BrandColors.PRIMARY_ORANGE} />
          </Svg>
        );

      case "aistis":
        // AIS/TIS Monitor Vector
        return (
          <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
            <Rect x="5" y="7" width="26" height="17" rx="2.5" fill="#EAF1FE" stroke={BrandColors.PRIMARY_BLUE} strokeWidth="1.6" />
            <Path d="M18 24V29M12 29H24" stroke={BrandColors.PRIMARY_BLUE} strokeWidth="1.8" strokeLinecap="round" />
            <Path d="M9 13L13 17L18 12L22 16L27 11" stroke={BrandColors.PRIMARY_ORANGE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        );

      case "bank":
        // Bank Building Vector
        return (
          <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
            <Path d="M6 13L18 6L30 13H6Z" fill={BrandColors.PRIMARY_BLUE} />
            <Rect x="8" y="15" width="3.5" height="12" rx="0.5" fill={BrandColors.PRIMARY_BLUE} />
            <Rect x="14" y="15" width="3.5" height="12" rx="0.5" fill={BrandColors.PRIMARY_BLUE} />
            <Rect x="20" y="15" width="3.5" height="12" rx="0.5" fill={BrandColors.PRIMARY_BLUE} />
            <Rect x="26" y="15" width="3.5" height="12" rx="0.5" fill={BrandColors.PRIMARY_BLUE} />
            <Rect x="5" y="27" width="26" height="3" rx="1" fill={BrandColors.PRIMARY_ORANGE} />
          </Svg>
        );

      case "previous-itr":
        // Previous Year ITR Folder Vector
        return (
          <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
            <Path d="M6 10C6 8.9 6.9 8 8 8H14L17 11H28C29.1 11 30 11.9 30 13V26C30 27.1 29.1 28 28 28H8C6.9 28 6 27.1 6 26V10Z" fill={BrandColors.PRIMARY_LIGHT_ORANGE} stroke={BrandColors.PRIMARY_ORANGE} strokeWidth="1.6" />
            <Path d="M6 15H30" stroke={BrandColors.PRIMARY_ORANGE} strokeWidth="1.2" />
          </Svg>
        );

      case "investment":
        // Investment 80C Vector
        return (
          <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
            <Rect x="6" y="6" width="24" height="24" rx="3.5" fill="#F8FAFC" stroke={BrandColors.PRIMARY_BLUE} strokeWidth="1.6" />
            <Rect x="10" y="18" width="3.5" height="8" rx="1" fill={BrandColors.PRIMARY_BLUE} />
            <Rect x="15" y="13" width="3.5" height="13" rx="1" fill={BrandColors.PRIMARY_ORANGE} />
            <Rect x="20" y="9" width="3.5" height="17" rx="1" fill={BrandColors.PRIMARY_BLUE} />
          </Svg>
        );

      case "homeloan":
        // Home Loan Vector
        return (
          <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
            <Path d="M18 6L6 16H10V28H26V16H30L18 6Z" fill="#F8FAFC" stroke={BrandColors.PRIMARY_BLUE} strokeWidth="1.6" />
            <Path d="M18 6L6 16H9L18 8.5L27 16H30L18 6Z" fill={BrandColors.PRIMARY_ORANGE} />
            <Rect x="15" y="20" width="6" height="8" rx="1" fill={BrandColors.PRIMARY_BLUE} />
          </Svg>
        );

      case "capital-gains":
      default:
        // Capital Gains Vector
        return (
          <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
            <Rect x="6" y="6" width="24" height="24" rx="3.5" fill="#EAF1FE" stroke={BrandColors.PRIMARY_BLUE} strokeWidth="1.6" />
            <Path d="M10 22L16 16L20 19L26 12" stroke={BrandColors.PRIMARY_ORANGE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M22 12H26V16" stroke={BrandColors.PRIMARY_ORANGE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        );
    }
  };

  return <View style={styles.iconWrapper}>{renderIcon()}</View>;
};

const styles = StyleSheet.create({
  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
});
