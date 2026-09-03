import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface RequestChangesBottomSheetProps {
  visible: boolean;
  onSubmit: (comments: string, selectedTags: string[]) => void;
  onClose: () => void;
}

export const RequestChangesBottomSheet: React.FC<RequestChangesBottomSheetProps> = ({
  visible,
  onSubmit,
  onClose,
}) => {
  const [comments, setComments] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags = [
    "Deductions Missing",
    "Income Mismatch",
    "TDS Discrepancy",
    "Wrong Form",
    "Other",
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = () => {
    if (!comments.trim() && selectedTags.length === 0) {
      Alert.alert("Input Required", "Please mention the changes or select an issue tag.");
      return;
    }
    onSubmit(comments, selectedTags);
    setComments("");
    setSelectedTags([]);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.sheetContainer}>
              <View style={styles.handle} />

              <View style={styles.header}>
                <View style={styles.iconCircle}>
                  <Ionicons name="chatbox-ellipses" size={20} color="#0B1F3A" />
                </View>
                <View style={styles.headerTextGroup}>
                  <Text style={styles.title}>Request Changes</Text>
                  <Text style={styles.subtitle}>
                    Mention corrections for your assigned Tax Executive.
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={onClose}
                  style={styles.closeBtn}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons name="close" size={20} color="#0B1F3A" />
                </TouchableOpacity>
              </View>

              {/* Quick Tags */}
              <Text style={styles.sectionLabel}>Select Common Issues</Text>
              <View style={styles.tagsContainer}>
                {tags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <TouchableOpacity
                      key={tag}
                      activeOpacity={0.7}
                      onPress={() => toggleTag(tag)}
                      style={[
                        styles.tagChip,
                        isSelected && styles.tagChipSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.tagText,
                          isSelected && styles.tagTextSelected,
                        ]}
                      >
                        {tag}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Comments Text Area */}
              <Text style={styles.sectionLabel}>Detailed Remarks</Text>
              <View style={styles.textAreaWrapper}>
                <TextInput
                  style={styles.textArea}
                  placeholder="Describe the discrepancy or required correction in detail..."
                  placeholderTextColor="#94A3B8"
                  multiline
                  numberOfLines={4}
                  maxLength={500}
                  value={comments}
                  onChangeText={setComments}
                />
                <Text style={styles.charCounter}>{comments.length}/500</Text>
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleSubmit}
                style={styles.submitButton}
              >
                <Text style={styles.submitButtonText}>Submit to Tax Executive</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(11, 31, 58, 0.45)",
    justifyContent: "flex-end",
  },
  sheetContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 34 : 20,
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      android: {
        elevation: 12,
      },
      default: {},
    }),
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E2E8F0",
    alignSelf: "center",
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F0F5FA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  headerTextGroup: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  subtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F8F9FB",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  sectionLabel: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#0B1F3A",
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14,
  },
  tagChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: "#F8F9FB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  tagChipSelected: {
    backgroundColor: "#FFF7ED",
    borderColor: "#F97316",
  },
  tagText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },
  tagTextSelected: {
    color: "#F97316",
    fontWeight: "700",
  },
  textAreaWrapper: {
    borderWidth: 1.2,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    padding: 12,
    minHeight: 100,
    justifyContent: "space-between",
    marginBottom: 16,
  },
  textArea: {
    fontSize: 13,
    color: "#0B1F3A",
    lineHeight: 18,
    padding: 0,
    textAlignVertical: "top",
    minHeight: 64,
  },
  charCounter: {
    fontSize: 11,
    color: "#94A3B8",
    textAlign: "right",
    marginTop: 4,
    fontWeight: "500",
  },
  submitButton: {
    height: 50,
    borderRadius: 14,
    backgroundColor: "#0B1F3A",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
