import type { Ionicons } from "@expo/vector-icons";

export type IconName = keyof typeof Ionicons.glyphMap;

export type ServiceCategoryId =
  | "GST"
  | "ITR"
  | "LOANS"
  | "INSURANCE"
  | "BUSINESS";

export type FormFieldType = "text" | "number" | "date" | "dropdown";

export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  options?: string[];
  required: boolean;
}

export interface Service {
  id: string;
  name: string;
  category: ServiceCategoryId;
  description: string;
  icon: IconName;
  requiredDocs: string[];
  formFields: FormField[];
}

export interface ServiceCategory {
  id: ServiceCategoryId;
  name: string;
  icon: IconName;
  count: number;
  color: string;
}

export interface CatalogueItem {
  label: string;
  serviceId?: string;
}

export interface CatalogueSection {
  id: ServiceCategoryId;
  title: string;
  icon: IconName;
  tint: string;
  tintBg: string;
  items: CatalogueItem[];
}

export type DocumentStatus = "Uploaded" | "Pending" | "Rejected";

export interface ApplicationDocument {
  name: string;
  status: DocumentStatus;
  fileUri?: string;
}

export type TimelineStatus = "completed" | "current" | "pending";

export interface TimelineStep {
  title: string;
  description: string;
  status: TimelineStatus;
  date?: string;
}

export type ChatSender = "user" | "staff";

export interface ChatMessage {
  id: string;
  sender: ChatSender;
  text: string;
  timestamp: string;
}

export type ApplicationFormData = Record<string, string>;

export type PaymentStatus = "Paid" | "Pending";

export interface Application {
  id: string;
  serviceId: string;
  serviceName: string;
  category: ServiceCategoryId;
  status: string;
  progress: number;
  assignedExecutive: string;
  paymentAmount: number;
  paymentStatus: PaymentStatus;
  createdAt: string;
  formData: ApplicationFormData;
  documents: ApplicationDocument[];
  timeline: TimelineStep[];
  chatHistory: ChatMessage[];
}

export interface Payment {
  id: string;
  applicationId: string;
  serviceName: string;
  amount: number;
  status: PaymentStatus;
  dueDate?: string;
  paymentDate?: string;
  invoiceNo: string;
}

export type NotificationType =
  | "gst"
  | "itr"
  | "loans"
  | "insurance"
  | "business"
  | "document"
  | "payment"
  | "general";

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  type: NotificationType;
  read: boolean;
  timestamp: string;
}

export interface CustomerProfile {
  name: string;
  email: string;
  dob: string;
  pan: string;
  aadhaar: string;
  address: string;
  customerType: string;
}

export type ProfileFormValues = Omit<CustomerProfile, "customerType">;

export type ProfileFormErrors = Partial<Record<keyof ProfileFormValues, string>>;

export interface Customer extends CustomerProfile {
  mobile: string;
  customerId: string;
  avatarUri?: string | null;
}
