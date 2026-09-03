import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../../../shared/theme";

interface GstDatePickerModalProps {
  visible: boolean;
  title?: string;
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onClose: () => void;
}

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const GstDatePickerModal: React.FC<GstDatePickerModalProps> = ({
  visible,
  title = "Select Date",
  selectedDate,
  onSelectDate,
  onClose,
}) => {
  const [day, setDay] = useState(15);
  const [monthIndex, setMonthIndex] = useState(7); // Aug
  const [year, setYear] = useState(2026);

  const handleConfirm = () => {
    const formatted = `${day < 10 ? `0${day}` : day} ${MONTH_NAMES[monthIndex]} ${year}`;
    onSelectDate(formatted);
    onClose();
  };

  const setQuickDate = (daysAhead: number) => {
    const target = new Date(2026, 7, 19 + daysAhead);
    const d = target.getDate();
    const m = MONTH_NAMES[target.getMonth()];
    const y = target.getFullYear();
    onSelectDate(`${d < 10 ? `0${d}` : d} ${m} ${y}`);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.card} onStartShouldSetResponder={() => true}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Quick Select Pills */}
          <Text style={styles.sectionHeading}>Quick Selection</Text>
          <View style={styles.pillsRow}>
            <TouchableOpacity style={styles.pill} onPress={() => setQuickDate(0)}>
              <Text style={styles.pillText}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pill} onPress={() => setQuickDate(7)}>
              <Text style={styles.pillText}>In 7 Days</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pill} onPress={() => setQuickDate(15)}>
              <Text style={styles.pillText}>In 15 Days</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pill} onPress={() => setQuickDate(30)}>
              <Text style={styles.pillText}>In 30 Days</Text>
            </TouchableOpacity>
          </View>

          {/* Steppers for Day, Month, Year */}
          <View style={styles.stepperRow}>
            {/* Day */}
            <View style={styles.stepperCol}>
              <Text style={styles.stepperLabel}>Day</Text>
              <View style={styles.stepperBox}>
                <TouchableOpacity
                  onPress={() => setDay((d) => Math.max(1, d - 1))}
                  style={styles.stepBtn}
                >
                  <Ionicons name="remove" size={16} color="#083B75" />
                </TouchableOpacity>
                <Text style={styles.stepVal}>{day}</Text>
                <TouchableOpacity
                  onPress={() => setDay((d) => Math.min(31, d + 1))}
                  style={styles.stepBtn}
                >
                  <Ionicons name="add" size={16} color="#083B75" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Month */}
            <View style={styles.stepperCol}>
              <Text style={styles.stepperLabel}>Month</Text>
              <View style={styles.stepperBox}>
                <TouchableOpacity
                  onPress={() => setMonthIndex((m) => Math.max(0, m - 1))}
                  style={styles.stepBtn}
                >
                  <Ionicons name="remove" size={16} color="#083B75" />
                </TouchableOpacity>
                <Text style={styles.stepVal}>{MONTH_NAMES[monthIndex]}</Text>
                <TouchableOpacity
                  onPress={() => setMonthIndex((m) => Math.min(11, m + 1))}
                  style={styles.stepBtn}
                >
                  <Ionicons name="add" size={16} color="#083B75" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Year */}
            <View style={styles.stepperCol}>
              <Text style={styles.stepperLabel}>Year</Text>
              <View style={styles.stepperBox}>
                <TouchableOpacity
                  onPress={() => setYear((y) => Math.max(2020, y - 1))}
                  style={styles.stepBtn}
                >
                  <Ionicons name="remove" size={16} color="#083B75" />
                </TouchableOpacity>
                <Text style={styles.stepVal}>{year}</Text>
                <TouchableOpacity
                  onPress={() => setYear((y) => Math.min(2030, y + 1))}
                  style={styles.stepBtn}
                >
                  <Ionicons name="add" size={16} color="#083B75" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Confirm Button */}
          <TouchableOpacity style={styles.confirmBtn} activeOpacity={0.85} onPress={handleConfirm}>
            <Text style={styles.confirmBtnText}>Set Date</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "flex-end",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: Platform.select({ ios: 36, android: 24 }),
    gap: 14,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
  },
  closeBtn: {
    padding: 4,
  },
  sectionHeading: {
    fontSize: 12.5,
    fontWeight: "600",
    color: "#64748B",
  },
  pillsRow: {
    flexDirection: "row",
    gap: 8,
  },
  pill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    alignItems: "center",
  },
  pillText: {
    fontSize: 11.5,
    fontWeight: "600",
    color: "#334155",
  },
  stepperRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 4,
  },
  stepperCol: {
    flex: 1,
    gap: 4,
  },
  stepperLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    textAlign: "center",
  },
  stepperBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 4,
  },
  stepBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  stepVal: {
    fontSize: 13,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
  },
  confirmBtn: {
    height: 48,
    borderRadius: 24,
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
  },
  confirmBtnText: {
    fontSize: 14.5,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
