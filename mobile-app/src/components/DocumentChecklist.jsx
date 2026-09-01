import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, Alert, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../hooks/use-theme';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';

export function DocumentChecklist({ documents, onUpload }) {
  const colors = useTheme();
  
  // State for upload process
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showSourceModal, setShowSourceModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewUri, setPreviewUri] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadPress = (docName) => {
    setSelectedDoc(docName);
    setShowSourceModal(true);
  };

  const handlePickDocument = async () => {
    setShowSourceModal(false);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setPreviewUri(result.assets[0].uri);
        setShowPreviewModal(true);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const handlePickImage = async (useCamera) => {
    setShowSourceModal(false);
    try {
      let result;
      if (useCamera) {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Camera access is required to take photos');
          return;
        }
        result = await ImagePicker.launchCameraAsync({
          quality: 0.8,
        });
      } else {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Gallery access is required to choose photos');
          return;
        }
        result = await ImagePicker.launchImageLibraryAsync({
          quality: 0.8,
        });
      }

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setPreviewUri(result.assets[0].uri);
        setShowPreviewModal(true);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to capture image');
    }
  };

  const handleConfirmUpload = () => {
    if (!selectedDoc || !previewUri) return;
    
    setIsUploading(true);
    setTimeout(() => {
      onUpload(selectedDoc, previewUri);
      setIsUploading(false);
      setShowPreviewModal(false);
      setPreviewUri(null);
      setSelectedDoc(null);
      Alert.alert('Success', 'Document uploaded successfully');
    }, 1500);
  };

  // Group documents dynamically
  const getDocumentCategory = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('pan') || lowerName.includes('aadhaar') || lowerName.includes('photo')) {
      return 'KYC Documents';
    }
    if (lowerName.includes('gst') || lowerName.includes('sales') || lowerName.includes('purchase') || lowerName.includes('certificate') || lowerName.includes('register')) {
      return 'GST Documents';
    }
    return 'Financial Documents';
  };

  const categories = ['KYC Documents', 'GST Documents', 'Financial Documents'];

  const renderDocItem = (doc, idx) => {
    const isUploaded = doc.status === 'Uploaded';
    const isRejected = doc.status === 'Rejected';
    
    let statusIcon = 'time-outline';
    let statusColor = colors.textSecondary;
    let cardBg = colors.background;

    if (isUploaded) {
      statusIcon = 'checkmark-circle';
      statusColor = colors.success;
    } else if (isRejected) {
      statusIcon = 'close-circle';
      statusColor = colors.error;
      cardBg = colors.error + '08';
    }

    return (
      <View
        key={idx}
        style={[
          styles.docCard,
          {
            backgroundColor: cardBg,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.docInfo}>
          <Ionicons name={statusIcon} size={20} color={statusColor} />
          <View style={styles.textContainer}>
            <Text style={[styles.docName, { color: colors.text }]}>{doc.name}</Text>
          </View>
        </View>

        {!isUploaded ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleUploadPress(doc.name)}
            style={[
              styles.uploadBtn,
              {
                backgroundColor: colors.orangeLight,
              },
            ]}
          >
            <Text style={[styles.uploadBtnText, { color: colors.orange }]}>Upload</Text>
            <Ionicons name="cloud-upload-outline" size={14} color={colors.orange} />
          </TouchableOpacity>
        ) : (
          <Ionicons name="checkmark-done" size={18} color={colors.success} />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {categories.map((category) => {
        const categoryDocs = documents.filter((doc) => getDocumentCategory(doc.name) === category);
        if (categoryDocs.length === 0) return null;

        return (
          <View key={category} style={styles.categorySection}>
            <Text style={[styles.categoryTitle, { color: colors.text }]}>{category}</Text>
            <View style={styles.docsList}>
              {categoryDocs.map((doc, idx) => renderDocItem(doc, idx))}
            </View>
          </View>
        );
      })}

      {/* Select Source Modal */}
      <Modal
        visible={showSourceModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSourceModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.sourceModalContainer, { backgroundColor: colors.backgroundElement }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Upload Document</Text>
            <Text style={[styles.modalSub, { color: colors.textSecondary }]}>
              Choose source for {selectedDoc}
            </Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handlePickImage(true)}
              style={[styles.sourceBtn, { borderColor: colors.border }]}
            >
              <Ionicons name="camera-outline" size={24} color={colors.orange} />
              <Text style={[styles.sourceBtnText, { color: colors.text }]}>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handlePickImage(false)}
              style={[styles.sourceBtn, { borderColor: colors.border }]}
            >
              <Ionicons name="image-outline" size={24} color={colors.orange} />
              <Text style={[styles.sourceBtnText, { color: colors.text }]}>Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handlePickDocument}
              style={[styles.sourceBtn, { borderColor: colors.border }]}
            >
              <Ionicons name="document-outline" size={24} color={colors.orange} />
              <Text style={[styles.sourceBtnText, { color: colors.text }]}>Files</Text>
            </TouchableOpacity>

            <SecondaryButton
              title="Cancel"
              onPress={() => setShowSourceModal(false)}
              style={{ marginTop: 8 }}
            />
          </View>
        </View>
      </Modal>

      {/* Preview Modal */}
      <Modal
        visible={showPreviewModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPreviewModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.previewModalContainer, { backgroundColor: colors.backgroundElement }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Preview Upload</Text>
            <Text style={[styles.modalSub, { color: colors.textSecondary }]}>
              {selectedDoc}
            </Text>

            <View style={[styles.previewBox, { borderColor: colors.border }]}>
              {previewUri && (previewUri.endsWith('.jpg') || previewUri.endsWith('.png') || previewUri.endsWith('.jpeg') || previewUri.startsWith('content://media')) ? (
                <Image source={{ uri: previewUri }} style={styles.previewImage} resizeMode="contain" />
              ) : (
                <View style={styles.filePlaceholder}>
                  <Ionicons name="document-text" size={64} color={colors.textSecondary} />
                  <Text style={[styles.fileText, { color: colors.text }]}>Document File Selected</Text>
                  <Text style={[styles.fileUri, { color: colors.textSecondary }]} numberOfLines={2}>
                    {previewUri}
                  </Text>
                </View>
              )}
            </View>

            {isUploading ? (
              <View style={styles.uploadingState}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={[styles.uploadingText, { color: colors.text }]}>Uploading to TaxEdge...</Text>
              </View>
            ) : (
              <View style={styles.btnRow}>
                <SecondaryButton
                  title="Cancel"
                  onPress={() => {
                    setShowPreviewModal(false);
                    setPreviewUri(null);
                  }}
                  style={{ flex: 1 }}
                />
                <PrimaryButton
                  title="Confirm"
                  onPress={handleConfirmUpload}
                  style={{ flex: 1 }}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    gap: 16,
  },
  categorySection: {
    gap: 8,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  docsList: {
    gap: 8,
  },
  docCard: {
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  docInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  docName: {
    fontSize: 14,
    fontWeight: '600',
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    gap: 4,
  },
  uploadBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  sourceModalContainer: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 16,
    padding: 20,
    gap: 12,
  },
  previewModalContainer: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  modalSub: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  sourceBtn: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },
  sourceBtnText: {
    fontSize: 15,
    fontWeight: '600',
  },
  previewBox: {
    height: 200,
    borderRadius: 10,
    borderWidth: 1.5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000005',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  filePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  fileText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  fileUri: {
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
  },
  btnRow: {
    flexDirection: 'row',
    gap: 12,
  },
  uploadingState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  uploadingText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
