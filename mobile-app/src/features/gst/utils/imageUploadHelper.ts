import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export const pickImageFromGallery = async (): Promise<string | null> => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "Please grant photo gallery permissions to upload documents.");
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.85,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      return result.assets[0].uri;
    }
  } catch (error) {
    Alert.alert("Gallery Error", "Unable to open gallery. Please try again.");
  }
  return null;
};

export const pickImageFromCamera = async (): Promise<string | null> => {
  try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "Please grant camera permissions to capture documents.");
      return null;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.85,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      return result.assets[0].uri;
    }
  } catch (error) {
    Alert.alert("Camera Error", "Unable to open camera. Please try again.");
  }
  return null;
};
