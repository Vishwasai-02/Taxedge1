import type { AppNotification } from "../types/domain";

export const mockNotifications: AppNotification[] = [
  {
    id: "notif-1",
    title: "GSTR-3B Filing Approaching",
    body: "Your GSTR-3B filing for August is due in 5 days. File now to avoid late fees.",
    type: "gst",
    read: false,
    timestamp: "2 hours ago",
  },
  {
    id: "notif-2",
    title: "Document Action Needed",
    body: "The bank statement uploaded for LOAN-2026-00021 has expired. Please re-upload.",
    type: "document",
    read: false,
    timestamp: "5 hours ago",
  },
  {
    id: "notif-3",
    title: "Application Progress Updated",
    body: 'Your ITR Filing (ITR-2026-00032) is now in "Tax Calculation" phase.',
    type: "itr",
    read: false,
    timestamp: "1 day ago",
  },
  {
    id: "notif-4",
    title: "Payment Successful",
    body: "Your payment of ₹2,500 for GST Filing was received successfully.",
    type: "payment",
    read: true,
    timestamp: "3 days ago",
  },
  {
    id: "notif-5",
    title: "Welcome to TaxEdge!",
    body: "Thank you for choosing TaxEdge Fin Solutions for your financial management.",
    type: "general",
    read: true,
    timestamp: "1 week ago",
  },
];
