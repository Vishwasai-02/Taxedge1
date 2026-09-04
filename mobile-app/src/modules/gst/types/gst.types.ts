import { ServiceCardData } from '../../../shared/components/ServiceCard';

export interface GstServiceItem extends ServiceCardData {}

export interface GstRegistrationDraft {
  businessName: string;
  panNumber: string;
  constitution: string;
  state: string;
  city: string;
  pincode: string;
}

export interface GstFilingDraft {
  gstin: string;
  returnType: string;
  financialYear: string;
  period: string;
}
