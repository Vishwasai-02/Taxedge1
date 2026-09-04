export type CompanyType =
  | 'Private Limited'
  | 'Limited Liability Partnership (LLP)'
  | 'One Person Company (OPC)'
  | 'Public Limited'
  | 'Section 8 (NGO)'
  | 'Sole Proprietorship';

export interface CompanyDetails {
  proposedName1: string;
  proposedName2: string;
  companyType: CompanyType;
  industryCategory: string;
  businessActivityDescription: string;
  authorizedCapital: number;
  paidUpCapital: number;
  registeredState: string;
  registeredCity: string;
  registeredPincode: string;
  registeredAddressLine: string;
}
