import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ServiceHeader } from "../../../shared/components/ServiceHeader";
import { ServiceList } from "../../../shared/components/ServiceList";
import { BrandColors } from "../../../shared/theme";
import { itrService } from "../services/ItrService";
import { ItrServiceItem } from "../types/itr.types";

export const ItrScreen: React.FC = () => {
  const router = useRouter();
  const [services, setServices] = useState<ItrServiceItem[]>([]);

  useEffect(() => {
    itrService.fetchItrServices().then(setServices);
  }, []);

  const handleCardPress = (item: ItrServiceItem) => {
    if (item.route) {
      router.push(item.route as any);
    }
  };

  return (
    <View style={styles.container}>
      <ServiceHeader
        title="Income Tax"
        subtitle="File your income tax return accurately with certified CA assistance and maximize your refund."
        tag="Tax Services"
        iconName="calculator"
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

export default ItrScreen;
