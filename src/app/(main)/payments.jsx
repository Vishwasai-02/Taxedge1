import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../hooks/use-theme';
import { useApplicationStore } from '../../store/applicationStore';
import { useNotificationStore } from '../../store/notificationStore';
import { AppHeader } from '../../components/AppHeader';
import { PrimaryButton } from '../../components/PrimaryButton';
import { SecondaryButton } from '../../components/SecondaryButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PaymentsScreen() {
  const colors = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const applications = useApplicationStore((state) => state.applications);
  const payApplication = useApplicationStore((state) => state.payApplication);
  const addNotification = useNotificationStore((state) => state.addNotification);

  // Filter and calculate payments dynamically from applications store
  const pendingPayments = applications.filter(app => app.paymentStatus === 'Pending' && app.paymentAmount > 0);
  const paidPayments = applications.filter(app => app.paymentStatus === 'Paid' && app.paymentAmount > 0);
  const totalDue = pendingPayments.reduce((sum, app) => sum + app.paymentAmount, 0);

  // UI States
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayNowPress = () => {
    if (pendingPayments.length === 0) {
      Alert.alert('No Fees Due', 'You do not have any pending payments.');
      return;
    }
    setShowCheckoutModal(true);
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      // Complete payment for all pending applications in store
      pendingPayments.map(app => {
        payApplication(app.id);
        
        // Add notification for each
        addNotification(
          'Payment Successful',
          `Received ₹${app.paymentAmount.toLocaleString()} for ${app.serviceName} (${app.id}).`,
          'payment'
        );
        return null;
      });

      setIsProcessing(false);
      setShowCheckoutModal(false);
      Alert.alert('Payment Success', 'All pending fees settled successfully.');
    }, 2000);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="Payments" showBack={false} />
      
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]} showsVerticalScrollIndicator={false}>
        
        {/* Main Unified Invoice Statement Card (Mockup Card 8) */}
        <View style={[styles.invoiceStatementCard, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
          <Text style={[styles.dueLabel, { color: colors.textSecondary }]}>Amount Due</Text>
          <Text style={[styles.dueValue, { color: colors.text }]}>₹{totalDue.toLocaleString()}</Text>

          {/* Line items divider */}
          <View style={styles.lineDivider} />

          {/* Individual billing lines */}
          <View style={styles.billLinesContainer}>
            {pendingPayments.length === 0 ? (
              <View style={styles.allSettledContainer}>
                <Ionicons name="checkmark-circle" size={24} color={colors.success} />
                <Text style={[styles.allSettledText, { color: colors.text }]}>All accounts fully settled.</Text>
              </View>
            ) : (
              pendingPayments.map((app) => (
                <View key={app.id} style={styles.billLineRow}>
                  <View>
                    <Text style={[styles.billName, { color: colors.text }]}>{app.serviceName}</Text>
                    <Text style={[styles.billStatus, { color: colors.orange }]}>Pending</Text>
                  </View>
                  <Text style={[styles.billAmt, { color: colors.text }]}>₹{app.paymentAmount.toLocaleString()}</Text>
                </View>
              ))
            )}
          </View>

          {/* Pay Now single CTA at bottom of card */}
          {pendingPayments.length > 0 && (
            <PrimaryButton
              title="Pay Now"
              onPress={handlePayNowPress}
              colorType="orange"
              style={styles.payNowBtn}
            />
          )}
        </View>

        {/* History Toggler / Link */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setShowHistory(!showHistory)}
          style={styles.historyLinkRow}
        >
          <Text style={[styles.historyLinkText, { color: colors.primary }]}>
            {showHistory ? 'Hide Payment History' : 'View Payment History'}
          </Text>
          <Ionicons name={showHistory ? 'chevron-up' : 'chevron-down'} size={16} color={colors.primary} />
        </TouchableOpacity>

        {/* Payment History List */}
        {showHistory && (
          <View style={styles.historyList}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Completed Receipts</Text>
            {paidPayments.length === 0 ? (
              <View style={[styles.emptyCard, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
                <Text style={[styles.emptySub, { color: colors.textSecondary }]}>No receipts found.</Text>
              </View>
            ) : (
              paidPayments.map((app) => (
                <View
                  key={app.id}
                  style={[
                    styles.historyCard,
                    {
                      backgroundColor: colors.backgroundElement,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <View style={styles.historyLeft}>
                    <View style={[styles.successIconBg, { backgroundColor: '#DCFCE7' }]}>
                      <Ionicons name="checkmark" size={16} color={colors.success} />
                    </View>
                    <View style={styles.historyInfo}>
                      <Text style={[styles.historyName, { color: colors.text }]}>{app.serviceName}</Text>
                      <Text style={[styles.historyId, { color: colors.textSecondary }]}>{app.id}</Text>
                    </View>
                  </View>
                  <View style={styles.historyRight}>
                    <Text style={[styles.historyAmt, { color: colors.success }]}>₹{app.paymentAmount.toLocaleString()}</Text>
                    <Text style={[styles.historyStatus, { color: colors.textSecondary }]}>Paid</Text>
                  </View>
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>

      {/* Checkout Simulator Modal */}
      <Modal
        visible={showCheckoutModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCheckoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: colors.backgroundElement }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>TaxEdge Checkout</Text>
            
            <View style={styles.checkoutSummary}>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Statement</Text>
              <Text style={[styles.summaryVal, { color: colors.text }]}>All Pending Invoices</Text>
              <View style={styles.modalDivider} />
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Total Amount</Text>
              <Text style={[styles.summaryTotalAmt, { color: colors.primary }]}>
                ₹{totalDue.toLocaleString()}
              </Text>
            </View>

            <Text style={[styles.paymentMethodTitle, { color: colors.text }]}>Select Payment Mode</Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setPaymentMethod('UPI')}
              style={[
                styles.methodItem,
                {
                  borderColor: paymentMethod === 'UPI' ? colors.primary : colors.border,
                  backgroundColor: paymentMethod === 'UPI' ? colors.background : 'transparent',
                },
              ]}
            >
              <Ionicons name="phone-portrait-outline" size={20} color={colors.primary} />
              <Text style={[styles.methodText, { color: colors.text }]}>UPI / GooglePay / PhonePe</Text>
              {paymentMethod === 'UPI' && <Ionicons name="checkmark-circle" size={18} color={colors.primary} />}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setPaymentMethod('CARD')}
              style={[
                styles.methodItem,
                {
                  borderColor: paymentMethod === 'CARD' ? colors.primary : colors.border,
                  backgroundColor: paymentMethod === 'CARD' ? colors.background : 'transparent',
                },
              ]}
            >
              <Ionicons name="card-outline" size={20} color={colors.primary} />
              <Text style={[styles.methodText, { color: colors.text }]}>Debit / Credit Card</Text>
              {paymentMethod === 'CARD' && <Ionicons name="checkmark-circle" size={18} color={colors.primary} />}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setPaymentMethod('NETBANKING')}
              style={[
                styles.methodItem,
                {
                  borderColor: paymentMethod === 'NETBANKING' ? colors.primary : colors.border,
                  backgroundColor: paymentMethod === 'NETBANKING' ? colors.background : 'transparent',
                },
              ]}
            >
              <Ionicons name="business-outline" size={20} color={colors.primary} />
              <Text style={[styles.methodText, { color: colors.text }]}>Net Banking</Text>
              {paymentMethod === 'NETBANKING' && <Ionicons name="checkmark-circle" size={18} color={colors.primary} />}
            </TouchableOpacity>

            {isProcessing ? (
              <View style={styles.processingState}>
                <ActivityIndicator size="large" color={colors.orange} />
                <Text style={[styles.processingText, { color: colors.text }]}>Simulating Gateway Authentication...</Text>
              </View>
            ) : (
              <View style={styles.modalBtnRow}>
                <SecondaryButton
                  title="Cancel"
                  onPress={() => setShowCheckoutModal(false)}
                  style={{ flex: 1 }}
                />
                <PrimaryButton
                  title="Pay Now"
                  onPress={handleConfirmPayment}
                  colorType="orange"
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
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  invoiceStatementCard: {
    borderRadius: 18,
    borderWidth: 1.5,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  dueLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  dueValue: {
    fontSize: 32,
    fontWeight: '800',
    marginTop: 4,
  },
  lineDivider: {
    height: 1,
    backgroundColor: '#00000008',
    marginVertical: 20,
  },
  billLinesContainer: {
    gap: 16,
    marginBottom: 20,
  },
  billLineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  billName: {
    fontSize: 14,
    fontWeight: '700',
  },
  billStatus: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  billAmt: {
    fontSize: 16,
    fontWeight: '800',
  },
  allSettledContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
  },
  allSettledText: {
    fontSize: 14,
    fontWeight: '600',
  },
  payNowBtn: {
    height: 48,
    borderRadius: 12,
  },
  historyLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  historyLinkText: {
    fontSize: 14,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 12,
  },
  historyList: {
    gap: 10,
    marginTop: 8,
  },
  historyCard: {
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  successIconBg: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyInfo: {
    marginLeft: 12,
    flex: 1,
  },
  historyName: {
    fontSize: 14,
    fontWeight: '600',
  },
  historyId: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: '500',
  },
  historyRight: {
    alignItems: 'flex-end',
  },
  historyAmt: {
    fontSize: 15,
    fontWeight: '700',
  },
  historyStatus: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
  emptyCard: {
    borderRadius: 12,
    borderWidth: 1.5,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptySub: {
    fontSize: 12,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 16,
    padding: 20,
    gap: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  checkoutSummary: {
    backgroundColor: '#00000003',
    padding: 14,
    borderRadius: 10,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  summaryVal: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 8,
  },
  summaryTotalAmt: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 2,
  },
  paymentMethodTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
  },
  methodItem: {
    height: 48,
    borderWidth: 1.5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 10,
  },
  methodText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
  },
  processingState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 10,
  },
  processingText: {
    fontSize: 13,
    fontWeight: '600',
  },
  modalBtnRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
});
