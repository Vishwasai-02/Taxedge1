import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../hooks/use-theme";
import { CATEGORIES } from "../data/services";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 40;

export function ServiceCarousel({ onExplore }) {
  const colors = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const getSubServices = (catId) => {
    switch (catId) {
      case "GST":
        return [
          "• GST Registration",
          "• GST Filing",
          "• GST Compliance & Returns",
        ];
      case "ITR":
        return [
          "• ITR Filing (Salary/Business)",
          "• TDS Refund Claims",
          "• Revised Returns & Notices",
        ];
      case "LOANS":
        return [
          "• Business & MSME Loans",
          "• Personal & Home Loans",
          "• Working Capital / Machinery",
        ];
      case "INSURANCE":
        return [
          "• Health & Life Insurance",
          "• Motor & Vehicle Cover",
          "• Business & Commercial Policy",
        ];
      case "BUSINESS":
        return [
          "• Company & LLP Registration",
          "• Accounting & Bookkeeping",
          "• ROC Compliance & Payroll",
        ];
      default:
        return [];
    }
  };

  const getShortDesc = (catId) => {
    switch (catId) {
      case "GST":
        return "Complete tax compliance for businesses";
      case "ITR":
        return "Tax filing made easy & maximum refunds";
      case "LOANS":
        return "Fulfill capital requirements with ease";
      case "INSURANCE":
        return "Complete coverage for health and assets";
      case "BUSINESS":
        return "End-to-end setup and bookkeeping support";
      default:
        return "";
    }
  };

  const handleScroll = (event) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / (width - 24)); // adjusting for container margin
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={CATEGORIES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle={styles.listContent}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.backgroundElement,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.header}>
              <View
                style={[styles.iconBg, { backgroundColor: colors.orangeLight }]}
              >
                <Ionicons name={item.icon} size={28} color={colors.orange} />
              </View>
              <View style={styles.headerText}>
                <Text style={[styles.title, { color: colors.text }]}>
                  {item.name}
                </Text>
                <Text
                  style={[styles.subtitle, { color: colors.textSecondary }]}
                >
                  {getShortDesc(item.id)}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.body}>
              <Text
                style={[styles.sectionTitle, { color: colors.textSecondary }]}
              >
                MAJOR SERVICES
              </Text>
              {getSubServices(item.id).map((service, idx) => (
                <Text
                  key={idx}
                  style={[styles.bulletItem, { color: colors.text }]}
                >
                  {service}
                </Text>
              ))}
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onExplore(item.id)}
              style={[styles.exploreBtn, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.exploreText}>Explore Category</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Page Indicators */}
      <View style={styles.indicatorContainer}>
        {CATEGORIES.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicatorDot,
              {
                backgroundColor:
                  activeIndex === index ? colors.orange : colors.border,
                width: activeIndex === index ? 16 : 8,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  listContent: {
    paddingHorizontal: 12,
  },
  card: {
    width: CARD_WIDTH,
    marginHorizontal: 8,
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 20,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBg: {
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    marginLeft: 14,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 14,
  },
  body: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  bulletItem: {
    fontSize: 14,
    fontWeight: "500",
    marginVertical: 4,
  },
  exploreBtn: {
    height: 46,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  exploreText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 14,
    gap: 6,
  },
  indicatorDot: {
    height: 8,
    borderRadius: 4,
  },
});
