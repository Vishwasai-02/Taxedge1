import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { ServiceHeader } from '../../../shared/components/ServiceHeader';
import { ServiceList } from '../../../shared/components/ServiceList';
import { gstService } from '../services/GstService';
import { GstServiceItem } from '../types/gst.types';
import { styles } from './GstScreen.styles';

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
        subtitle="Manage GST registration, periodic returns, audits, and compliance notices."
        tag="Taxation & Compliance"
        iconName="receipt"
      />
      <ServiceList items={services} onItemPress={handleCardPress} />
    </View>
  );
};

export default GstScreen;
