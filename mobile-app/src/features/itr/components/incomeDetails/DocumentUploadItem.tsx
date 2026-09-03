import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";
import Svg, { Path, Rect, Circle, Line, Polyline } from "react-native-svg";
import { RequiredDocumentItem } from "../../types/incomeDetails.types";

interface DocumentUploadItemProps {
  item: RequiredDocumentItem;
  onFilePicked: (id: string, fileInfo: { uri: string; name: string; size?: string }) => void;
  onFileRemoved: (id: string) => void;
}

export const DocumentUploadItem: React.FC<DocumentUploadItemProps> = ({
  item,
  onFilePicked,
  onFileRemoved,
}) => {
  const isUploaded = !!item.fileUri;

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/jpeg", "image/png"],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const sizeInMb = asset.size
          ? `${(asset.size / (1024 * 1024)).toFixed(1)} MB`
          : "1.2 MB";

        onFilePicked(item.id, {
          uri: asset.uri,
          name: asset.name,
          size: sizeInMb,
        });
      }
    } catch (error) {
      Alert.alert("File Selection", "Could not load file picker.");
    }
  };

  const renderDocumentIcon = () => {
    switch (item.iconType) {
      case "pnl":
        return (
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
              stroke="#0B1F3A"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path d="M14 2V8H20" stroke="#0B1F3A" strokeWidth={1.8} strokeLinecap="round" />
            <Rect x={8} y={13} width={8} height={6} rx={1} stroke="#F97316" strokeWidth={1.5} />
            <Line x1={8} y1={16} x2={16} y2={16} stroke="#F97316" strokeWidth={1.2} />
          </Svg>
        );

      case "balance_sheet":
        return (
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
              stroke="#0B1F3A"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path d="M14 2V8H20" stroke="#0B1F3A" strokeWidth={1.8} strokeLinecap="round" />
            <Rect x={8} y={16} width={2} height={3} fill="#F97316" />
            <Rect x={11} y={13} width={2} height={6} fill="#F97316" />
            <Rect x={14} y={11} width={2} height={8} fill="#F97316" />
          </Svg>
        );

      case "bank":
        return (
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path d="M3 9L12 4L21 9V11H3V9Z" stroke="#0B1F3A" strokeWidth={1.8} strokeLinejoin="round" />
            <Line x1={6} y1={11} x2={6} y2={18} stroke="#0B1F3A" strokeWidth={1.8} strokeLinecap="round" />
            <Line x1={10} y1={11} x2={10} y2={18} stroke="#0B1F3A" strokeWidth={1.8} strokeLinecap="round" />
            <Line x1={14} y1={11} x2={14} y2={18} stroke="#0B1F3A" strokeWidth={1.8} strokeLinecap="round" />
            <Line x1={18} y1={11} x2={18} y2={18} stroke="#0B1F3A" strokeWidth={1.8} strokeLinecap="round" />
            <Path d="M2 18H22V20H2V18Z" fill="#0B1F3A" />
            <Circle cx={12} cy={7.5} r={1.2} fill="#F97316" />
          </Svg>
        );

      case "ais":
        return (
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Rect x={3} y={4} width={18} height={14} rx={2} stroke="#0B1F3A" strokeWidth={1.8} />
            <Polyline points="6,13 10,9 13,12 18,7" stroke="#F97316" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
            <Line x1={8} y1={20} x2={16} y2={20} stroke="#0B1F3A" strokeWidth={1.8} strokeLinecap="round" />
            <Line x1={12} y1={18} x2={12} y2={20} stroke="#0B1F3A" strokeWidth={1.8} />
          </Svg>
        );

      case "tis":
        return (
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Rect x={3} y={4} width={18} height={13} rx={2} stroke="#0B1F3A" strokeWidth={1.8} />
            <Line x1={6} y1={8} x2={18} y2={8} stroke="#F97316" strokeWidth={1.5} strokeLinecap="round" />
            <Line x1={6} y1={12} x2={14} y2={12} stroke="#0B1F3A" strokeWidth={1.5} strokeLinecap="round" />
            <Line x1={8} y1={19} x2={16} y2={19} stroke="#0B1F3A" strokeWidth={1.8} strokeLinecap="round" />
            <Line x1={12} y1={17} x2={12} y2={19} stroke="#0B1F3A" strokeWidth={1.8} />
          </Svg>
        );

      default:
        return (
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
              stroke="#0B1F3A"
              strokeWidth={1.8}
            />
            <Path d="M14 2V8H20" stroke="#0B1F3A" strokeWidth={1.8} />
          </Svg>
        );
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.leftGroup}>
        <View style={styles.iconBox}>{renderDocumentIcon()}</View>
        <View style={styles.textGroup}>
          <Text style={styles.docTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.docSubtitle} numberOfLines={1}>
            {isUploaded && item.fileName
              ? `${item.fileName} • ${item.fileSize || "Uploaded"}`
              : item.subtitle}
          </Text>
        </View>
      </View>

      {isUploaded ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onFileRemoved(item.id)}
          style={styles.uploadedBadge}
        >
          <Ionicons name="checkmark-circle" size={16} color="#F97316" />
          <Text style={styles.uploadedText}>Change</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handlePickDocument}
          style={styles.uploadButton}
        >
          <Ionicons name="arrow-up-outline" size={15} color="#F97316" />
          <Text style={styles.uploadButtonText}>Upload</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F8F9FB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textGroup: {
    flex: 1,
  },
  docTitle: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#0B1F3A",
    letterSpacing: -0.1,
  },
  docSubtitle: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2.5,
    fontWeight: "500",
  },
  uploadButton: {
    borderWidth: 1.5,
    borderColor: "#F97316",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FFFFFF",
  },
  uploadButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#F97316",
  },
  uploadedBadge: {
    borderWidth: 1.5,
    borderColor: "#F97316",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFF7ED",
  },
  uploadedText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#F97316",
  },
});
