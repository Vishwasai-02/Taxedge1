import React from "react";
import { Stack } from "expo-router";

export function RootNavigator() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(main)" />
      <Stack.Screen name="service/gst" />
      <Stack.Screen name="service/itr" />
      <Stack.Screen name="service/itr-filing" />
      <Stack.Screen name="service/itr-income-info" />
      <Stack.Screen name="service/itr-deductions" />
      <Stack.Screen name="service/itr-documents" />
      <Stack.Screen name="service/itr-review" />
      <Stack.Screen name="service/itr-filed" />
      <Stack.Screen name="service/itr-success" />
      <Stack.Screen name="service/tds-refund" />
      <Stack.Screen name="service/tds-checklist" />
      <Stack.Screen name="service/tds-estimate" />
      <Stack.Screen name="service/tds-payment" />
      <Stack.Screen name="service/tds-submitted" />
      <Stack.Screen name="service/tds-status" />
      <Stack.Screen name="service/previous-year-itr" />
      <Stack.Screen name="service/previous-year-itr-details" />
      <Stack.Screen name="service/previous-year-charges" />
      <Stack.Screen name="service/previous-year-documents" />
      <Stack.Screen name="service/previous-year-success" />
      <Stack.Screen name="service/previous-year-submitted" />
      <Stack.Screen name="service/revised-itr" />
      <Stack.Screen name="service/revised-itr-reason" />
      <Stack.Screen name="service/revised-itr-update" />
      <Stack.Screen name="service/revised-itr-documents" />
      <Stack.Screen name="service/revised-itr-review" />
      <Stack.Screen name="service/tax-notice-assistance" />
      <Stack.Screen name="service/tax-notice-summary" />
      <Stack.Screen name="service/tax-notice-documents" />
      <Stack.Screen name="service/tax-notice-review" />
      <Stack.Screen name="service/tax-notice-status" />
      <Stack.Screen name="service/loans" />
      <Stack.Screen name="service/[id]" />
      <Stack.Screen name="application/[id]" />
      <Stack.Screen name="chat/support" />
      <Stack.Screen name="chat/[id]" />
      <Stack.Screen name="notifications" />
    </Stack>
  );
}

export default RootNavigator;
