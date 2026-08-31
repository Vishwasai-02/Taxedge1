import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ServiceHeader } from "../../../shared/components/ServiceHeader";
import { ServiceList } from "../../../shared/components/ServiceList";
import { BrandColors } from "../../../shared/theme";
import { gstService } from "../services/GstService";
import { GstServiceItem } from "../types/gst.types";

export const GstScreen: React.FC = () => {
  const router = useRouter();
  const [services, setServices] = useState<GstServiceItem[]>([]);

  useEffect(() => {
    gstService.fetchGstServices().then(setServices);
  }, []);

  const handleCardPress = (item: GstServiceItem) => {
    if (item.route) {
      router.push(item.route as any);
    }
  };

  return (
    <View style={styles.container}>
      <ServiceHeader
        title="GST Services"
        subtitle="Manage all your GST related services easily in one place."
        tag="Tax & Compliance"
        iconName="document-text"
      />
      <ServiceList items={services} onItemPress={handleCardPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.BACKGROUND,
  },
});

export default GstScreen;
