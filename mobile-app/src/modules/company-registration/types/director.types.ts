export interface DirectorInfo {
  id: string;
  name: string;
  pan: string;
  aadhaar: string;
  email: string;
  phone: string;
  hasDin: boolean;
  din?: string;
  sharesPercentage: number;
  residentialAddress: string;
}

export interface PartnerInfo {
  id: string;
  name: string;
  pan: string;
  aadhaar: string;
  email: string;
  phone: string;
  contributionAmount: number;
  profitSharePercentage: number;
  capitalContribution?: number;
  profitSharingRatio?: number;
}
