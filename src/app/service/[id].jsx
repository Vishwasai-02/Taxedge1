import React from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTheme } from "../../hooks/use-theme";
import { getServiceById } from "../../data/services";
import { useApplicationStore } from "../../store/applicationStore";
import { useNotificationStore } from "../../store/notificationStore";
import { AppHeader } from "../../components/AppHeader";
import { DynamicForm } from "../../components/DynamicForm";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ServiceDetailScreen() {
  const colors = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const service = getServiceById(id || "");

  const createApplication = useApplicationStore(
    (state) => state.createApplication,
  );
  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  );

  if (!service) {
    return (
      <View
        style={[styles.errorContainer, { backgroundColor: colors.background }]}
      >
        <AppHeader title="Service Not Found" showBack />
        <View style={styles.errorContent}>
          <Ionicons name="warning-outline" size={48} color={colors.error} />
          <Text style={[styles.errorText, { color: colors.text }]}>
            Service details could not be loaded.
          </Text>
        </View>
      </View>
    );
  }

  const handleFormSubmit = (formData) => {
    // Generate simulated application fee
    const paymentAmount =
      service.category === "GST"
        ? 2500
        : service.category === "ITR"
          ? 1800
          : service.category === "LOANS"
            ? 1130
            : 0;
    // Create application in Zustand store
    const appId = createApplication(
      service.id,
      service.name,
      service.category,
      formData,
      service.requiredDocs,
      paymentAmount,
    );

    // Create notification
    addNotification(
      "Application Submitted",
      `Your request for ${service.name} (${appId}) has been registered.`,
      service.category.toLowerCase(),
    );

    Alert.alert(
      "Application Registered",
      `Application ${appId} has been successfully created. Please upload the required documents to start processing.`,
      [
        {
          text: "Upload Documents",
          onPress: () => {
            // Set selected application in store
            useApplicationStore.getState().setSelectedApplicationId(appId);
            // Route to application tracking screen
            router.replace(`/application/${appId}`);
          },
        },
      ],
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title={service.name} showBack />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Description Section */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.backgroundElement,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.headerRow}>
            <View
              style={[styles.iconBg, { backgroundColor: colors.orangeLight }]}
            >
              <Ionicons name={service.icon} size={28} color={colors.orange} />
            </View>
            <View style={styles.titleInfo}>
              <Text style={[styles.serviceTitle, { color: colors.text }]}>
                {service.name}
              </Text>
              <Text style={[styles.categoryText, { color: colors.primary }]}>
                {service.category} Category
              </Text>
            </View>
          </View>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {service.description}
          </Text>
        </View>

        {/* Required Documents Checklist View */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.backgroundElement,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Required Documents Checklist
          </Text>
          <Text
            style={[styles.sectionSubtitle, { color: colors.textSecondary }]}
          >
            You will need to scan and upload these documents after submitting
            the form:
          </Text>

          <View style={styles.docsList}>
            {service.requiredDocs.map((doc, idx) => (
              <View key={idx} style={styles.docItem}>
                <Ionicons name="checkbox" size={18} color={colors.primary} />
                <Text style={[styles.docItemText, { color: colors.text }]}>
                  {doc}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Form Card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.backgroundElement,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Application Form
          </Text>
          <Text
            style={[styles.sectionSubtitle, { color: colors.textSecondary }]}
          >
            Provide the required details to initialize your file.
          </Text>

          <DynamicForm
            fields={service.formFields}
            onSubmit={handleFormSubmit}
            submitButtonText="Start Application"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
    paddingBottom: 32,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconBg: {
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  titleInfo: {
    marginLeft: 14,
    flex: 1,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "800",
    marginTop: 2,
    textTransform: "uppercase",
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  docsList: {
    gap: 10,
  },
  docItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  docItemText: {
    fontSize: 14,
    fontWeight: "600",
  },
  errorContainer: {
    flex: 1,
  },
  errorContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  errorText: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 12,
    textAlign: "center",
  },
});
